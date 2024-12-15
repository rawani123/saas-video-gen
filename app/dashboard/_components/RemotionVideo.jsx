"use client";
import React, { useEffect } from "react";
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

const RemotionVideo = ({
  script,
  imageList,
  captions,
  audioFileUrl,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();

  const frame = useCurrentFrame();

  useEffect(() => {
    // Set the duration in frames when captions change or on mount
    if (captions.length > 0) {
      const duration = (captions[captions.length - 1]?.end / 1000) * fps;
      setDurationInFrame(duration);
    }
  }, [captions, fps, setDurationInFrame]);

  // Calculate the duration for each image sequence
  const calculateSequenceDuration = () => {
    if (captions.length > 0) {
      return (captions[captions.length - 1]?.end / 1000) * fps;
    }
    return 0;
  };

  const totalDuration = calculateSequenceDuration();

  const getCurrentCaption = () => {
    const currentTime = frame/30*1000;
    const currentCaption = captions.find(
      (caption) => caption.start <= currentTime && caption.end >= currentTime
    );
    return currentCaption? currentCaption.text : '';
  }

  return (
    <AbsoluteFill className="bg-black">
      {imageList.map((item, index) => {
        return (
          <Sequence
            key={index}
            from={(index * totalDuration) / imageList.length}
            durationInFrames={totalDuration / imageList.length}
          >
            <AbsoluteFill style={{ justifyContent: "center" ,alignItems:'center'}}>
              <img
                src={item}
                alt={script}
                className="w-full h-full object-cover"
              />
              <AbsoluteFill style={{
                color: 'white',
                justifyContent: 'center',
                top:undefined,
                bottom:50,
                height:150,
                textAlign:'center',
                width:'100%',
              }}>
                <h2 className="text-2xl">{getCurrentCaption()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
