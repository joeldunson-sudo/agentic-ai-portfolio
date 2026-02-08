# Change Package Checklist: Deploy RPA Agent - Team Orchestrator

**Change ID**: CHG-2026-0207-001  
**Requested By**: Joel Dunson  
**Date**: 2026-02-07  

---

## Change Description

Deploy the global "Deploy RPA Agent - Team Orchestrator" into the agentic-ai-portfolio repository. This orchestrator manages deployment of all GTM RPA/AI agents, wired to 228 AMS West territory accounts via the SixSense Intent Engine.

---

## Risk Assessment

| Factor | Rating | Notes |
|--------|--------|-------|
| Impact | Medium | Affects agent deployment workflow for all GTM agents |
| Likelihood of failure | Low | Repo-based deployment, no live service disruption |
| Rollback complexity | Low | Git revert to prior commit |
| Data sensitivity | Medium | Territory account data (internal confidential) |
| Overall risk | Low-Medium | Standard config deployment |

---

## Pre-Deployment Checklist

- [x] Agent spec reviewed and approved (`agents/deploy-rpa-orchestrator.json`)
- [x] Environment config created with vault key references only (`config/deploy-rpa-config.json`)
- [x] No secrets stored in repository (verified)
- [x] Separation of duties enforced (deployer != approver)
- [x] Territory data schema validated (228 accounts, 10 fields)
- [x] Deployment plan created and reviewed
- [x] Runbook created with start/stop/restart procedures
- [x] Monitoring spec created with alert thresholds
- [x] RACI matrix created and approved
- [x] Rollback plan documented with clear triggers

---

## Approvers

| Role | Name | Status | Date |
|------|------|--------|------|
| Process Owner | Joel Dunson | Approved | 2026-02-07 |
| IT Owner | TBD | Pending | - |
| Security/Compliance | TBD | Pending | - |
| Change Advisory Board | TBD (required for PROD) | Pending | - |

---

## Deployment Window

| Item | Value |
|------|-------|
| Planned start | 2026-02-07 20:00 CST |
| Estimated duration | 30 minutes |
| Maintenance window | N/A (repo deployment, no downtime) |
| Rollback deadline | 2026-02-08 08:00 CST |

---

## Test Evidence

| Test | Result | Notes |
|------|--------|-------|
| JSON syntax validation | Pass | All JSON files valid |
| Agent registry compatibility | Pass | Follows existing agent schema |
| Config vault key format | Pass | All secrets use `vault:` prefix |
| Territory CSV schema | Pass | 228 rows, 10 columns verified |
| Markdown rendering | Pass | All .md files render correctly |
| Cross-reference integrity | Pass | All file paths in config resolve to real files |

---

## Back-Out Plan

1. Revert commits via `git revert` for each deployed file
2. Verify agent-registry.json returns to prior state
3. Confirm no orphaned files remain
4. Notify stakeholders of rollback via `slack:gtm-deployments`

---

## Post-Implementation Review

- [ ] All 5 deployment artefacts present in `intelligence/deployments/`
- [ ] Agent config registered in `agents/agent-registry.json`
- [ ] Config deployed to `config/deploy-rpa-config.json`
- [ ] Health checks passing
- [ ] Stakeholders notified of successful deployment
- [ ] Change ticket closed
