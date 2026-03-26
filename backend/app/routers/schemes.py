from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .. import oauth2

from app import utilis
from ..import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/schemes",
    tags=['schemes'],
)


@router.post("/", response_model=schemas.SchemeOut, status_code=status.HTTP_201_CREATED)
def create_scheme(scheme: schemas.SchemeCreate, db: Session = Depends(get_db)):
    new_scheme = models.Scheme(**scheme.dict())
    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)
    return new_scheme


@router.get("/", response_model=list[schemas.SchemeOut])
def get_schemes(db: Session = Depends(get_db)):
    schemes = db.query(models.Scheme).all()
    return schemes
