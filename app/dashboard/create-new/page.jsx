"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  // State declarations
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState("");

  // Update form data based on user input
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  // Generate video script using API
  const generateVideoScript = async () => {
    if (!formData.topic || !formData.duration || !formData.imageStyle) {
      alert("Please complete all selections before proceeding.");
      return;
    }

    setLoading(true);
    const prompt = `
      Write a script to generate ${formData.duration} video on topic: ${formData.topic} 
      along with AI prompt in ${formData.imageStyle} format for each scene.
      Return the result in JSON format with fields 'imagePrompt' and 'contentText'. No plain text.
    `;

    try {
      const { data } = await axios.post(`/api/get-video-script`, { prompt });
      setVideoScript(data.result);
      console.log("Video Script:", data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">Create New</h2>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic onUserSelect={handleInputChange} />
        <SelectStyle onUserSelect={handleInputChange} />
        <SelectDuration onUserSelect={handleInputChange} />
        <Button className="mt-10 w-full" onClick={generateVideoScript}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNew;
