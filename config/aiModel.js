const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 seconds video on topic : Interesting historical story along with ai image prompt in Realistic format for each scene and give me result in JSON format with imagePropmt and ContentText as field,, No Plain text",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'This script outlines a 30-second video about the story of the Rosetta Stone, suitable for AI image generation.  A true 30-second video requires precise timing for each scene, which would depend on the chosen video editing software and pace. This JSON provides the structure; you\'ll need a video editor to assemble the final product.  Timing is approximate.\n\n\n```json\n[\n  {\n    "imagePrompt": "Realistic image of the Rosetta Stone, highly detailed, museum lighting, close-up showing hieroglyphs, Greek, and Demotic script",\n    "contentText": "The Rosetta Stone: A key to unlocking ancient Egypt\'s secrets.",\n    "duration": 5\n  },\n  {\n    "imagePrompt": "Realistic painting of Napoleon\'s troops discovering the Rosetta Stone in Egypt, dusty landscape, soldiers examining the stone, historically accurate uniforms",\n    "contentText": "Discovered in 1799 by French soldiers during Napoleon\'s Egyptian campaign.",\n    "duration": 7\n  },\n  {\n    "imagePrompt": "Realistic illustration of Jean-François Champollion studying the Rosetta Stone, intense concentration, scholarly setting, quill and ink, books scattered around",\n    "contentText": "Years later, Jean-François Champollion cracked the code of hieroglyphs...",\n    "duration": 8\n  },\n  {\n    "imagePrompt": "Realistic animation of hieroglyphs translating into Greek text on the Rosetta Stone, showing the decipherment process, smooth transition, glowing effect on deciphered parts",\n    "contentText": "...using the Greek inscriptions as a key.",\n    "duration": 5\n  },\n  {\n    "imagePrompt": "Realistic image of the Rosetta Stone in the British Museum,  museum setting, crowds of visitors observing the stone, subtly lit display case",\n    "contentText": "Today, it rests in the British Museum, a testament to human curiosity and the power of perseverance.",\n    "duration": 5\n  }\n]\n```\n\n**To use this JSON:**\n\n1. **AI Image Generation:** Use an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) with the provided `imagePrompt` for each scene.  Experiment with different generators and parameters to achieve the best visual quality and realism.  The realistic style is crucial.\n2. **Video Editing:** Import the generated images into a video editing software (e.g., Adobe Premiere Pro, DaVinci Resolve, iMovie).\n3. **Add Text:** Add the `contentText` as text overlays to each image scene.  Adjust font and style for readability.\n4. **Timing:** Adjust the duration of each scene to match the `duration` specified in the JSON (approximately).  You might need to shorten or lengthen scenes depending on your chosen pace.\n5. **Audio:** Add background music and sound effects if desired.\n6. **Export:** Export your finished video as a 30-second MP4 file.\n\n\n**Important Considerations:**\n\n* **Image Quality:**  The quality of the AI-generated images is critical. Experiment with different prompts and settings to achieve the desired level of realism.\n* **Video Editing Skills:** Basic video editing skills are required to assemble the images, add text, and adjust timing.\n* **Copyright:** Be aware of the copyright implications of using AI-generated images and music.  Some platforms have specific terms of service regarding generated content.\n\n\nThis JSON provides a framework.  You can adjust the prompts, text, and durations to fine-tune the video to your preferences and ensure it stays within the 30-second timeframe.  Remember that high-quality AI image generation can take time, especially for detailed realistic images.\n',
        },
      ],
    },
  ],
});
