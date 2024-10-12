import React from 'react';
import axios from "axios";

export default function Logout() {
    
    const handleClick = async () => {
        try {
            // Send the logout request to the server
            const response = await axios.post('/api/user/logout' ,{}, { withCredentials: true });
            console.log(response.data.message); // Log success message or handle it as needed

            // Optionally, you can navigate to the login page or do something else after logout
            // e.g., navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || "An error occurred");
            // You can also display an error message to the user if needed
        }
    };

    return (
        <div className="flex gap-2">
            <button 
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-full px-4 bg-[#ec7113] text-white text-sm font-bold"
                onClick={handleClick} // Pass the function reference
            >
                Logout
            </button>  
        </div>
    );
}

