#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"
python3 scripts/build_latest.py --accounts intelligence/data/territory_accounts.csv --out intelligence/data/latest.json
