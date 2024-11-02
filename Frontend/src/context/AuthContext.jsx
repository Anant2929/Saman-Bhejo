// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
