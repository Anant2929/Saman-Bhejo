import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ParcelForm from './ParcelDetails';
import ReceiverAddress from './ReceiverDetails';
import SenderForm from './SenderDetails';
import DeliveryDetailsForm from './DelieveryDetails';
import Confirmation from './Confirmation';

import { useParcelRegistration } from '../../context/ParcelContext';

function ParcelRegistration() {
  const { currentState } = useParcelRegistration();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleHomeClick = () => {
    navigate("/home"); // Navigate to home when clicked
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#000000] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <header className="fixed top-0 w-full h-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#000000] z-50">
          <div className="flex items-center gap-4 text-white animate-blink">
            <div className="w-6 h-6">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Saman Bhejo</h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9">
              {['Home', 'About', 'Notifications', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  className="text-white text-sm font-medium transition duration-300 hover:text-[#607AFB]"
                  href="/home"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>

      <div className="mt-[50px]">
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
