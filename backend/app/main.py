from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from typing import Optional
import os
from dotenv import load_dotenv
import base64
from tenacity import retry, stop_after_attempt, wait_exponential

load_dotenv()

app = FastAPI(title="Wise Monkey Music Creator")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Hugging Face client
client = InferenceClient(
    token=os.getenv("HUGGINGFACE_API_TOKEN")
)

class MusicGenerationRequest(BaseModel):
    prompt: str
    is_instrumental: bool = False
    duration: int = 8
    temperature: float = 0.7
    guidance_scale: float = 3.0

class MusicGenerationResponse(BaseModel):
    audio_data: str  # Base64 encoded audio data
    duration: int
    prompt: str

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
async def generate_music_with_retry(request: MusicGenerationRequest) -> bytes:
    """Generate music with retry mechanism"""
    try:
        prompt = f"Instrumental version of: {request.prompt}" if request.is_instrumental else request.prompt
        
        audio = client.text_to_audio(
            text=prompt,
            model="facebook/musicgen-melody",
            parameters={
                "duration": request.duration,
                "temperature": request.temperature,
                "guidance_scale": request.guidance_scale
            }
        )
        return audio
    except Exception as e:
        print(f"Error generating music: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate", response_model=MusicGenerationResponse)
async def generate_music(request: MusicGenerationRequest, background_tasks: BackgroundTasks):
    """
    Generate music based on the provided prompt and parameters.
    Returns base64 encoded audio data.
    """
    try:
        audio_data = await generate_music_with_retry(request)
        
        # Convert audio data to base64
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        return MusicGenerationResponse(
            audio_data=audio_base64,
            duration=request.duration,
            prompt=request.prompt
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 