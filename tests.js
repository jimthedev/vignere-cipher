import { decrypt, encrypt } from "./lib.js";

export function executeTests() {
  console.log(
    "Running tests. If there are no errors in the console then they passed."
  );
  const encryptResult = encrypt("THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG", "LION");
  console.log(encryptResult);
  console.assert(
    encryptResult ===
      "EPSDFQQXMZCJYNCKUCACDWJRCBVRWINLOWU",
    "Encrypt when given a string and key"
  );
  console.assert(
    decrypt("EPSDFQQXMZCJYNCKUCACDWJRCBVRWINLOWU", "LION") ===
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
    "Decrypt when given a crypt and a key"
  );
  console.log("Tests complete.");
}
