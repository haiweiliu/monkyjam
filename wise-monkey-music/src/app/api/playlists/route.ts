import { NextResponse } from 'next/server';

// In-memory storage for playlists (replace with database in production)
let playlists: any[] = [];

export async function GET() {
  return NextResponse.json(playlists);
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      tracks: [],
      createdAt: new Date().toISOString(),
    };

    playlists.push(newPlaylist);
    return NextResponse.json(newPlaylist);
  } catch (error) {
    console.error('Error in playlists route:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
} 