# Execution Runbook - Agentic AI Portfolio

> Version 1.0 | February 2026 | Step-by-step operational guide
> Follows: Pre-Flight Validation Gate (Part IV, Section 4.1)

## Pre-Flight Checklist

Before executing ANY step, confirm:

- [ ] GitHub repo `joeldunson-sudo/agentic-ai-portfolio` is accessible
- [ ] GitHub Pages is active at `https://joeldunson-sudo.github.io/agentic-ai-portfolio/`
- [ ] You have admin access to the repository
- [ ] You have a Linear account (or plan to create one)
- [ ] You have a Tally account (or plan to create one)

---

## PHASE 1: Foundation (30 min)

### Step 1.1: Configure Repository Secrets

**Time**: 15 min | **Priority**: CRITICAL

Navigate to: `Settings > Secrets and variables > Actions > New repository secret`

Add these secrets (see `SECRETS-CHECKLIST.md` for how to obtain each value):

```
LINEAR_API_KEY       = lin_api_xxxxxxxxxxxxxxxx
LINEAR_TEAM_ID       = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GH_PAT_DISPATCH      = ghp_xxxxxxxxxxxxxxxxxxxx
```

**Validation**: Go to Settings > Secrets. Confirm 3 secrets listed.

### Step 1.2: Test Tally Workflow (Manual Dispatch)

**Time**: 5 min | **Depends on**: Step 1.1

Trigger a test `repository_dispatch` event using curl:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GH_PAT_DISPATCH" \
  https://api.github.com/repos/joeldunson-sudo/agentic-ai-portfolio/dispatches \
  -d '{"event_type": "tally_submission", "client_payload": {"data": {"fields": [{"key": "requestType", "value": "Bug Report"}, {"key": "name", "value": "Test User"}, {"key": "email", "value": "test@test.com"}, {"key": "priority", "value": "high"}]}}}'
```

**Validation**: Check Actions tab. "Tally Form Submission Handler" should show a run.

### Step 1.3: Verify Hub CSS Fix

**Time**: 2 min

Navigate to: `https://joeldunson-sudo.github.io/agentic-ai-portfolio/hub.html`

**Validation**: No raw CSS text visible at top of page. All styles render correctly.

---

## PHASE 2: Webhook Relay (45 min)

### Step 2.1: Choose Relay Platform

**Decision Point** (per Part IV, Section 4.3 - Adaptive Branching):

| IF you have... | THEN use... | Setup time |
|----------------|-------------|------------|
| Cloudflare account | Cloudflare Workers | 20 min |
| Netlify account | Netlify Functions | 25 min |
| Vercel account | Vercel Serverless | 25 min |
| None of the above | Cloudflare Workers (free signup) | 30 min |

### Step 2.2: Deploy Webhook Relay

The relay function must handle 3 routes:

```
POST /webhook/tally    -> Verify Tally signature -> repository_dispatch(tally_submission)
POST /webhook/linear   -> Verify Linear signature -> repository_dispatch(linear_event)
POST /webhook/gitlab   -> Verify GitLab token -> repository_dispatch(gitlab_event)
```

Core relay logic (platform-agnostic pseudocode):

```javascript
// 1. Receive POST
// 2. Identify source from URL path
// 3. Verify signature using platform-specific method
// 4. Call GitHub API:
//    POST /repos/joeldunson-sudo/agentic-ai-portfolio/dispatches
//    Headers: Authorization: token GH_PAT_DISPATCH
//    Body: { event_type: "<source>_event", client_payload: <normalized_data> }
// 5. Return 200
```

**Validation**: Send test POST to relay URL. Check GitHub Actions for triggered run.

### Step 2.3: Wire Tally Form to Relay

1. Go to Tally dashboard
2. Open your intake form
3. Settings > Webhooks
4. Add webhook URL: `https://your-relay.workers.dev/webhook/tally`
5. Enable signing secret (copy to `TALLY_SIGNING_SECRET` in relay env vars)

**Validation**: Submit test form. Verify GitHub Actions run triggers.

---

## PHASE 3: Linear Integration (20 min)

### Step 3.1: Create Linear Workspace

