import base64
import json
from pathlib import Path
from typing import Any

import httpx

from .config import settings


def _encode_image(image_path: Path) -> str:
    return base64.b64encode(image_path.read_bytes()).decode("utf-8")


def _extract_json_payload(content: str) -> dict[str, Any]:
    content = content.strip()
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        start = content.find("{")
        end = content.rfind("}")
        if start != -1 and end != -1 and end > start:
            return json.loads(content[start:end + 1])
        raise


def analyze_plant_image(image_path: Path) -> dict[str, Any]:
    if not settings.model_api_key:
        return {
            "crop_type": "Unknown",
            "disease_name": "Wheat Rust",
            "confidence": 95,
            "reasoning": "MODEL_API_KEY is not configured yet, so a fallback placeholder diagnosis was used.",
            "remedy": "Add MODEL_API_KEY to backend/.env to enable Groq vision reasoning.",
        }

    base64_image = _encode_image(image_path)
    headers = {
        "Authorization": f"Bearer {settings.model_api_key}",
        "Content-Type": "application/json",
    }
    prompt = (
        "You are an agricultural plant disease assistant. Analyze the leaf image and respond as strict JSON only. "
        "Return keys: crop_type, disease_name, confidence, reasoning, remedy. "
        "confidence must be an integer from 0 to 100. "
        "reasoning should be 2 to 4 short sentences explaining the visible symptoms behind the diagnosis. "
        "If uncertain, say so clearly but still provide your best estimate."
    )
    payload = {
        "model": settings.model_name,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        "temperature": 0.2,
        "max_completion_tokens": 700,
        "response_format": {"type": "json_object"},
    }

    with httpx.Client(timeout=60.0) as client:
        response = client.post(settings.model_api_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

    content = data["choices"][0]["message"]["content"]
    parsed = _extract_json_payload(content)

    return {
        "crop_type": str(parsed.get("crop_type") or "Unknown").strip() or "Unknown",
        "disease_name": str(parsed.get("disease_name") or "Unknown Disease").strip() or "Unknown Disease",
        "confidence": max(0, min(100, int(float(parsed.get("confidence", 0))))),
        "reasoning": str(parsed.get("reasoning") or "No reasoning provided.").strip(),
        "remedy": str(parsed.get("remedy") or "No remedy provided.").strip(),
    }
