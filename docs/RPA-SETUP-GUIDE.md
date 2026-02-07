# RPA Control Center - Complete Setup Guide

> **Automated Webhook Ecosystem** - No terminal RPA loops, no manual intervention

## Architecture Overview

```
Tally Form --> GitHub Webhook --> GitHub Actions --> Linear Issue
                                      |
                                      v
                              Cursor Agent Assignment
                                      |
                                      v
                              Auto-commit & Deploy
                                      |
                                      v
                              Globe Activity Update
```

---

## Step 1: Add GitHub Secrets (Required)

Navigate to: **Settings > Secrets and variables > Actions > New repository secret**

### Required Secrets (10 Total)

| Secret Name | Description | Where to Get It |
|-------------|-------------|------------------|
| `LINEAR_API_KEY` | Linear API authentication | linear.app/settings/api |
| `LINEAR_TEAM_ID` | Your Linear team identifier | linear.app/[workspace]/settings/api |
| `LINEAR_WEBHOOK_SECRET` | Webhook signature verification | Generated when creating webhook |
| `TALLY_WEBHOOK_SECRET` | Tally form webhook token | tally.so form settings |
| `GITLAB_TOKEN` | GitLab Personal Access Token | gitlab.com/-/profile/personal_access_tokens |
| `GITLAB_PROJECT_ID` | Your GitLab project ID | gitlab.com project settings |
| `GITHUB_WEBHOOK_SECRET` | GitHub webhook signature | Generated when creating webhook |
| `PERPLEXITY_API_KEY` | Perplexity AI API access | perplexity.ai/settings/api |
| `SIXSENSE_API_KEY` | 6sense intent data access | 6sense admin portal |
| `CURSOR_AGENT_TOKEN` | Cursor AI agent authentication | cursor.sh settings |

---

## Step 2: Connect Linear to GitHub

1. Go to: [linear.app/settings/integrations/github](https://linear.app/settings/integrations/github)
2. Click **Add GitHub integration**
3. Select repository: `joeldunson-sudo/agentic-ai-portfolio`
4. Enable:
   - [x] Sync issues to GitHub
   - [x] Auto-link commits
   - [x] PR/MR status sync
5. Copy the webhook URL to your GitHub repository webhooks

---

## Step 3: Connect Linear to GitLab

1. Go to: [linear.app/settings/integrations/gitlab](https://linear.app/settings/integrations/gitlab)
2. Click **Add GitLab integration**
3. Authorize Linear with your GitLab account
4. Select your GitLab project
5. Enable merge request sync

---

## Step 4: Configure Tally Webhook

1. Open your Tally form: [tally.so/forms/YOUR_FORM_ID](https://tally.so)
2. Go to **Integrations > Webhooks**
3. Add endpoint:
   ```
   https://api.github.com/repos/joeldunson-sudo/agentic-ai-portfolio/dispatches
   ```
4. Set headers:
   ```json
   {
     "Authorization": "token YOUR_GITHUB_PAT",
     "Accept": "application/vnd.github.v3+json",
     "Content-Type": "application/json"
   }
   ```
5. Set payload template:
   ```json
   {
     "event_type": "tally_submission",
     "client_payload": {
       "form_id": "{{formId}}",
       "submission_id": "{{submissionId}}",
       "fields": {{fields}}
     }
   }
   ```

---

## Step 5: Set Up GitHub Webhooks

1. Go to: **Settings > Webhooks > Add webhook**
2. **For Linear sync:**
   - Payload URL: `https://linear.app/webhooks/github/YOUR_WORKSPACE`
   - Content type: `application/json`
   - Events: Issues, Pull requests, Push

---

## Step 6: Perplexity Data Flow

The RPA Control Center can receive data from Perplexity research via:

### Option A: Manual Export
1. In Perplexity, click **Share > Export**
2. Copy JSON data
3. POST to GitHub Actions via repository_dispatch

### Option B: Automated Webhook Bridge
Create a Cloudflare Worker or serverless function:

```javascript
// Worker to bridge Perplexity -> GitHub
export default {
  async fetch(request) {
    const data = await request.json();
    
    // Forward to GitHub Actions
    await fetch('https://api.github.com/repos/joeldunson-sudo/agentic-ai-portfolio/dispatches', {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        event_type: 'perplexity_research',
        client_payload: data
      })
    });
    
    return new Response('OK');
  }
};
```

---

## Verification Checklist

- [ ] All 10 GitHub Secrets added
- [ ] Linear <-> GitHub integration active
- [ ] Linear <-> GitLab integration active
- [ ] Tally webhook configured and tested
- [ ] Test form submission creates Linear issue
- [ ] Test Linear issue triggers Cursor assignment
- [ ] Verify globe-activity.json updates on events
- [ ] Verify GitHub Pages deployment on push

---

## Workflow Trigger Reference

| Event | Trigger Type | Workflow |
|-------|--------------|----------|
| Tally form submit | `repository_dispatch: tally_submission` | tally-webhook-handler.yml |
| Linear issue created | `repository_dispatch: linear_issue_created` | linear-cursor-sync.yml |
| Linear issue updated | `repository_dispatch: linear_issue_updated` | linear-cursor-sync.yml |
| GitLab MR opened | `repository_dispatch: gitlab_merge_request` | gitlab-sync.yml |
| GitLab pipeline | `repository_dispatch: gitlab_pipeline` | gitlab-sync.yml |

---

## Live Dashboard URLs

- **RPA Control Center:** https://joeldunson-sudo.github.io/agentic-ai-portfolio/rpa-control-center.html
- **Command Center:** https://joeldunson-sudo.github.io/agentic-ai-portfolio/command-center.html
- **Intelligence Hub:** https://joeldunson-sudo.github.io/agentic-ai-portfolio/intelligence/

---

*Last updated: February 7, 2026*
