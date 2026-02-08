# RACI & Ownership Matrix: Deploy RPA Agent - Team Orchestrator

**Version**: 1.0.0  
**Last Updated**: 2026-02-07  

---

## RACI Legend

- **R** = Responsible (does the work)
- **A** = Accountable (owns the outcome, one per row)
- **C** = Consulted (provides input before decision)
- **I** = Informed (notified after decision)

---

## Ownership Matrix

| Area | Joel Dunson (GTM Strategy) | RevOps | BI / Analytics | DevOps / Platform | Security / Compliance | Sales Leadership | AE Org |
|------|---------------------------|--------|---------------|-------------------|----------------------|-----------------|--------|
| Orchestrator spec & agent code | R / A | C | C | C | C | I | I |
| Territory data (`territory_accounts.csv`) | R | A | C | I | I | C | I |
| SixSense engine (FastAPI service) | R | C | C | R | C | I | I |
| Config & environment promotion | R | I | I | R / A | C | I | I |
| Secrets & vault management | I | I | I | R | A | I | I |
| Data pipeline (export/ingest) | C | R | R / A | C | C | I | I |
| Perplexity Intelligence Hub wiring | R / A | C | C | C | I | I | I |
| Monitoring & alerting | C | R | C | R / A | C | I | I |
| Runbook maintenance | R / A | C | C | C | I | I | I |
| Security & compliance audit | I | I | I | C | R / A | I | I |
| Change advisory board (CAB) | C | C | C | C | R / A | I | I |
| Incident response (P1/P2) | C | C | I | R / A | C | I | I |
| Agent prompt design & GTM patterns | R / A | C | I | I | I | C | C |
| End-user training & enablement | R | R / A | I | I | I | C | I |

---

## Separation of Duties

| Rule | Enforced |
|------|----------|
| Deployer cannot be the same as approver | Yes |
| PROD deployments require CAB approval | Yes |
| Secret access requires SecOps approval | Yes |
| Schema changes require BI + RevOps sign-off | Yes |
| Agent spec changes require GTM Strategy approval | Yes |

---

## Incident Ownership

| Severity | Primary Owner | Escalation |
|----------|--------------|------------|
| P1 - Service down | DevOps / Platform | VP Engineering |
| P2 - Data quality | RevOps + BI | Head of RevOps |
| P3 - Performance | DevOps | Engineering Lead |
| P4 - Enhancement | Joel Dunson | GTM Strategy Lead |
