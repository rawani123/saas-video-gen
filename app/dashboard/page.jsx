"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";
import VideoList from "./_components/VideoList";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

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
        .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+ Create New</Button>
        </Link>
      </div>
      {videoList.length === 0 ? (
        <EmptyState />
      ) : (
        <VideoList videoList={videoList} />
      )}
    </div>
  );
};

export default Dashboard;
