import React, { useState } from "react";
import "../../App.css";
import lockIcon from "../../assets/images/lock_icon.svg";
import emailIcon from "../../assets/images/email_icon.svg";
import axios from "axios";
import { useUserLogin } from "../../context/userLoginContext";
import { useMessage } from "../../context/MessageContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUserLogin , setForgotPassword } = useUserLogin();
  const { setTimedMessage } = useMessage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    console.log("entered in submit")
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "This field is required.";
    if (!password) newErrors.password = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.put("/api/user/forgotPassword", { email, password });
      console.log("Password Updated successfuly:", res.data);

      // Display success message
      setTimedMessage(res.data.message, "success");

      // Clear input fields
      setEmail("");
      setPassword("");
    
      setForgotPassword(false);
      setUserLogin(true);
    } catch (error) {
      const errorMsg = error.response?.data.message || "Password update failed";
      setErrors({ general: errorMsg });

      // Display error message
      setTimedMessage(errorMsg, "error");
      console.error("Password update failed:", error);
    }
  };

  // oAuth/auth/google
  const handleSignUpClick = () => {
    setForgotPassword(false);
    setUserLogin(false);
    console.log("Navigating to Sign Up");
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-4 sm:p-8 lg:p-12 montserrat-regular">
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F9] mb-8 text-center">
          Enter the email of your Account
        </h1>

        {/* Email Input */}
        <div className="relative mb-6 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#fff] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.email && (
            <span className="absolute left-0 top-full text-[#ff1111] text-sm mb-1">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className="relative mb-6 w-full">
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#ffffff] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={lockIcon}
            alt="Password Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.password && (
            <span className="absolute left-0 top-full text-[#ff1111] text-sm mb-1">
              {errors.password}
            </span>
          )}

          {/* General Error Message */}
          {errors.general && (
            <span className="absolute left-0 top-full text-[#ff1111] text-sm mb-1">{errors.general}</span>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="text-white bg-[#2c70a0] p-3 rounded-lg w-full 
            hover:bg-[#1d4366] transition duration-300 hover:scale-105 font-semibold"
        >
          Reset Password
        </button>

        {/* Signup link */}
        <span className="text-[#FFF9F9] block text-center mt-6">
          New user?
          <a
            href="#"
            onClick={handleSignUpClick}
            className="text-[#2d9be9] ml-2 text-lg  "
          >
            Signup
          </a>
        </span>
      </form>
    </div>
  );
}