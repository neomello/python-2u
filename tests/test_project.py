"""Structural tests for the python-2u project."""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as f:
        return f.read()


# ── Required files ──────────────────────────────────────────────────────────

def test_index_html_exists():
    assert os.path.isfile(os.path.join(ROOT, "index.html"))


def test_app_js_exists():
    assert os.path.isfile(os.path.join(ROOT, "assets", "app.js"))


def test_styles_css_exists():
    assert os.path.isfile(os.path.join(ROOT, "assets", "styles.css"))


def test_robots_txt_exists():
    assert os.path.isfile(os.path.join(ROOT, "robots.txt"))


# ── HTML structure ───────────────────────────────────────────────────────────

def test_html_has_lang_attribute():
    content = read("index.html")
    assert 'lang="en"' in content


def test_html_has_meta_charset():
    content = read("index.html")
    assert 'charset="UTF-8"' in content


def test_html_has_viewport_meta():
    content = read("index.html")
    assert 'name="viewport"' in content


def test_html_has_og_tags():
    content = read("index.html")
    assert 'property="og:title"' in content
    assert 'property="og:description"' in content


def test_html_textarea_has_id():
    content = read("index.html")
    assert 'id="txt"' in content


def test_html_variants_container_exists():
    content = read("index.html")
    assert 'id="variants"' in content


def test_html_links_app_js():
    content = read("index.html")
    assert 'src="assets/app.js"' in content


def test_html_links_styles_css():
    content = read("index.html")
    assert 'href="assets/styles.css"' in content


# ── JavaScript app.js ────────────────────────────────────────────────────────

def test_app_js_defines_escape_html():
    content = read("assets/app.js")
    assert "function escapeHtml" in content


def test_app_js_defines_six_variants():
    content = read("assets/app.js")
    # Each variant function v1–v6 must be present
    for i in range(1, 7):
        assert f"function v{i}(" in content, f"v{i} not found in app.js"


def test_app_js_defines_variants_array():
    content = read("assets/app.js")
    assert "const VARIANTS" in content


def test_app_js_escape_html_covers_xss_chars():
    """escapeHtml must replace the five critical characters."""
    content = read("assets/app.js")
    for escaped in ["&amp;", "&lt;", "&gt;", "&quot;", "&#39;"]:
        assert escaped in content, f"escapeHtml missing replacement for {escaped}"


def test_app_js_uses_strict_mode():
    content = read("assets/app.js")
    assert '"use strict"' in content


def test_app_js_copy_btn_has_clipboard_fallback():
    """copyCard must handle environments without navigator.clipboard."""
    content = read("assets/app.js")
    assert "navigator.clipboard" in content
    assert "document.execCommand" in content


# ── CSS styles.css ───────────────────────────────────────────────────────────

def test_styles_defines_root_variables():
    content = read("assets/styles.css")
    assert ":root" in content
    assert "--neo-green" in content


def test_styles_has_media_query_for_mobile():
    content = read("assets/styles.css")
    assert "@media" in content


def test_styles_has_keyframe_animations():
    content = read("assets/styles.css")
    assert "@keyframes" in content


# ── robots.txt ───────────────────────────────────────────────────────────────

def test_robots_txt_allows_crawling():
    content = read("robots.txt")
    assert "User-agent" in content


# ── Makefile ─────────────────────────────────────────────────────────────────

def test_makefile_exists():
    assert os.path.isfile(os.path.join(ROOT, "Makefile"))


def test_makefile_has_build_target():
    content = read("Makefile")
    assert "build:" in content


def test_makefile_has_dev_target():
    content = read("Makefile")
    assert "dev:" in content
