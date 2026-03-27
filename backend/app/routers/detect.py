import os
import shutil
from pathlib import Path
from uuid import uuid4

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from .. import models, schemas
from ..ai_model import analyze_plant_image
from ..cloudinary_service import cloudinary_is_configured, upload_image_to_cloudinary
from ..config import settings
from ..database import get_db
from ..utilis import hash_password


router = APIRouter(
    prefix="/detect",
    tags=["detect"],
)

UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploaded_images"


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

    try:
        model_result = analyze_plant_image(file_path)
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Groq API request failed: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {exc}") from exc

    try:
        if cloudinary_is_configured():
            stored_image_path = upload_image_to_cloudinary(file_path, public_id=Path(saved_name).stem)
        else:
            stored_image_path = f"uploaded_images/{saved_name}"
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Cloudinary upload failed: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {exc}") from exc
    finally:
        if cloudinary_is_configured() and file_path.exists():
            file_path.unlink(missing_ok=True)

    disease_in_db = (
        db.query(models.Disease)
        .filter(models.Disease.name == model_result["disease_name"])
        .first()
    )

    if not disease_in_db:
        disease_in_db = models.Disease(
            name=model_result["disease_name"],
            crop_type=model_result["crop_type"],
        )
        db.add(disease_in_db)
        db.commit()
        db.refresh(disease_in_db)

    remedy_entry = disease_in_db.remedies[0] if disease_in_db.remedies else None
    if not remedy_entry and model_result["remedy"]:
        remedy_entry = models.Remedy(
            disease_id=disease_in_db.id,
            type="AI Suggested",
            description=model_result["remedy"],
        )
        db.add(remedy_entry)
        db.commit()
        db.refresh(remedy_entry)

    remedy_text = remedy_entry.description if remedy_entry else model_result["remedy"]

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
        disease_id=disease_in_db.id,
        remedy_id=remedy_entry.id if remedy_entry else None,
        scheme_id=None,
        image_path=stored_image_path,
        confidence=float(model_result["confidence"]),
        reasoning=model_result["reasoning"],
        model_name_used=settings.model_name,
    )
    try:
        db.add(new_detection)
        db.commit()
        db.refresh(new_detection)
    except Exception as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save detection in database: {exc}") from exc

    return {
        "disease": disease_in_db.name,
        "confidence": model_result["confidence"],
        "remedy": remedy_text,
        "image_path": stored_image_path,
        "reasoning": model_result["reasoning"],
    }


@router.get("/history", response_model=list[schemas.DetectionHistoryResponse])
def get_detection_history(db: Session = Depends(get_db)):
    rows = (
        db.query(models.Detection)
        .order_by(models.Detection.created_at.desc())
        .all()
    )
    return [
        {
            "id": row.id,
            "disease_name": row.disease.name if row.disease else "Unknown",
            "confidence": row.confidence,
            "remedy": row.remedy_entry.description if row.remedy_entry else None,
            "image_path": row.image_path,
            "created_at": row.created_at,
        }
        for row in rows
    ]
