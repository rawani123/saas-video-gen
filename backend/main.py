from flask import Flask, request, jsonify
from gtts import gTTS
import os
import cloudinary
import cloudinary.uploader
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# print(f"Cloudinary configured with cloud_name: {os.getenv('CLOUDINARY_CLOUD_NAME')}")


@app.route('/generate-mp3', methods=['POST'])
def generate_mp3():
    data = request.json
    text = data.get('text', '') 9

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Generate the MP3 file locally
        tts = gTTS(text)
        file_path = "output.mp3"
        tts.save(file_path)

        # Upload the MP3 file to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file_path,
            resource_type="video",  # Use "video" for audio/video files
            folder="audio_files",   # Optional: specify a folder in your Cloudinary account
        )

        # Get the Cloudinary URL
        cloudinary_url = upload_result.get("secure_url")

        # Remove the local file after upload
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
            "message": "MP3 generated and uploaded successfully!",
            "url": cloudinary_url
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
