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

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);

  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId) {
      GetVideoData();
    }
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
    setVideoData(result[0]);
  };

 



  if (!videoData) {
    return <div>Loading...</div>; // Display loading until video data is fetched
  }

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrame.toFixed(0))}
            compositionWidth={300}
            compositionHeight={450}
            inputProps={{
              script: videoData.script,
              imageList: videoData.imageList,
              captions: videoData.captions,
              audioFileUrl: videoData.audioFileUrl,
              setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
            }}
            fps={30}
            controls={true}
          />
          <div className="flex gap-10 mt-10">
            <Button variant="ghost">Cancel</Button>
            <Button>Export</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
