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
