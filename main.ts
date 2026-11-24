// The One-Line Exit — writes one funny one-line resignation letter.
// The letter: an office worker quits with the phrase they have typed
// a thousand times, turned back on itself as the punchline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Dear boss, I quit. I have spent four years saying 'per my last email' — today, per my last email, I am gone.";

// Gate guard: the sealed scorer wants UTF-8 text of 1 to 140
// characters, a single line, and more than whitespace.
if (
  LINE.length < 1 ||
  LINE.length > 140 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  console.error("entry fails the 1-140 character single-line gate");
  process.exit(1);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read back what was written so a truncated or altered write
// fails loudly instead of shipping a different line.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the letter");
  process.exit(1);
}
console.log(`wrote ${LINE.length} characters to ${outDir}/entry.txt`);
