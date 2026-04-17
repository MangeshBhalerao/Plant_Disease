from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    secret_key: str = "dev-only-secret-key-change-me"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    frontend_url: Optional[str] = None
    frontend_urls: Optional[str] = None
    model_api_key: Optional[str] = None
    model_name: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    model_api_url: str = "https://api.groq.com/openai/v1/chat/completions"
    cloudinary_api_key: Optional[str] = None
    cloudinary_secret_key: Optional[str] = None
    cloudinary_cloud_name: Optional[str] = None
    cloudinary_upload_preset: Optional[str] = None
    google_maps_api_key: Optional[str] = None
    google_places_search_radius_meters: int = 5000

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()


def get_cors_origins() -> list[str]:
    origins = {
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    }

    if settings.frontend_url:
        origins.add(settings.frontend_url.rstrip("/"))

    if settings.frontend_urls:
        for origin in settings.frontend_urls.split(","):
            cleaned = origin.strip().rstrip("/")
            if cleaned:
                origins.add(cleaned)

    return sorted(origins)
