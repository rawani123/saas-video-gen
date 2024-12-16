"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = ({ onUserSelect }) => {
  const options = [
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "Bedtime Story",
    "Motivational Story",
    "Fun Facts",
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    if (value !== "Custom Prompt") {
      onUserSelect("topic", value);
    }
  };

  const handleTextareaChange = (event) => {
    onUserSelect("topic", event.target.value);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video?</p>
      <Select onValueChange={handleSelectChange}>
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
    </div>
  );
};

export default SelectTopic;
