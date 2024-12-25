import React from 'react';
import Left from './Left'; // Adjust path if needed
import Right from './Right'; // Adjust path if needed
import bgImage from '../../assets/images/IMG MOUNT.png'; 

export default function App() {
  return (
    <div
      className="h-screen w-screen p-0 border-black flex"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-[50%] h-full">
        <Left />
      </div>
      <div className="w-[50%] h-full">
        <Right />
      </div>
    </div>
  );
}