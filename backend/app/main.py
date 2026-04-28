from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import get_cors_origins
from .routers import auth, detect, disease, news, schemes, users

app = FastAPI(title="Agrisense API", version="1.0.0")

uploaded_images_dir = Path(__file__).resolve().parents[1] / "uploaded_images"
uploaded_images_dir.mkdir(parents=True, exist_ok=True)

app.mount("/uploaded_images", StaticFiles(directory=str(uploaded_images_dir)), name="uploaded_images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Agrisense API!"}


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(detect.router)
app.include_router(news.router)
app.include_router(schemes.router)
app.include_router(disease.router)
