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
    const { imagePrompt } = await req.json();

    if (typeof imagePrompt !== "string" || imagePrompt.trim() === "") {
      return NextResponse.json(
        { error: "Invalid image prompt" },
        { status: 400 }
      );
    }

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

    try {
      // Generate image from Hugging Face API using the provided prompt
      const imageBlob = await query({ inputs: imagePrompt });
      const imageBase64 = `data:image/png;base64,${Buffer.from(imageBlob).toString(
        "base64"
      )}`;

      // Upload the image to Cloudinary
      // const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      //   folder: "generated_images", 
      // });

      return NextResponse.json({ imageUrl: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
      console.error("Error generating or uploading image:", error);
      return NextResponse.json({ error: "Failed to generate or upload image" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
