#!/usr/bin/env python3
"""
Signal-to-Sales JSON Bridge
Converts Deep Account Signal Analyst output into sales_system.json format
for Agent Command Center and Territory Intelligence dashboards.

Usage:
  python bridge.py --input snowflake_signal_output.json
  python bridge.py --input snowflake_signal_output.json --output ../intelligence/data/sales_system.json
"""

import json
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any

# Confidence mapping
CONFIDENCE_MAP = {
    "L3": "HIGH_90%",
    "L2": "MODERATE_75%",
    "L1": "LOW_60%"
}

# Category urgency scoring
CATEGORY_URGENCY = {
    "RISK & COMPLIANCE": 25,
    "DEAL & CAPITAL": 20,
    "TECHNOLOGY": 15,
    "STRATEGY": 10,
    "PEOPLE": 10,
    "JOBS": 8,
    "OPERATIONS": 12
}

def calculate_urgency(signals: List[Dict]) -> int:
    """Calculate urgency score based on signal categories and confidence."""
    score = 50  # base
    for sig in signals:
        categories = sig.get("category", "").split(";")
        for cat in categories:
            cat = cat.strip()
            if cat in CATEGORY_URGENCY:
                score += CATEGORY_URGENCY[cat]
        if sig.get("confidence") == "L3":
            score += 5
    return min(score, 98)

def calculate_deal_size(hypotheses: List[Dict], urgency: int) -> int:
    """Estimate deal size based on hypothesis complexity and urgency."""
    base = 400000
    multiplier = len(hypotheses) * 0.15 + (urgency / 100)
    return int(base * multiplier)

def map_stage(signals: List[Dict]) -> str:
    """Map signals to buyer stage."""
    tech_count = sum(1 for s in signals if "TECHNOLOGY" in s.get("category", ""))
    risk_count = sum(1 for s in signals if "RISK" in s.get("category", ""))
    
    if tech_count >= 2 or risk_count >= 2:
        return "Decision"
    elif tech_count >= 1:
        return "Consideration"
    else:
        return "Awareness"

