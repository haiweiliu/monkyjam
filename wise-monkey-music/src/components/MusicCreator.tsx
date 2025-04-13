'use client';

import { useState } from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
  </div>
);

export default function MusicCreator() {
  const [prompt, setPrompt] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'complete'>('idle');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatus('generating');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          make_instrumental: isInstrumental,
          wait_audio: true,
        }),
      });

      const data = await response.json();
      setGeneratedMusic(data.audio_url);
      setStatus('complete');
    } catch (error) {
      console.error('Error generating music:', error);
      setStatus('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Music</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe your music
            </label>
            <textarea
              className="w-full bg-gray-700 rounded-md p-3 text-white"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A peaceful piano melody with soft strings in the background, perfect for meditation..."
              disabled={isGenerating}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="instrumental"
              checked={isInstrumental}
              onChange={(e) => setIsInstrumental(e.target.checked)}
              className="mr-2"
              disabled={isGenerating}
            />
            <label htmlFor="instrumental">Instrumental only (no vocals)</label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
              isGenerating || !prompt
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status === 'generating' ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Creating your music...</span>
              </>
            ) : (
              'Generate Music'
            )}
          </button>

          {status === 'generating' && (
            <div className="mt-4 text-center text-gray-300">
              <p>🎵 Composing your jungle vibes...</p>
              <p className="text-sm mt-1">This may take a minute or two</p>
            </div>
          )}

          {generatedMusic && status === 'complete' && (
            <div className="mt-4">
              <div className="mb-2 text-green-400">✨ Your music is ready!</div>
              <audio controls className="w-full">
                <source src={generatedMusic} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 