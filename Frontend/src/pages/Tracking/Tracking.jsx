import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import Logout from "../Auth/Logout";
import { useNavigate, Link } from "react-router-dom";
const trackingSteps = [
  { status: 'Sender Created', description: 'Parcel has been listed by the sender' },
  { status: 'Receiver Accepted', description: 'Receiver accepted the parcel' },
  { status: 'Carrier Accepted Parcel', description: 'Carrier accepted the parcel' },
  { status: 'Picked Up', description: 'Parcel has been picked up' },
  { status: 'In Transit', description: 'Parcel is in transit' },
  { status: 'Delivered', description: 'Parcel successfully delivered' },
];

const ParcelTracking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { parcelId, socket } = useSocket();
  const [trackingData, setTrackingData] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.emit("trackingStatus", { parcelId }, (response) => {
        if (response && response.trackingStatus) {
          const stepIndex = trackingSteps.findIndex(step => step.status === response.trackingStatus);
          if (stepIndex !== -1) setCurrentStep(stepIndex);
          setTrackingData(response);
        }
      });
    }
  }, [socket, parcelId]);

  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (path) => {
    navigate(path);
    setShowSidebar(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-inter">

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
      <div className="px-10 py-10 mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center animate-fadeIn">Tracking Number: {parcelId}</h2>

        <div className="flex justify-center items-center space-x-6 mb-10 relative">
          {trackingSteps.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div
                  className={`h-1 w-20 bg-teal-500 ${index <= currentStep ? 'opacity-100' : 'opacity-30'}`}
                  style={{
                    transition: 'all 0.5s ease-in-out',
                    transform: index <= currentStep ? 'scaleX(1.05)' : 'scaleX(0.9)',
                  }}
                ></div>
              )}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                  index <= currentStep ? 'bg-teal-500 shadow-teal-500/50 shadow-lg scale-110' : 'bg-gray-600 scale-100'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  boxShadow: index === currentStep ? '0 0 10px 4px rgba(56, 178, 172, 0.4)' : 'none',
                }}
              >
                <div className="text-lg font-bold text-gray-200">{index + 1}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-8">
          {trackingSteps.map((step, index) => (
            <div
              key={index}
              className={`transition-transform duration-700 ease-out transform ${
                index <= currentStep ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-5'
              }`}
            >
              <p className={`text-xl font-semibold ${index === currentStep ? 'text-teal-400' : 'text-gray-400'}`}>
                {step.status}
              </p>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {trackingData.otpRequired && currentStep === trackingSteps.findIndex(step => step.status === 'Picked Up') && (
          <div className="mt-8">
            <p className="text-lg font-semibold text-teal-400">OTP for Pickup: {trackingData.pickupOtp}</p>
          </div>
        )}

        {trackingData.otpRequired && currentStep === trackingSteps.findIndex(step => step.status === 'Delivered') && (
          <div className="mt-8">
            <p className="text-lg font-semibold text-teal-400">OTP for Delivery: {trackingData.deliveryOtp}</p>
          </div>
        )}

     
      </div>

      <style jsx>{`
        .animate-glow {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(56, 178, 172, 0.4), 0 0 20px rgba(56, 178, 172, 0.3);
          }
          to {
            box-shadow: 0 0 20px rgba(56, 178, 172, 0.6), 0 0 30px rgba(56, 178, 172, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default ParcelTracking;
