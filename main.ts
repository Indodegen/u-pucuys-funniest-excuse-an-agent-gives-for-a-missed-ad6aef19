// Copies the one-line entry to the grading output folder.
// Paths are anchored to this file so the working directory does not matter.
// The entry must stay one line of 1-200 characters; the grader checks length.
// Nothing is printed: stdout must stay empty so only entry.txt is judged.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const text = readFileSync(sourcePath, "utf8");

// Guard the bounty rule the header comment states: one line, 1-200 chars.
// Only the trailing newline is ignored; the file is still written verbatim.
const body = text.replace(/\r?\n$/, "");
if (body.length < 1 || body.length > 200 || body.includes("\n")) {
  throw new Error("entry must be one line of 1-200 characters");
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), text);
