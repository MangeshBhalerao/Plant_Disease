from fastapi import APIRouter

from ..cloudinary_service import cloudinary_is_configured
from ..config import settings
from ..nearby_stores_service import google_places_is_configured


router = APIRouter(
    prefix="/health",
    tags=["health"],
)


@router.get("/config")
def get_config_health():
    return {
        "google_maps_configured": google_places_is_configured(),
        "google_maps_key_length": len(settings.google_maps_api_key or ""),
        "cloudinary_configured": cloudinary_is_configured(),
        "database_configured": bool(settings.database_url),
        "frontend_url_configured": bool(settings.frontend_url or settings.frontend_urls),
    }
