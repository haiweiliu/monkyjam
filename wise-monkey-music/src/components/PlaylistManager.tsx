'use client';

import { useState, useEffect } from 'react';

interface MusicTrack {
  id: string;
  title: string;
  prompt: string;
  isInstrumental: boolean;
  duration: number;
  createdAt: string;
  url: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: MusicTrack[];
  createdAt: string;
}

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('/api/playlists');
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName) return;

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newPlaylistName }),
      });

      const newPlaylist = await response.json();
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading playlists...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">My Playlists</h2>

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="New playlist name"
              className="flex-1 bg-gray-700 rounded-md p-2 text-white"
            />
            <button
              onClick={createPlaylist}
              disabled={!newPlaylistName}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-2">{playlist.name}</h3>
              <div className="space-y-2">
                {playlist.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center justify-between bg-gray-600 rounded-md p-3"
                  >
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-300">{track.prompt}</p>
                    </div>
                    <audio controls className="w-64">
                      <source src={track.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 