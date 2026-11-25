import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Smile — entry: exactly one warm emoji, nothing else.
const EMOJI = "\u{1F60A}"; // 😊 smiling face with smiling eyes

// Gate: /output/entry.txt must be UTF-8 text of 1–8 characters, not only
// whitespace — and this competition wants exactly one emoji, nothing else.
function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length !== 1) {
    throw new Error(`entry must be exactly one emoji, got ${chars.length} characters`);
  }
  if (text.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line with no newline");
  }
}

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const text = EMOJI;
  validateEntry(text);
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
