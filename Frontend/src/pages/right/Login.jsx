import React from "react";
import "../../App.css";
import lockIcon from "../../assets/lock_icon.svg";
import emailIcon from "../../assets/email_icon.svg";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-full">
      <form className="p-8 rounded-lg shadow-lg w-full max-w-lg min-w-[350px]">
        <h1 className="sansita-regular text-2xl font-bold text-[#FFF9F9] mb-8 text-center">
          Login to your Account
        </h1>
        
        {/* Email Input */}
        <div className="relative mb-6 w-full">
          <input
            type="email"
            placeholder="Email"
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
      
        {/* Password Input */}
        <div className="relative mb-5 w-full">
          <input
            type="password"
            placeholder="Password"
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={lockIcon}
            alt="Lock Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>

        {/* Signup link */}
        <span className="sansita-regular text-[#FFF9F9] font-normal mb-6 block">
          New user?
          <a href="" className="text-[#2d9be9] ml-2 font-normal text-lg">
            Signup
          </a>
        </span>
        
        {/* Login Button */}
        <button
          className="sansita-regular text-white bg-[#398bc5] border-none p-3 rounded-lg w-full 
            hover:bg-[#30699f] transition duration-300 hover:scale-105"
        >
          Login
        </button>

        {/* SSO Section */}
        <div className="mt-4">
          <h2 className="text-[#FFF9F9] text-lg text-center mb-4">Or</h2>
          <div className="flex justify-around items-center">
            <button className="flex items-center justify-center text-[#DB4437] bg-slate-100 rounded-lg px-4 py-2 transition duration-300 hover:scale-105">
              <span className="mr-2 sansita-regular text-[#070707]">Continue with </span>
              <span className="font-bold" style={{ color: '#DB4437' }}>G</span>
              <span className="font-bold" style={{ color: '#4285F4' }}>o</span>
              <span className="font-bold" style={{ color: '#FBBC05' }}>o</span>
              <span className="font-bold" style={{ color: '#DB4437' }}>g</span>
              <span className="font-bold" style={{ color: '#4285F4' }}>l</span>
              <span className="font-bold" style={{ color: '#FBBC05' }}>e</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
