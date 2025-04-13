'use client';

import { useRef, useEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  audioData: string;
}

export default function AudioPlayer({ audioData }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioData) {
      // Convert base64 to blob URL
      const audioBlob = new Blob(
        [Buffer.from(audioData, 'base64')],
        { type: 'audio/wav' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;

      // Cleanup
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioData]);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">Generated Music</h2>
      <div className="w-full max-w-2xl bg-white/5 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isPlaying ? (
              <PauseIcon className="h-8 w-8" />
            ) : (
              <PlayIcon className="h-8 w-8" />
            )}
          </button>
          <audio
            ref={audioRef}
            controls
            className="flex-1 h-12 [&::-webkit-media-controls-panel]:bg-white/10 [&::-webkit-media-controls-current-time-display]:text-gray-200 [&::-webkit-media-controls-time-remaining-display]:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
} 