from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    model_api_key: Optional[str] = None
    model_name: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    model_api_url: str = "https://api.groq.com/openai/v1/chat/completions"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()
