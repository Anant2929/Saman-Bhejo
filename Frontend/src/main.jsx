import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Home from "./pages/home/Home.jsx"
import "./index.css";

createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
  <StrictMode>
    <App />
  </StrictMode>
=======
  <BrowserRouter>
    <StrictMode>
      <UserLoginProvider>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/" element={<App/>} />
          <Route path="/home" element={<Home/>} />
          
        </Routes>
      </UserLoginProvider>
    </StrictMode>
  </BrowserRouter>
>>>>>>> 1c997bcfce9b93580773305c9da536ac3014f685
);
