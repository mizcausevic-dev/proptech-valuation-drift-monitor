-- Reviewed source contract for valuation drift review.
select
  asset_id,
  segment,
  last_valuation_usd,
  latest_evidence_usd,
  days_since_comp_refresh,
  rent_roll_variance_percent,
  cap_rate_move_bps,
  listing_mismatch_count,
  owner,
  next_action
from proptech.asset_valuation_evidence
where as_of_date = current_date
  and evidence_status in ('ready', 'watch', 'reprice')
order by days_since_comp_refresh desc, cap_rate_move_bps desc;
