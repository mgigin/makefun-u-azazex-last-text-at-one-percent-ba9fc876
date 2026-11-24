// Last Text at One Percent — entry program (v2, revised).
// Deterministic, no network, no dependencies.
// Writes the phone's final text to /output/entry.txt (or ./output/entry.txt
// as a local fallback) and validates the bounty gate in-program:
// UTF-8 text, 1-200 characters, one line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

// Revision: sharper turn — the phone chose texting over calling for help,
// and the charger gets a farewell with a double meaning ("held me").
const ENTRY =
  "1%. I spent my last percent texting you instead of calling for help. Tell the charger I loved it — it was the only one who ever held me.";

const MAX_CHARS = 200;

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, gate is 1-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (/\r|\n/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

let outDir = process.env.OUTPUT_DIR || "/output";
try {
  mkdirSync(outDir, { recursive: true });
} catch {
  outDir = "./output";
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote ${chars.length} chars to ${outDir}/entry.txt`);
