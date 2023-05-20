import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../apis";
import { message } from "antd";

const Settings = () => {
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
    <div
      className="flex flex-col gap-1 bg-white m-3 rounded-xl overflow-hidden shadow py-5 px-10"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <h1 className="text-2xl mb-5">Settings</h1>
      <div className="p-2 hover:bg-sky-400 hover:text-white cursor-pointer rounded">
        Delete Account
      </div>
      <div
        className="p-2 hover:bg-sky-400 hover:text-white cursor-pointer rounded"
        onClick={logout}
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
