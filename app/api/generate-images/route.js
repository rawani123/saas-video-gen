import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const { videoScript } = await req.json();

    if (!Array.isArray(videoScript)) {
      return NextResponse.json(
        { error: "Invalid video script format" },
        { status: 400 }
      );
    }

    const images = [];

    const query = async (data) => {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer", // Handle binary data
        }
      );
      return response.data;
    };

    for (const scene of videoScript) {
      try {
        // Generate image from Hugging Face
        const imageBlob = await query({ inputs: scene.imagePrompt });
        const imageBase64 = `data:image/png;base64,${Buffer.from(imageBlob).toString(
          "base64"
        )}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
          folder: "generated_images", // Organize uploads in a folder
        });

        images.push(uploadResponse.secure_url); // Store Cloudinary URL
      } catch (error) {
        console.error(
          `Error processing scene prompt: ${scene.imagePrompt}`,
          error
        );
        images.push(null); // Return `null` for failed uploads
      }
    }

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
