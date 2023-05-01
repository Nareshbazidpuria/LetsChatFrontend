import { EditOutlined } from "@ant-design/icons";
import Options from "./Options";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Edit from "./Edit";
import "./style.css";
import General from "./General";
import Security from "./Security";
import Preference from "./Preference";
import Settings from "./Settings";

const Profile = () => {
  let location = useLocation();
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(location?.pathname?.split("/profile/")[1] || "");
  }, [location]);

  return (
    <div className="flex" style={{ height: "calc(max(100vh - 4rem , 36rem))" }}>
      <div className="border w-1/4">
        <div className="flex gap-3 py-6 px-4 text-xl items-center bg-slate-50">
          <span className="flex text-3xl">
            <ion-icon name="person-circle-outline" />
          </span>
          <span>Profile</span>
        </div>
        <Options
          to="/"
          icon={<ion-icon name="laptop-outline" />}
          label="General"
          active={active === ""}
          onClick={() => setActive("")}
        />
        <Options
          to="/edit"
          icon={<EditOutlined />}
          label="Edit"
          active={active === "edit"}
          onClick={() => setActive("")}
        />
        <Options
          to="/security"
          icon={<ion-icon name="key-outline" />}
          label="Security"
          active={active === "security"}
          onClick={() => setActive("security")}
        />
        <Options
          to="/preference"
          icon={<ion-icon name="color-palette-outline" />}
          label="Preference"
          active={active === "preference"}
          onClick={() => setActive("preference")}
        />
        <Options
          to="/settings"
          icon={<ion-icon name="settings-outline" />}
          label="Settings"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        />
      </div>
      <div className="border border-l-0 w-3/4 relative bg-slate-50">
        <Routes>
          <Route key="general" path="/" element={<General />} />
          <Route key="edit" path="/edit" element={<Edit />} />
          <Route key="security" path="/security" element={<Security />} />
          <Route key="preference" path="/preference" element={<Preference />} />
          <Route key="settings" path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
