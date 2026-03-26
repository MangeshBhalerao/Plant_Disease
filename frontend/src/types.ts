export type Screen = 'home' | 'results' | 'history' | 'profile';

export interface ScanResult {
  id: string;
  plantName: string;
  diagnosis: string;
  status: 'healthy' | 'infected';
  matchPercentage: number;
  date: string;
  image: string;
}

export interface DetectResponse {
  disease: string;
  confidence: number;
  remedy: string;
  image_path: string;
}
