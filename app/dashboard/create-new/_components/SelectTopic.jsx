"use client"
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = () => {
  const options = [
    "Custom Prompt",
    "Random Ai Story",
    "Scary Story",
    "Historical facts",
    "Bedtime Story",
    "Motivational Story",
    "Fun Facts",
  ];

  const [selectedoption, setSelectedOption] = useState("");
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video?</p>
      <Select onValueChange={(value)=> setSelectedOption(value)}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedoption=='Custom Prompt' && (
            <Textarea className='mt-3' placeholder='Write prompt on which you want to generate video'/>
      )}
    </div>
  );
};

export default SelectTopic;
