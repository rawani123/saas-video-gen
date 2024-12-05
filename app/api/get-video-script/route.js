import { chatSession } from "@/config/aiModel";
import { NextResponse } from "next/server";


export const POST= async()=>{
    try {
        const {prompt}=req.json();
        console.log(prompt)

        const result = await chatSession.sendMessage(prompt)
        console.log(result.response.text())

        return NextResponse.json({'result':JSON.parse(result.response.text())})
    } catch (error) {
        return NextResponse.json({'error':error})
    }
}