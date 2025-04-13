'use client';

import { useState } from 'react';
import MusicCreator from '@/components/MusicCreator';
import PlaylistManager from '@/components/PlaylistManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'playlists'>('create');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Wise Monkey Music Creator</h1>
        <p className="text-gray-300">Create soothing music with AI</p>
      </header>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'create' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('create')}
          >
            Create Music
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'playlists' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('playlists')}
          >
            My Playlists
          </button>
        </div>
      </div>

      {activeTab === 'create' ? <MusicCreator /> : <PlaylistManager />}
    </div>
  );
} 