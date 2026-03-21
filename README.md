# Plant Disease Detection

This repository is organized as an end-to-end machine learning product, not just a model experiment.

The goal is to classify plant leaf diseases from images, then expose predictions through a backend API and a frontend web application that feels like a real product.

## Current Stage

This project is currently in the early setup stage:

- Problem is defined
- Dataset is available locally
- Exploration notebook is started
- Model training has not started yet
- Evaluation, inference API, and frontend product are not built yet

Professionally, this is the `data readiness + project scaffolding` phase.

## Project Phases

### Phase 1: Data Understanding

- Explore the dataset
- Verify class balance
- Inspect image quality and labeling
- Document preprocessing decisions

### Phase 2: Baseline Model

- Build a first training pipeline in Python
- Train a baseline CNN or transfer-learning model
- Save metrics and artifacts

### Phase 3: Evaluation

- Measure validation accuracy, loss, and class-wise performance
- Generate confusion matrix and error analysis
- Decide whether the model is good enough for inference

### Phase 4: Inference API

- Build a Python API for prediction
- Load the trained model
- Accept uploaded images and return predictions

### Phase 5: Product Frontend

- Build a Next.js + Tailwind UI
- Upload images to the backend
- Show prediction, confidence, and disease details

### Phase 6: Deployment

- Deploy frontend and backend
- Store model artifacts properly
- Add monitoring, logging, and versioning

## Repository Structure

```text
Plant_Disease/
├── backend/            # Inference API service
├── data/               # Local dataset and derived splits
├── docs/               # Architecture and phase guides
├── frontend/           # Next.js + Tailwind application
├── ml/                 # Training, evaluation, and inference logic
├── models/             # Saved model artifacts
├── notebooks/          # Exploratory notebooks
└── requirements.txt    # Python dependencies
```

## Folder Responsibilities

- `notebooks/`: quick exploration and experiments
- `ml/`: production-style ML code
- `models/`: exported trained models and metadata
- `backend/`: API layer for predictions
- `frontend/`: product UI
- `docs/`: planning, workflow, and architecture

## Next Recommended Step

Work in this order:

1. Complete dataset exploration in `notebooks/`
2. Build the first training pipeline in `ml/training/`
3. Save the trained model into `models/`
4. Expose prediction through `backend/`
5. Build the user-facing app in `frontend/`
