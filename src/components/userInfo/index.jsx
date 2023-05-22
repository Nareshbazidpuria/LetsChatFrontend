import { useEffect, useState } from "react";
import Cover from "../profile/Cover";
import { useParams } from "react-router-dom";
import { getUserInfoApi } from "../../apis";
import { BaseUrl } from "../../axios";

const UserInfo = () => {
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
    <div className="bg-gray-50 border-t p-2">
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <Cover user={user} />
        <div className="mt-20 px-7">
          <div className="font-bold text-2xl">{user?.name}</div>
          <div className="text-gray-400">{user?.userName}</div>
          <div className="text-gray-400 text-sm">{user?.email}</div>
          <div className="text-sm flex flex-col items-center w-32 bg-slate-100 my-3 p-2 rounded-lg">
            <span>{user?.friends || 0}</span>
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
