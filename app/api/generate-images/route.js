import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req) => {
  const { prompt } = await req.json();

  try {
    // Step 1: Fetch the image from Hugging Face
    const huggingFaceResponse = await axios.post(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log the response to check the data structure
    console.log("Hugging Face Response:", huggingFaceResponse.data);

    // Check if image data is returned in Hugging Face response
    const imageBase64 = huggingFaceResponse.data.image; // Adjust based on actual response structure

    console.log(imageBase64)

    if (!imageBase64) {
      throw new Error("Image data not found in Hugging Face response.");
    }


    // Step 2: Return the image base64 data or URL (if Hugging Face provides it as URL)
    return NextResponse.json({ image: imageBase64 });
  } catch (error) {
    console.error("Error in fetch:", error.messgae);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
