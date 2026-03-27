import axios from 'axios';
import { DetectResponse, DetectionHistoryItem } from './types';

const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_URL,
});

export const getApiBaseUrl = () => API_URL;

export const buildImageUrl = (imagePath: string) => {
  if (!imagePath) {
    return '';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return `${API_URL}/${imagePath.replace(/^\/+/, '').replace(/\\/g, '/')}`;
};

export const detectDisease = async (file: File): Promise<DetectResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<DetectResponse>('/detect/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getDetectionHistory = async (): Promise<DetectionHistoryItem[]> => {
  const response = await api.get<DetectionHistoryItem[]>('/detect/history');
  return response.data;
};
