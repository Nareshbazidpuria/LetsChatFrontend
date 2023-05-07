import { message } from "antd";
import { getProfileApi } from "../../apis";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cover from "./Cover";
import { BaseUrl } from "../../axios";

const General = () => {
  const [user, setUser] = useState();

  const getProfile = async () => {
    try {
      let res = await getProfileApi();
      if (res?.status === 200) {
        const user = res?.data?.data;
        if (user?.profilePic) user.profilePic = BaseUrl + user.profilePic;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <Cover user={user} />
      <div className="text-lg px-6 mt-14">
        <div className="font-bold text-2xl">{user?.name}</div>
        <div className="text-gray-400">{user?.userName}</div>
        <div className="text-gray-400 text-sm">{user?.email}</div>
        <div className="text-sm flex flex-col items-center w-32 bg-slate-100 my-3 p-2 rounded-lg">
          <span>{user?.friends?.length || 0}</span>
          <span>Friends</span>
        </div>
        <Link to="/profile/edit">
          <div className="bg-sky-500 text-white px-5 py-2 mt-4 rounded w-32 cursor-pointer text-base">
            Edit Profile
          </div>
        </Link>
      </div>
    </div>
  );
};

export default General;
