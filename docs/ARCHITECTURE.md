# Architecture

This project follows a separated ML-product architecture.

## High-Level Flow

1. Data is explored in notebooks.
2. Training code in `ml/` prepares data and trains the model.
3. Trained artifacts are saved into `models/`.
4. Backend loads the exported model and serves prediction endpoints.
5. Frontend sends images to the backend and renders results to users.

## System Components

### `notebooks/`

Used for exploration, quick validation, and one-off analysis.

### `ml/`

Contains reusable Python code for:

- preprocessing
- training
- evaluation
- inference helpers

### `models/`

Contains versioned model artifacts and metadata such as:

- model file
- label mapping
- preprocessing config
- training metrics

### `backend/`

Python API service responsible for:

- receiving image uploads
- validating inputs
- running model inference
- returning predictions and confidence scores

### `frontend/`

Next.js application responsible for:

- user interface
- file upload
- prediction display
- disease information pages

## Why This Structure

This keeps ML code, backend code, and frontend code separate so each layer can evolve independently.

That is the more professional setup for a real-world ML application, especially for a full-stack developer expanding into ML.
