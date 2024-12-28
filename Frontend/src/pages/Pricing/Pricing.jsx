import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";

const Pricing = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
        {/* Header */}
        <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
          <div className="flex items-center gap-4 text-white animate-blink">
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Saman Bhejo
            </h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              {["Home", "About", "Notifications", "Pricing", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`} // Automatically generates the correct path
                    className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
            <div className="relative">
              <div
                className="w-10 h-10 bg-[#607AFB] rounded-full flex items-center justify-center cursor-pointer transition transform duration-300 hover:scale-110"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0,16c-28.72,0-84,14.44-84,43.2,0,12.85,10.26,23.2,23.08,23.2H188.92c12.82,0,23.08-10.35,23.08-23.2C212,150.44,156.72,136,128,136Z"></path>
                </svg>
              </div>

              {showSidebar && (
                <div className="absolute top-12 right-0 w-48 bg-[#111216] border rounded-xl shadow-lg py-4">
                  {[
                    "Edit Profile",
                    "Add Address",
                    "Parcels",
                    "Payment Methods",
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-[#3C3F4A] transition"
                      onClick={() =>
                        handleSidebarClick(
                          `/userProfile/${item.toLowerCase().replace(" ", "-")}`
                        )
                      }
                    >
                      {item}
                    </button>
                  ))}
                  <Logout />
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="container mx-auto py-12 px-6">
        {/* Main Content */}
        <h1 className="text-4xl font-bold text-center mt-28 mb-12">Pricing Plans</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Basic</h2>
            <p className="text-xl font-bold mb-4">Free</p>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>5 parcel notifications per month</li>
              <li>Email support</li>
              <li>Basic tracking features</li>
            </ul>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Get Started
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Standard</h2>
            <p className="text-xl font-bold mb-4">₹199/month</p>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>50 parcel notifications per month</li>
              <li>Priority email support</li>
              <li>Advanced tracking features</li>
              <li>SMS notifications</li>
            </ul>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Choose Standard
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Premium</h2>
            <p className="text-xl font-bold mb-4">₹499/month</p>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li>Unlimited parcel notifications</li>
              <li>24/7 priority support</li>
              <li>Real-time tracking</li>
              <li>Custom notification templates</li>
            </ul>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Choose Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
