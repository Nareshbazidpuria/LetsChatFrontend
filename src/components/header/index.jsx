import { Popover, Tooltip } from "antd";
import logo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile.png";
import PopoverContent from "./PopoverContent";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../axios";

const Header = () => {
  return (
    <div className="p-3 flex items-center justify-between bg-slate-100 sticky top-0 z-10">
      <Link to="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <img className="h-10" src={logo} alt="" />
          <span>Let's Chat</span>
        </div>
      </Link>
      <Popover
        placement="bottomRight"
        content={<PopoverContent />}
        trigger="click"
      >
        <Tooltip title="Profile">
          <img
            className="h-10 w-10 border border-sky-600 rounded-full cursor-pointer"
            src={BaseUrl + JSON.parse(localStorage.user)?.profilePic || profile}
            alt=""
          />
        </Tooltip>
      </Popover>
    </div>
  );
};

export default Header;
