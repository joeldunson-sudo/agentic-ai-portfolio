#!/usr/bin/env python3
import argparse, csv, json
from datetime import datetime, timezone

def utc_now_iso():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

def read_accounts_csv(path):
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            if not row.get("account"):
                continue
            rows.append({
                "account": row.get("account", "").strip(),
                "industry": (row.get("industry") or "").strip(),
                "domain": (row.get("domain") or "").strip(),
            })
    return rows

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--territory-name", default="AMS West")
    ap.add_argument("--rep", default="Joel Dunson")
    args = ap.parse_args()

    updated_utc = utc_now_iso()
    accounts = read_accounts_csv(args.accounts)

    payload = {
        "updated_utc": updated_utc,
        "mode": "terminal_build",
        "territory": {
            "name": args.territory_name,
            "rep": args.rep,
            "segment": "Enterprise",
            "focus": "Agentic AI & Intelligent Automation",
            "accounts_tracked": len(accounts),
            "active_pursuits": 0,
            "pipeline_value": "$0",
            "quota_attainment": "0%"
        },
        "kpis": [
            {"name": "Target account universe", "value": len(accounts), "note": "From territory_accounts.csv", "trend": "stable", "delta": "0"},
            {"name": "Active $500K+ pursuits", "value": 0, "note": "Not wired", "trend": "stable", "delta": "0"},
            {"name": "Next-30-day intent spikes", "value": 0, "note": "Not wired", "trend": "stable", "delta": "0"},
            {"name": "Pipeline velocity", "value": "N/A", "note": "Not wired", "trend": "stable", "delta": "0"},
            {"name": "Win rate (qualified)", "value": "N/A", "note": "Not wired", "trend": "stable", "delta": "0"},
            {"name": "Engagement score", "value": "N/A", "note": "Not wired", "trend": "stable", "delta": "0"}
        ],
        "alerts": [],
        "intent_signals": [],
        "firmographics": [
            {
                "account": a["account"],
                "industry": a["industry"] or "Unknown",
                "employees": "Unknown",
                "revenue": "Unknown",
                "hq": "Unknown",
                "tech_stack": [],
                "buying_committee_size": 0,
                "champion_identified": False
            } for a in accounts
        ],
        "real_time_signals": {
            "last_scan": updated_utc,
            "press_releases": 0,
            "blog_posts_detected": 0,
            "job_postings_relevant": 0,
            "financial_filings": 0,
            "patent_filings": 0,
            "social_mentions": 0,
            "companies_with_data_silo_signals": 0,
            "total_signals_processed": 0
        }
    }

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")

if __name__ == "__main__":
    main()
