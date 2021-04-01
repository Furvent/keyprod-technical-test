/**
 * Generate id with format 1111A1111A
 */
export function generateRandomId() {
  return (
    generateRandomNumberSequence(4) +
    generateRandomChar() +
    generateRandomNumberSequence(4) +
    generateRandomChar()
  );
}

function generateRandomNumberSequence(sequenceLength) {
  let randomSequence = "";
  const numbers = "1234567890";
  for (let i = 0; i < sequenceLength; i++) {
    randomSequence += numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
  }
  return randomSequence;
}

function generateRandomChar() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
