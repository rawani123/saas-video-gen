"use client";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

const dashboard = () => {
  const [videoList, setVideoList] = useState([]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+ Create New</Button>
        </Link>
      </div>
      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
};

export default dashboard;
