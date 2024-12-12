import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

// Disable Next.js's built-in body parsing for the API route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function POST(req, res) {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public"); // Set upload directory to public folder
  form.keepExtensions = true; // Keep file extensions like .png

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    // Access the uploaded file
    const imageFile = files.image[0]; // The image file uploaded from the client
    const imagePath = path.join("public", imageFile.newFilename); // Use new filename for storing

    // Return the public URL of the uploaded image (file accessible via /imageName.png)
    res.status(200).json({ url: `/${imageFile.newFilename}` });
  });
}
