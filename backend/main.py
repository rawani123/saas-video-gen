from flask import Flask, request, jsonify
from gtts import gTTS
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the path to the public folder in your Next.js project
PUBLIC_FOLDER = "../public"

@app.route('/generate-mp3', methods=['POST'])
def generate_mp3():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Generate the MP3 file
        tts = gTTS(text)
        file_path = os.path.join(PUBLIC_FOLDER, "output.mp3")
        tts.save(file_path)

        return jsonify({
            "message": "MP3 generated successfully!",
            "url": "/output.mp3"  # Public URL for the file
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
