import unittest, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agents.orchestrator import Orchestrator
from agents.researcher import Researcher

class TestOrchestrator(unittest.TestCase):
    def setUp(self):
        self.config = {"sources": [{"name": "test"}]}
        self.orch = Orchestrator(self.config)
    def test_register_agent(self):
        r = Researcher(self.config)
        self.orch.register_agent("researcher", r)
        self.assertIn("researcher", self.orch.get_status()["registered_agents"])
    def test_run_unknown(self):
        result = self.orch.run_pipeline("nonexistent")
        self.assertEqual(result["status"], "error")
    def test_intel_cycle(self):
        r = Researcher(self.config)
        self.orch.register_agent("researcher", r)
        result = self.orch.run_pipeline("intel_cycle", {"topics": ["AI"]})
        self.assertEqual(result["status"], "completed")

if __name__ == "__main__":
    unittest.main()
