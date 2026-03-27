# AgriSense Frontend

Vite + React frontend for AgriSense plant disease detection.

## Local Development

1. Install dependencies.
2. Create a local env file from [.env.example](.env.example).
3. Set VITE_API_URL to your backend URL, for example http://127.0.0.1:8000.
4. Run the development server.

## Production Deployment

This frontend is deployed on Vercel and expects a reachable backend URL.

Required Vercel environment variable:

- VITE_API_URL=https://agrisense-2ens.onrender.com

Important:

- Vite injects VITE_API_URL at build time.
- After changing VITE_API_URL in Vercel, trigger a new Production Redeploy so the new value is included in the JS bundle.
