# 6sense -> Google Sheets -> Perplexity + Dunson Intelligence Hub
# Deployment Plan & Full Connectivity Matrix
# Generated: 2026-02-07 22:00 CST
# Agent: 6sense-Signals-to-Hub-Spine-Agent v1.0.0
# Owner: Joel Dunson / Revenue Operations

---

## DECISION: Google Sheets as Central Data Spine

No Snowflake. No S3. No Salesforce CRM.
Google Sheets is the system-of-record that connects 6sense data
to both Perplexity and the Joel Dunson Intelligence Hub.

---

## COMPLETE 6sense INTEGRATION INVENTORY (14 Categories)

Every tabular item from https://support.6sense.com/docs/integrations
evaluated for Google Sheets + Perplexity + Dunson Hub connectivity.

### TIER 1: DIRECTLY USABLE (connect now)

| # | Category | Item | How it connects to Google Sheets | Perplexity | Hub |
|---|----------|------|----------------------------------|------------|-----|
| 1 | WebTag & APIs | Company Identification API | Call API -> parse JSON -> write rows to Sheets | Query Sheets via connector | Reads latest.json built from Sheets |
| 2 | WebTag & APIs | Lead Scoring API | Real-time scores -> Sheets via Apps Script | Query Sheets | Reads latest.json |
| 3 | WebTag & APIs | API Settings: Segments & Scores | Configure which segments/scores are API-accessible | Indirect via Sheets | Indirect via Hub |
| 4 | WebTag & APIs | API Credits & Tokens | Self-service token management for all API calls | Required for all API pipes | Required for all API pipes |
| 5 | Integration Overviews | Flat File Integration (CSV/SFTP) | Export CSV from 6sense SFTP -> import to Sheets | Query Sheets | Reads latest.json |
| 6 | Integration Overviews | Real-Time Lead Scoring API | Score leads in real-time -> write to Sheets | Query Sheets | Reads latest.json |
| 7 | 6sense Platform | Segment CSV Export (download icon) | Direct CSV download from segment view -> Sheets | Query Sheets | Reads latest.json |
| 8 | Email Server | 6sense + Google Tag Manager | GTM events -> tag-based data -> Sheets via GTM | Indirect | Indirect |
| 9 | Email Server | 6sense + Google Analytics | GA reports with 6sense company data -> Sheets | Query Sheets | Reads latest.json |
| 10 | Messaging | 6sense Alerts (Slack/Email) | Alert data parsed -> appended to Sheets | Query Sheets | Reads latest.json |
| 11 | AI Email | AI Email API Overview | Non-Salesforce CRM integration via API -> Sheets | Query Sheets | Reads latest.json |

### TIER 2: USABLE WITH INTERMEDIATE TOOL (Zapier/Make/Apps Script)

