import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useUserLogin } from "../../context/userLoginContext";

export default function Right() {
  const { userLogin } = useUserLogin();

  return (
    <div className="flex justify-center items-center w-full h-full sm:p-8 lg:p-12">
      {/* Conditional rendering of Login or Signup component */}
      <div className="w-full">
        {userLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}
