# Secrets & Credentials Checklist

> Version 1.0 | February 2026
> SECURITY: Never commit actual secret values to this file. This documents WHERE to find them and WHERE to store them.

## Current Status: 0 of 6 secrets configured

---

## 1. LINEAR_API_KEY

- [ ] Created
- [ ] Stored in GitHub repo secrets

**What**: Linear personal API key for creating issues via GraphQL API
**Where to create**: Linear app > Settings (gear icon) > API > Personal API Keys > Create key
**Format**: `lin_api_` followed by alphanumeric string
**Store at**: GitHub repo > Settings > Secrets and variables > Actions > New repository secret
**Name**: `LINEAR_API_KEY`
**Used by**: `.github/workflows/tally-webhook-handler.yml` (step: Create Linear issue)
**Scope**: Read/write issues, read teams
**Rotation**: Annually or if compromised

---

## 2. LINEAR_TEAM_ID

- [ ] Created
- [ ] Stored in GitHub repo secrets

**What**: UUID of the Linear team where issues should be created
**Where to find**: Linear app > Settings > Teams > Click team name > URL contains team ID, or use GraphQL query: `{ teams { nodes { id name } } }`
**Format**: UUID `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
**Store at**: GitHub repo > Settings > Secrets and variables > Actions > New repository secret
**Name**: `LINEAR_TEAM_ID`
**Used by**: `.github/workflows/tally-webhook-handler.yml` (step: Create Linear issue)
**Rotation**: Only changes if team is deleted/recreated

---

## 3. GH_PAT_DISPATCH

- [ ] Created
- [ ] Stored in webhook relay environment

**What**: GitHub Personal Access Token with `repo` scope, used by webhook relay to trigger `repository_dispatch` events
**Where to create**: GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens
**Permissions needed**: Repository permissions > Contents: Read and Write, Metadata: Read
**Format**: `github_pat_` followed by alphanumeric string
**Store at**: Webhook relay environment variables (Cloudflare Workers/Netlify/Vercel)
**Name**: `GH_PAT_DISPATCH`
**Used by**: Webhook relay service (calls GitHub API to trigger Actions)
**Rotation**: Set expiration to 90 days, rotate before expiry

---

## 4. TALLY_SIGNING_SECRET

- [ ] Created
- [ ] Stored in webhook relay environment

**What**: Secret key used to verify Tally webhook payloads (SHA-256 HMAC)
**Where to find**: Tally > Form > Settings > Webhooks > Signing secret (auto-generated when webhook is created)
**Format**: Alphanumeric string
**Store at**: Webhook relay environment variables
**Name**: `TALLY_SIGNING_SECRET`
**Used by**: Webhook relay (signature verification before forwarding to GitHub)
**Verification method**: Compare HMAC-SHA256 of request body using this secret against the signature header from Tally

---

## 5. LINEAR_WEBHOOK_SECRET

- [ ] Created
- [ ] Stored in webhook relay environment

**What**: Secret for verifying Linear webhook payloads
**Where to find**: Linear > Settings > API > Webhooks > Create webhook > Secret is shown once
**Format**: Alphanumeric string
**Store at**: Webhook relay environment variables
**Name**: `LINEAR_WEBHOOK_SECRET`
**Used by**: Webhook relay (signature verification)
**Priority**: OPTIONAL until Linear webhook handler workflow is built

---

## 6. GITLAB_WEBHOOK_TOKEN

- [ ] Created
- [ ] Stored in webhook relay environment

**What**: Token for authenticating GitLab webhook requests
**Where to create**: GitLab > Project > Settings > Webhooks > Secret token field
**Format**: You define it (use a strong random string)
**Store at**: Webhook relay environment variables
**Name**: `GITLAB_WEBHOOK_TOKEN`
**Used by**: Webhook relay (token comparison verification)
**Priority**: OPTIONAL until GitLab webhook handler workflow is built

---

## Storage Locations Summary

| Secret | GitHub Repo Secrets | Webhook Relay Env |
|--------|:------------------:|:-----------------:|
| LINEAR_API_KEY | YES | - |
| LINEAR_TEAM_ID | YES | - |
| GH_PAT_DISPATCH | - | YES |
| TALLY_SIGNING_SECRET | - | YES |
| LINEAR_WEBHOOK_SECRET | - | YES |
| GITLAB_WEBHOOK_TOKEN | - | YES |

## Security Rules

1. NEVER commit secret values to the repository
2. NEVER log secret values in workflow outputs
3. Use GitHub's secret masking (values referenced via `${{ secrets.NAME }}` are automatically masked)
4. Rotate GH_PAT_DISPATCH every 90 days
5. If any secret is compromised, revoke immediately and regenerate
6. Document rotation dates in this file (update the checkboxes above)
