from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
import base64
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Hugging Face API configuration
API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
API_URL = os.getenv("MODEL_URL")
HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MusicRequest(BaseModel):
    prompt: str
    instrumental: bool = False

@app.post("/generate")
async def generate_music(request: MusicRequest):
    try:
        # Basic prompt enhancement
        prompt = f"{'Instrumental version of: ' if request.instrumental else ''}{request.prompt}"
        logger.info(f"Processing request with prompt: {prompt}")

        # Simple payload with minimal parameters
        payload = {
            "inputs": prompt,
            "wait_for_model": True
        }

        # Make request to Hugging Face
        logger.info("Sending request to Hugging Face API")
        response = requests.post(API_URL, headers=HEADERS, json=payload)
        
        # Log response status
        logger.info(f"Received response with status: {response.status_code}")
        
        if response.status_code == 503:
            logger.warning("Model is loading, please try again")
            raise HTTPException(status_code=503, detail="Model is loading, please try again")
            
        if not response.ok:
            logger.error(f"API request failed: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Failed to generate music")

        # Get audio data
        audio_data = response.content
        logger.info(f"Received audio data of length: {len(audio_data)}")

        # Convert to base64
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        return {"audio": audio_base64}

    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to connect to music generation service")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 