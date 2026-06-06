import { describe, expect, it } from "vitest";
import fixture from "../fixtures/valuation-drift.json" with { type: "json" };
import { buildValuationSummary, scoreAsset, type PropertyAsset, type ValuationInput } from "../src/index.js";

describe("proptech valuation drift monitor", () => {
  it("prioritizes assets that need repricing evidence", () => {
    const summary = buildValuationSummary(fixture as ValuationInput);
    expect(summary.repriceAssets).toBe(2);
    expect(summary.findings[0].assetId).toBe("urban-mixed-use-12");
    expect(summary.primaryRecommendation).toContain("Refresh comps");
  });

  it("keeps stable assets below repricing threshold", () => {
    const finding = scoreAsset((fixture as ValuationInput).assets[1]);
    expect(finding.posture).toBe("watch");
    expect(finding.valuationGapUsd).toBe(1200000);
  });

  it("marks clean valuation evidence as stable", () => {
    const stable: PropertyAsset = {
      assetId: "clean-suburban-office",
      segment: "Office",
      lastValuationUsd: 21000000,
      latestEvidenceUsd: 21050000,
      daysSinceCompRefresh: 4,
      rentRollVariancePercent: 0.4,
      capRateMoveBps: 4,
      listingMismatchCount: 0,
      owner: "Asset management",
      nextAction: "Keep current evidence packet attached."
    };
    expect(scoreAsset(stable).posture).toBe("stable");
  });

  it("requires at least one property asset", () => {
    expect(() => buildValuationSummary({ asOf: "2026-06-06T08:00:00Z", market: "empty", assets: [] })).toThrow(
      "At least one property asset is required."
    );
  });
});
