from html import unescape
from typing import Any
from xml.etree import ElementTree

import httpx

from .config import settings


FALLBACK_HEADLINES = [
    "New plant disease alerts and crop care updates will appear here",
    "Farmers are advised to inspect leaves regularly during humid weather",
    "Early detection improves treatment success for common crop infections",
    "Use recommended dosage and safety guidance before applying any pesticide",
]


def _clean_text(value: str | None) -> str:
    return unescape((value or "").strip())


def fetch_news_headlines(limit: int = 8) -> tuple[list[str], bool]:
    try:
        with httpx.Client(timeout=8.0, follow_redirects=True) as client:
            response = client.get(settings.news_rss_url)
            response.raise_for_status()

        root = ElementTree.fromstring(response.text)
        headlines: list[str] = []

        for item in root.findall(".//item"):
            title = _clean_text(item.findtext("title"))
            if title and title not in headlines:
                headlines.append(title)
            if len(headlines) >= limit:
                break

        return (headlines or FALLBACK_HEADLINES[:limit], bool(headlines))
    except (httpx.HTTPError, ElementTree.ParseError, ValueError):
        return FALLBACK_HEADLINES[:limit], False
