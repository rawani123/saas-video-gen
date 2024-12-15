import { renderMedia } from "@remotion/renderer";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Define the API route
export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    const { script, imageList, captions, audioFileUrl } = body;

    if (!script || !imageList || !captions || !audioFileUrl) {
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 }
      );
    }

    // Define the composition ID and output path
    const compositionId = "RemotionVideo";
    const outputDir = path.join(process.cwd(), "public", "videos");

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${Date.now()}.mp4`);

    // Render the video using Remotion
    await renderMedia({
      composition: compositionId,
      serveUrl: "http://localhost:3000", // Update this with your deployed app's URL
      codec: "h264",
      outputLocation: outputPath,
      inputProps: {
        script,
        imageList,
        captions,
        audioFileUrl,
      },
    });

    // Respond with the video URL
    const videoUrl = `/videos/${path.basename(outputPath)}`;
    return NextResponse.json({ videoUrl }, { status: 200 });
  } catch (error) {
    console.error("Error rendering video:", error.message);
    return NextResponse.json(
      { error: "Failed to render video." },
      { status: 500 }
    );
  }
}
