# MonkyJam Music Generator

A fun web application that generates music based on text descriptions using Hugging Face's MusicGen model.

## Features

- Text-to-music generation
- Instrumental mode option
- Modern, responsive UI with jungle theme
- Real-time audio playback

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your Hugging Face API token:
   ```
   HUGGINGFACE_API_TOKEN="your_token_here"
   MODEL_URL="https://api-inference.huggingface.co/models/facebook/musicgen-small"
   ```

5. Start the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Simply open `monkey-music.html` in your web browser
2. Enter a description for the music you want to generate
3. Toggle "Instrumental Mode" if desired
4. Click "Generate Music" and enjoy!

## Technologies Used

- Frontend: HTML, CSS (TailwindCSS), JavaScript
- Backend: Python, FastAPI
- AI Model: Hugging Face's MusicGen
- Styling: Custom jungle theme with animated elements

## License

MIT License - feel free to use and modify as you wish!

## Credits

- MusicGen model by Meta/Facebook
- Monkey icon from [source]
- Built with ❤️ by [your name] 