import fs from "node:fs";
import { renderApp } from "../src/app.js";
import type { ValuationInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/valuation-drift.json", "utf8")) as ValuationInput;
fs.mkdirSync("site", { recursive: true });
fs.writeFileSync("site/index.html", renderApp(input));
