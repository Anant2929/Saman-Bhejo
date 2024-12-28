import React from "react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import { useUserLogin } from "../../context/userLoginContext";

export default function Right() {
  const { userLogin, forgotPassword } = useUserLogin();

  return (
    <div className="flex justify-center items-center w-full h-full sm:p-8 lg:p-12">
      <div className="w-full">
        {userLogin ? (
          <Login />
        ) : forgotPassword ? (
          <ForgotPassword />
        ) : (
          <Signup />
        )}
      </div>
    </div>
  );
}
