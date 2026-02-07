# System Architecture - Agentic AI Portfolio

> Version 1.0 | February 2026 | Joel Dunson
> Aligned to: Scalable Process Modeling Reference System v1.0

## Overview

This repository implements a demonstration portfolio for Director-level Agentic AI Sales Execution Strategy capabilities. It combines a GitHub Pages front-end with webhook-driven automation pipelines that connect Tally forms, Linear project management, and GitLab CI/CD into a unified orchestration layer.

## Architecture Layers

### Layer 1: Presentation (GitHub Pages)

| Page | Path | Purpose |
|------|------|--------|
| Landing | `/index.html` | Portfolio entry point with globe visualization |
| Hub | `/hub.html` | Operations center with live signal feeds, KPIs, territory intelligence |
| Command Center | `/command-center.html` | 4-agent dashboard with pipeline tracking |
| RPA Control Center | `/rpa-control-center.html` | Task recorder, terminal bridge, agent sidebar |
| Intelligence | `/intelligence/index.html` | Luxury dark UI with radar/HUD visualization |
| 6sense Ticker | `/intelligence/6sense-ticker.html` | Intent signal ticker display |
| Signal Map | `/intelligence/live-signal-map.html` | Stratospheric aircraft visualization |
| Tools | `/tools/index.html` | Agent tools portal |
| Deep Analyst | `/tools/deep-analyst.html` | Deep research analyst interface |

**Deployment**: GitHub Pages from `main` branch, root folder (`/`)
**Live URL**: `https://joeldunson-sudo.github.io/agentic-ai-portfolio/`

### Layer 2: Agent Configurations

Stored in `/agents/` as JSON:

- `deep-signal-analyst.json` - Research agent per Scalable Process Modeling Prompt 1
- `rpa-task-executor.json` - RPA automation agent
- `workflow-orchestrator.json` - Cross-agent coordination

Each config follows the 15-Section Agent Architecture (Part II of reference doc).

### Layer 3: Automation Pipelines

#### Current Workflows (`.github/workflows/`)

- `tally-webhook-handler.yml` - Processes Tally form submissions via `repository_dispatch`

#### Planned Workflows

- `linear-webhook-handler.yml` - Processes Linear issue events
- `gitlab-webhook-handler.yml` - Processes GitLab MR/pipeline events
- `globe-activity-updater.yml` - Updates globe markers on events

### Layer 4: Data Layer

- `docs/globe-activity.json` - Activity feed for COBE globe markers
- `workflows/*.json` - Competitive analysis artifacts
- `agents/*.json` - Agent configuration state

## Integration Map

```
Tally Form --> [Webhook Relay] --> GitHub repository_dispatch --> tally-webhook-handler.yml
                                                                      |
                                                                      v
                                                              Linear API (create issue)
                                                                      |
                                                                      v
                                                           docs/globe-activity.json
                                                                      |
                                                                      v
                                                             GitHub Pages (COBE globe)

Linear Webhook --> [Webhook Relay] --> GitHub repository_dispatch --> linear-webhook-handler.yml

GitLab Webhook --> [Webhook Relay] --> GitHub repository_dispatch --> gitlab-webhook-handler.yml
```

## CRITICAL: Webhook Relay Requirement

GitHub Actions CANNOT receive inbound HTTP webhooks directly. External platforms (Tally, Linear, GitLab) must POST to an intermediary service that translates their payloads into GitHub `repository_dispatch` API calls.

### Recommended: Cloudflare Workers (Free Tier)

**Why**: Zero cold start, free 100K requests/day, global edge deployment.

The relay worker must:
1. Receive POST from external platform
2. Verify signature (platform-specific)
3. Normalize payload
4. Call `POST https://api.github.com/repos/joeldunson-sudo/agentic-ai-portfolio/dispatches`
5. Return 200 to caller

### Alternative Options

| Option | Pros | Cons |
|--------|------|------|
| Cloudflare Workers | Free, fast, no cold start | New account setup |
| Netlify Functions | Familiar if using Netlify | Cold starts, 125K/mo free |
| Vercel Serverless | Good DX | Cold starts |
| Railway/Render | Full Node.js | Monthly cost |

## Required Secrets

| Secret Name | Source | Used By |
|-------------|--------|--------|
| `LINEAR_API_KEY` | Linear > Settings > API > Personal API Keys | tally-webhook-handler.yml |
| `LINEAR_TEAM_ID` | Linear > Settings > Teams > Copy Team ID | tally-webhook-handler.yml |
| `GH_PAT_DISPATCH` | GitHub > Settings > Developer > PAT (repo scope) | Webhook relay service |
| `TALLY_SIGNING_SECRET` | Tally > Form > Webhooks > Signing Secret | Webhook relay (verification) |
| `LINEAR_WEBHOOK_SECRET` | Linear > Settings > Webhooks > Secret | Webhook relay (verification) |
| `GITLAB_WEBHOOK_TOKEN` | GitLab > Project > Settings > Webhooks | Webhook relay (verification) |

**Status**: NONE configured as of Feb 7, 2026. See `docs/SECRETS-CHECKLIST.md`.

## Alignment to Scalable Process Modeling Framework

| Framework Section | Implementation |
|-------------------|---------------|
| Part I: System Overview | This ARCHITECTURE.md document |
| Part II: 15-Section Agent Architecture | `/agents/*.json` configs |
| Part III: Confidence/Evidence System | Integrated into intelligence pages |
| Part IV: Execution Patterns (RPA) | `/rpa-control-center.html` + workflows |
| Part V: Production Prompts | `/tools/deep-analyst.html` |
| Part VIII: Website Demonstration | Full site architecture |
| Part IX: Versioning/Maintenance | This docs structure + git history |
| Part X: Web Build Agent Activation | Site built per activation prompt spec |

## File Tree

```
agentic-ai-portfolio/
|-- .github/workflows/
|   |-- tally-webhook-handler.yml
|-- .local-state/
|-- agents/
|   |-- deep-signal-analyst.json
|   |-- rpa-task-executor.json
|   |-- workflow-orchestrator.json
|-- assets/
|   |-- enhance.css
|   |-- enhance.js
|   |-- globe-skin.css
|   |-- hub.css
|-- docs/
|   |-- ARCHITECTURE.md          <-- You are here
|   |-- EXECUTION-RUNBOOK.md
|   |-- SECRETS-CHECKLIST.md
|   |-- globe-activity.json
|-- intelligence/
|   |-- index.html
|   |-- 6sense-ticker.html
|   |-- live-signal-map.html
|-- tools/
|   |-- index.html
|   |-- deep-analyst.html
|-- workflows/
|   |-- competitive-analysis-report.md
|   |-- competitive-analysis-tungsten-2026.json
|-- command-center.html
|-- hub.html
|-- index.html
|-- rpa-control-center.html
|-- README.md
```
