import React, { useState } from "react"; 
import "../../App.css";
import emailIcon from "../../assets/email_icon.svg"; 
import lockIcon from "../../assets/lock_icon.svg";
import callIcon from "../../assets/call_icon.svg";
import personIcon from "../../assets/person_icon.svg";
import axios from "axios";
import { useUserLogin } from '../../context/userLoginContext';

export default function SignUp() {
  const { setUserLogin } = useUserLogin();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.name) newErrors.name = "This field is required.";
    if (!formData.email) newErrors.email = "This field is required.";
    if (!formData.password) newErrors.password = "This field is required.";
    if (!formData.contactNumber) newErrors.contactNumber = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Reset errors if validation passes
    setErrors({});

    // Proceed with form submission logic here
    console.log("Form submitted:", formData);
    try {
      const res = await axios.post("/api/user/signup", formData);
      
      console.log(res.data);
      console.log(res.data.message);

      // Set user login to true after a successful signup (201 response)
      if (res.status === 201) { // Check for 201 status code
        setUserLogin(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = () => {
    setUserLogin(true); // Set user login to true when clicking the login link
  };

  return (
    <div className="flex fixed items-center justify-center h-full w-full">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg w-full max-w-md min-w-[300px]">
        <h1 className="sansita-regular text-2xl font-bold text-[#FFF9F9] mb-8 text-center">
          Create New Account
        </h1>

        {/* Name Input */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={personIcon}
            alt="Person Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        {/* Email Input */}
        <div className="relative mb-6 w-full">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div className="relative mb-6 w-full">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={lockIcon}
            alt="Lock Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Contact No Input */}
        <div className="relative mb-6 w-full">
          <input
            type="text"
            placeholder="Contact No."
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] sansita-regular text-[#E0E0E0] p-3 pl-10 pr-10 w-full 
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={callIcon}
            alt="Call Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
        </div>

        {/* Login Link */}
        <span className="sansita-regular text-[#FFF9F9] font-normal mb-6 block">
          Already a user? 
          <a href="#" onClick={handleLoginClick} className="text-[#2d9be9] ml-2 text-lg font-normal">
            Login
          </a>
        </span>

        {/* Signup Button */}
        <button
          type="submit" // Ensure the button type is "submit"
          className="sansita-regular text-white bg-[#398bc5] p-3 rounded-lg w-full 
            hover:bg-[#30699f] transition duration-300 hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
