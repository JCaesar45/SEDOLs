# SEDOL Forge

A minimal, correct implementation of the SEDOL check digit algorithm
across four runtimes: browser JavaScript, Python, TypeScript, and Java.

## What SEDOL Is

SEDOL (Stock Exchange Daily Official List) is a 7-character identifier
for securities traded on the London Stock Exchange. The first six
characters are alphanumeric; the seventh is a check digit computed from
the first six.

## Algorithm

- Weights: [1, 3, 1, 7, 3, 9] applied left to right.
- Character values: digits 0-9 map to 0-9. Consonants B-Z map to 11-35,
  with vowels (A, E, I, O, U) excluded from the valid set.
- Check digit: (10 - (sum % 10)) % 10.

Sources: London Stock Exchange SEDOL specification, Debian manpages for
CheckDigits::M10_008, and the Rosetta Code SEDOL task.

## Running

### Frontend
Open `index.html` in any modern browser. No server required.

### Python API
```
pip install fastapi uvicorn
uvicorn backend.sedol_api:app --reload
```
Then: `GET http://localhost:8000/sedol/710889`

### Java
```
javac shared/SedolValidator.java
java SedolValidator
```

### TypeScript
Import `computeCheckDigit` or `completeSedol` into any TypeScript
project.

## Test Cases (from Rosetta Code)

| Input  | Expected |
|--------|----------|
| 710889 | 7108899  |
| B0YBKJ | B0YBKJ7  |
| B00030 | B000300  |
| BOATER | null     |

## Limitations

The SEDOL algorithm is simple. This project implements it correctly
and presents it cleanly. It is not a production trading system, it does
not connect to any exchange, and it does not validate against a live
SEDOL masterfile. It computes and validates check digits. That is all
it claims to do.