def main():
    parser = argparse.ArgumentParser(description="Bridge signal data to sales system JSON")
    parser.add_argument("--input", "-i", required=True, help="Input signal JSON file")
    parser.add_argument("--output", "-o", default="../intelligence/data/sales_system.json", 
                        help="Output sales_system.json path")
    parser.add_argument("--merge", action="store_true", 
                        help="Merge with existing data instead of replacing")
    args = parser.parse_args()

    # Load input signal data
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: Input file {input_path} not found")
        return 1

    with open(input_path) as f:
        signal_data = json.load(f)

    company = signal_data.get("company", "Unknown")
    signals = signal_data.get("signals", [])
    hypotheses = signal_data.get("hypotheses", [])
    outreach = signal_data.get("outreach", [])
    gaps = signal_data.get("gaps", [])

    # Load existing sales_system.json
    output_path = Path(args.output)
    if output_path.exists():
        with open(output_path) as f:
            system = json.load(f)
    else:
        print(f"Error: Output file {output_path} not found. Cannot create from scratch.")
        return 1

    # Calculate derived metrics
    urgency = calculate_urgency(signals)
    deal_size = calculate_deal_size(hypotheses, urgency)
    stage = map_stage(signals)
    confidence = 85 if len([s for s in signals if s.get("confidence") == "L3"]) >= 3 else 72

    # 1. Update Signal Intelligence Agent
    sig_agent = next((a for a in system["agents"] if a["id"] == "signal_intelligence"), None)
    if sig_agent:
        sig_agent["recentActivity"] = []
        for sig in signals[:5]:  # top 5 most recent
            sig_agent["recentActivity"].append({
                "timestamp": sig.get("date", "Unknown"),
                "action": "SIGNAL_DETECTED",
                "details": f"{company}: {sig.get('signal', '')[:80]}",
                "confidence": sig.get("confidence", "L2"),
                "evidence": sig.get("source_type", "Unknown"),
                "communicatesTo": "insight_synthesis"
            })

    # 2. Update Insight Synthesis Agent
    insight_agent = next((a for a in system["agents"] if a["id"] == "insight_synthesis"), None)
    if insight_agent:
        insight_agent["reasoning"] = []
        for hyp in hypotheses[:3]:  # top 3 hypotheses
            insight_agent["reasoning"].append({
                "hypothesis": f"{company}: {hyp.get('outcome', '')[:80]}",
                "confidence": CONFIDENCE_MAP.get("L2", "MODERATE_75%"),
                "technologyFit": {
                    "keywords": ["document processing", "automation", "compliance"],
                    "tungstenProduct": "TotalAgility + Intelligent Capture",
                    "fitScore": confidence
                },
                "unknownFactors": gaps[:3],
                "communicatesTo": "territory_strategist"
            })

    # 3. Update Territory Strategist Agent
    strat_agent = next((a for a in system["agents"] if a["id"] == "territory_strategist"), None)
    if strat_agent:
        # Add or update company in prioritized opportunities
        existing = [o for o in strat_agent.get("prioritizedOpportunities", []) if o["account"] != company]
        new_opp = {
            "rank": 1,
            "account": company,
            "urgency": urgency,
            "dealSize": deal_size,
            "confidence": confidence,
            "stage": stage
        }
        
        # Re-rank: new entry at top, others shift
        all_opps = [new_opp] + existing
        for idx, opp in enumerate(all_opps, 1):
            opp["rank"] = idx
        strat_agent["prioritizedOpportunities"] = all_opps[:10]  # keep top 10

        # Update decision reasoning
        strat_agent["decisionReasoning"] = []
        for hyp in hypotheses[:2]:
            strat_agent["decisionReasoning"].append({
                "decision": f"PRIORITIZE: {company} – {hyp.get('problem', '')[:60]}",
                "why": {
                    "urgency": f"Urgency score {urgency} – multiple signals converge",
                    "dealSize": f"${deal_size // 1000}K",
                    "confidence": "HIGH" if confidence > 80 else "MODERATE",
                    "strategic": hyp.get("outcome", "")[:100]
                },
                "recommendedPlay": hyp.get("outcome", ""),
                "communicatesTo": "execution_orchestrator"
            })

    # 4. Update Execution Orchestrator Agent
    exec_agent = next((a for a in system["agents"] if a["id"] == "execution_orchestrator"), None)
    if exec_agent:
        flows = []
        if outreach:
            flow = {
                "flowId": f"{company.lower().replace(' ', '_')}_play_1",
                "trigger": f"Territory Strategist ranked {company} high priority",
                "steps": [],
                "dataFlow": f"Signal Intelligence ({len(signals)} signals) -> Insight Synthesis -> Territory Strategist (Rank #1, urgency {urgency}) -> Execution Orchestrator",
                "expectedOutcome": f"Discovery call within 5 days, ${deal_size // 1000}K advanced to validation"
            }
            for i, angle in enumerate(outreach[:4], 1):  # top 4 outreach angles
                flow["steps"].append({
                    "step": i,
                    "action": angle[:120],
                    "status": "QUEUED"
                })
            flows.append(flow)
        exec_agent["automationFlows"] = flows

    # Update system metadata
    system["systemMetadata"]["lastUpdated"] = datetime.now().isoformat()

    # Write output
    with open(output_path, "w") as f:
        json.dump(system, f, indent=2)

    print(f"✓ Bridge complete: {company} signals integrated into {output_path}")
    print(f"  - {len(signals)} signals processed")
    print(f"  - {len(hypotheses)} hypotheses generated")
    print(f"  - Urgency: {urgency}, Deal Size: ${deal_size // 1000}K, Stage: {stage}")
    print(f"  - Rank: #1 in prioritized opportunities")
    return 0

if __name__ == "__main__":
    exit(main())
