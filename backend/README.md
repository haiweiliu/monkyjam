# Wise Monkey Music Creator - Backend

This is the backend service for the Wise Monkey Music Creator, built with FastAPI and using Meta's MusicGen model through the Hugging Face API.

## Setup

1. Create a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your Hugging Face API token.

## Running the Server

Start the development server:
```bash
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- API documentation: `http://localhost:8000/docs`
- Alternative documentation: `http://localhost:8000/redoc`

## API Endpoints

### POST /api/generate
Generate music based on a text prompt.

Request body:
```json
{
  "prompt": "A peaceful piano melody with soft strings",
  "is_instrumental": true,
  "duration": 8,
  "temperature": 0.7,
  "guidance_scale": 3.0
}
```

Response:
```json
{
  "audio_data": "base64_encoded_audio_data",
  "duration": 8,
  "prompt": "A peaceful piano melody with soft strings"
}
```

### GET /api/health
Health check endpoint.

Response:
```json
{
  "status": "healthy"
}
```

## Error Handling

The API includes automatic retry mechanisms for failed requests to the Hugging Face API:
- Maximum 3 retry attempts
- Exponential backoff between retries
- Detailed error messages in responses

## Development

The backend is structured as follows:
```
backend/
├── app/
│   ├── api/        # API routes
│   ├── models/     # Data models
│   ├── services/   # Business logic
│   ├── utils/      # Utility functions
│   └── main.py     # Application entry point
├── requirements.txt
└── .env
```
