import { Route, Routes } from "react-router-dom";
import Header from "../header";
import Home from "../home";
import Profile from "../profile";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route key="home" path="/" element={<Home />} />
        <Route key="profile" path="/profile/*" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Layout;
