import { Tooltip, message } from "antd";
import { confirmRequestApi, sendRequestApi, rejectReqApi } from "../../apis";
import profile from "../../assets/img/profile.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddFriend = ({ userr, add }) => {
  const [user, setUser] = useState(userr);

  const sendRequest = async (to) => {
    try {
      let res = await sendRequestApi({ to });
      if (res?.status === 201) {
        setUser({ ...user, reqSent: res?.data?.data });
        message.success(res?.data?.message);
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
      console.log(error);
    }
  };

  const confirmRequest = async (requestId) => {
    try {
      let res = await confirmRequestApi(requestId);
      if (res?.status === 200) {
        setUser(null);
        message.success(res?.data?.message);
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
      console.log(error);
    }
  };

  const rejectRequest = async (requestId, params) => {
    try {
      let res = await rejectReqApi(requestId, params);
      if (res?.status === 200) {
        params?.type ? setUser({ ...user, reqSent: null }) : setUser(null);
        message.success(res?.data?.message);
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div
      className={`${user && "flex items-center gap-3 rounded-lg px-5 py-2"}`}
    >
      {user && (
        <>
          <img
            className="h-12 w-12 border-sky-600 rounded-full border"
            src={user?.profilePic || profile}
            alt=""
          />
          <div className="w-4/5 flex justify-between items-center">
            <Link to={`/user/${user?._id}`}>
              <Tooltip title="View">
                <div className="flex flex-col cursor-pointer">
                  <span>{user?.name}</span>
                  <span className="flex gap-1 text-gray-400 text-xs">
                    {user.userName}
                  </span>
                </div>
              </Tooltip>
            </Link>
            {add && !user?.reqReceived ? (
              <>
                {user?.reqSent ? (
                  <span
                    className="border py-1 px-2 rounded cursor-pointer"
                    onClick={() =>
                      rejectRequest(user?.requestId || user?.reqSent?._id, {
                        type: "cancel",
                      })
                    }
                  >
                    Cancel
                  </span>
                ) : (
                  <span
                    className="cursor-pointer border py-1 px-2 rounded flex items-center gap-1 bg-sky-400 text-white"
                    onClick={() => sendRequest(user?._id)}
                  >
                    <ion-icon name="person-add-outline" />
                    <span>Add</span>
                  </span>
                )}
              </>
            ) : (
              <div className="flex items-center gap-1 text-white text-base">
                <span
                  className="cursor-pointer bg-sky-400 py-1 px-2 rounded flex "
                  onClick={() =>
                    confirmRequest(user?.requestId || user?.reqReceived?._id)
                  }
                >
                  <ion-icon name="checkmark-outline" />
                </span>
                <span
                  className="cursor-pointer text-gray-500 border py-1 px-2 rounded flex"
                  onClick={() =>
                    rejectRequest(user?.requestId || user?.reqReceived?._id, {})
                  }
                >
                  <ion-icon name="close-outline" />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddFriend;
