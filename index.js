import { encrypt, decrypt } from "./lib.js";
import { executeTests } from "./tests.js";

// You can type `executeTests()` in the console to run tests.
window.executeTests = executeTests;

// Elements
const encryptBtnEl = document.getElementById("encrypt");
const decryptBtnEl = document.getElementById("decrypt");
const cryptkeyEl = document.getElementById("cryptkey");
const encryptedTextEl = document.getElementById("encrypted-text");
const decryptedTextEl = document.getElementById("decrypted-text");
const resultsTableEl = document.getElementById("results-table");
const clearResultsBtnEl = document.getElementById("clear-results");

// Initially there are no encrypt/decrypt results

// Event handlers
encryptBtnEl.addEventListener("click", () => {
  const { decryptedTextValue, rawCryptKey } = getCryptFormValues();
  if(decryptedTextValue?.length < 1) {
    return;
  }
  const newValue = encrypt(decryptedTextValue, rawCryptKey);
  appendResult({
    type: "encrypt",
    fromValue: decryptedTextValue,
    rawCryptKey,
    toValue: newValue,
    opposite: () => {
      decryptedTextEl.value = decryptedTextValue;
      cryptkeyEl.value = rawCryptValue;
    },
  });
  encryptedTextEl.value = newValue;
  decryptedTextEl.value = '';
});

function appendResult(newResult) {
  const newRow = el("tr");

  const typeValueCell = el("td");
  typeValueCell.innerText = newResult.type;
  typeValueCell.classList.add('type-value');
  newRow.appendChild(typeValueCell);

  const keyValueCell = el("td");
  keyValueCell.innerText = newResult.rawCryptKey;
  keyValueCell.classList.add('key-value');
  newRow.appendChild(keyValueCell);

  const fromValueCell = el("td");
  fromValueCell.innerText = newResult.fromValue;
  newRow.appendChild(fromValueCell);

  const toValueCell = el("td");
  toValueCell.innerText = newResult.toValue;
  newRow.appendChild(toValueCell);

  resultsTableEl.prepend(newRow);
}

decryptBtnEl.addEventListener("click", () => {
  const { encryptedTextValue, decryptedTextValue, rawCryptKey } = getCryptFormValues();
  if(encryptedTextValue?.length < 1) {
    return;
  }
  const newValue = decrypt(encryptedTextValue, rawCryptKey);
  // Add an entry to the results table
  appendResult({
    type: "decrypt",
    fromValue: encryptedTextValue,
    rawCryptKey,
    toValue: newValue,
    opposite: () => {
      decryptedTextEl.value = decryptedTextValue;
      cryptkeyEl.value = rawCryptValue; // ?
    },
  });
  decryptedTextEl.value = newValue;
  encryptedTextEl.value = '';
});

clearResultsBtnEl.addEventListener("click", () => {
  resultsTableEl.innerText = '';
});

function getCryptFormValues() {
  const decryptedTextValue = decryptedTextEl.value.trim().toUpperCase();
  const encryptedTextValue = encryptedTextEl.value.trim().toUpperCase();
  const rawCryptKey = cryptkeyEl.value.trim().toUpperCase();

  return {
    decryptedTextValue,
    encryptedTextValue,
    rawCryptKey,
  };
}

function el (...args) {
  return document.createElement.apply(document, args);
}