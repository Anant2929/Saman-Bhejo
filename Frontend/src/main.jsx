import React from "react";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserLoginProvider } from "./context/userLoginContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UserLoginProvider>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/" element={<App/>} />
          
        </Routes>
      </UserLoginProvider>
    </StrictMode>
  </BrowserRouter>
);
