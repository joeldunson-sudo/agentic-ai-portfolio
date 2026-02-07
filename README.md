# agentic-ai-portfolio
Director, Agentic AI Sales Execution Strategy - Capability Portfolio

## Live Portfolio

- **Main Site**: [joeldunson-sudo.github.io/agentic-ai-portfolio](https://joeldunson-sudo.github.io/agentic-ai-portfolio/)
- **RPA Control Center**: [RPA Dashboard](https://joeldunson-sudo.github.io/agentic-ai-portfolio/rpa-control-center.html)
- **Command Center**: [Command Center](https://joeldunson-sudo.github.io/agentic-ai-portfolio/command-center.html)

## Architecture

This portfolio demonstrates a multi-agent RPA orchestration system with real-time globe visualization, webhook-driven automation, and cross-platform integration.

### System Flow

```
Tally Form -> Webhook -> GitHub Actions -> Linear Issue -> Cursor Agent -> Auto-Commit
     |                        |                |                          |
     v                        v                v                          v
 Globe Marker          Pipeline Run      Status Update            Code Changes
```

## Project Structure

```
agentic-ai-portfolio/
|-- .github/workflows/          # CI/CD automation
|   |-- tally-webhook-handler.yml
|   |-- linear-cursor-sync.yml
|   |-- gitlab-sync.yml
|-- agents/                     # Agent configurations
|   |-- agent-registry.json
|   |-- deep-signal-analyst.json
|   |-- rpa-task-executor.json
|   |-- workflow-orchestrator.json
|-- assets/                     # Frontend assets
|   |-- rpa-bridge.js           # Webhook routing & globe integration
|   |-- enhance.js / enhance.css
|   |-- globe-skin.css
|-- config/                     # Integration configurations
|   |-- platforms.json
|   |-- linear-cursor.json
|   |-- webhook-routes.json
|   |-- tally-forms.json
|   |-- globe-activity-schema.json
|-- docs/                       # Data & documentation
|   |-- globe-activity.json     # Globe visualization seed data
|-- intelligence/               # Analysis reports
|-- tools/                      # Utility tools
|-- workflows/                  # Workflow definitions
|-- index.html                  # Main portfolio page
|-- rpa-control-center.html     # RPA dashboard
|-- command-center.html         # Command center
|-- hub.html                    # Central hub
```

## Integrations

### Tally Forms
Inbound client intake via Tally webhooks. Submissions automatically create Linear issues, update globe markers, and route to appropriate agents.

### Linear + Cursor
Bidirectional sync between Linear issue tracker and Cursor AI coding agent. Issues trigger automated code generation and review workflows.

### GitLab Sync
Cross-platform synchronization for merge requests, pipeline events, and CI/CD visualization.

### GitHub Actions
Three automated workflows handle the complete RPA loop:
1. **Tally Webhook Handler** - Processes form submissions
2. **Linear-Cursor Sync** - Bridges issue tracking with AI coding
3. **GitLab Sync** - Cross-platform pipeline orchestration

## RPA Bridge

The `assets/rpa-bridge.js` module connects the portfolio frontend with backend workflows:
- Loads configuration from `/config/*.json`
- Polls `/docs/globe-activity.json` for real-time updates
- Routes webhooks to appropriate GitHub Actions
- Manages agent registry and event queue
- Provides event-driven architecture with pub/sub pattern

## Setup

### Required GitHub Secrets

| Secret | Purpose |
|--------|--------|
| `TALLY_WEBHOOK_SECRET` | Verify Tally form submissions |
| `LINEAR_API_KEY` | Linear issue management |
| `GITLAB_TOKEN` | GitLab API access |
| `CURSOR_API_TOKEN` | Cursor AI agent integration |

## License

Private - All rights reserved.
