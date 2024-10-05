// import React, { useState } from "react"; 
// import "../../App.css";
// import emailIcon from "../../assets/email_icon.svg";
// import lockIcon from "../../assets/lock_icon.svg";
// import callIcon from "../../assets/call_icon.svg";
// import personIcon from "../../assets/person_icon.svg";
// import axios from "axios";
// import { useUserLogin } from '../../context/userLoginContext';

// export default function SignUp() {
//   const { setUserLogin } = useUserLogin();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     contactNumber: "",
//   });

//   const [errors, setErrors] = useState({});
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "This field is required.";
//     if (!formData.email) newErrors.email = "This field is required.";
//     if (!formData.password) newErrors.password = "This field is required.";
//     if (!formData.contactNumber) newErrors.contactNumber = "This field is required.";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Reset errors if validation passes
//     setErrors({});
//      // Reset alert message

//     // Proceed with form submission logic here
//     try {
//       const res = await axios.post("/api/user/signup", formData);
//       console.log(res.data.message);
//       alert(res.data.message); // Set alert message

//       if (res.status === 201) { 
//         setUserLogin(true);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       if (error.response && error.response.data.message) {
//         setErrors({ ...errors, form: error.response.data.message });
//       }
//     }
//   };

//   const handleLoginClick = () => {
//     setUserLogin(true);
//   };

//   return (
//     <div className="flex items-center justify-center h-full w-full p-3 sm:p-8 lg:p-12">
//       <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-4 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="montserrat-regular text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F9] mb-8 text-center">
//           Create New Account
//         </h1>

//         {/* Name Input */}
//         <div className="relative mb-7 w-full">
//           <input
//             type="text"
//             placeholder="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
//               border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
//           />
//           <img
//             src={personIcon}
//             alt="Person Icon"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
//           />
//           {errors.name && <span className="absolute left-0 top-full text-red-500 text-sm mb-1">{errors.name}</span>}
//         </div>

//         {/* Email Input */}
//         <div className="relative mb-7 w-full">
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
//               border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
//           />
//           <img
//             src={emailIcon}
//             alt="Email Icon"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
//           />
//           {errors.email && <span className="absolute left-0 top-full text-red-500 text-sm mb-1">{errors.email}</span>}
//         </div>

//         {/* Password Input */}
//         <div className="relative mb-7 w-full">
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
//               border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
//           />
//           <img
//             src={lockIcon}
//             alt="Lock Icon"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
//           />
//           {errors.password && <span className="absolute left-0 top-full text-red-500 text-sm  mb-1">{errors.password}</span>}
//         </div>

//         {/* Contact No Input */}
//         <div className="relative mb-7 w-full">
//           <input
//             type="text"
//             placeholder="Contact No."
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
//               border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
//           />
//           <img
//             src={callIcon}
//             alt="Call Icon"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
//           />
//           {errors.contactNumber && (
//             <span className="absolute left-0 top-full text-red-500 text-sm mb-1">
//               {errors.contactNumber}
//             </span>
//           )}
//         </div>

//         {/* Login Link */}
//         <span className="montserrat-regular text-[#FFF9F9] block text-center mb-6  mt-1">
//           Already a user?
//           <a href="#" onClick={handleLoginClick} className="text-[#2d9be9] ml-2 text-lg ">
//             Login
//           </a>
//         </span>

//         {/* Signup Button */}
//         <button
//           type="submit"
//           className="montserrat-regular text-white bg-[#398bc5] p-3 rounded-lg w-full 
//             hover:bg-[#30699f] transition duration-300 hover:scale-105 font-semibold "
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react"; 
import "../../App.css";
import emailIcon from "../../assets/email_icon.svg";
import lockIcon from "../../assets/lock_icon.svg";
import callIcon from "../../assets/call_icon.svg";
import personIcon from "../../assets/person_icon.svg";
import axios from "axios";
import { useUserLogin } from '../../context/userLoginContext';
import { useMessage } from '../../context/MessageContext';  // Import the message context

export default function SignUp() {
  const { setUserLogin } = useUserLogin();
  const { setTimedMessage } = useMessage();  // Use setTimedMessage from context

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

    // Reset errors
    setErrors({});

    // Submit form
    try {
      const res = await axios.post("/api/user/signup", formData);
      setTimedMessage(res.data.message, "success");  // Set the success message with timeout
      setUserLogin(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setTimedMessage(error.response.data.message, "error");  // Set the error message with timeout
      } else {
        setTimedMessage("An unexpected error occurred during signup.", "error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-3 sm:p-8 lg:p-12">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-4 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="montserrat-regular text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F9] mb-8 text-center">
          Create New Account
        </h1>

        {/* Name Input */}
        <div className="relative mb-7 w-full">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={personIcon}
            alt="Person Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.name && <span className="absolute left-0 top-full text-red-500 text-sm mb-1">{errors.name}</span>}
        </div>

        {/* Email Input */}
        <div className="relative mb-7 w-full">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.email && <span className="absolute left-0 top-full text-red-500 text-sm mb-1">{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div className="relative mb-7 w-full">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={lockIcon}
            alt="Lock Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.password && <span className="absolute left-0 top-full text-red-500 text-sm  mb-1">{errors.password}</span>}
        </div>

        {/* Contact No Input */}
        <div className="relative mb-7 w-full">
          <input
            type="text"
            placeholder="Contact No."
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="montserrat-regular appearance-none rounded-lg bg-[rgba(62,60,60,0.5)] text-[#E0E0E0] p-3 pl-10 pr-10 w-full
              border-2 border-transparent transition duration-300 hover:border-[#5E3CF6] focus:border-[#5E3CF6] focus:outline-none"
          />
          <img
            src={callIcon}
            alt="Call Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {errors.contactNumber && (
            <span className="absolute left-0 top-full text-red-500 text-sm mb-1">
              {errors.contactNumber}
            </span>
          )}
        </div>

        {/* Login Link */}
        <span className="montserrat-regular text-[#FFF9F9] block text-center mb-6  mt-1">
          Already a user?
          <a href="#" onClick={() => setUserLogin(true)} className="text-[#2d9be9] ml-2 text-lg ">
            Login
          </a>
        </span>

        {/* Signup Button */}
        <button
          type="submit"
          className="montserrat-regular text-white bg-[#398bc5] p-3 rounded-lg w-full 
            hover:bg-[#30699f] transition duration-300 hover:scale-105 font-semibold "
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
