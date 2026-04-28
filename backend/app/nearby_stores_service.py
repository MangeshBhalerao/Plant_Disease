from typing import Any

import httpx

from .config import settings


GOOGLE_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"


def google_places_is_configured() -> bool:
    return bool(settings.google_maps_api_key)


def build_store_search_query() -> str:
    return "agriculture store fertilizer pesticide seeds nursery plant care"


def search_nearby_treatment_stores(
    *,
    latitude: float,
    longitude: float,
    disease_name: str,
    remedy: str | None = None,
    limit: int = 6,
) -> tuple[str, list[dict[str, Any]]]:
    if not google_places_is_configured():
        return "", []

    text_query = build_store_search_query()

    payload = {
        "textQuery": text_query,
        "pageSize": max(1, min(limit, 10)),
        "languageCode": "en",
        "regionCode": "IN",
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": latitude,
                    "longitude": longitude,
                },
                "radius": settings.google_places_search_radius_meters,
            }
        },
    }
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": settings.google_maps_api_key or "",
        "X-Goog-FieldMask": ",".join(
            [
                "places.displayName",
                "places.formattedAddress",
                "places.googleMapsUri",
                "places.location",
                "places.types",
            ]
        ),
    }

    with httpx.Client(timeout=20.0) as client:
        response = client.post(GOOGLE_TEXT_SEARCH_URL, headers=headers, json=payload)
        response.raise_for_status()
        body = response.json()

    places = body.get("places", [])
    stores = []
    for place in places:
        location = place.get("location", {})
        display_name = place.get("displayName", {})
        stores.append(
            {
                "name": display_name.get("text") or "Unknown Store",
                "address": place.get("formattedAddress") or "Address unavailable",
                "google_maps_url": place.get("googleMapsUri"),
                "phone_number": place.get("nationalPhoneNumber"),
                "website_url": place.get("websiteUri"),
                "latitude": location.get("latitude"),
                "longitude": location.get("longitude"),
                "rating": place.get("rating"),
                "user_rating_count": place.get("userRatingCount"),
                "types": place.get("types", []),
            }
        )

    return text_query, stores
