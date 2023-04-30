import { Popover, Tooltip } from "antd";
import logo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile.png";
import PopoverContent from "./PopoverContent";

const Header = () => {
  return (
    <div className="p-3 flex items-center justify-between bg-slate-100 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img className="h-10" src={logo} alt="" />
        <span>Let's Chat</span>
      </div>
      <Popover
        placement="bottomRight"
        content={<PopoverContent />}
        trigger="click"
      >
        <Tooltip title="Profile">
          <img
            className="h-10 border border-sky-600 rounded-full cursor-pointer"
            src={JSON.parse(localStorage.user)?.profilePic || profile}
            alt=""
          />
        </Tooltip>
      </Popover>
    </div>
  );
};

export default Header;
