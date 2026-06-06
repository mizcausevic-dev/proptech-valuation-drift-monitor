export interface PropertyAsset {
  assetId: string;
  segment: string;
  lastValuationUsd: number;
  latestEvidenceUsd: number;
  daysSinceCompRefresh: number;
  rentRollVariancePercent: number;
  capRateMoveBps: number;
  listingMismatchCount: number;
  owner: string;
  nextAction: string;
}

export interface ValuationInput {
  asOf: string;
  market: string;
  assets: PropertyAsset[];
}

export interface AssetFinding extends PropertyAsset {
  valuationGapUsd: number;
  valuationGapPercent: number;
  driftScore: number;
  posture: "stable" | "watch" | "reprice";
  boardNarrative: string;
}

export interface ValuationSummary {
  asOf: string;
  market: string;
  portfolioGapUsd: number;
  averageDriftScore: number;
  repriceAssets: number;
  findings: AssetFinding[];
  primaryRecommendation: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));
const round = (value: number, places = 2): number => {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
};

export function scoreAsset(asset: PropertyAsset): AssetFinding {
  const valuationGapUsd = asset.lastValuationUsd - asset.latestEvidenceUsd;
  const valuationGapPercent = round((valuationGapUsd / asset.lastValuationUsd) * 100);
  const driftScore = round(
    clamp(
      Math.max(0, valuationGapPercent) * 4.2 +
        asset.daysSinceCompRefresh * 0.42 +
        asset.rentRollVariancePercent * 2.8 +
        asset.capRateMoveBps * 0.22 +
        asset.listingMismatchCount * 5.5
    )
  );
  const posture = driftScore >= 64 ? "reprice" : driftScore >= 34 ? "watch" : "stable";
  const boardNarrative =
    posture === "reprice"
      ? `${asset.assetId} needs repricing evidence before the next investor or lender packet.`
      : posture === "watch"
        ? `${asset.assetId} remains usable, but valuation evidence should stay owner-visible.`
        : `${asset.assetId} is stable against current comps, rent-roll, and cap-rate evidence.`;

  return { ...asset, valuationGapUsd, valuationGapPercent, driftScore, posture, boardNarrative };
}

export function buildValuationSummary(input: ValuationInput): ValuationSummary {
  if (!input.assets.length) {
    throw new Error("At least one property asset is required.");
  }
  const findings = input.assets.map(scoreAsset).sort((a, b) => b.driftScore - a.driftScore);
  const portfolioGapUsd = findings.reduce((sum, asset) => sum + asset.valuationGapUsd, 0);
  const averageDriftScore = round(findings.reduce((sum, asset) => sum + asset.driftScore, 0) / findings.length);
  const repriceAssets = findings.filter((asset) => asset.posture === "reprice").length;
  const top = findings[0];

  return {
    asOf: input.asOf,
    market: input.market,
    portfolioGapUsd,
    averageDriftScore,
    repriceAssets,
    findings,
    primaryRecommendation: `${top.assetId}: ${top.nextAction}`
  };
}
