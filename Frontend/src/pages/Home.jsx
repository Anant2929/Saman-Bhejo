
import React from 'react';
import bgImage from '../assets/Saman bhejo.jpg'; // Adjust the path based on your folder structure
import Left from './Left';
import Right from './right/Right'
export default function Home() {
  return (
    <div
    className="h-screen w-screen p-0 border-black flex"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover', // Ensures the image covers the entire div
      backgroundPosition: 'center', // Centers the image
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


  
