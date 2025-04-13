import { NextResponse } from 'next/server';

// Simulated delay to test loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// For testing, we'll use a public domain audio file
const TEST_AUDIO = 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav';

export async function POST(request: Request) {
  try {
    const { prompt, make_instrumental } = await request.json();

    // Call our AudioCraft backend
    const response = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        is_instrumental: make_instrumental,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate music');
    }

    // Get the audio blob
    const audioBlob = await response.blob();
    
    // Create a temporary URL for the audio
    const audioUrl = URL.createObjectURL(audioBlob);

    return NextResponse.json({
      status: 'success',
      audio_url: audioUrl,
      id: `gen-${Date.now()}`,
    });
  } catch (error) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: 'Failed to generate music' },
      { status: 500 }
    );
  }
} 