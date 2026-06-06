# Architecture

`proptech-valuation-drift-monitor` keeps the repo intentionally small and auditable.

- `fixtures/valuation-drift.json` is the synthetic source packet.
- `src/index.ts` scores valuation drift and produces board narratives.
- `python/valuation_monitor.py` mirrors the scoring logic for analytics teams.
- `sql/valuation_drift_contract.sql` defines the reviewed evidence fields.
- `src/app.ts` renders the static proof surface used by GitHub Pages.
- `scripts/render_readme_assets.ps1` creates README screenshots.

No credentials, customer records, or live property data are required.
