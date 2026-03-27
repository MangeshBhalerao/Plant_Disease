import os
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..utilis import hash_password


router = APIRouter(
    prefix="/detect",
    tags=["detect"],
)

UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploaded_images"


def mock_ai_prediction(image_path: Path) -> tuple[str, float]:
    return "Wheat Rust", 95.0


@router.post("/", response_model=schemas.DetectionResponse)
def detect_disease(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    suffix = Path(file.filename or "upload.jpg").suffix or ".jpg"
    saved_name = f"{uuid4()}{suffix}"
    file_path = UPLOAD_DIR / saved_name

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    detected_name, confidence = mock_ai_prediction(file_path)
    disease_in_db = db.query(models.Disease).filter(models.Disease.name == detected_name).first()

    disease_name = disease_in_db.name if disease_in_db else detected_name
    remedy_text = "No remedy found"
    if disease_in_db and disease_in_db.remedies:
        remedy_text = disease_in_db.remedies[0].description

    first_user = db.query(models.User).order_by(models.User.id.asc()).first()
    if not first_user:
        first_user = models.User(
            email="guest@agrisense.local",
            hashed_password=hash_password("guest-user"),
            full_name="Guest User",
            location="Local Device",
        )
        db.add(first_user)
        db.commit()
        db.refresh(first_user)

    new_detection = models.Detection(
        user_id=first_user.id,
        image_path=f"uploaded_images/{saved_name}",
        disease_name=disease_name,
        confidence=float(confidence),
        remedy=remedy_text,
    )
    try:
        db.add(new_detection)
        db.commit()
        db.refresh(new_detection)
    except Exception:
        db.rollback()

    return {
        "disease": disease_name,
        "confidence": confidence,
        "remedy": remedy_text,
        "image_path": f"uploaded_images/{saved_name}",
    }


@router.get("/history", response_model=list[schemas.DetectionHistoryResponse])
def get_detection_history(db: Session = Depends(get_db)):
    return (
        db.query(models.Detection)
        .order_by(models.Detection.created_at.desc())
        .all()
    )
