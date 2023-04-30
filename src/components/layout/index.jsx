import { Route, Routes } from "react-router-dom";
import Header from "../header";
import Home from "../home";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route key="home" path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Layout;
