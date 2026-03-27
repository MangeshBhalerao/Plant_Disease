from typing import Optional

from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = Field(validation_alias=AliasChoices("DATABASE_URL", "database_url"))
    secret_key: str = Field(default="dev-only-secret-key-change-me", validation_alias=AliasChoices("SECRET_KEY", "secret_key"))
    algorithm: str = Field(default="HS256", validation_alias=AliasChoices("ALGORITHM", "algorithm"))
    access_token_expire_minutes: int = Field(default=30, validation_alias=AliasChoices("ACCESS_TOKEN_EXPIRE_MINUTES", "access_token_expire_minutes"))
    frontend_url: Optional[str] = Field(default=None, validation_alias=AliasChoices("FRONTEND_URL", "frontend_url"))
    frontend_urls: Optional[str] = Field(default=None, validation_alias=AliasChoices("FRONTEND_URLS", "frontend_urls"))
    model_api_key: Optional[str] = Field(default=None, validation_alias=AliasChoices("MODEL_API_KEY", "model_api_key"))
    model_name: str = Field(default="meta-llama/llama-4-scout-17b-16e-instruct", validation_alias=AliasChoices("MODEL_NAME", "model_name"))
    model_api_url: str = Field(default="https://api.groq.com/openai/v1/chat/completions", validation_alias=AliasChoices("MODEL_API_URL", "model_api_url"))
    cloudinary_api_key: Optional[str] = Field(default=None, validation_alias=AliasChoices("CLOUDINARY_API_KEY", "cloudinary_api_key"))
    cloudinary_secret_key: Optional[str] = Field(default=None, validation_alias=AliasChoices("CLOUDINARY_SECRET_KEY", "cloudinary_secret_key"))
    cloudinary_cloud_name: Optional[str] = Field(default=None, validation_alias=AliasChoices("CLOUDINARY_CLOUD_NAME", "cloudinary_cloud_name"))
    cloudinary_upload_preset: Optional[str] = Field(default=None, validation_alias=AliasChoices("CLOUDINARY_UPLOAD_PRESET", "cloudinary_upload_preset"))

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
