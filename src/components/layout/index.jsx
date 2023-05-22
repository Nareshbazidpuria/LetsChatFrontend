import { Route, Routes } from "react-router-dom";
import Header from "../header";
import Home from "../home";
import Profile from "../profile";
import UserInfo from "../userInfo";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route key="home" path="/" element={<Home />} />
        <Route key="profile" path="/profile/*" element={<Profile />} />
        <Route key="userInfo" path="/user/:id" element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default Layout;
