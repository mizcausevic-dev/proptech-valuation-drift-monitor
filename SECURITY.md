# Security

This repository uses synthetic valuation evidence only.

Do not commit:

- tenant names, lease documents, investor packets, or private property records
- API keys, SSH keys, FTP credentials, or local machine paths
- raw lender, owner, or borrower identifiers

Before release, run:

```bash
npm run verify
run your standard sensitive-string and local-path scanner
```
