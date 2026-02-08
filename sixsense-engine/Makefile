PYTHON := python3
.PHONY: test status intel sync

test:
	$(PYTHON) -m pytest tests/ -v

status:
	$(PYTHON) cli.py status

intel:
	$(PYTHON) cli.py intel

sync:
	$(PYTHON) cli.py sync

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
