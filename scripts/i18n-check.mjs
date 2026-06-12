// Edu-Hub i18n parity guard (Pattern 4).
// Flattens en.json and ar.json to dotted leaf paths and diffs the key sets,
// so a missing/extra key — or a mismatched array length — fails the build.
// Run: npm run i18n:check
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "src", "content", "i18n");

function load(lang) {
  return JSON.parse(readFileSync(join(dir, `${lang}.json`), "utf8"));
}

/** Recurse objects and arrays into dotted leaf paths (array indices included,
 *  so array-of-object shape and length differences surface as key diffs). */
function flatten(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => flatten(v, `${prefix}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      flatten(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

const en = new Set(flatten(load("en")));
const ar = new Set(flatten(load("ar")));

const missingInAr = [...en].filter((k) => !ar.has(k));
const extraInAr = [...ar].filter((k) => !en.has(k));

if (missingInAr.length || extraInAr.length) {
  console.error("i18n parity FAIL");
  if (missingInAr.length) console.error("  missing in ar.json:\n   - " + missingInAr.join("\n   - "));
  if (extraInAr.length) console.error("  extra in ar.json:\n   - " + extraInAr.join("\n   - "));
  process.exit(1);
}

console.log(`i18n parity OK — ${en.size} keys match across en/ar`);
