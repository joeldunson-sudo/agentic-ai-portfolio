# Runbook: Deploy RPA Agent - Team Orchestrator

**Version**: 1.0.0  
**Last Updated**: 2026-02-07  
**Owner**: Joel Dunson / GTM Operations  

---

## 1. Start / Stop / Restart

### Start (Initial Deploy)

1. Clone repository: `git clone https://github.com/joeldunson-sudo/agentic-ai-portfolio.git`
2. Navigate to engine: `cd sixsense-engine`
3. Copy env file: `cp .env.example .env`
4. Configure vault keys in `.env` (resolve from enterprise vault)
5. Start services: `docker-compose up -d`
6. Verify health: `curl http://localhost:8000/health`
7. Run initial data load: `curl -X POST http://localhost:8000/api/v1/signals/batch`

### Stop

1. Gracefully stop: `docker-compose down`
2. Verify containers stopped: `docker ps | grep sixsense`
3. If stuck: `docker-compose down --remove-orphans --timeout 30`

### Restart

1. `docker-compose restart`
2. Wait 10 seconds for services to stabilize
3. Verify health: `curl http://localhost:8000/health`

---

## 2. Health Checks and Smoke Tests

### Post-Deployment Health Check

| Check | Command | Expected |
|-------|---------|----------|
| API health | `GET /health` | `200 OK` |
| Database connection | `GET /health` (includes DB check) | `db: connected` |
| Signal batch endpoint | `POST /api/v1/signals/batch` | `200 OK` |
| Territory data loaded | Check record count | 228 rows |

### Smoke Test Sequence

1. **Data integrity**: Query territory accounts, verify 228 records loaded
2. **Buying stage distribution**: Confirm Purchase, Decision, Consideration stages present
3. **Industry coverage**: Verify Software, Healthcare, Education, Financial Services represented
4. **State coverage**: Confirm California, Washington, Arizona, Colorado, Oregon present
5. **Score computation**: Submit test signal, verify intent score computed correctly

---

## 3. Common Failure Modes

| Failure Mode | Symptoms | Root Cause | Resolution |
|-------------|----------|------------|------------|
| API unreachable | Connection refused on port 8000 | Container not running | `docker-compose up -d` |
| Database connection error | 500 errors on all endpoints | PostgreSQL down or creds wrong | Check `docker-compose logs db`, verify `DATABASE_URL` |
| Stale territory data | Record count mismatch, old accounts | CSV not updated or pipeline stalled | Re-pull CSV, rerun batch import |
| Memory exhaustion | OOM kills in container logs | Large batch processing | Increase container memory limits |
| Schema migration failure | Alembic errors on startup | Migration version mismatch | `alembic upgrade head` manually |
| API key expired | 401/403 from 6sense/Clearbit | Vault key rotation missed | Rotate keys in vault, restart service |

---

## 4. Escalation Paths

| Severity | Response Time | Who | Channel |
|----------|--------------|-----|--------|
| P1 - Service down | 15 min | Platform/DevOps on-call | PagerDuty: gtm-oncall |
| P2 - Data stale > 4h | 1 hour | RevOps + BI team | Slack: #gtm-alerts |
| P3 - Metric drift > 5% | 4 hours | RevOps | Slack: #gtm-deployments |
| P4 - Enhancement request | Next sprint | Joel Dunson + Eng | Linear: gtm-backlog |

---

## 5. Operational Procedures

### Daily Operations

- Verify scheduled exports completed (check storage for latest timestamp)
- Spot-check 2-3 key metrics against Power BI / 6sense dashboards
- Review error logs for new patterns

### Weekly Operations

- Review deployment metrics (success rate, deployment time)
- Check vault key expiration dates
- Update territory_accounts.csv if new accounts added
- Run full smoke test suite

### Monthly Operations

- Review and update runbook based on incidents
- Capacity planning review
- Security compliance audit of access controls
- Update RACI matrix if team changes occurred
