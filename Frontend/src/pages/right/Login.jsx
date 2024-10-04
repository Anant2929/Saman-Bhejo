import React, { useState } from "react";
import "../../App.css";
import lockIcon from "../../assets/lock_icon.svg";
import emailIcon from "../../assets/email_icon.svg";
import axios from "axios";
import { useUserLogin } from '../../context/userLoginContext';

export default function Login() {
  const { setUserLogin } = useUserLogin();
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
      const res = await axios.post('http://localhost:5000/user/login', { email, password });
      console.log("Login successful:", res.data);

      // Clear input fields and set login state
      setEmail("");
      setPassword("");
      setUserLogin(true);
    } catch (error) {
      const errorMsg = error.response?.data.message || "Login failed";
      setErrors({ general: errorMsg });
      console.error("Login failed:", error);
    }
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href = "/api/user/login/google";
  };

  const handleSignUpClick = () => {
    setUserLogin(false);
    console.log("Navigating to Sign Up");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-lg min-w-[400px]">
        <form onSubmit={handleSubmit}>
          <h1 className="sansita-regular text-2xl font-bold text-[#FFF9F9] mb-8 text-center">
            Login to your Account
          </h1>

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            icon={emailIcon}
            errorMessage={errors.email}
          />

          {/* Password Input */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            icon={lockIcon}
            errorMessage={errors.password}
          />

          {/* General Error Message */}
          {errors.general && <span className="text-red-500 text-sm">{errors.general}</span>}

          {/* Signup link */}
          <span className="sansita-regular text-[#FFF9F9] font-normal mb-6 block">
            New user?
            <a href="#" onClick={handleSignUpClick} className="text-[#2d9be9] ml-2 font-normal text-lg">
              Signup
            </a>
          </span>

          {/* Login Button */}
          <button
            type="submit"
            className="sansita-regular text-white bg-[#398bc5] border-none p-3 rounded-lg w-full 
              hover:bg-[#30699f] transition duration-300 hover:scale-105"
          >
            Login
          </button>

          {/* SSO Section */}
          <div className="mt-4">
            <h2 className="text-[#FFF9F9] text-lg text-center mb-4">Or</h2>
            <div className="flex justify-around items-center">
              <button className="flex items-center justify-center text-[#DB4437] bg-slate-100 rounded-lg px-4 py-2 transition duration-300 hover:scale-105" onClick={googleLogin}>
                <span className="mr-2 sansita-regular text-[#070707]">Continue with </span>
                <GoogleIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// InputField component for reusability
const InputField = ({ type, placeholder, value, onChange, icon, errorMessage }) => (
  <div className="relative mb-6 w-full">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
        border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
    />
    <img src={icon} alt={`${placeholder} Icon`} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
    {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </div>
);

// GoogleIcon component
const GoogleIcon = () => (
  <>
    <span className="font-bold" style={{ color: '#DB4437' }}>G</span>
    <span className="font-bold" style={{ color: '#4285F4' }}>o</span>
    <span className="font-bold" style={{ color: '#FBBC05' }}>o</span>
    <span className="font-bold" style={{ color: '#DB4437' }}>g</span>
    <span className="font-bold" style={{ color: '#4285F4' }}>l</span>
    <span className="font-bold" style={{ color: '#FBBC05' }}>e</span>
  </>
);
