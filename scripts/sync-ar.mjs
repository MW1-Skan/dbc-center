/**
 * Keeps messages/ar.json in step with messages/en.json:
 * - adds any key missing in Arabic with the English text prefixed "[AR] "
 * - removes keys that no longer exist in English
 * - refreshes untranslated "[AR] …" placeholders when the English text changes
 * - never overwrites a real Arabic translation.
 */
import { readFileSync, writeFileSync } from "node:fs";

const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
const ar = JSON.parse(readFileSync("messages/ar.json", "utf8"));
let added = 0;
let removed = 0;
let refreshed = 0;

function sync(source, target) {
  const out = {};
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string") {
      const current = target?.[key];
      if (typeof current === "string" && !current.startsWith("[AR] ")) out[key] = current;
      else if (typeof current === "string") {
        out[key] = `[AR] ${value}`;
        if (current !== out[key]) refreshed++;
      } else {
        out[key] = `[AR] ${value}`;
        added++;
      }
    } else {
      out[key] = sync(value, target?.[key]);
    }
  }
  for (const key of Object.keys(target ?? {})) if (!(key in source)) removed++;
  return out;
}

writeFileSync("messages/ar.json", JSON.stringify(sync(en, ar), null, 2) + "\n");
console.log(
  `ar.json synced: ${added} added, ${refreshed} placeholders refreshed, ${removed} removed`,
);
