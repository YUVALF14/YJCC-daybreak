import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Import fonts
import "@fontsource/heebo";
import "@fontsource/assistant";
import "@fontsource/rubik";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
