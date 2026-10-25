# sedol_api.py
# Run: pip install fastapi uvicorn
# Then: uvicorn sedol_api:app --reload
# Endpoint: GET /sedol/{code}

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SEDOL Validator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

WEIGHTS = [1, 3, 1, 7, 3, 9]
VALID_CHARS = set("0123456789BCDFGHJKLMNPQRSTVWXYZ")


def char_value(ch: str) -> int:
    if ch.isdigit():
        return int(ch)
    return ord(ch) - 55


def compute_check_digit(code: str):
    if len(code) != 6:
        return None
    for ch in code:
        if ch not in VALID_CHARS:
            return None
    total = sum(char_value(code[i]) * WEIGHTS[i] for i in range(6))
    return (10 - (total % 10)) % 10


@app.get("/sedol/{code}")
def validate_sedol(code: str):
    normalized = code.strip().upper()
    if len(normalized) != 6:
        raise HTTPException(status_code=400, detail="SEDOL base code must be exactly 6 characters")
    if not all(ch in VALID_CHARS for ch in normalized):
        raise HTTPException(status_code=400, detail="Invalid characters. Digits and consonants only.")
    digit = compute_check_digit(normalized)
    return {
        "base": normalized,
        "check_digit": digit,
        "complete": f"{normalized}{digit}",
        "valid": True,
    }
