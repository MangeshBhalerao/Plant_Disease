export interface DetectResponse {
  disease: string;
  confidence: number;
  remedy: string;
  image_path: string;
  reasoning: string;
  preview_image_url?: string;
}

export interface NearbyStore {
  name: string;
  address: string;
  google_maps_url?: string | null;
  phone_number?: string | null;
  website_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rating?: number | null;
  user_rating_count?: number | null;
  types: string[];
}

export interface NearbyStoreSearchResponse {
  configured: boolean;
  query?: string | null;
  message?: string | null;
  stores: NearbyStore[];
}

export interface DetectionHistoryItem {
  id: number;
  disease_name: string;
  confidence: number | null;
  remedy: string | null;
  image_path: string;
  reasoning?: string | null;
  model_name_used?: string | null;
  created_at: string;
}

export interface NewsTickerResponse {
  headlines: string[];
  source: string;
  live: boolean;
}
