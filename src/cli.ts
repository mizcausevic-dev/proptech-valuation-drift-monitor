import fs from "node:fs";
import { buildValuationSummary, type ValuationInput } from "./index.js";

const inputPath = process.argv[2] ?? "fixtures/valuation-drift.json";
const format = process.argv.includes("--format=json") ? "json" : "text";
const input = JSON.parse(fs.readFileSync(inputPath, "utf8")) as ValuationInput;
const summary = buildValuationSummary(input);

if (format === "json") {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`market=${summary.market}`);
  console.log(`gap=${summary.portfolioGapUsd}`);
  console.log(`risk=${summary.averageDriftScore}`);
  console.log(`reprice=${summary.repriceAssets}`);
  console.log(`recommendation=${summary.primaryRecommendation}`);
}