| # | Category | Item | Bridge Tool | How it reaches Sheets |
|---|----------|------|-------------|----------------------|
| 12 | Intent | TrustRadius | Zapier/webhook | TrustRadius intent signals -> Zap -> Sheets |
| 13 | Intent | G2 | Zapier/webhook | G2 buyer intent -> Zap -> Sheets |
| 14 | Intent | PeerSpot | Zapier/webhook | PeerSpot intent -> Zap -> Sheets |
| 15 | Intent | Gartner Digital Markets | Zapier/webhook | Gartner intent -> Zap -> Sheets |
| 16 | Intent | Informa TechTarget | Zapier/webhook | TechTarget intent -> Zap -> Sheets |
| 17 | External | Drift (deactivated) | N/A currently | Drift integration temporarily deactivated |
| 18 | External | Folloze | Folloze webhook | Content engagement -> Zap -> Sheets |
| 19 | External | Qualified | Qualified webhook | Chat/meeting signals -> Zap -> Sheets |
| 20 | External | Sendoso | Sendoso API | Gift/mail send data -> Zap -> Sheets |
| 21 | External | PathFactory | PathFactory webhook | Content consumption -> Zap -> Sheets |
| 22 | External | ON24 | ON24 API | Webinar engagement -> Zap -> Sheets |
| 23 | External | People.ai | People.ai API | Activity capture -> Zap -> Sheets |
| 24 | External | Integrate | Integrate platform | Content syndication leads -> Zap -> Sheets |
| 25 | External | INFUSE | INFUSE API | Demand gen leads -> Zap -> Sheets |
| 26 | External | MutinyHQ | MutinyHQ webhook | Personalization data -> Zap -> Sheets |
| 27 | External | Reactful | Reactful site | Web engagement -> Zap -> Sheets |
| 28 | External | VWO | VWO integration | A/B test results w/ 6sense data -> Zap -> Sheets |
| 29 | External | Optimizely | Optimizely integration | Experiment data -> Zap -> Sheets |
| 30 | External | Uberflip | Uberflip webhook | Content hub engagement -> Zap -> Sheets |
| 31 | External | Content Square | Content Square API | Digital experience data -> Zap -> Sheets |
| 32 | External | Webflow Optimize | Webflow integration | Site personalization data -> Zap -> Sheets |
| 33 | External | Audyence | Audyence API | Audience data -> Zap -> Sheets |
| 34 | SEP | Salesloft | Salesloft API | Cadence/engagement data -> Zap -> Sheets |
| 35 | SEP | Gong | Gong API | Call intelligence -> Zap -> Sheets |
| 36 | SEP | Outreach.io | Outreach API | Sequence data -> Zap -> Sheets |
| 37 | Advertising | 6sense Display Ads | 6sense campaign reports | Campaign metrics -> CSV export -> Sheets |
| 38 | Advertising | LinkedIn Ads | 6sense + LinkedIn | Campaign performance -> CSV -> Sheets |

### TIER 3: NOT USABLE (wrong stack / requires Salesforce)

| # | Category | Item | Why excluded |
|---|----------|------|--------------|
| 39 | CRM | Salesforce (18 articles) | User explicitly excluded Salesforce |
| 40 | CRM | Microsoft Dynamics 365 (5 articles) | Not in current stack |
| 41 | CRM | HubSpot CRM (9 articles) | Not in current stack (could add later) |
| 42 | MAP | Marketo (5 articles) | Not in current stack |
| 43 | MAP | Eloqua (4 articles) | Not in current stack |
| 44 | MAP | Pardot (3 articles) | Not in current stack |
| 45 | MAP | HubSpot MAP (7 articles) | Not in current stack |
| 46 | Data Warehouse | Snowflake only (1 article) | User has no Snowflake |
| 47 | Object Storage | AWS S3 only (2 articles) | User has no S3 |
| 48 | SEP | Salesforce Sales Engagement | User excluded Salesforce |
| 49 | AI Email | Salesforce (20 articles) | User excluded Salesforce |
| 50 | AI Email | HubSpot (7 articles) | Not in current stack |
| 51 | WebTag & APIs | Adobe (4 articles) | Not in current stack |
| 52 | Sales Intelligence | Salesforce install (multiple) | User excluded Salesforce |
| 53 | Sales Intelligence | HubSpot install | Not in current stack |
| 54 | Sales Intelligence | MS Dynamics install | Not in current stack |

---

## ARCHITECTURE

```
6sense Platform (228 accounts, AMS West segment)
    |
    |-- [Company ID API + Lead Scoring API + Flat File CSV/SFTP]
    |-- [Segment CSV Export from UI]
    |-- [6sense Alerts]
    v
Google Sheets (SPINE)
    |-- Sheet: accounts (name, domain, location, buying_stage, visitors)
    |-- Sheet: intent_signals (account, keyword, score, date)
    |-- Sheet: scores (account, predictive_score, profile_score)
    |-- Sheet: alerts (account, alert_type, timestamp)
    |-- Sheet: activities (account, activity, source, date)
    |
    |-----> Perplexity Enterprise
    |       (Google Drive connector reads Sheets)
    |       (Can answer: who is surging? what accounts to prioritize?)
    |
    |-----> Dunson Intelligence Hub (GitHub Pages)
    |       (GitHub Action: Sheets -> CSV -> build_latest.py -> latest.json)
    |       (Hub reads latest.json for dashboard, ticker, signal map)
    |
    |-----> Google Apps Script (automation layer)
            (Scheduled: pull 6sense API -> update Sheets every 15 min)
            (Trigger: on new row -> rebuild latest.json via GitHub API)
```

