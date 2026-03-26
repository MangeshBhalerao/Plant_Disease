from fastapi import Depends, FastAPI, status, HTTPException
import traceback 
from sqlalchemy.orm import Session
from app import oauth2, schemas
from app import utilis
from app.utilis import hash_password
from . import models
from .database import engine, get_db
from fastapi.security import OAuth2PasswordRequestForm
import shutil
import os
from fastapi import File, UploadFile
from . import oauth2  # Import the new auth file
from .routers import users ,auth ,detect,schemes,disease


#models.Base.metadata.create_all(bind=engine)


from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Agrisense API", version="1.0.0")

app.mount("/uploaded_images", StaticFiles(directory="uploaded_images"), name="uploaded_images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (update in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Agrisense API!"}


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(detect.router)
app.include_router(schemes.router)
app.include_router(disease.router)