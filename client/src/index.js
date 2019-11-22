import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import FontState from "./context/fonts/FontState";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <AuthState>
      <FontState>
        <App />
      </FontState>
    </AuthState>
  </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
