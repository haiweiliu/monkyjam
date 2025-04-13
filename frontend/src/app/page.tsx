'use client';

import { useState } from 'react';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(true);

  async function generateMusic(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const prompt = (form.elements.namedItem('prompt') as HTMLTextAreaElement).value;

    if (!prompt.trim()) {
      setError('Please enter a description for your music');
      return;
    }

    setIsLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          instrumental: isInstrumental
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError('Failed to generate music. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-jungle-dark/80 to-jungle-DEFAULT/80 p-4 md:p-8">
      <div className="max-w-3xl mx-auto pt-6 pb-12">
        {/* Monkey Icon */}
        <div className="flex justify-center mb-8">
          <img
            src="https://pfst.cf2.poecdn.net/base/image/7318dfa5a91f792ec17f53cd9209c8f07120e936815910ba646e1c4577a5c52a?w=1024&h=1024"
            alt="Cool Monkey"
            className="w-40 h-40 md:w-52 md:h-52 object-contain animate-bounce"
          />
        </div>

        {/* Input Container */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MusicalNoteIcon className="w-8 h-8 text-white" />
              <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
                MonkyJam Music Generator
              </h2>
            </div>
            <p className="text-center text-white text-opacity-90 mb-8">
              Enter a description to create your perfect music
            </p>

            <form onSubmit={generateMusic}>
              {/* Prompt Input */}
              <div className="mb-6">
                <textarea
                  name="prompt"
                  placeholder="Example: A peaceful piano melody with soft strings in the background, creating a dreamy atmosphere..."
                  className="w-full p-4 text-base rounded-xl bg-white/90 dark:bg-jungle-dark/80 border-2 border-jungle-leaf/30 text-jungle-dark dark:text-white placeholder-jungle-dark/50 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-jungle-leaf/70 h-24 transition-all duration-300"
                />
              </div>

              {/* Instrumental Mode Toggle */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setIsInstrumental(!isInstrumental)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    isInstrumental ? 'bg-jungle-leaf' : 'bg-white/30'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                      isInstrumental ? 'left-8' : 'left-1'
                    }`}
                  />
                </button>
                <span className="text-white">Instrumental Mode</span>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-jungle-leaf hover:bg-white text-jungle-dark font-bold rounded-xl transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-jungle-leaf flex items-center justify-center gap-2 mx-auto"
                >
                  <MusicalNoteIcon className="w-5 h-5" />
                  {isLoading ? 'Generating...' : 'Generate Music'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="w-full max-w-2xl mx-auto rounded-xl"
          >
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </main>
  );
} 