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
      const res = await axios.post('/api/user/login', { email, password });
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
    <div className="flex items-center justify-center h-full min-h-screen p-4">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <h1 className="sansita-regular text-2xl md:text-3xl font-bold text-white mb-8 text-center">
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
          {errors.general && <span className="text-red-500 text-sm block mb-4">{errors.general}</span>}

          {/* Signup link */}
          <span className="sansita-regular text-white font-semibold mb-6 block text-center">
            New user? 
            <a href="#" onClick={handleSignUpClick} className="text-blue-400 ml-2 font-semibold text-lg">
              Signup
            </a>
          </span>

          {/* Login Button */}
          <button
            type="submit"
            className="sansita-regular text-white bg-blue-500 border-none p-3 rounded-lg w-full 
              hover:bg-blue-600 transition duration-300 hover:scale-105 font-semibold"
          >
            Login
          </button>

          {/* SSO Section */}
          <div className="mt-6">
            <h2 className="text-white text-lg text-center mb-4 font-semibold">Or</h2>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center text-gray-900 bg-white rounded-lg px-6 py-2 transition duration-300 hover:scale-105"
                onClick={googleLogin}
              >
                <span className="mr-2 sansita-regular font-semibold">Continue with</span>
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
      className="appearance-none rounded-lg bg-gray-700 text-white p-3 pl-10 pr-10 w-full
        border-2 border-transparent transition duration-300 hover:border-purple-500 focus:border-purple-500 focus:outline-none"
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