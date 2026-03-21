# Delivery Plan

## Phase 1: Data Understanding

Goal: understand what is in the dataset before training anything.

Deliverables:

- class distribution summary
- sample image inspection
- image size analysis
- preprocessing notes

Main workspace:

- `notebooks/`
- `ml/data/`

## Phase 2: Baseline Training

Goal: train the first working model.

Deliverables:

- dataset loader
- training script
- baseline metrics
- saved model artifact

Main workspace:

- `ml/training/`
- `ml/data/`
- `models/`

## Phase 3: Evaluation

Goal: understand whether the model is usable.

Deliverables:

- validation metrics
- confusion matrix
- per-class performance notes
- failure-case examples

Main workspace:

- `ml/evaluation/`
- `models/`

## Phase 4: Inference API

Goal: make predictions accessible through an API.

Deliverables:

- prediction endpoint
- image validation
- model loading logic
- response schema

Main workspace:

- `backend/`
- `ml/inference/`

## Phase 5: Frontend Product

Goal: provide a polished user experience.

Deliverables:

- upload page
- prediction result page
- confidence display
- disease guidance UI

Main workspace:

- `frontend/`

## Phase 6: Deployment and Operations

Goal: ship the project professionally.

Deliverables:

- deployed frontend
- deployed backend
- model version tracking
- logs and monitoring

Main workspace:

- `frontend/`
- `backend/`
- `models/`
