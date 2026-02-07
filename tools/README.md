# Tools Directory
## Signal-to-Sales JSON Bridge System

This directory contains the automation infrastructure that converts **Deep Account Signal Analyst** output into live data for your **Agent Command Center** and **Territory Intelligence** dashboards.

---

## What Problem Does This Solve?

Your Deep Account Signal Analyst prompt generates detailed intelligence reports for $1B+ enterprise accounts. But those reports are **read-only markdown documents**.

This bridge system transforms those reports into **machine-readable JSON** that populates your live portfolio dashboards, turning a static demo into a **working production system**.

---

## Files in This Directory

### 1. `bridge.py`
**Purpose:** Python script that reads signal JSON and updates `intelligence/data/sales_system.json`.

**What it does:**
- Maps signals → Signal Intelligence Agent (recentActivity)
- Maps hypotheses → Insight Synthesis Agent (reasoning)
- Maps company + urgency → Territory Strategist Agent (prioritizedOpportunities)
- Maps outreach angles → Execution Orchestrator Agent (automationFlows)
- Calculates urgency scores, deal sizes, and buyer stages automatically

**Usage:**
```bash
python bridge.py --input snowflake_signal_output.json --output ../intelligence/data/sales_system.json
```

---

### 2. `snowflake_signal_output.json`
**Purpose:** Sample Snowflake intelligence data (test input for bridge.py).

**Contains:**
- 6 signals (M&A, breach litigation, SOX hiring, Document AI launch)
- 4 deal hypotheses (M&A integration, post-breach controls, Document AI gap, SOX automation)
- 6 outreach angles
- 6 discovery gaps

**Use this to:**
- Test the bridge script
- Understand the expected JSON schema
- See a real-world example of signal-to-hypothesis mapping

---

### 3. `PROMPT_TEMPLATE.md`
**Purpose:** Prompt addendum that generates machine-readable JSON output.

**Add this section to your Deep Account Signal Analyst prompt** to ensure output is compatible with `bridge.py`.

**Key requirements:**
- Constrained JSON schema (company, signals, hypotheses, outreach, gaps)
- Confidence levels (L1/L2/L3)
- Category taxonomy (RISK & COMPLIANCE, DEAL & CAPITAL, etc.)
- No markdown code fences (raw JSON only)

---

### 4. `README.md` (this file)
**Purpose:** Usage documentation and integration guide.

---

## Complete Workflow

### Step 1: Run Deep Account Signal Analyst

1. Use your Deep Account Signal Analyst prompt **with the PROMPT_TEMPLATE.md addendum**.
2. Target a $1B+ company (Snowflake, Confluent, Meta, Databricks, etc.).
3. The model outputs:
   - **Markdown report** (5 sections: Snapshot, Signal Table, Hypotheses, Outreach, Gaps)
   - **JSON object** (immediately after the markdown)

### Step 2: Save the JSON Output

1. Copy the JSON block (everything from `{` to the final `}`).
2. Save it as `<company>_signal_output.json` in this directory.
   - Example: `databricks_signal_output.json`

### Step 3: Run the Bridge Script

```bash
cd tools/
python bridge.py --input databricks_signal_output.json
```

The script:
- Reads your signal JSON
- Loads existing `intelligence/data/sales_system.json`
- Injects Databricks data into all 4 agents
- Ranks Databricks as #1 in prioritized opportunities
- Writes updated `sales_system.json` back to disk

### Step 4: Commit and Deploy

```bash
git add intelligence/data/sales_system.json
git commit -m "Update Agent Command Center with Databricks signals"
git push
```

GitHub Pages auto-deploys within ~60 seconds.

### Step 5: View Live Data

Visit your Agent Command Center:
```
https://joeldunson-sudo.github.io/agentic-ai-portfolio/command-center.html
```

You'll now see:
- **Signal Intelligence Agent**: Databricks signals in recentActivity
- **Insight Synthesis Agent**: Databricks hypotheses in reasoning
- **Territory Strategist**: Databricks ranked #1 in prioritizedOpportunities
- **Execution Orchestrator**: Databricks outreach flows queued

---

## Technical Architecture

```
Deep Account Signal Analyst Prompt
           ↓
  (generates markdown + JSON)
           ↓
<company>_signal_output.json
           ↓
      bridge.py
           ↓
intelligence/data/sales_system.json
           ↓
   command-center.html (reads JSON via fetch)
           ↓
    Agent Command Center UI
```

---

## Why This Matters

### Before the Bridge:
- Deep Account Signal Analyst → **markdown report in a doc**
- Agent Command Center → **static demo data**
- No connection between intelligence and execution

### After the Bridge:
- Deep Account Signal Analyst → **JSON feed**
- Agent Command Center → **live account intelligence**
- Automated prioritization, scoring, and playbook generation

**You've moved from "show" to "do."**

---

## Next Steps

1. **Test with Snowflake:**
   ```bash
   python bridge.py --input snowflake_signal_output.json
   git add ../intelligence/data/sales_system.json
   git commit -m "Test: Snowflake signal integration"
   git push
   ```

2. **Run analysis on your top 5 accounts:**
   - Confluent
   - Meta Platforms
   - Databricks
   - Snowflake
   - [Your pick]

3. **Build a GitHub Action workflow:**
   - Auto-run bridge.py when new signal JSON is pushed
   - Auto-commit updated sales_system.json
   - Fully automated signal-to-dashboard pipeline

4. **Extend the bridge:**
   - Add deal size ML model (predict from hypothesis complexity)
   - Add buyer stage classifier (map signals → Awareness/Consideration/Decision)
   - Add competitive intel layer (detect incumbent vendors from technographic signals)

---

## Requirements

- Python 3.7+
- No external dependencies (uses only standard library: `json`, `argparse`, `pathlib`, `datetime`, `typing`)

---

## Support

Questions? Check:
- `PROMPT_TEMPLATE.md` for JSON schema details
- `snowflake_signal_output.json` for a working example
- `bridge.py` source code (heavily commented)

---

**You now have a production-grade signal-to-execution pipeline.**
