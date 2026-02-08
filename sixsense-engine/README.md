# SixSense Engine

Autonomous intelligence platform for the Agentic AI Portfolio.

## Quick Start

pip install -r requirements.txt
python cli.py status
python cli.py intel
python cli.py sync

## Structure

- **agents/** - Orchestrator, Researcher, Writer autonomous agents
- **connectors/** - GitHub and GitLab API connectors
- **pipelines/** - Intel and Content processing pipelines
- **ingest/** - Data ingestion from 6sense, Salesforce, CSV
- **warehouse/** - Data storage and schema management
- **engine/** - Riddles and pattern detection engine
- **api/** - HTTP API server
- **site/** - Website publisher
- **tests/** - Test suite

## Commands

| Command | Description |
|---------|-------------|
| python cli.py status | Show engine status |
| python cli.py intel | Run intelligence pipeline |
| python cli.py sync | Sync all agents and connectors |
| make test | Run test suite |
