"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";

export const metadata = {
  title: "MediaForge Dashboard",
  description:
    "Access and manage your projects, media, and tools effortlessly in the MediaForge Dashboard. Streamline your workflow with an intuitive interface and advanced features.",
  keywords: [
    "MediaForge Dashboard",
    "media management",
    "video projects",
    "photo editing",
    "dashboard interface",
    "media production tools",
  ],
  author: "MediaForge Team",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
};

const dashboardLayout = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      <div>
        <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
          <SideNav />
        </div>
        <div>
          <Header />
          <div className="md:ml-64 p-10">{children}</div>
        </div>
      </div>
    </VideoDataContext.Provider>
  );
};

export default dashboardLayout;
