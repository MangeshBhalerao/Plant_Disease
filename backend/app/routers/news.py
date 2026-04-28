from fastapi import APIRouter

from .. import schemas
from ..news_service import fetch_news_headlines


router = APIRouter(
    prefix="/news",
    tags=["news"],
)


@router.get("/ticker", response_model=schemas.NewsTickerResponse)
def get_news_ticker():
    headlines, live = fetch_news_headlines()
    return {
        "headlines": headlines,
        "source": "Google News RSS" if live else "fallback",
        "live": live,
    }
