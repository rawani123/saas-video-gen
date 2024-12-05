"use Client"
import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = () => {
  const styleOptions = [
    { name: "Realistic", image: "/real.jpg" },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "WaterColor",
      image: "/water.jpg",
    },
    {
      name: "GTA",
      image: "/gta.jpg",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select Your Video Style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((option) => (
            <div className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOption==option.name && "border-4 border-primary"}`} key={option.name}>
                <Image src={option.image} alt={option.name} width={100} height={100} className="h-48 object-cover rounded-lg w-full"
                onClick={()=> setSelectedOption(option.name)} />
                <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">{option.name}</h2>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
