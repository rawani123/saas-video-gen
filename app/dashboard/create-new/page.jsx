"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";

const CreateNew = () => {
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
    console.log(formData);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">Create New</h2>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full">Create Short Video</Button>
      </div>
    </div>
  );
};

export default CreateNew;
