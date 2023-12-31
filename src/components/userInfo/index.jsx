import { useEffect, useState } from "react";
import Cover from "../profile/Cover";
import { useNavigate, useParams } from "react-router-dom";
import {
  confirmRequestApi,
  getUserInfoApi,
  rejectReqApi,
  sendRequestApi,
  unfriendApi,
} from "../../apis";
import { BaseUrl } from "../../axios";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/actions";
import { Popover, message } from "antd";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [popup, setPopup] = useState(false);

  const getUser = async (id) => {
    try {
      const res = await getUserInfoApi(id);
      if (res?.data?.status === 200)
        setUser({
          ...res?.data?.data,
          profilePic: res?.data?.data?.profilePic
            ? BaseUrl + res?.data?.data?.profilePic
            : null,
        });
    } catch (error) {}
  };

  const unfriend = async (id) => {
    try {
      const res = await unfriendApi(id);
      if (res?.data?.status === 200) message.success(res?.data?.message);
      getUser(id);
      dispatch(setSelectedUser(null));
    } catch (error) {
      message.success(error?.data?.message);
      console.log(error);
    }
  };

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
        getUser(id);
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
        params?.type
          ? setUser({ ...user, reqSent: null })
          : setUser({ ...user, reqReceived: null });
        message.success(res?.data?.message);
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  return (
    <div className="bg-gray-50 border-t p-3">
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg"
        style={{ height: "calc(max(100vh - 5.5rem, 30rem))" }}
      >
        <Cover user={user} />
        <div className="mt-20 px-7 flex justify-between">
          <div>
            <div className="font-bold text-2xl">{user?.name}</div>
            <div className="text-gray-400">{user?.userName}</div>
            <div className="text-gray-400 text-sm">{user?.email}</div>
            <div className="text-sm flex flex-col items-center w-32 bg-slate-100 my-3 p-2 rounded-lg">
              <span>{user?.friends || 0}</span>
              <span>Friends</span>
            </div>
          </div>
          {user?.reqReceived && (
            <div className="flex items-center gap-3 text-white text-base h-fit">
              <span
                className="cursor-pointer bg-sky-400 py-1 px-2 rounded flex"
                onClick={() =>
                  confirmRequest(user?.requestId || user?.reqReceived?._id)
                }
              >
                Confirm Request
              </span>
              <span
                className="cursor-pointer text-gray-500 border py-1 px-2 rounded flex"
                onClick={() =>
                  rejectRequest(user?.requestId || user?.reqReceived?._id, {})
                }
              >
                Reject
              </span>
            </div>
          )}
          {user?.reqSent && (
            <span
              className="border py-1 px-2 rounded cursor-pointer h-fit"
              onClick={() =>
                rejectRequest(user?.reqSent?._id, {
                  type: "cancel",
                })
              }
            >
              Cancel Request
            </span>
          )}
          {user?.room?._id && (
            <div className="flex items-center h-fit gap-10 text-gray-500">
              <span
                className="flex cursor-pointer text-2xl"
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  navigate("/LetsChatFrontend");
                }}
              >
                <ion-icon name="chatbubble-ellipses-outline" />
              </span>
              <span className="flex cursor-pointer text-2xl">
                <ion-icon name="videocam-outline" />
              </span>
              <span className="flex cursor-pointer text-2xl">
                <ion-icon name="call-outline" />
              </span>
              <Popover
                placement="topRight"
                open={popup}
                content={
                  <div className="px-5 py-3">
                    <div>Are you sure to unfriend ?</div>
                    <div className="flex gap-2 mt-3">
                      <span
                        className="bg-sky-400 rounded px-3 text-white cursor-pointer"
                        onClick={() => unfriend(user?._id)}
                      >
                        Yes
                      </span>
                      <span
                        className="border rounded px-3 cursor-pointer"
                        onClick={() => setPopup(false)}
                      >
                        No
                      </span>
                    </div>
                  </div>
                }
                trigger="click"
              >
                <button
                  className="bg-sky-500 text-white px-5 py-2 rounded w-32 h-fit text-center outline-none cursor-pointer"
                  onClick={() => setPopup(true)}
                >
                  Unfriend
                </button>
              </Popover>
            </div>
          )}
          {!(user?.room?._id || user?.reqReceived || user?.reqSent) && (
            <button
              disabled={!user}
              className={`${
                user ? "cursor-pointer" : "cursor-no-drop"
              } border py-1 px-2 rounded flex items-center gap-1 bg-sky-400 text-white h-fit`}
              onClick={() => sendRequest(user?._id)}
            >
              <ion-icon name="person-add-outline" />
              <span>Add Friend</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
