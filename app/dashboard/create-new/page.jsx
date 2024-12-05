"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);

  const [videoScript, setVideoScript] = useState("");


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
    console.log(formData);
  };

  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with Ai prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and contentText as field, No Plain text`;
    // console.log(prompt)
    const result = await axios.post(`/api/get-video-script`, {
      prompt: prompt,
    });

    setVideoScript(result.data.result);
    setLoading(false);

    console.log(result.data);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">
        Create New
      </h2>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={getVideoScript}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNew;
