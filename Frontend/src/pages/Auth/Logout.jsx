import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAuth } from '../../context/AuthContext'; // Import Auth context

export default function Logout() {
  const navigate = useNavigate(); // Use navigate to redirect
  const { setToken } = useAuth(); // Get the setToken function from AuthContext

  const handleClick = async () => {
    try {
      // Send the logout request to the server
      const response = await axios.post('/api/user/logout', {}, { withCredentials: true });
      console.log(response.data.message); // Log success message

      // Clear the token from local storage and Auth context
      localStorage.removeItem('token'); // Remove the token from local storage
      setToken(null); // Clear the token in Auth context

      // Redirect to login page
      navigate("/user/login"); // Adjust the path if needed
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-full px-4 bg-[#ec7113] text-white text-sm font-bold"
        onClick={handleClick} // Call the handleClick function on click
      >
        Logout
      </button>
    </div>
  );
}
