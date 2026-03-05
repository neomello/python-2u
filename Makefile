# NEØ Protocol - Python Message APP Makefile

DIST_DIR := dist
BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)

.PHONY: help install build clean dev deploy status

help:
	@echo "NEØ Protocol - Python Message APP"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install    Install dependencies"
	@echo "  build      Build static bundle into dist/"
	@echo "  clean      Remove temporary/build files"
	@echo "  dev        Run local server on localhost:8000"
	@echo "  deploy     Push current branch (no auto-commit)"
	@echo "  status     Show git status"

install:
	@echo "Installing dependencies..."
	@if [ -f package-lock.json ]; then npm ci; else npm install; fi

build:
	@echo "Building static site..."
	@rm -rf $(DIST_DIR)
	@mkdir -p $(DIST_DIR)
	@cp index.html $(DIST_DIR)/
	@cp favicon.ico $(DIST_DIR)/ 2>/dev/null || true
	@cp robots.txt $(DIST_DIR)/ 2>/dev/null || true
	@cp -r assets $(DIST_DIR)/ 2>/dev/null || true
	@cp -r images $(DIST_DIR)/ 2>/dev/null || true
	@echo "Build complete. Files are in $(DIST_DIR)/"

clean:
	@echo "Cleaning up..."
	@rm -rf $(DIST_DIR)
	@find . -name ".DS_Store" -delete
	@echo "Cleaned."

dev:
	@echo "Starting local server at http://localhost:8000"
	@python3 -m http.server 8000

status:
	@git status

deploy:
	@echo "Pushing branch $(BRANCH) to origin..."
	@git push origin $(BRANCH)
