import fs from "node:fs";
import { buildValuationSummary, type ValuationInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/valuation-drift.json", "utf8")) as ValuationInput;
const summary = buildValuationSummary(input);

console.log(`market=${summary.market}`);
console.log(`gap=${summary.portfolioGapUsd}`);
console.log(`risk=${summary.averageDriftScore}`);
console.log(`reprice=${summary.repriceAssets}`);
console.log(`recommendation=${summary.primaryRecommendation}`);
