import fs from "node:fs";

const sql = fs.readFileSync("sql/valuation_drift_contract.sql", "utf8");
const required = ["asset_id", "last_valuation_usd", "latest_evidence_usd", "rent_roll_variance_percent", "cap_rate_move_bps"];
const missing = required.filter((term) => !sql.includes(term));

if (missing.length) {
  throw new Error(`SQL contract missing fields: ${missing.join(", ")}`);
}

console.log("sql contract ok");
