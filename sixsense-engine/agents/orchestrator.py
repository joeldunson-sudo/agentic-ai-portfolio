"""Orchestrator agent - coordinates all sub-agents and pipelines."""
import logging
from typing import Dict, Any, List
from datetime import datetime

logger = logging.getLogger(__name__)


class Orchestrator:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.agents = {}
        self.pipeline_history = []
        logger.info("Orchestrator initialized")

    def register_agent(self, name: str, agent: Any) -> None:
        self.agents[name] = agent
        logger.info(f"Agent registered: {name}")

    def run_pipeline(self, pipeline_name: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        start_time = datetime.utcnow()
        result = {"pipeline": pipeline_name, "status": "started", "start": start_time.isoformat()}
        try:
            if pipeline_name == "intel_cycle":
                result.update(self._run_intel_cycle(params or {}))
            elif pipeline_name == "content_publish":
                result.update(self._run_content_publish(params or {}))
            elif pipeline_name == "full_sync":
                result.update(self._run_full_sync(params or {}))
            else:
                result["status"] = "error"
                result["message"] = f"Unknown pipeline: {pipeline_name}"
                return result
            result["status"] = "completed"
        except Exception as e:
            logger.error(f"Pipeline {pipeline_name} failed: {e}")
            result["status"] = "failed"
            result["error"] = str(e)
        result["end"] = datetime.utcnow().isoformat()
        self.pipeline_history.append(result)
        return result

    def _run_intel_cycle(self, params: Dict) -> Dict:
        researcher = self.agents.get("researcher")
        if not researcher:
            return {"error": "No researcher agent registered"}
        topics = params.get("topics", ["AI", "defense", "cybersecurity"])
        findings = researcher.research(topics)
        return {"findings_count": len(findings), "topics": topics}

    def _run_content_publish(self, params: Dict) -> Dict:
        writer = self.agents.get("writer")
        if not writer:
            return {"error": "No writer agent registered"}
        content = writer.generate(params.get("brief", {}))
        return {"content_generated": bool(content)}

    def _run_full_sync(self, params: Dict) -> Dict:
        results = {}
        for name, agent in self.agents.items():
            if hasattr(agent, "sync"):
                results[name] = agent.sync()
        return {"synced_agents": list(results.keys()), "results": results}

    def get_status(self) -> Dict[str, Any]:
        return {
            "registered_agents": list(self.agents.keys()),
            "pipelines_run": len(self.pipeline_history),
            "last_run": self.pipeline_history[-1] if self.pipeline_history else None
        }
