"use client";
import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = ({ onUserSelect }) => {
  const styleOptions = [
    { name: "Realistic", image: "/real.jpg" },
    { name: "Cartoon", image: "/cartoon.jpg" },
    { name: "Comic", image: "/comic.jpg" },
    { name: "WaterColor", image: "/water.jpg" },
    { name: "GTA", image: "/gta.jpg" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (styleName) => {
    setSelectedOption(styleName);
    onUserSelect("imageStyle", styleName);
  };

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select Your Video Style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map(({ name, image }) => (
          <div
            key={name}
            className={`relative cursor-pointer rounded-xl transition-transform hover:scale-105 ${
              selectedOption === name ? "border-4 border-primary" : ""
            }`}
            onClick={() => handleSelect(name)}
          >
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="h-48 w-full object-cover rounded-lg"
            />
            <h2 className="absolute bottom-0 w-full p-1 text-center text-white bg-black rounded-b-lg">
              {name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
