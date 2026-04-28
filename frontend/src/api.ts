import axios from 'axios';
import { DetectResponse, DetectionHistoryItem, NearbyStoreSearchResponse, NewsTickerResponse } from './types';

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

  const normalizedPath = imagePath.trim().replace(/\\/g, '/');

  if (!normalizedPath) {
    return '';
  }

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  return `${API_URL}/${normalizedPath.replace(/^\/+/, '')}`;
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

export const getNearbyStores = async (payload: {
  latitude: number;
  longitude: number;
  disease_name: string;
  remedy?: string;
}): Promise<NearbyStoreSearchResponse> => {
  const response = await api.post<NearbyStoreSearchResponse>('/detect/nearby-stores', payload);
  return response.data;
};

export const getNewsTicker = async (): Promise<NewsTickerResponse> => {
  const response = await api.get<NewsTickerResponse>('/news/ticker');
  return response.data;
};
