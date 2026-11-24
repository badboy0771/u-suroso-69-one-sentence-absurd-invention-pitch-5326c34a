// One-Sentence Absurd Invention Pitch
// Writes a single sentence (<= 220 chars) pitching a ridiculous invention
// that fixes a tiny everyday annoyance to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "A washing machine that mails a ransom note every time it swallows a sock, demanding one biscuit for its safe return.";

if (SENTENCE.length > 220) {
  throw new Error(`Sentence is ${SENTENCE.length} characters, over the 220 limit.`);
}
if (SENTENCE.trim().split(/[.!?]/).filter(Boolean).length !== 1) {
  throw new Error("Entry must be exactly one sentence.");
}
if (SENTENCE.includes("\n") || !/[.!?]$/.test(SENTENCE)) {
  throw new Error("Entry must be a single line ending in terminal punctuation.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");

// Read back and confirm the file holds exactly the sentence, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== SENTENCE) {
  throw new Error("Verification failed: /output/entry.txt does not match the sentence.");
}
