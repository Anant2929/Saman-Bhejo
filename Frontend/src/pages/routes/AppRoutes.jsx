
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../home/Home.jsx";
import { useAuth } from '../../context/AuthContext'; // Import the Auth context

export default function AppRoutes() {
  const { token } = useAuth(); // Use the token from AuthContext
  console.log("Token in AppRoutes: ", token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/user/login" />} />
        <Route path="/user/login" element={token ? <Navigate to="/home" /> : <Layout />} />
        <Route path="/oAuth/auth/google" element={token ? <Navigate to="/home" /> : <Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
