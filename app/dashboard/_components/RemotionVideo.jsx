"use client";
import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
    const currentTime = (frame / 30) * 1000;
    const currentCaption = captions.find(
      (caption) => caption.start <= currentTime && caption.end >= currentTime
    );
    return currentCaption ? currentCaption.text : "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList.map((item, index) => {
        const startTime = (index * totalDuration) / imageList.length;
        const scale = (index)=>interpolate(
          frame,
          [startTime, startTime + totalDuration / 2, startTime + totalDuration],
          index%2==0 ?[1, 1.5, 1]:[1.5, 1, 1.5],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={totalDuration}
          >
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={item}
                alt={script}
                style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'cover',
                  transform: `scale(${scale(index)})`,
                }}
              />
              <AbsoluteFill
                style={{
                  color: "white",
                  justifyContent: "center",
                  top: undefined,
                  bottom: 50,
                  height: 150,
                  textAlign: "center",
                  width: "100%",
                }}
              >
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
