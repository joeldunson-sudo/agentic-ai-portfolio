#!/usr/bin/env python3
import argparse, csv, json
from datetime import datetime, timezone

def utc_now():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z")

def read_csv(path):
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row.get("account"):
                rows.append({k: (v or "").strip() for k, v in row.items()})
    return rows

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    ts = utc_now()
    accts = read_csv(args.accounts)

    payload = {
        "updated_utc": ts,
        "mode": "terminal_build",
        "territory": {"name": "AMS West", "rep": "Joel Dunson", "segment": "Enterprise", "focus": "Agentic AI & Intelligent Automation", "accounts_tracked": len(accts), "active_pursuits": 12, "pipeline_value": "$4.2M", "quota_attainment": "118%"},
        "kpis": [
            {"name": "Target account universe", "value": len(accts), "trend": "up", "delta": "+19 accounts tracked"},
            {"name": "Active $500K+ pursuits", "value": 12, "trend": "up", "delta": "+3 from last month"},
            {"name": "Next-30-day intent spikes", "value": 8, "trend": "up", "delta": "+2 vs prior period"},
            {"name": "Pipeline velocity", "value": "47 days", "trend": "down", "delta": "-15 days improvement"},
            {"name": "Win rate (qualified)", "value": "34%", "trend": "up", "delta": "+6pp YoY"},
            {"name": "Engagement score", "value": "8.4/10", "trend": "up", "delta": "+1.2 from baseline"}
        ],
        "alerts": [],
        "intent_signals": [],
        "firmographics": [{"account": a["account"], "industry": a.get("industry","Unknown"), "domain": a.get("domain",""), "employees": "Unknown", "revenue": "Unknown", "hq": "Unknown", "tech_stack": [], "buying_committee_size": 0, "champion_identified": False} for a in accts],
        "real_time_signals": {"last_scan": ts, "press_releases": 0, "blog_posts_detected": 0, "job_postings_relevant": 0, "financial_filings": 0, "patent_filings": 0, "social_mentions": 0, "companies_with_data_silo_signals": 0, "total_signals_processed": 0}
    }

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")
    print(f"Wrote {args.out} with {len(accts)} accounts at {ts}")

if __name__ == "__main__":
    main()
