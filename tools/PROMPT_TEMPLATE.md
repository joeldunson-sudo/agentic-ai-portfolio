# Deep Account Signal Analyst Prompt Template
## JSON Output Addendum for Bridge Integration

Add this section to the end of your Deep Account Signal Analyst prompt to ensure machine-readable output that feeds directly into `bridge.py` and populates your Agent Command Center.

---

## 6. MACHINE-READABLE OUTPUT (MANDATORY)

After you complete the 5-section markdown report (Company Snapshot, Signal Table, Deal Hypotheses, Outreach Angles, Gaps), emit a **single JSON object** with this exact structure:

```json
{
  "company": "[Company Name]",
  "signals": [...],
  "hypotheses": [...],
  "outreach": [...],
  "gaps": [...]
}
```

### Field Specifications

#### `signals[]` 
Array of signal objects. Each signal must have:

```json
{
  "date": "YYYY-MM-DD or 'Unknown'",
  "source_type": "Regulatory|Press Release|Financial News|Industry/Tech|Jobs|Executive/Social|Analyst|Technographic|Competitive Intel|Other",
  "category": "RISK & COMPLIANCE|DEAL & CAPITAL|TECHNOLOGY|STRATEGY|PEOPLE|JOBS|OPERATIONS",
  "signal": "1-2 sentence description of what happened",
  "confidence": "L3|L2|L1",
  "implication": "1-2 sentences explaining relevance for doc/automation workflows"
}
```

**Rules:**
- Keep array size to **10-15 strongest signals** (not all 50+).
- `category` can be a single value or semicolon-separated (e.g., `"JOBS; OPERATIONS"`).
- `confidence` must be one of: `L3` (Confirmed), `L2` (Likely), `L1` (Weak/[VERIFY]).

#### `hypotheses[]`
Array of deal hypothesis objects. Each hypothesis must have:

```json
{
  "problem": "1-3 sentences: operational/compliance/integration pain implied by signals",
  "outcome": "1-3 sentences: desired business result if they deploy Tungsten IDP/orchestration",
  "buying_centers": ["CIO", "Head of Operations", "Chief Compliance", ...],
  "supporting_signals": ["short ref or index to signal that supports this"]
}
```

**Rules:**
- Provide **3-6 hypotheses** (not more).
- Focus on **document-heavy workflow pain** and **Tungsten-relevant outcomes**.

#### `outreach[]`
Array of strings. Each is a short, sharp hook/question for AE outreach.

```json
[
  "After [signal], how are you handling [workflow pain]?",
  "With [pressure], are you still [manual approach] or have you automated?",
  ...
]
```

**Rules:**
- Provide **4-8 outreach angles**.
- Keep each to 1-2 sentences max.
- Tie explicitly to a signal or hypothesis cluster.

#### `gaps[]`
Array of strings. Each is a discovery question phrased as "Unknown: ..." or "Unclear whether ...".

```json
[
  "Unclear whether invoices are centralized globally or regionally",
  "No visibility into current RPA/automation vendors",
  "Budget allocation: grow vs integrate vs fix compliance?",
  ...
]
```

**Rules:**
- Provide **3-6 gaps**.
- These become discovery questions for AE.

---

### Output Format Constraints

1. **Do NOT wrap in markdown code fences.** Emit raw JSON only.
2. **Use double quotes** for all strings (not single quotes).
3. **Escape special characters** (e.g., `\"` for quotes inside strings).
4. **No trailing commas** in arrays or objects.
5. **Validate JSON** before emitting (use a linter if possible).

---

### Example Output

See `snowflake_signal_output.json` in this directory for a complete, valid example.

---

## Usage Workflow

1. **Run the Deep Account Signal Analyst prompt** with this addendum against a $1B+ target company.
2. **Copy the JSON output** (the part after the markdown report) and save it as `<company>_signal_output.json`.
3. **Run the bridge script:**
   ```bash
   cd tools/
   python bridge.py --input snowflake_signal_output.json --output ../intelligence/data/sales_system.json
   ```
4. **Commit the updated `sales_system.json`** to GitHub.
5. **GitHub Pages auto-deploys** → Agent Command Center now shows live Snowflake intelligence.

---

## Why This Matters

Without this JSON output, your Deep Account Signal Analyst produces a **read-only report** that lives in a doc.

With this JSON output + bridge.py, you get:
- **Live dashboards** (Agent Command Center, Territory Intelligence) showing real account data
- **Automated prioritization** (urgency scores, deal sizes, buyer stages)
- **Execution playbooks** (outreach sequences, automation flows)
- **Proof of concept** for the entire agentic sales execution architecture

This is how your portfolio site becomes a **working production system**, not a static demo.
