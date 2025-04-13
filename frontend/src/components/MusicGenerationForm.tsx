'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface MusicGenerationFormProps {
  onSuccess: (audioData: string) => void;
}

export default function MusicGenerationForm({ onSuccess }: MusicGenerationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    prompt: '',
    instrumental: true
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to generate music');
      
      const data = await response.json();
      if (!data.audio) throw new Error('No audio data received');
      
      onSuccess(data.audio);
      toast.success('Music generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate music. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="prompt" className="block text-lg font-medium text-white mb-2">
          Describe your music
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full rounded-xl bg-white/5 border-white/10 text-white shadow-inner-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Example: A peaceful piano melody with soft strings in the background..."
          value={formData.prompt}
          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            checked={formData.instrumental}
            onChange={(checked) => setFormData({ ...formData, instrumental: checked })}
            className={`${
              formData.instrumental ? 'bg-primary-600' : 'bg-gray-700'
            } relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
          >
            <span className="sr-only">Instrumental mode</span>
            <span
              className={`${
                formData.instrumental ? 'translate-x-8' : 'translate-x-1'
              } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span className="text-sm font-medium text-gray-200">Instrumental Mode</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <MusicalNoteIcon className="w-5 h-5 mr-2" />
              Generate Music
            </>
          )}
        </button>
      </div>
    </form>
  );
} 