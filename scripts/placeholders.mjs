/**
 * Lists every [square-bracket] placeholder in messages/en.json and content/*.ts.
 * Run `node scripts/placeholders.mjs` and paste the output into PLACEHOLDERS.md
 * after editing copy, so the list never drifts from the site.
 */
import { readFileSync, readdirSync } from "node:fs";

const rows = [];
const seen = new Map();

function walk(value, path) {
  if (typeof value === "string") {
    const found = value.match(/\[[^\]]+\]/g);
    if (!found) return;
    for (const token of found) {
      if (token === "[AR]") continue;
      const list = seen.get(token) ?? [];
      list.push(path);
      seen.set(token, list);
    }
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k);
  }
}

walk(JSON.parse(readFileSync("messages/en.json", "utf8")), "");

for (const file of readdirSync("content")) {
  const src = readFileSync(`content/${file}`, "utf8");
  for (const m of src.matchAll(/"(\[[^\]]+\])"/g)) {
    const list = seen.get(m[1]) ?? [];
    list.push(`content/${file}`);
    seen.set(m[1], list);
  }
}

for (const [token, paths] of [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  rows.push(
    `| \`${token.replace(/\|/g, "\\|")}\` | ${[...new Set(paths)].map((p) => `\`${p}\``).join("<br>")} |`,
  );
}

console.log("| Placeholder | Where it is used |");
console.log("| --- | --- |");
console.log(rows.join("\n"));
console.error(`${seen.size} distinct placeholders`);
