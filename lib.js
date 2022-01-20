const alphabetSize = 26;

function getCharCode(str, idx) {
  return str.charCodeAt(idx) - 65;
}

export function encrypt(str, rawKey) {
  const key = rawKey.padEnd(str.length, rawKey);
  let charCodes = [];
  for (let currentIndex = 0; currentIndex < str.length; currentIndex++) {
    // Loop this
    const strCode = getCharCode(str, currentIndex);
    const keyCode = getCharCode(key, currentIndex);
    const modResult = (strCode + keyCode) % alphabetSize;
    charCodes.push([modResult + 65]);
  }
  return String.fromCharCode(...charCodes);
}

export function decrypt(str, rawKey) {
  const key = rawKey.padEnd(str.length, rawKey);
  let charCodes = [];
  for (let currentIndex = 0; currentIndex < str.length; currentIndex++) {
    // Loop this
    const strCode = getCharCode(str, currentIndex); // E, 69 -> 4
    const keyCode = getCharCode(key, currentIndex); // L, 76 -> 11
    const difference = strCode - keyCode;
    // deal with possible negative differences
    const modResult =
      difference > 0
        ? difference % alphabetSize
        : (difference + alphabetSize) % alphabetSize;
    charCodes.push(modResult + 65);
  }
  return String.fromCharCode(...charCodes);
}
