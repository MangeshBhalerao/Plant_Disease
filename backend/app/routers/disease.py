from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .. import oauth2

from app import utilis
from ..import models, schemas
from ..database import get_db


router = APIRouter(
    prefix="/diseases",
    tags=['diseases'],
)


@router.post("/", response_model=schemas.DiseaseResponse)
def create_disease_entry(
    disease: schemas.DiseaseCreate, 
    db: Session = Depends(get_db)
):
    # Create the Disease
    new_disease = models.Disease(name=disease.name, crop_type=disease.crop_type)
    db.add(new_disease)
    db.commit()
    db.refresh(new_disease)
    return new_disease

# 2. Helper route to add a Remedy to a Disease
@router.post("/{disease_id}/remedy", response_model=schemas.RemedyResponse)
def add_remedy(
    disease_id: int, 
    remedy: schemas.RemedyCreate, 
    db: Session = Depends(get_db)
):
    new_remedy = models.Remedy(
        disease_id=disease_id,
        type=remedy.type,
        description=remedy.description
    )
    db.add(new_remedy)
    db.commit()
    db.refresh(new_remedy)
    return new_remedy