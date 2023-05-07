import { message } from "antd";
import { sendRequestApi } from "../../apis";
import profile from "../../assets/img/profile.png";
import { useState } from "react";

const AddFriend = ({ user, add }) => {
  const [requested, setRequested] = useState([]);

  const sendRequest = async (to) => {
    try {
      let res = await sendRequestApi({ to });
      if (res?.status === 201) {
        setRequested([...requested, to?.toString()]);
        message.success(res?.data?.message);
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg px-5 py-2">
      <img
        className="h-12 w-12 border-sky-600 rounded-full border"
        src={user?.profilePic || profile}
        alt=""
      />
      <div className="w-4/5 flex justify-between items-center">
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span className="flex gap-1 text-gray-400 text-xs">
            {user.userName}
          </span>
        </div>
        {add ? (
          <span
            className={`cursor-pointer border ${
              !requested.includes(user?._id?.toString()) &&
              "bg-sky-400 text-white"
            } py-1 px-2 rounded flex items-center gap-1`}
            onClick={() =>
              !requested.includes(user?._id?.toString()) &&
              sendRequest(user?._id)
            }
          >
            {requested.includes(user?._id?.toString()) ? (
              <>
                <ion-icon name="checkmark-outline" />
                <span>Sent</span>
              </>
            ) : (
              <>
                <ion-icon name="person-add-outline" />
                <span>Add</span>
              </>
            )}
          </span>
        ) : (
          <div className="flex items-center gap-1 text-white text-base">
            <span className="cursor-pointer bg-sky-400 py-1 px-2 rounded flex ">
              <ion-icon name="checkmark-outline" />
            </span>
            <span className="cursor-pointer text-gray-500 border py-1 px-2 rounded flex ">
              <ion-icon name="close-outline" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
