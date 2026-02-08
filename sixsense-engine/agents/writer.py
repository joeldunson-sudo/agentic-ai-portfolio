"""Writer agent - generates and formats content from research."""
import logging
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class Writer:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.templates = config.get("templates", {})
        self.output_history = []

    def generate(self, brief: Dict[str, Any]) -> Optional[str]:
        content_type = brief.get("type", "article")
        title = brief.get("title", "Untitled")
        body = brief.get("body", "")
        content = title + chr(10) + chr(10) + body
        self.output_history.append({
            "type": content_type,
            "timestamp": datetime.utcnow().isoformat(),
            "word_count": len(content.split())
        })
        return content

    def sync(self) -> Dict[str, Any]:
        return {"articles_written": len(self.output_history)}