IF you don't have a Linear workspace:
1. Go to `https://linear.app/`
2. Create workspace: "Agentic AI Portfolio"
3. Create team: "Portfolio Ops"
4. Note the Team ID from Settings > Teams

### Step 3.2: Generate Linear API Key

1. Linear > Settings > API > Personal API Keys
2. Create key with description: "GitHub Actions Integration"
3. Copy key to GitHub repo secret `LINEAR_API_KEY`

### Step 3.3: Configure Linear Webhook (Optional)

1. Linear > Settings > API > Webhooks
2. Add webhook URL: `https://your-relay.workers.dev/webhook/linear`
3. Select events: Issue created, Issue updated, Issue completed
4. Copy signing secret to relay env vars

**Validation**: Create a test issue in Linear. Verify webhook fires to relay.

---

## PHASE 4: Globe Visualization (45 min)

### Step 4.1: Add COBE Globe to Hub

The `docs/globe-activity.json` already has seed data. The COBE globe component needs to be added to `hub.html` or a dedicated globe page.

COBE library: `https://esm.sh/cobe` (ESM import, no build step needed)

The globe should:
- Fetch `docs/globe-activity.json` on load
- Render markers at lat/lng coordinates from the data
- Color-code markers by platform (tally=blue, linear=green, gitlab=orange)
- Auto-rotate and allow drag interaction

### Step 4.2: Test Globe with Live Data

1. Trigger a Tally submission (via relay or manual dispatch)
2. Wait for GitHub Actions to update `globe-activity.json`
3. Reload hub page
4. Verify new marker appears on globe

**Validation**: Globe renders, markers visible, data refreshes.

---

## PHASE 5: Additional Workflows (40 min)

### Step 5.1: Add Linear Webhook Handler

Create `.github/workflows/linear-webhook-handler.yml`:
- Trigger: `repository_dispatch: [linear_event]`
- Parse Linear event payload
- Update globe-activity.json with Linear event
- Commit changes

### Step 5.2: Add GitLab Webhook Handler

Create `.github/workflows/gitlab-webhook-handler.yml`:
- Trigger: `repository_dispatch: [gitlab_event]`
- Parse GitLab MR/pipeline payload
- Update globe-activity.json
- Optionally create/update Linear issue

---

## PHASE 6: README & Polish (20 min)

### Step 6.1: Update README.md

Replace single-line README with comprehensive project overview including:
- Architecture diagram (text-based)
- Live demo links
- Quick-start guide
- Technology stack
- Alignment to Scalable Process Modeling framework

### Step 6.2: Cross-Page Navigation Audit

Verify every page links correctly to every other page:

| From | Links To | Status |
|------|----------|--------|
| index.html | hub, command-center, intelligence, tools | |
| hub.html | index, intelligence, tools, 6sense, command-center, rpa-control | |
| command-center.html | hub, intelligence, tools | |
| rpa-control-center.html | hub, command-center | |
| intelligence/index.html | hub, tools, 6sense, signal-map | |
| tools/index.html | hub, intelligence, deep-analyst | |

---

## Checkpoint Protocol

After completing each PHASE, run this checklist (per Part II, Section H):

- [ ] All new files committed to `main`
- [ ] GitHub Pages deployment succeeded (check Actions tab)
- [ ] No broken links on live site
- [ ] Secrets referenced in workflows exist in repo settings
- [ ] ARCHITECTURE.md reflects current state
- [ ] No raw text/CSS rendering issues on any page

---

## Failure Recovery

| Failure Mode | Symptom | Recovery |
|-------------|---------|----------|
| Workflow never triggers | 0 runs in Actions tab | Check: secret exists, event_type matches, YAML syntax valid |
| Linear API rejects | 401/403 in workflow logs | Check: LINEAR_API_KEY is valid, not expired |
| Globe data not updating | No new markers after submission | Check: git push permissions, globe-activity.json format valid |
| CSS still showing as text | Raw CSS visible on hub page | Check: `<style>` tags properly wrap all CSS blocks |
| Pages deployment fails | Red X on deployment | Check: HTML is valid, no build errors in Actions log |
| Relay returns 500 | Tally shows webhook failure | Check: relay logs, GH_PAT has repo scope, JSON payload format |
