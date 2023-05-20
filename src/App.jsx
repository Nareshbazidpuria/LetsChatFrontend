import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { useEffect } from "react";
import Call from "./components/call";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.user) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route key="call" path="/call" element={<Call />} />
        <Route key="layout" path="/*" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
