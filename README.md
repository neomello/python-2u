<div align="center">

<img src="images/neo-smart-factory-horizontal.png" width="400" />

<br/>
<br/>

<iframe src="https://github.com/sponsors/neomello/button" title="Sponsor neomello" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

# Code Python // Message APP

```
█▀▀ █▀█ █▀▄ █▀▀   █▀█ █▄█ ▀█▀ █░█ █▀█ █▄░█   ▀ █  █░█
█▄▄ █▄█ █▄▀ ██▄   █▀▀ ░█░ ░█░ █▀█ █▄█ █░▀█   █▄▄░ █▄█░

```

**Communication between humans would be much clearer if it were code written in Python.**

Your phrase. Your code. Your caption.

[![License: MIT](https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=0d1117)](LICENSE)
[![NEØ Protocol](https://img.shields.io/badge/NEØ-Protocol-79c0ff?style=flat-square&labelColor=0d1117)](https://neoprotocol.space)
[![Deploy](https://img.shields.io/badge/Deploy-Render-cba6f7?style=flat-square&labelColor=0d1117)](https://render.com)
[![Sponsor](https://img.shields.io/badge/Sponsor-MELLØ-f0883e?style=flat-square&labelColor=0d1117)](https://github.com/sponsors/MELLO)

</div>

---

## What is this?

A minimal, futuristic interface that converts any human sentence into Python code — in real time. Type a feeling, a thought, a caption idea. Get back 6 different Python representations of that same phrase, ready to copy and post.

No dependencies. No build step. No backend. Just a `.html` file with a soul.

Built under **NEØ Protocol** standards — Web2 glassmorphism input, Web3 terminal output, and a boot sequence that makes you feel like you're deploying something that matters.

---

## Features

- **Real-time conversion** — every keystroke fires a new render
- **6 code variants** — variable, function, dict/enum, try/except, list comprehension, dataclass
- **Web2 → Web3 UI** — glassmorphism input panel transitions into a dark terminal output
- **NEØ Boot Loader** — animated startup sequence with ASCII art on every page load
- **One-click copy** — each variant has its own copy button
- **Zero dependencies** — vanilla HTML, CSS, JS. No frameworks, no bundlers
- **Static deploy ready** — Render.com config included out of the box

---

## Quick Start

```bash
# clone
git clone https://github.com/NEO-PROTOCOL/python-2u.git
cd python-2u

# run locally (no install needed)
make dev
# → http://localhost:8000
```

Or just open `index.html` directly in your browser. That's it.

---

## Tech Stack

| Layer | Choice | Why |
| :--- | :--- | :--- |
| Markup | HTML5 Semantic | Zero overhead |
| Logic | Vanilla JavaScript (`'use strict'`) | No framework tax |
| Styling | Vanilla CSS + Custom Properties | Full control, no purge issues |
| Fonts | Fira Code + Nunito + Syne | Google Fonts CDN |
| Deploy | Render.com Static Site | Free tier, custom domain, auto-deploy |
| Automation | Makefile | Simple, universal |

---

## Project Structure

```text
python-2u/
├── index.html          # App entry point — everything lives here
├── app.js              # All logic: loader, variants, copy, prank
├── Makefile            # Dev, build, clean, deploy
├── render.yaml         # Render.com static site config
├── images/
│   ├── neo-smart-factory-horizontal.png
│   └── neowhite.png
└── README.md
```

---

## Makefile Commands

| Command | Description |
| :--- | :--- |
| `make dev` | Starts local server at `localhost:8000` |
| `make build` | Prepares files for distribution |
| `make clean` | Removes temp files and cache |
| `make deploy` | Runs the NEØ Secure Push Protocol |

---

## Code Variants

Given the input `"monday without coffee is a crime"`, the app generates:

**01 · variable**
```python
# monday without coffee is a crime
monday_without_coffee_is_a_crime = "monday without coffee is a crime"
monday_without = True

print(f"{monday_without_coffee_is_a_crime}")
```

**04 · try / except**
```python
try:
    monday_without_coffee_is_a()
    print("✓ monday without coffee is a crime")
except Exception as e:
    print(f"erro: {e}")
finally:
    import NoCODE.webapp  # sempre python
```

> Five more variants in the app. Open it and see.

---

## Contributing

This project is open-source and sponsored by **MELLØ** under the **NEØ Protocol** umbrella.

PRs are welcome. Keep it vanilla. Keep it sharp.

```bash
# fork → branch → PR
git checkout -b feat/your-idea
git commit -m "feat: your idea"
git push origin feat/your-idea
```

Please follow the existing code style — `'use strict'`, no frameworks, descriptive function names, section comments.

---

## License

MIT — use it, fork it, ship it. Just keep the NEØ credit somewhere.

---

<div align="center">

<br/>

**Sponsored & maintained by**

[![MELLØ](https://img.shields.io/badge/MELLØ-Sponsor-f0883e?style=for-the-badge&labelColor=0d1117)](https://github.com/sponsors/MELLO)

<br/>

<img src="images/neowhite.png" width="80" />

<br/>

**[NEØ PROTOCOL](https://neoprotocol.space)** · neoprotocol.space

*"Import NoCODE.webapp"*

<br/>
<iframe src="https://github.com/sponsors/neomello/card" title="Sponsor neomello" height="225" width="600" style="border: 0;"></iframe>

© 2026 NEØ Protocol · MIT License

</div>