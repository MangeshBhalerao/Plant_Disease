import math
from typing import Any

import httpx

from .config import settings


GOOGLE_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"


def google_places_is_configured() -> bool:
    return bool(settings.google_maps_api_key)


def build_store_search_query() -> str:
    return "agriculture store fertilizer pesticide seeds nursery plant care"


def _distance_meters(
    *,
    origin_latitude: float,
    origin_longitude: float,
    place_latitude: float,
    place_longitude: float,
) -> float:
    earth_radius_meters = 6371000
    lat1 = math.radians(origin_latitude)
    lat2 = math.radians(place_latitude)
    delta_lat = math.radians(place_latitude - origin_latitude)
    delta_lng = math.radians(place_longitude - origin_longitude)

    haversine = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lng / 2) ** 2
    )
    return 2 * earth_radius_meters * math.atan2(math.sqrt(haversine), math.sqrt(1 - haversine))


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
        "locationBias": {
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
        place_latitude = location.get("latitude")
        place_longitude = location.get("longitude")

        distance_meters = None
        if isinstance(place_latitude, (int, float)) and isinstance(place_longitude, (int, float)):
            distance_meters = _distance_meters(
                origin_latitude=latitude,
                origin_longitude=longitude,
                place_latitude=place_latitude,
                place_longitude=place_longitude,
            )
            if distance_meters > settings.google_places_search_radius_meters:
                continue

        display_name = place.get("displayName", {})
        stores.append(
            {
                "name": display_name.get("text") or "Unknown Store",
                "address": place.get("formattedAddress") or "Address unavailable",
                "google_maps_url": place.get("googleMapsUri"),
                "phone_number": place.get("nationalPhoneNumber"),
                "website_url": place.get("websiteUri"),
                "latitude": place_latitude,
                "longitude": place_longitude,
                "distance_meters": round(distance_meters) if distance_meters is not None else None,
                "rating": place.get("rating"),
                "user_rating_count": place.get("userRatingCount"),
                "types": place.get("types", []),
            }
        )

    stores.sort(key=lambda store: store.get("distance_meters") or float("inf"))

    return text_query, stores
