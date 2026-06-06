import fs from "node:fs";

const html = fs.readFileSync("site/index.html", "utf8");
const markers = [
  "PropTech Valuation Drift Monitor",
  "Valuation gaps become visible before investor confidence moves",
  "urban-mixed-use-12",
  "multifamily-sunbelt-8"
];
const missing = markers.filter((marker) => !html.includes(marker));

if (missing.length) {
  throw new Error(`Missing prerender markers: ${missing.join(", ")}`);
}

console.log("smoke ok");
