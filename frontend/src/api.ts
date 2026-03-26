import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // FastAPI default port

export const api = axios.create({
  baseURL: API_URL,
});

export interface DetectResponse {
  disease: string;
  confidence: number;
  remedy: string;
  image_path: string;
}

export const detectDisease = async (file: File): Promise<DetectResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  // NOTE: Depending on your oauth2 setup in FastAPI, you might need an Authorization header.
  // We'll proceed without auth first as the user hasn't created one yet.
  
  // The current /detect endpoint in backend requires `current_user` dependency from OAuth2.
  // Wait, if the endpoint requires auth, it might fail throwing a 401 Unauthorized.
  // Let's just make the call and see.
  
  const response = await api.post<DetectResponse>('/detect/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
