from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class PropertyAsset:
    asset_id: str
    last_valuation_usd: float
    latest_evidence_usd: float
    days_since_comp_refresh: int
    rent_roll_variance_percent: float
    cap_rate_move_bps: int
    listing_mismatch_count: int


def score_asset(asset: PropertyAsset) -> float:
    gap_percent = ((asset.last_valuation_usd - asset.latest_evidence_usd) / asset.last_valuation_usd) * 100
    score = (
        max(0, gap_percent) * 4.2
        + asset.days_since_comp_refresh * 0.42
        + asset.rent_roll_variance_percent * 2.8
        + asset.cap_rate_move_bps * 0.22
        + asset.listing_mismatch_count * 5.5
    )
    return round(max(0, min(100, score)), 2)


def posture(score: float) -> str:
    if score >= 64:
        return "reprice"
    if score >= 34:
        return "watch"
    return "stable"
