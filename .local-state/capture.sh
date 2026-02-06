#!/bin/zsh
set -e
ts=$(date +"%Y%m%d_%H%M%S")
f=".local-state/session_${ts}.txt"
{
  echo "Timestamp: $(date)"
  echo "Dir: $(pwd)"
  echo "Branch: $(git branch --show-current 2>/dev/null || echo N/A)"
  echo ""
  echo "Top processes:"
  ps aux | egrep 'node|npm|python|code' | egrep -v 'egrep|grep' | head -20
  echo ""
  echo "Recent commands:"
  fc -l -30
} > "$f"
ls -t .local-state/session_*.txt 2>/dev/null | tail -n +21 | xargs -I{} rm -f "{}" 2>/dev/null || true
echo "Saved: $f"
