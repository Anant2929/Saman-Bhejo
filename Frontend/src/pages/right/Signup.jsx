import React from "react";
import "../../App.css";
import emailIcon from "../../assets/email_icon.svg"; // Ensure path is correct
import lockIcon from "../../assets/lock_icon.svg";
import callIcon from "../../assets/call_icon.svg";
import personIcon from "../../assets/person_icon.svg";

export default function SignUp() {
  return (
    <div className="flex fixed items-center justify-center h-full w-full">
      <form className="p-8 rounded-lg shadow-lg w-full max-w-md min-w-[300px]">
        <h1 className="sansita-regular text-2xl font-bold text-[#FFF9F9] mb-8 text-center">
          Create New Account
        </h1>

        {/* Name Input */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Name"
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={personIcon}
            alt="Person Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>

        {/* Email Input */}
        <div className="relative mb-6 w-full">
          <input
            type="email"
            placeholder="Email"
            className="appearance-none rounded-lg  bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6 w-full">
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

        {/* Contact No Input */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Contact No."
            className="appearance-none rounded-lg  bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={callIcon}
            alt="Call Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>

        {/* Login Link */}
        <span className="sansita-regular text-[#FFF9F9] font-normal mb-6 block">
          Already a user? 
          <a href="" className="text-[#2d9be9] ml-2 text-lg font-normal">
            Login
          </a>
        </span>

        {/* Signup Button */}
        <button
          className="sansita-regular text-white bg-[#398bc5] p-3 rounded-lg w-full 
            hover:bg-[#30699f] transition duration-300 hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
