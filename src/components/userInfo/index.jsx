import { useEffect, useState } from "react";
import Cover from "../profile/Cover";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfoApi } from "../../apis";
import { BaseUrl } from "../../axios";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/actions";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState();

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
              <span className="cursor-pointer bg-sky-400 py-1 px-2 rounded flex ">
                Confirm Request
              </span>
              <span className="cursor-pointer text-gray-500 border py-1 px-2 rounded flex">
                Reject
              </span>
            </div>
          )}
          {user?.reqSent && (
            <span className="border py-1 px-2 rounded cursor-pointer h-fit">
              Cancel Request
            </span>
          )}
          {user?.room?._id && (
            <div className="flex items-center h-fit gap-10 text-gray-500">
              <span
                className="flex cursor-pointer text-2xl"
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  navigate("/");
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
              <button className="bg-sky-500 text-white px-5 py-2 rounded w-32 h-fit text-center outline-none cursor-pointer">
                Unfriend
              </button>
            </div>
          )}
          {!(user?.room?._id || user?.reqReceived || user?.reqSent) && (
            <span className="cursor-pointer border py-1 px-2 rounded flex items-center gap-1 bg-sky-400 text-white h-fit">
              <ion-icon name="person-add-outline" />
              <span>Add Friend</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
