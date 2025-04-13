import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface MusicGenerationRequest {
  prompt: string;
  is_instrumental: boolean;
  duration: number;
  temperature: number;
  guidance_scale: number;
}

export interface MusicGenerationResponse {
  audio_data: string;
  duration: number;
  prompt: string;
}

export const api = {
  generateMusic: async (request: MusicGenerationRequest): Promise<MusicGenerationResponse> => {
    try {
      const response = await axios.post<MusicGenerationResponse>(
        `${API_BASE_URL}/api/generate`,
        request
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Failed to generate music');
      }
      throw error;
    }
  },

  healthCheck: async (): Promise<{ status: string }> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  },
}; 