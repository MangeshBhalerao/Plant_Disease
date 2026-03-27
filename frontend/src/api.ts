import axios from 'axios';
import { DetectResponse, DetectionHistoryItem } from './types';

const productionFallbackApiUrl = 'https://agrisense-2ens.onrender.com';
const defaultApiUrl = import.meta.env.PROD ? productionFallbackApiUrl : 'http://127.0.0.1:8000';

const normalizeApiUrl = (rawUrl?: string) => {
  const value = rawUrl?.trim();
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value.replace(/\/$/, '');
  }

  // Accept host-style values (for example, agrisense-2ens.onrender.com) and force HTTPS.
  if (value.includes('.')) {
    return `https://${value}`.replace(/\/$/, '');
  }

  // If the value is not a valid URL/host, ignore it and use the safe default.
  return '';
};

const configuredApiUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);
const API_URL = configuredApiUrl || defaultApiUrl;

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
