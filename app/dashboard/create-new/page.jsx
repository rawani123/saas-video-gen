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
  const [imageList, setImageList] = useState([]); // New state for images
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [caption, setCaption] = useState("");

  // Update form data
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  // Validate form data
  const isFormComplete = () => {
    return formData.topic && formData.duration && formData.imageStyle;
  };

  // Generate video script
  const generateVideoScript = async () => {
    if (!isFormComplete()) {
      alert("Please complete all selections before proceeding.");
      return;
    }

    setLoading(true);
    const prompt = `Write a script to generate a ${formData.duration} video on topic: ${formData.topic} along with AI prompt in ${formData.imageStyle} format for each scene. Return the result in JSON format with fields 'imagePrompt' and 'contentText'. No plain text.`;

    try {
      const { data } = await axios.post(`/api/get-video-script`, { prompt });
      setVideoScript(data.result);
      console.log("Video Script:", data.result);

      // Generate images based on the video script
      const images = await generateImages(data.result);
      setImageList(images);
      console.log("Generated Images:", images);

      // Generate audio
      await generateAudio(data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate images
  const generateImages = async (videoScript) => {
    const imageArray = [];

    const query = async (data) => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    };

    for (const scene of videoScript) {
      try {
        const imageBlob = await query({ inputs: scene.imagePrompt });
        const imageUrl = URL.createObjectURL(imageBlob);
        imageArray.push({ prompt: scene.imagePrompt, url: imageUrl });
      } catch (error) {
        console.error(`Error generating image for prompt: ${scene.imagePrompt}`, error);
      }
    }
    return imageArray;
  };

  // Generate audio
  const generateAudio = async (videoScript) => {
    const script = videoScript.map((item) => item.contentText).join(" ");

    try {
      setLoading(true);
      const { data } = await axios.post("http://127.0.0.1:5000/generate-mp3", { text: script });

      if (data.url) {
        setAudioFileUrl(data.url);
        console.log("MP3 file generated! Access it here:", data.url);
        await generateCaption(data.url);
      }
    } catch (error) {
      console.error("Error generating MP3:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate captions
  const generateCaption = async (audioUrl) => {
    try {
      const { data } = await axios.post("/api/generate-caption", { audioFileUrl: audioUrl });
      if (data.transcript) {
        console.log("Transcript:", data.transcript);
        setCaption(data.transcript);
      }
    } catch (error) {
      console.error("Error generating captions:", error);
    }
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">Create New</h2>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic onUserSelect={handleInputChange} />
        <SelectStyle onUserSelect={handleInputChange} />
        <SelectDuration onUserSelect={handleInputChange} />
        <Button className="mt-10 w-full" onClick={generateVideoScript} disabled={loading}>
          {loading ? "Processing..." : "Create Short Video"}
        </Button>
      </div>
      {loading && <CustomLoading loading={loading} />}
      <div className="mt-10">
        <h3 className="text-2xl font-bold">Generated Images:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageList.map((image, index) => (
            <div key={index} className="p-4 shadow rounded">
              <img src={image.url} alt={`Scene ${index + 1}`} className="w-full h-auto" />
              <p className="mt-2 text-sm text-gray-600">{image.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
