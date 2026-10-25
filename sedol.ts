const WEIGHTS: readonly number[] = [1, 3, 1, 7, 3, 9];
const VALID_PATTERN = /^[0-9BCDFGHJKLMNPQRSTVWXYZ]{6}$/;

function charValue(ch: string): number {
  const code = ch.charCodeAt(0);
  if (code >= 48 && code <= 57) return code - 48;
  return code - 55;
}

export function computeCheckDigit(code: string): number | null {
  if (!VALID_PATTERN.test(code)) return null;
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    sum += charValue(code[i]) * WEIGHTS[i];
  }
  return (10 - (sum % 10)) % 10;
}

export function completeSedol(base: string): string | null {
  const normalized = base.trim().toUpperCase();
  const digit = computeCheckDigit(normalized);
  if (digit === null) return null;
  return normalized + digit;
}
