import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/LetsChatFrontend/signin" element={<Login />} />
          <Route
            key="signup"
            path="/LetsChatFrontend/signup"
            element={<SignUp />}
          />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
