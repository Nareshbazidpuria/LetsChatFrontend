import profile from "../../assets/img/profile.png";
import { message } from "antd";
import { getProfileApi } from "../../apis";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../axios";

const General = () => {
  const [user, setUser] = useState();

  const getProfile = async () => {
    try {
      let res = await getProfileApi();
      if (res?.status === 200) {
        setUser(res?.data?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
      } else message.error(res?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl bg-slate-50 px-10 py-5">General</div>
      <div className="px-10 py-4">
        <img
          className=" h-32 w-32 border-2 border-sky-600 rounded-full"
          src={user?.profilePic ? BaseUrl + user.profilePic : profile}
          alt=""
        />
      </div>
      <div className="text-lg px-10">
        <table>
          <tr>
            <td>Name</td>
            <td className="px-3">:</td>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td className="px-3">:</td>
            <td>{user?.userName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td className="px-3">:</td>
            <td>{user?.email || "Not associated"}</td>
          </tr>
          <tr>
            <td>Friends</td>
            <td className="px-3">:</td>
            <td>{user?.friends?.length || 0} friends</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default General;
