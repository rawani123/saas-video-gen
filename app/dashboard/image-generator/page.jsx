"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomLoading from "../create-new/_components/CustomLoading";

const Page = () => {
  const [script, setScript] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setScript(e.target.value);
  };

  const handleGenerateImage = async () => {
    if (!script) return;

    setLoading(true); // Set loading to true before starting the request

    try {
      const response = await axios.post("/api/generate-image", {
        imagePrompt: script,
      });

      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
        console.log("Image generated successfully");
      } else {
        console.error("No image URL returned from the API");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="bg-[#8338ec] p-6 rounded-lg shadow-lg w-full sm:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Generate Image from Script
        </h1>

        <textarea
          value={script}
          onChange={handleInputChange}
          placeholder="Enter a script to generate an image"
          rows="5"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8338ec] mb-4"
        />

        <button
          onClick={handleGenerateImage}
          className="w-full bg-white text-[#8338ec] py-2 rounded-lg"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <span>Generating...</span> // Show "Generating..." text while loading
          ) : (
            <span>Generate Image</span>
          )}
        </button>

        {imageUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Generated Image:
            </h2>
            <img
              src={imageUrl}
              alt="Generated"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* Show CustomLoading modal while loading */}
      <CustomLoading loading={loading} />
    </div>
  );
};

export default Page;
