"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDailog from "../_components/PlayerDailog";

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(1);

  const { user } = useUser();

  const { videoData, setVideoData } = useContext(VideoDataContext);

  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      saveVideoData(videoData);
    }
  }, [videoData]);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  const isFormComplete = () =>
    ["topic", "duration", "imageStyle"].every((key) => formData[key]);

  const generateVideoScript = async () => {
    if (!isFormComplete()) {
      alert("Please complete all selections before proceeding.");
      return;
    }

    setLoading(true);

    const prompt = `Write a script to generate a ${formData.duration} video on topic: ${formData.topic} along with AI prompt in ${formData.imageStyle} format for each scene. Return the result in JSON format with fields 'imagePrompt' and 'contentText'. No plain text.`;

    try {
      const { data } = await axios.post(`/api/get-video-script`, { prompt });

      const imagePrompts = data.result.map((scene) => ({
        imagePrompt: scene.imagePrompt,
      }));

      // Batch state update
      const images = await fetchGeneratedImages(imagePrompts);
      const audioUrl = await generateAudio(data.result);
      const captions = await generateCaption(audioUrl);

      setVideoData((prev) => ({
        ...prev,
        videoScript: data.result,
        imageList: images,
        audioFileUrl: audioUrl,
        captions: captions,
      }));

      setImageList(images);
      setAudioFileUrl(audioUrl);
      setCaption(captions);
    } catch (error) {
      console.error("Error generating video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeneratedImages = async (videoScript) => {
    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoScript }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate images");
      }

      const imageUrls = await response.json();

      return imageUrls;
    } catch (error) {
      console.error("Error fetching generated images:", error);
      return [];
    }
  };

  const generateAudio = async (videoScript) => {
    const script = videoScript.map((item) => item.contentText).join(" ");

    try {
      const { data } = await axios.post("http://127.0.0.1:5000/generate-mp3", {
        text: script,
      });

      if (data.url) {
        return data.url;
      }
    } catch (error) {
      console.error("Error generating MP3:", error);
      return "";
    }
  };

  const generateCaption = async (audioUrl) => {
    try {
      const { data } = await axios.post("/api/generate-caption", {
        audioFileUrl: audioUrl,
      });

      if (data.transcript) {
        return data.transcript;
      }
    } catch (error) {
      console.error("Error generating captions:", error);
      return "";
    }
  };

  const saveVideoData = async (videoData) => {
    setLoading(true);
    console.log("Saving video data", videoData);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    setVideoId(result[0].id);
    setPlayVideo(true);

    console.log(result);
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">
        Create New
      </h2>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic onUserSelect={handleInputChange} />
        <SelectStyle onUserSelect={handleInputChange} />
        <SelectDuration onUserSelect={handleInputChange} />
        <Button
          className="mt-10 w-full"
          onClick={generateVideoScript}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Short Video"}
        </Button>
      </div>
      <CustomLoading loading={loading} />

      {playVideo && <PlayerDailog playVideo={playVideo} videoId={videoId} />}
    </div>
  );
};

export default CreateNew;
