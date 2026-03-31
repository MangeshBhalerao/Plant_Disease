from pathlib import Path
from typing import Optional

import httpx

from .config import settings


def cloudinary_is_configured() -> bool:
    return bool(
        settings.cloudinary_cloud_name
        and settings.cloudinary_api_key
        and settings.cloudinary_secret_key
    )


def upload_image_to_cloudinary(image_path: Path, public_id: Optional[str] = None) -> str:
    if not cloudinary_is_configured():
        raise RuntimeError("Cloudinary is not configured.")

    upload_url = f"https://api.cloudinary.com/v1_1/{settings.cloudinary_cloud_name}/image/upload"
    data = {
        "folder": "plant-disease/detections",
    }

    if settings.cloudinary_upload_preset:
        data["upload_preset"] = settings.cloudinary_upload_preset
    if public_id:
        data["public_id"] = public_id

    with image_path.open("rb") as image_file:
        files = {
            "file": (image_path.name, image_file, "image/jpeg"),
        }
        with httpx.Client(timeout=60.0) as client:
            if settings.cloudinary_upload_preset:
                response = client.post(
                    upload_url,
                    data=data,
                    files=files,
                )
            else:
                response = client.post(
                    upload_url,
                    data=data,
                    files=files,
                    auth=(settings.cloudinary_api_key, settings.cloudinary_secret_key),
                )

    response.raise_for_status()
    payload = response.json()
    secure_url = payload.get("secure_url")
    if not secure_url:
        raise RuntimeError("Cloudinary upload did not return a secure_url.")

    return secure_url