---

## DEPLOYMENT CHECKLIST

### Phase 1: Google Sheets Spine (Day 1)
1. Create Google Sheet: "6sense-Intelligence-Spine"
2. Create tabs: accounts, intent_signals, scores, alerts, activities
3. Define column headers matching 6sense export schema
4. Manually export AMS West segment (228 accounts) CSV from 6sense UI
5. Import CSV into accounts tab
6. Validate data: name, domain, location, buying_stage, visitors

### Phase 2: API Automation (Day 2-3)
1. Obtain 6sense API token from Settings > API Token Management
2. Create Google Apps Script project attached to the Sheet
3. Script 1: Company Identification API -> accounts tab (scheduled)
4. Script 2: Lead Scoring API -> scores tab (scheduled)
5. Script 3: Parse 6sense alert emails -> alerts tab (trigger)
6. Set cron: every 15 minutes for API pulls
7. Test: verify data freshness and accuracy

### Phase 3: Perplexity Connection (Day 3-4)
1. Share Google Sheet to Google Drive folder: "Intelligence-Hub-Data"
2. Connect Perplexity Enterprise to Google Drive via file connector
3. Test queries: "Which accounts are in Purchase stage?"
4. Test queries: "What intent signals spiked this week?"
5. Test queries: "Summarize top 5 accounts by visitor count"
6. Validate Perplexity answers against raw Sheets data

### Phase 4: Dunson Hub Connection (Day 4-5)
1. Create build_from_sheets.py in scripts/ directory
2. Script reads Google Sheets API -> builds latest.json
3. GitHub Action: on schedule (every 30 min) -> run build script
4. latest.json lands in intelligence/data/latest.json
5. Hub index.html already reads latest.json (confirmed in repo)
6. 6sense-ticker.html already reads latest.json (confirmed)
7. live-signal-map.html already reads latest.json (confirmed)
8. Validate: hub dashboard shows current 6sense data

### Phase 5: Validation & Go-Live (Day 5)
1. End-to-end test: change in 6sense -> appears in Sheets -> Perplexity answers correctly -> Hub dashboard updates
2. Smoke test all three surfaces
3. Document runbook
4. Enable alerting (Apps Script error notifications)
5. Go live

---

## RUNBOOK

### Start
1. Enable Google Apps Script triggers (time-based, every 15 min)
2. Enable GitHub Action schedule (cron, every 30 min)
3. Verify Sheets updating with fresh data

### Stop
1. Disable Apps Script triggers
2. Disable GitHub Action schedule
3. Note last-sync timestamp

### Restart
1. Re-enable triggers
2. Run manual sync (Apps Script > Run > syncAll)
3. Run manual GitHub Action dispatch
4. Verify Sheets + Hub + Perplexity all current

### Common Failures
- API rate limit hit: reduce frequency to every 30 min
- Sheets quota exceeded: split into multiple sheets
- GitHub Action fails: check secrets, check API token expiry
- Perplexity stale answers: re-sync Drive connector
- Hub shows old data: check latest.json timestamp

---

## RACI

| Area | Responsible | Accountable | Consulted | Informed |
|------|-------------|-------------|-----------|----------|
| 6sense config | Joel Dunson | RevOps Lead | 6sense CSM | Sales team |
| Google Sheets spine | RPA Agent Team | Joel Dunson | IT | Sales team |
| Apps Script automation | RPA Agent Team | Joel Dunson | IT | RevOps |
| Perplexity connector | AI Platform Team | Joel Dunson | Security | Sales team |
| Hub integration | RPA Agent Team | Joel Dunson | DevOps | Sales team |
| Monitoring & alerts | RPA Agent Team | Joel Dunson | IT | RevOps |

---

## KEY CONSTRAINTS
- No Snowflake, no S3, no Salesforce anywhere in this plan
- Google Sheets is the single source of truth
- All 6sense data flows through Sheets before reaching Perplexity or Hub
- Perplexity connects via Google Drive file connector (not direct DB)
- Hub connects via GitHub Actions pipeline (Sheets -> JSON -> GitHub)
- Secrets stored in GitHub Secrets and Google Apps Script Properties (never plaintext)
