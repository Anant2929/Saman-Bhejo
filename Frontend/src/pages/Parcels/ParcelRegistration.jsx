import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";// Import useNavigate
import ParcelForm from './ParcelDetails';
import ReceiverAddress from './ReceiverDetails';
import SenderForm from './SenderDetails';
import DeliveryDetailsForm from './DelieveryDetails';
import Confirmation from './Confirmation';
import Logout from "../Auth/Logout";

import { useParcelRegistration } from '../../context/ParcelContext';

function ParcelRegistration() {
  const { currentState } = useParcelRegistration();
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleHomeClick = () => {
    navigate("/home"); // Navigate to home when clicked
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#000000] dark group/design-root overflow-x-hidden " style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
         {/* <header className=" flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3 overflow-y-hidden"> */}

       <header  className = "fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50 ">

        {/* <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#392f28] px-10 py-3 overflow-y-hidden"> */} 
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
                        {/* Use the Logout component here */}
                        <Logout />
                      </div>
                    )}
                  </div>
                </div>
              </header>

      <div className="pt-10">
        {/* Conditionally render forms based on currentState */}
        {currentState === 1 && <ParcelForm />}
        {currentState === 2 && <SenderForm />}
        {currentState === 3 && <ReceiverAddress />}
        {currentState === 4 && <DeliveryDetailsForm />}
        {currentState === 5 && <Confirmation />}
   
      </div>

    </div>
  );
}

export default ParcelRegistration;
