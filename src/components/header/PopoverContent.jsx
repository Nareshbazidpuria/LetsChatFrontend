import { Link, useNavigate } from "react-router-dom";
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
        navigate("/LetsChatFrontend/signin");
      } else message.error(response?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  return (
    <div className="w-32 py-2">
      <Link to="/LetsChatFrontend/profile">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 px-2 py-1">
          <span className="flex text-lg">
            <ion-icon name="person-circle-outline" />
          </span>
          <span>Profile</span>
        </div>
      </Link>
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 px-2 py-1"
        onClick={logout}
      >
        <span className="flex text-lg">
          <ion-icon name="log-out-outline" />
        </span>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default PopoverContent;
