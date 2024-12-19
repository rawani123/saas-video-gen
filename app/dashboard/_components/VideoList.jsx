import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDailog";

const VideoList = ({ videoList }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const handleThumbnailClick = (id) => {
    setOpenDialog(Date.now());
    setVideoId(id);
  };

  return (
    <div className="mt-10 grid sm:grid-cols-2  lg:grid-cols-3 gap-7">
      {videoList.map((item) => (
        <div
          key={item.id}
          className="hover:scale-105 transition-all cursor-pointer"
          onClick={() => handleThumbnailClick(item.id)}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{ borderRadius: 25 }}
            inputProps={{
              ...item,
              setDurationInFrame: (v) => {},
            }}
          />
        </div>
      ))}
      {openDialog && <PlayerDialog playVideo={openDialog} videoId={videoId} />}
    </div>
  );
};

export default VideoList;
