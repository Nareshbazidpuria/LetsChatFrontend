import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { useEffect } from "react";
import Call from "./components/call";
import LobbyScreen from "./components/call/index copy 2";
import RoomPage from "./components/call/index copy 3";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.user) {
      navigate("/LetsChatFrontend/signin");
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route
          key="call"
          path="/LetsChatFrontend/call/:userId"
          // element={<LobbyScreen />}
          element={<Call />}
        />
        {/* <Route path="/room/:roomId" element={<RoomPage />} /> */}
        <Route key="layout" path="/*" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
