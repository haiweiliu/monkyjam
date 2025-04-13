# Wise Monkey Music Creator - Product Requirements Document

## Overview
Wise Monkey Music Creator is a user-friendly platform that enables users to create, store, and manage their own music using Meta's MusicGen model through the Hugging Face API. The platform focuses on providing a seamless experience for creating soothing and relaxing music through AI-powered generation.

## Technology Stack
- **AI Model**: Facebook's MusicGen-Melody through Hugging Face API
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js with React
- **API Integration**: Hugging Face Inference API

## Target Users
- Music enthusiasts
- Content creators
- Meditation practitioners
- People seeking relaxation
- DIY musicians

## Core Features

### 1. Music Creation
- **Prompt-based Generation**
  - Text input field for music description
  - Suggested prompts for different moods (calm, peaceful, energetic, etc.)
  - AI parameters:
    - Duration (default: 8 seconds)
    - Temperature (default: 0.7)
    - Guidance Scale (default: 3.0)

- **Instrumental Toggle**
  - On/Off switch for vocals
  - Pure instrumental mode for background music
  - Automatic prompt modification for instrumental versions

### 2. Playlist Management
- **Storage System**
  - Cloud-based storage for created tracks
  - Local download option
  - Organized by:
    - Creation date
    - Mood
    - Duration
    - Custom tags

- **Playlist Features**
  - Create multiple playlists
  - Drag-and-drop organization
  - Share playlists with others
  - Export playlists in various formats

### 3. User Interface
- **Dashboard**
  - Quick access to recent creations
  - Playlist overview
  - Generation history
  - Usage statistics

- **Creation Interface**
  - Clean, minimalist design
  - Real-time preview
  - One-click generation
  - Progress indicators
  - Loading state feedback

### 4. Technical Requirements
- **API Integration**
  - Hugging Face API integration for music generation
  - Retry mechanism with exponential backoff
  - Error handling
  - Loading state management

- **Storage**
  - Secure cloud storage
  - Backup system
  - Data export options

## User Flow

### 1. Music Creation Flow
1. User opens creation interface
2. Enters music description/prompt
3. Toggles instrumental mode if desired
4. Clicks generate
5. System shows loading state
6. System retries on failure (up to 3 times)
7. Previews result
8. Saves to library or playlist

### 2. Playlist Management Flow
1. User accesses library
2. Creates new playlist
3. Adds tracks to playlist
4. Organizes tracks
5. Saves playlist
6. Shares/exports (optional)

## Technical Specifications

### API Integration
```python
# Example API call structure using Hugging Face Inference Client
from huggingface_hub import InferenceClient

client = InferenceClient(token="YOUR_HF_TOKEN")

def generate_music(prompt: str, is_instrumental: bool = False):
    if is_instrumental:
        prompt = f"Instrumental version of: {prompt}"
    
    audio = client.text_to_audio(
        text=prompt,
        model="facebook/musicgen-melody",
        parameters={
            "duration": 8,
            "temperature": 0.7,
            "guidance_scale": 3.0
        }
    )
    return audio
```

### Data Structure
```typescript
interface MusicTrack {
  id: string;
  title: string;
  prompt: string;
  isInstrumental: boolean;
  duration: number;
  createdAt: Date;
  url: string;
  tags: string[];
}

interface Playlist {
  id: string;
  name: string;
  tracks: MusicTrack[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Success Metrics
- User engagement (time spent, tracks created)
- Playlist creation rate
- User retention
- API success rate
- User satisfaction scores
- Average retry attempts per generation
- Generation completion rate

## Future Enhancements
- Support for longer music duration
- Advanced parameter controls
- Custom model fine-tuning
- Collaborative playlist creation
- Advanced audio editing tools
- Integration with meditation apps
- Custom instrument selection
- Social sharing features

## Security & Privacy
- Secure API key management
- User data encryption
- GDPR compliance
- Regular security audits
- Rate limiting
- Error logging and monitoring

## Timeline
1. Phase 1: Basic music generation with Hugging Face API (2 weeks)
2. Phase 2: Playlist management (2 weeks)
3. Phase 3: UI/UX refinement (1 week)
4. Phase 4: Testing and optimization (1 week)
5. Phase 5: Launch and monitoring (ongoing)

## Resources
- [MusicGen Documentation](https://huggingface.co/facebook/musicgen-melody)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs) 