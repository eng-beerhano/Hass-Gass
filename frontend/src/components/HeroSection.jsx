import React from "react";
import Hero from "../assets/Hass-1.jpeg";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center bg-white py-10">
      <div className="text-center px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-950">
          Quality <span className="text-yellow-500">& Reliable</span>
        </h1>
        <div className="mt-5 flex justify-center">
          <img 
            src={Hero} 
            alt="Gas Cylinders and Stoves" 
            className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;