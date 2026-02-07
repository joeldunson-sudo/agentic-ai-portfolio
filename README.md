# Agentic AI Portfolio

**Director, Sales Execution Strategy - Capability Demonstration**
Joel Dunson | Tungsten Automation | February 2026

## Live Demo

| Page | URL |
|------|-----|
| Portfolio Landing | [joeldunson-sudo.github.io/agentic-ai-portfolio](https://joeldunson-sudo.github.io/agentic-ai-portfolio/) |
| Operations Hub | [hub.html](https://joeldunson-sudo.github.io/agentic-ai-portfolio/hub.html) |
| Agent Command Center | [command-center.html](https://joeldunson-sudo.github.io/agentic-ai-portfolio/command-center.html) |
| RPA Control Center | [rpa-control-center.html](https://joeldunson-sudo.github.io/agentic-ai-portfolio/rpa-control-center.html) |
| Intelligence Dashboard | [intelligence/](https://joeldunson-sudo.github.io/agentic-ai-portfolio/intelligence/) |
| Tools Portal | [tools/](https://joeldunson-sudo.github.io/agentic-ai-portfolio/tools/) |

## What This Demonstrates

This portfolio is a working prototype of the systems described in the **Scalable Process Modeling Agentic Prompt Engineering Reference System v1.0**. It shows:

1. **Multi-agent orchestration** - 4 specialized agents (Deep Signal Analyst, RPA Task Executor, Workflow Orchestrator, Website Enhancer) coordinating through a central hub
2. **Webhook-driven automation** - Tally forms trigger GitHub Actions workflows that create Linear issues and update a live globe visualization
3. **Territory intelligence** - Real-time signal feeds, intent scoring, and buying stage tracking for enterprise accounts
4. **Process modeling in practice** - Every component maps to the 15-Section Agent Architecture framework

## Architecture

```
Tally Form --> [Webhook Relay] --> GitHub Actions --> Linear Issue
                                       |                  |
                                       v                  v
                                  Globe Activity     Status Update
                                       |
                                       v
                                  GitHub Pages
```

Full architecture documentation: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## Project Structure

```
agentic-ai-portfolio/
|-- .github/workflows/       # GitHub Actions automation
|   |-- tally-webhook-handler.yml
|-- agents/                  # Agent configuration files
|   |-- deep-signal-analyst.json
|   |-- rpa-task-executor.json
|   |-- workflow-orchestrator.json
|-- assets/                  # CSS and JS enhancements
|-- docs/                    # Project documentation
|   |-- ARCHITECTURE.md      # System architecture & integration map
|   |-- EXECUTION-RUNBOOK.md # Step-by-step operational guide
|   |-- SECRETS-CHECKLIST.md # Credentials setup guide
|   |-- globe-activity.json  # COBE globe marker data
|-- intelligence/            # Intelligence dashboard pages
|-- tools/                   # Agent tools interface
|-- workflows/               # Analysis artifacts
|-- hub.html                 # Main operations center
|-- command-center.html      # 4-agent dashboard
|-- rpa-control-center.html  # RPA task recorder
|-- index.html               # Portfolio landing page
```

## Quick Start

1. **View the live site**: Visit the [Portfolio Landing](https://joeldunson-sudo.github.io/agentic-ai-portfolio/)
2. **Set up integrations**: Follow [`docs/EXECUTION-RUNBOOK.md`](docs/EXECUTION-RUNBOOK.md)
3. **Configure secrets**: Follow [`docs/SECRETS-CHECKLIST.md`](docs/SECRETS-CHECKLIST.md)

## Technology

- **Frontend**: Static HTML/CSS/JS on GitHub Pages (no build step)
- **Automation**: GitHub Actions workflows triggered via `repository_dispatch`
- **Project Management**: Linear (GraphQL API)
- **Forms**: Tally (webhook integration)
- **Visualization**: COBE globe, custom CSS animations
- **Agent Configs**: JSON-based, following 15-Section Agent Architecture

## Framework Alignment

This project implements patterns from the **Scalable Process Modeling** reference:

| Framework Part | Implementation |
|---------------|---------------|
| Part II: Agent Architecture | `/agents/*.json` configs |
| Part III: Confidence System | Intelligence dashboard scoring |
| Part IV: Execution Patterns | Workflow automation pipelines |
| Part V: Production Prompts | Deep Analyst tool interface |
| Part VIII: Website Demo | Full site architecture |
| Part IX: Versioning | `docs/` folder + git history |
