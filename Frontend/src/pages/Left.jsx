import React from "react";
import Logo from "../assets/SamanBhejo_Logo.svg";
import "../App.css";

export default function Left() {
  return (
    <div className="flex flex-col h-screen p-4">
      {/* Logo at the top left */}
      <div className="flex items-start mb-6">
        <img
          src={Logo}
          alt="Saman Bhejo Logo"
          className="h-14 w-14 sm:h-24 sm:w-24 md:h-30 md:w-30 lg:h-38 lg:w-38 rounded-full object-cover"
        />
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


