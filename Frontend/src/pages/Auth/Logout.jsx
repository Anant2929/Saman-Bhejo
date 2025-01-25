import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAuth } from '../../context/AuthContext'; // Import Auth context
import Cookies from 'js-cookie';
import { useParcelRegistration } from "../../context/ParcelContext";

export default function Logout() {
  const navigate = useNavigate(); // Use navigate to redirect
  const { setToken } = useAuth(); // Get the setToken function from AuthContext
const {setFormData} = useParcelRegistration
  const handleClick = async () => {
    try {
      // Send the logout request to the server
      const response = await axios.post('/api/user/logout', {}, { withCredentials: true });
      console.log(response.data.message); // Log success message

      // Clear the token from local storage and Auth context
      
      Cookies.remove('token');
      Cookies.remove('id')
      console.log("gettoken is",Cookies.get('token'))
      setToken(null); // Clear the token in Auth context
      // Redirect to login page
      localStorage.clear();
      setFormData({})
      navigate("/user/login"); // Adjust the path if needed
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || "An error occurred");
    }
  };

  return (
      <button
        className="block w-full text-red-500 text-left px-4 py-2 hover:bg-[#3C3F4A] transition duration-300 relative"
        onClick={handleClick} // Call the handleClick function on click
      >Logout
       
      </button>
  );
}