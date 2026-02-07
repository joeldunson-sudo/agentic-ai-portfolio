# Scaling Playbook - Agentic AI Portfolio

> Desktop reference for scaling and executing the Agentic AI Sales Execution Strategy portfolio.
> Clone this repo to ~/Desktop/agentic-ai-portfolio for local access.

## Quick Start

```bash
# Clone to Desktop
cd ~/Desktop
git clone https://github.com/joeldunson-sudo/agentic-ai-portfolio.git
cd agentic-ai-portfolio

# Open live site
open https://joeldunson-sudo.github.io/agentic-ai-portfolio/
```

## Project Map

| Page | URL | Purpose |
|------|-----|--------|
| Portfolio (index) | /index.html | Executive summary, ROI evidence, workflow |
| Hub | /hub.html | Operations center with live signals, alerts, agents |
| Command Center | /command-center.html | Multi-agent orchestration dashboard |
| RPA Control Center | /rpa-control-center.html | Task automation studio with terminal bridge |
| Intelligence | /intelligence/ | Territory intelligence with signal aggregation |
| 6sense Ticker | /intelligence/6sense-ticker.html | Live intent feed with buying stage data |
| Tools | /tools/ | Deployed apps and agent architectures |

## Scaling Checklist

### Phase 1: Foundation (Complete)
- [x] Core HTML pages deployed via GitHub Pages
- [x] COBE globe visualization on hub.html
- [x] Cross-page navigation validated
- [x] Config files for platform integrations
- [x] Documentation (ARCHITECTURE, EXECUTION-RUNBOOK, SECRETS-CHECKLIST)

### Phase 2: Integration (Next)
- [ ] Connect Linear workspace for task syncing
- [ ] Activate GitHub Actions for CI/CD automation
- [ ] Configure webhook routes (Tally, Linear, GitLab)
- [ ] Set up repository secrets (see SECRETS-CHECKLIST.md)
- [ ] Enable GitLab mirror sync

### Phase 3: Intelligence Layer
- [ ] Deploy Perplexity account research agent (app 21632dba)
- [ ] Activate deep analyst agent for 6-phase process
- [ ] Connect ZoomInfo/Bombora signal feeds
- [ ] Build real-time intent scoring pipeline

### Phase 4: Field Deployment
- [ ] Generate battle cards for top 12 accounts
- [ ] Deploy play builder framework templates
- [ ] Activate ROI calculator engine
- [ ] Scale to full AMS West territory (225 accounts)

## Config Reference

| File | Location | Contents |
|------|----------|----------|
| platforms.json | config/ | GitHub, GitLab, Linear, Tally integration settings |
| webhook-routes.json | config/ | Route mappings for /webhook/* endpoints |
| linear-cursor.json | config/ | Cursor IDE + Linear workspace sync config |
| tally-forms.json | config/ | Tally form submission handlers |
| globe-activity-schema.json | config/ | COBE globe event visualization schema |
| agent-registry.json | agents/ | Agent definitions and capability declarations |

## Execution Commands

```bash
# Capture local session state
./local-state/capture.sh

# Sync to GitLab mirror
git push gitlab main

# Deploy to GitHub Pages (automatic on push to main)
git push origin main
```

## Documentation Index

| Document | Path | Summary |
|----------|------|--------|
| README | README.md | Project overview with file tree and live links |
| Architecture | docs/ARCHITECTURE.md | System layers, integration points, data flow |
| Execution Runbook | docs/EXECUTION-RUNBOOK.md | 6-phase operational procedures |
| Secrets Checklist | docs/SECRETS-CHECKLIST.md | Required credentials and where to set them |
| Scaling Playbook | docs/SCALING-PLAYBOOK.md | This file - scaling roadmap and desktop reference |

## Key Metrics to Track

| Metric | Target | Source |
|--------|--------|--------|
| Signals Processed | 1000+/day | hub.html dashboard |
| Active Accounts | 23+ | Territory intelligence |
| Pipeline Influenced | $4.2M+ | Hub KPI cards |
| Win Rate Lift | +4pts | Command center analytics |
| Agent Confidence | >90% | Command center agents |

## Desktop Folder Structure

After cloning, your Desktop folder should contain:

```
~/Desktop/agentic-ai-portfolio/
  index.html              # Portfolio landing page
  hub.html                # Operations hub
  command-center.html     # Agent command center
  rpa-control-center.html # RPA automation studio
  config/                 # Integration configs
  docs/                   # All documentation
  intelligence/           # Territory intelligence pages
  tools/                  # Tool showcase pages
  agents/                 # Agent registry
  assets/                 # JS bridge scripts
  workflows/              # Analysis reports
  .github/workflows/      # CI/CD automation
  .local-state/           # Session capture scripts
```

---
*Last updated: February 2026*
*Maintained by: Joel Dunson*
