function sedol(input) {
  // Check if input is a string of exactly 6 characters
  if (typeof input !== 'string' || input.length !== 6) {
    return null;
  }
  
  // Valid characters: digits and consonants (no vowels)
  const validChars = /^[0-9BCDFGHJKLMNPQRSTVWXYZ]+$/;
  if (!validChars.test(input)) {
    return null;
  }
  
  // Weights for each position
  const weights = [1, 3, 1, 7, 3, 9];
  
  // Calculate sum
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    const char = input[i];
    let value;
    
    if (char >= '0' && char <= '9') {
      value = parseInt(char, 10);
    } else {
      // Letter value: A=10, B=11, ... Z=35
      // But vowels are not allowed, so we use charCodeAt
      value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    }
    
    sum += value * weights[i];
  }
  
  // Calculate check digit
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return input + checkDigit;
}
