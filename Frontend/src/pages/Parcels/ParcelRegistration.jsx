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
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <header className="fixed top-0 w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3C3F4A] px-10 py-3 bg-[#1C1D22] z-50">
        <div className="flex items-center gap-4 text-[#F9FAFA]">
          <div className="size-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-[#F9FAFA] text-lg font-bold leading-tight tracking-[-0.015em]"> Saman Bhejo</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <button onClick={handleHomeClick} className="text-[#F9FAFA] text-sm font-medium">
            Home
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#3C3F4A] text-[#F9FAFA] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-[#F9FAFA]" data-icon="Question" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                />
              </svg>
            </div>
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/559d5a52-d216-481a-bf44-a4a16128965d.png")' }}></div>
        </div>
      </header>

      <div className="mt-[72px]">
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
