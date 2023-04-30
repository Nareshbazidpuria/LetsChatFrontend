import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../apis";
import { message } from "antd";

const PopoverContent = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await logoutApi();
      if (response?.status === 200) {
        localStorage.clear();
        message.success(response?.data?.message);
        navigate("/signin");
      } else message.error(response?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  return (
    <div className="w-24">
      <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 px-2 py-1">
        <span className="flex text-lg">
          <ion-icon name="person-circle-outline"></ion-icon>
        </span>
        <span>Profile</span>
      </div>
      <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 px-2 py-1">
        <span className="flex text-lg">
          <ion-icon name="log-out-outline"></ion-icon>
        </span>
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
};

export default PopoverContent;
