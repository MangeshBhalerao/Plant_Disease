export interface DetectResponse {
  disease: string;
  confidence: number;
  remedy: string;
  image_path: string;
}

export interface DetectionHistoryItem {
  id: number;
  disease_name: string;
  confidence: number | null;
  remedy: string | null;
  image_path: string;
  created_at: string;
}
