# NEØ Protocol - Python Message APP Makefile

.PHONY: help install build clean dev deploy status

help:
	@echo "NEØ Protocol - Python Message APP"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install    Install dependencies (if any)"
	@echo "  build      Prepare for production (simulated for static site)"
	@echo "  clean      Remove temporary files"
	@echo "  dev        Run local server for development"
	@echo "  deploy    Push changes to main branch (NEØ Protocol)"
	@echo "  status     Check git status"

install:
	@echo "Installing dependencies..."
	@npm install || echo "No package.json found, skipping npm install."

build:
	@echo "Building static site..."
	@mkdir -p dist
	@cp index.html dist/
	@cp -r images dist/ || true
	@echo "Build complete. Files are in dist/"

clean:
	@echo "Cleaning up..."
	@rm -rf dist
	@find . -name ".DS_Store" -delete
	@echo "Cleaned."

dev:
	@echo "Starting local server at http://localhost:8000"
	@python3 -m http.server 8000

status:
	@git status

deploy:
	@echo "Executing NΞØ Protocol - Secure Push..."
	@git add .
	@git commit -m "feat: project structure update for Render.com and Makefile addition"
	@git push origin main
