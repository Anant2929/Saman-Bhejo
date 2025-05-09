import React, { useState } from "react";
import "../../App.css";
import lockIcon from "../../assets/images/lock_icon.svg";
import emailIcon from "../../assets/images/email_icon.svg";
import axios from "axios";
import { useUserLogin } from "../../context/userLoginContext";
import { useMessage } from "../../context/MessageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the Auth context
import { useSocket } from "../../context/SocketContext"; // Import the SocketContext

export default function Login() {
  const { setUserLogin  , setForgotPassword} = useUserLogin();
  const { setTimedMessage } = useMessage();
  const { setToken } = useAuth();
  const { setId } = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate fields
    if (!email) newErrors.email = "This field is required.";
    if (!password) newErrors.password = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post("/api/user/login", { email, password } , {
        withCredentials:true,
      });
      console.log("Login successful:", res.data);

      // Store user ID from response in SocketContext
      localStorage.setItem("userId", res.data.id);
      setId(res.data.id); // Assuming `userId` is part of the response data

      // Display success message
      setTimedMessage(res.data.message, "success");

      // Clear input fields
      setEmail("");
      setPassword("");

      // Set the token in context
      setToken(res.data.token);

      // Navigate to home page
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response?.data.message || "Login failed";
      setErrors({ general: errorMsg });

      // Display error message
      setTimedMessage(errorMsg, "error");
      console.error("Login failed:", error);
    }
  };

  const googleLogin = () => {
    window.location.href = "/api/oAuth/auth/google"; 
    console.log("next executed");
  };

  // oAuth/auth/google
  const handleSignUpClick = () => {
    setUserLogin(false);
    console.log("Navigating to Sign Up");
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
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
          Login to your Account
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
            placeholder="Password"
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
            <span className="absolute left-0 top-full text-[#ff1111] text-sm mb-1">
              {errors.general}
            </span>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="text-white bg-[#2c70a0] p-3 rounded-lg w-full 
            hover:bg-[#1d4366] transition duration-300 hover:scale-105 font-semibold"
        >
          Login
        </button>

        <div className="flex justify-evenly mt-4">
          {/* Signup link */}
          <span className="text-[#FFF9F9] block text-center mb-2">
            New user?
            <a
              href="#"
              onClick={handleSignUpClick}
              className="text-[#2d9be9] ml-2 text-lg"
            >
              Signup
            </a>
            
          </span>

            {<span className="text-[#FFF9F9]">|</span>}
          {/* Forgot password link */}
          <span className="text-[#FFF9F9] block text-center mb-2">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="text-[#2d9be9] text-lg"
            >
              Forgot Password
            </a>
          </span>
        </div>

        {/* SSO Section */}
        <div className="mt-0">
          <h2 className="text-white text-lg text-center mb-2 font-semibold">
            Or
          </h2>
          <div className="flex justify-center">
            <button
              type="button" // Prevents form submission
              className="flex items-center justify-center text-gray-900 bg-white rounded-lg px-6 py-2 transition duration-300 hover:scale-105"
              onClick={googleLogin}
            >
              <span className="mr-2 font-semibold">Continue with</span>
              <GoogleIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const GoogleIcon = () => (
  <>
    <span className="font-bold" style={{ color: "#DB4437" }}>
      G
    </span>
    <span className="font-bold" style={{ color: "#4285F4" }}>
      o
    </span>
    <span className="font-bold" style={{ color: "#FBBC05" }}>
      o
    </span>
    <span className="font-bold" style={{ color: "#DB4437" }}>
      g
    </span>
    <span className="font-bold" style={{ color: "#4285F4" }}>
      l
    </span>
    <span className="font-bold" style={{ color: "#FBBC05" }}>
      e
    </span>
  </>
);
