import { Popover } from "antd";
import logo from "../../assets/img/logo.png";
import android from "../../assets/img/android.png";
import profile from "../../assets/img/profile.png";
import apk from "../../assets/files/LetsChatAndroid.apk";
import PopoverContent from "./PopoverContent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((state) => state);

  return (
    <div
      className={`p-3 flex items-center justify-between ${
        state?.darkMode ? "bg-gray-800 text-white" : "bg-slate-100"
      } sticky top-0 z-10`}
    >
      <div className="flex items-center gap-5">
        <Link to="/LetsChatFrontend">
          <div className="flex items-center gap-3 cursor-pointer">
            <img className="h-10" src={logo} alt="" />
            <span>Let's Chat</span>
          </div>
        </Link>
        <a
          href={apk}
          className="flex items-center gap-2 rounded p-2 border bg-gray-900"
        >
          <img height={25} width={25} src={android} alt={android} />
          <span className="text-xs text-white">Download Android App</span>
        </a>
      </div>
      <Popover
        placement="bottomRight"
        content={<PopoverContent />}
        trigger="click"
      >
        <img
          className="h-10 w-10 border border-sky-600 rounded-full cursor-pointer"
          src={
            localStorage.user
              ? JSON.parse(localStorage.user)?.profilePic || profile
              : profile
          }
          alt=""
        />
      </Popover>
    </div>
  );
};

export default Header;
