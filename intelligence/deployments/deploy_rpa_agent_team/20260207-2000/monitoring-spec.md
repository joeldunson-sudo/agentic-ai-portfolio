# Monitoring & Alerting Spec: Deploy RPA Agent - Team Orchestrator

**Version**: 1.0.0  
**Last Updated**: 2026-02-07  

---

## 1. Metrics to Track

| Metric | Source | Unit | Collection Interval |
|--------|--------|------|--------------------|
| API response time | sixsense-engine `/health` | ms | 60s |
| Request throughput | sixsense-engine access logs | req/min | 60s |
| Success rate | API response codes | % | 60s |
| Error rate (4xx/5xx) | API response codes | % | 60s |
| Signal batch processing time | `/api/v1/signals/batch` | seconds | per-run |
| Territory account count | territory_accounts.csv | count | per-import |
| Data export freshness | storage timestamp | hours | 15min |
| Queue depth | pending signal jobs | count | 60s |
| Database connection pool | PostgreSQL pool stats | active/idle | 60s |
| Container memory usage | Docker/K8s metrics | MB | 30s |
| Container CPU usage | Docker/K8s metrics | % | 30s |
| Deployment success rate | CI/CD pipeline | % | per-deploy |
| Rollback frequency | deployment logs | count/week | daily |

---

## 2. Alert Thresholds

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| API down | Health check fails 3 consecutive times | P1 - Critical | PagerDuty + Slack |
| High error rate | Error rate > 5% for 5 min | P2 - High | Slack + Email |
| Slow response | p95 latency > 2000ms for 5 min | P2 - High | Slack |
| Data stale | Export timestamp > 4 hours old | P2 - High | Slack + Email |
| Record count drift | Territory count deviates > 5% from expected (228) | P3 - Medium | Slack |
| Memory warning | Container memory > 80% limit | P3 - Medium | Slack |
| Memory critical | Container memory > 95% limit | P1 - Critical | PagerDuty |
| Batch failure | Signal batch returns non-200 | P2 - High | Slack + Email |
| Deployment failure | CI/CD pipeline fails on main | P2 - High | Slack + Email |
| Vault key expiring | Key expiry < 7 days | P3 - Medium | Email to SecOps |

---

## 3. Alert Destinations

| Channel | Type | Recipients | Used For |
|---------|------|-----------|----------|
| `slack:gtm-alerts` | Slack | GTM Ops team | P1/P2 alerts |
| `slack:gtm-deployments` | Slack | All GTM stakeholders | Deploy events, rollbacks |
| `email:revops-team` | Email | RevOps distribution list | Daily summaries, P2+ alerts |
| `email:platform-team` | Email | Platform/DevOps team | Infrastructure alerts |
| `pagerduty:gtm-oncall` | PagerDuty | On-call engineer | P1 only |
| `linear:gtm-backlog` | Linear | Engineering | Auto-create tickets for P3+ |

---

## 4. Log Sources

| Source | Location | Retention | Access |
|--------|----------|-----------|--------|
| API access logs | sixsense-engine stdout | 90 days | `docker-compose logs api` or centralized logging |
| Database query logs | PostgreSQL logs | 30 days | `docker-compose logs db` |
| Deployment logs | GitHub Actions | 90 days | Actions tab in repo |
| Error traces | Application stderr | 90 days | Centralized logging / Sentry |
| Audit logs | Git commit history | Permanent | `git log` |
| Export pipeline logs | Scheduler/CronJob output | 30 days | Scheduler dashboard |

---

## 5. Dashboard Links

| Dashboard | URL | Purpose |
|-----------|-----|--------|
| Command Center | `/command-center.html` | Agent status overview |
| Intelligence Hub | `/hub.html` | Territory intelligence |
| RPA Control Center | `/rpa-control-center.html` | RPA task execution |
| 6sense Ticker | `/intelligence/6sense-ticker.html` | Live signal feed |
| Live Signal Map | `/intelligence/live-signal-map.html` | Geographic signal view |
| GitHub Actions | Repository Actions tab | CI/CD pipeline status |
