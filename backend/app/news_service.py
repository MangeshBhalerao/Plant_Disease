from html import unescape
from typing import Any
from xml.etree import ElementTree

import httpx

from .config import settings


FALLBACK_HEADLINES = [
    {
        "title": "New plant disease alerts and crop care updates will appear here",
        "url": "https://news.google.com/search?q=plant%20disease%20agriculture%20India",
    },
    {
        "title": "Farmers are advised to inspect leaves regularly during humid weather",
        "url": "https://news.google.com/search?q=crop%20disease%20weather%20farmers",
    },
    {
        "title": "Early detection improves treatment success for common crop infections",
        "url": "https://news.google.com/search?q=early%20plant%20disease%20detection",
    },
    {
        "title": "Use recommended dosage and safety guidance before applying any pesticide",
        "url": "https://news.google.com/search?q=pesticide%20safety%20crop%20treatment",
    },
]


def _clean_text(value: str | None) -> str:
    return unescape((value or "").strip())


def fetch_news_headlines(limit: int = 8) -> tuple[list[dict[str, str]], bool]:
    try:
        with httpx.Client(timeout=8.0, follow_redirects=True) as client:
            response = client.get(settings.news_rss_url)
            response.raise_for_status()

        root = ElementTree.fromstring(response.text)
        headlines: list[dict[str, str]] = []
        seen_titles: set[str] = set()

        for item in root.findall(".//item"):
            title = _clean_text(item.findtext("title"))
            link = _clean_text(item.findtext("link"))
            if title and title not in seen_titles:
                headlines.append(
                    {
                        "title": title,
                        "url": link or settings.news_rss_url,
                    }
                )
                seen_titles.add(title)
            if len(headlines) >= limit:
                break

        return (headlines or FALLBACK_HEADLINES[:limit], bool(headlines))
    except (httpx.HTTPError, ElementTree.ParseError, ValueError):
        return FALLBACK_HEADLINES[:limit], False
