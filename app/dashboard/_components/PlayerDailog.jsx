import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo) {
      setOpenDialog(true);
      if (videoId) {
        fetchVideoData();
      }
    }
  }, [playVideo]);

  const fetchVideoData = async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));
      setVideoData(result[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  if (!videoData) {
    return null; // Avoid rendering until video data is available
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Player
            component={RemotionVideo}
            durationInFrames={Math.round(durationInFrame)}
            compositionWidth={300}
            compositionHeight={450}
            inputProps={{
              script: videoData.script,
              imageList: videoData.imageList,
              captions: videoData.captions,
              audioFileUrl: videoData.audioFileUrl,
              setDurationInFrame: (frameValue) =>
                setDurationInFrame(frameValue),
            }}
            fps={30}
            controls
          />
          <div className="flex gap-10 mt-10">
            <Button
              variant="ghost"
              onClick={() => {
                router.replace("/dashboard");
                setOpenDialog(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
