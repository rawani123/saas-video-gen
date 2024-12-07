import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { audioFileUrl } = await req.json();

    console.log("Audio file URL:", audioFileUrl);
    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    });
  
    // Request parameters
    const data = {
      audio: audioFileUrl,
    };
  
    const transcript = await client.transcripts.transcribe(data);
    // console.log(transcript.words);

    return NextResponse.json({ transcript: transcript.words });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
