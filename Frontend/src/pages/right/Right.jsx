import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useUserLogin } from "../../context/userLoginContext";

export default function Right() {
  const { userLogin } = useUserLogin();

  return (
    <div className="flex justify-center items-center w-full h-full">
      {userLogin ? <Login /> : <Signup />}
      
    </div>
  );
}
