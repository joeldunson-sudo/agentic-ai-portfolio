# sixsense-engine CLI
import argparse, json, logging, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from agents.orchestrator import Orchestrator
from agents.researcher import Researcher
from agents.writer import Writer

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(levelname)s: %(message)s")

def build_engine(config=None):
    config = config or {}
    orch = Orchestrator(config)
    orch.register_agent("researcher", Researcher(config))
    orch.register_agent("writer", Writer(config))
    return orch

def main():
    parser = argparse.ArgumentParser(description="SixSense Engine CLI")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("status", help="Show engine status")
    sub.add_parser("intel", help="Run intelligence pipeline")
    sub.add_parser("sync", help="Sync all agents")
    args = parser.parse_args()
    engine = build_engine()
    if args.command == "status":
        print(json.dumps(engine.get_status(), indent=2))
    elif args.command == "intel":
        result = engine.run_pipeline("intel_cycle")
        print(json.dumps(result, indent=2, default=str))
    elif args.command == "sync":
        result = engine.run_pipeline("full_sync")
        print(json.dumps(result, indent=2, default=str))
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
