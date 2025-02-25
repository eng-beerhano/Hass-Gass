import React from "react";
import xayasiin from "../assets/Hass-2.png";
import xayasiin2 from "../assets/Hass-3.png";

const Xayaysiin = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white py-10 px-5">
      <div className="lg:w-1/2 text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Affordable Gas <span className="block">Level</span>
        </h1>
        <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg">
          Essential for both households and businesses, ensuring <br /> cost-effective energy solutions <br /> for cooking, heating, and transportation. With stable gas <br /> prices, consumers can manage expenses efficiently while <br />
           industries benefit from reduced operational costs.
        </p>
      </div>
      <div className="lg:w-1/2 flex justify-center mt-5 lg:mt-0 space-x-4">
        <img 
          src={xayasiin} 
          alt="Affordable Gas Level" 
          className="w-40 md:w-60 lg:w-80" 
        />
        <img 
          src={xayasiin2}
          alt="Affordable Gas Level" 
          className="w-40 md:w-60 lg:w-80" 
        />
      </div>
    </div>
  );
};

export default Xayaysiin;