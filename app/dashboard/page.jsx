"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";
import VideoList from "./_components/VideoList";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser(); // Use signOut from useUser hook


  useEffect(() => {
    if (user) {
      fetchVideoList();
    }
  }, [user]);

  const fetchVideoList = async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(
          eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress)
        );
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {/* Create New Button */}
        <Link href="/dashboard/create-new">
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Display video list or empty state */}
      {videoList.length === 0 ? (
        <EmptyState />
      ) : (
        <VideoList videoList={videoList} />
      )}
    </div>
  );
};

export default Dashboard;
