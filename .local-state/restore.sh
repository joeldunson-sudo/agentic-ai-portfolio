#!/bin/zsh
set -e
latest=$(ls -t .local-state/session_*.txt 2>/dev/null | head -1 || true)
if [[ -z "$latest" ]]; then
  echo "No saved session yet. Run: ./.local-state/capture.sh"
  exit 0
fi
echo "Last session file: $latest"
echo "--------------------------------"
cat "$latest"
