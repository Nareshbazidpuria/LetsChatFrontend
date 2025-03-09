import { useNavigate } from "react-router-dom";
import { deleteAccountApi, logoutApi } from "../../apis";
import { Popover, message } from "antd";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);

  const deleteAccount = async () => {
    try {
      setPopup(false);
      const response = await deleteAccountApi();
      if (response?.status === 200) {
        localStorage.clear();
        message.success(response?.data?.message);
        navigate("/signin");
      } else message.error(response?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

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

      <Popover
        placement="topLeft"
        open={popup}
        content={
          <div className="px-5 py-3">
            <div>Are you sure to delete your account permanently ?</div>
            <div className="flex gap-2 mt-3">
              <span
                className="bg-sky-400 rounded px-3 text-white cursor-pointer"
                onClick={deleteAccount}
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
        <div
          className="p-2 hover:bg-sky-400 hover:text-white cursor-pointer rounded"
          onClick={() => setPopup(true)}
        >
          Delete Account
        </div>
      </Popover>
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
