from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .. import oauth2 
from app import utilis
from ..import models, schemas
from ..database import get_db
from fastapi import File, UploadFile 
import shutil
import os
import traceback 


router = APIRouter(
    prefix="/detect",
    tags=['detect'],
) 

UPLOAD_DIR = "uploaded_images"

# Temporary function to simulate AI detection
def mock_ai_prediction(image_path):
    # Simulating an AI detection
    # Returns: (Disease Name, Confidence Score)
    return "Wheat Rust", 95


@router.post("/", response_model=schemas.DetectionResponse)
# Updated /detect endpoint
def detect_disease(
    file: UploadFile = File(...), 
    location: str = "Unknown",
    db: Session = Depends(get_db)
    # current_user: int = Depends(oauth2.get_current_user) # Disabled for testing
):
    # A. Save File (Keep your existing code)
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    
    # Ensure directory exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # B. Run AI (Mock) -> It finds "Wheat Rust"
    detected_name, confidence = mock_ai_prediction(file_path)

    # C. FETCH REMEDIES FROM DB (The New Part!)
    disease_in_db = db.query(models.Disease).filter(models.Disease.name == detected_name).first()
    
    remedy_text = "No remedy found"
    if disease_in_db and disease_in_db.remedies:
        remedy_text = disease_in_db.remedies[0].description

    new_detection = models.Detection(
        user_id=1,  # Hardcoded for now until frontend login is complete
        image_path=str(file_path),
        disease_name=disease_in_db.name if disease_in_db else detected_name,
        confidence=float(confidence),
        remedy=remedy_text
    )
    
    # Actually save it to Postgres (wrap in try-catch in case user 1 doesn't exist)
    try:
        db.add(new_detection)
        db.commit()
        db.refresh(new_detection)
    except Exception as e:
        db.rollback()
        print(f"Failed to save detection (user 1 might not exist): {e}")

    return {
        "disease": disease_in_db.name,
        "confidence": confidence,
        "remedy": remedy_text, # <--- Use the variable we just created
        "image_path": str(file_path)
    }
