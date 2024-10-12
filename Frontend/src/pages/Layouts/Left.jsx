import React from "react";

import "../../App.css";

export default function Left() {
  return (
    <div className="flex flex-col h-screen p-4">
      {/* Logo at the top left */}
  
      <div className="flex items-center gap-4 text-white">
  <div className="w-12 h-12"> {/* Updated width and height */}
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
    </svg>
  </div>
  <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]"> {/* Updated text size */}
    Saman Bhejo
  </h2>
</div>

    

      {/* Centered tagline and description */}
      <div className="flex flex-col items-center justify-center flex-grow text-center mb-24">
        <h1 className="montserrat-regular text-white text-4xl font-bold mb-4 whitespace-nowrap overflow-hidden border-r-4 border-white animate-typewriter">
          Making Journeys Meaningful.
        </h1>
        <p className="montserrat-regular text-gray-400 text-base md:text-lg text-justify mx-4">
          Every trip has the potential to create a ripple effect. By carrying
          goods for others, you not only lighten their load but also enrich your
          travel experience. Discover the joy of meaningful connections through
          our app.
        </p>
      </div>
    </div>
  );
}


