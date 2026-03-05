'use strict';

const logs = [
  'INCOMING HTTP REQUEST DETECTED ...',
  'SERVICE WAKING UP ...',
  'ASCII_ART',
  'ALLOCATING COMPUTE RESOURCES ...',
  'PREPARING INSTANCE FOR INITIALIZATION ...',
  'STARTING THE INSTANCE ...',
  'ENVIRONMENT VARIABLES INJECTED ...',
  'FINALIZING STARTUP ...',
  'OPTIMIZING DEPLOYMENT ...',
  'STEADY HANDS. CLEAN LOGS. YOUR APP IS ALMOST LIVE ...'
];

const ascii = `
.-------------------------------------------------------------------------------.
|  _   _ ______ ____     _____  _____   ____ _______ ____   _____ ____  _       |
| | \\ | |  ____/ __ \\   |  __ \\|  __ \\ / __ \\__   __/ __ \\ / ____/ __ \\| |      |
| |  \\| | |__ | |  | |  | |__) | |__) | |  | | | | | |  | | |   | |  | | |      |
| | . \` |  __|| |  | |  |  ___/|  _  /| |  | | | | | |  | | |   | |  | | |      |
| | |\\  | |___| |__| |  | |    | | \\ \\| |__| | | | | |__| | |___| |__| | |____  |
| |_| \\_|______\\____/   |_|    |_|  \\_\\\\____/  |_|  \\____/ \\_____\\____/|______| |
'-------------------------------------------------------------------------------'`;

// ── UTILS ─────────────────────────────────────────────────────────────────────

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function snake(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .join('_') || 'valor';
}

function cls(value) {
  return (
    snake(value)
      .split('_')
      .map((piece) => (piece ? piece[0].toUpperCase() + piece.slice(1) : ''))
      .join('') || 'Classe'
  );
}

function words(value) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function quoteSafe(value) {
  return (value || '').replace(/"/g, "'");
}

function trunc(value, length = 36) {
  return value.length > length ? `${value.slice(0, length)}\u2026` : value;
}

// ── SPAN BUILDERS ─────────────────────────────────────────────────────────────

function span(className, content) {
  return `<span class="${className}">${escapeHtml(content)}</span>`;
}

const K = (v) => span('k', v);
const KW = (v) => span('kw', v);
const S = (v) => span('s', `"${v}"`);
const F = (v) => span('f', v);
const C = (v) => span('c', `# ${v}`);
const V = (v) => span('v', v);
const N = (v) => span('n', v);
const Op = (v) => span('op', v);
const G = (v) => span('g', v);
const Y = (v) => span('y', v);
const E = (v) => span('e', v);

// ── LINE NUMBERS ──────────────────────────────────────────────────────────────

let lineNumber = 0;
const resetLineNumber = () => { lineNumber = 0; };
const ln = () => span('ln', String(++lineNumber).padStart(2, ' '));

// ── VARIANTS ──────────────────────────────────────────────────────────────────

function v1(raw) {
  resetLineNumber();
  const name = snake(raw);
  const trimmed = raw.trim();
  let o = '';

  o += ln() + C(trunc(trimmed)) + '\n';
  o += ln() + V(name) + Op(' = ') + S(quoteSafe(trunc(trimmed, 50))) + '\n';
  o += ln() + '\n';
  o += ln() + F('print') + Op('(') + K('f') + S(`{${name}}`) + Op(')');

  return o;
}

function v2(raw) {
  resetLineNumber();
  const fname = snake(raw.slice(0, 28));
  const ws = words(raw);
  const arg = snake(ws[ws.length - 1] || 'x');
  let o = '';

  o += ln() + C('© NEØ Protocol') + '\n';
  o += ln() + KW('def ') + F(fname) + Op('(') + V(arg) + Op(': ') + KW('str') + Op(') -> ') + KW('str') + Op(':') + '\n';
  o += ln() + '    ' + S(quoteSafe(trunc(raw.trim(), 50))) + '\n';
  o += ln() + '    ' + K('return ') + K('f') + S(`{${arg}.upper()}`);

  return o;
}

function v3(raw) {
  resetLineNumber();
  const ws = words(raw).slice(0, 5);
  const name = cls(raw.slice(0, 20)).toUpperCase();
  let o = '';

  o += ln() + C('vibe check') + '\n';
  o += ln() + V(name) + Op(' = ') + Op('{') + '\n';
  ws.forEach((word, i) => {
    o += ln() + '    ' + S(word.toLowerCase()) + Op(': ') + N(i + 1) + (i < ws.length - 1 ? Op(',') : '') + '\n';
  });
  o += ln() + Op('}') + '\n';
  o += ln() + '\n';
  o += ln() + V('estado') + Op(' = ') + V(name) + Op('[') + S(quoteSafe(ws[0] || '?')) + Op(']');

  return o;
}

function v4(raw) {
  resetLineNumber();
  const fname = snake(raw.slice(0, 24));
  let o = '';

  o += ln() + KW('try') + Op(':') + '\n';
  o += ln() + '    ' + F(fname) + Op('()') + '\n';
  o += ln() + '    ' + F('print') + Op('(') + G('"✓ ') + G(quoteSafe(trunc(raw.trim(), 34))) + G('"') + Op(')') + '\n';
  o += ln() + KW('except ') + E('Exception') + Op(' as ') + V('e') + Op(':') + '\n';
  o += ln() + '    ' + F('print') + Op('(') + K('f') + S('erro: {e}') + Op(')') + '\n';
  o += ln() + KW('finally') + Op(':') + '\n';
  o += ln() + '    ' + KW('import') + G(' NoCODE.webapp') + '  ' + C('sempre python');

  return o;
}

function v5(raw) {
  resetLineNumber();
  const ws = words(raw);
  const items = ws.slice(0, 5).map((w) => S(w.toLowerCase())).join(Op(', '));
  const item = snake(ws[0] || 'x');
  let o = '';

  o += ln() + C(trunc(raw.trim(), 50)) + '\n';
  o += ln() + V('vida') + Op(' = [') + items + Op(']') + '\n';
  o += ln() + '\n';
  o += ln() + V('resultado') + Op(' = [') + '\n';
  o += ln() + '    ' + V(item) + '\n';
  o += ln() + '    ' + KW('for ') + V(item) + KW(' in ') + V('vida') + '\n';
  o += ln() + '    ' + KW('if ') + V(item) + Op(' != ') + S('') + '\n';
  o += ln() + Op(']');

  return o;
}

function v6(raw) {
  resetLineNumber();
  const ws = words(raw).slice(0, 4);
  const name = cls(raw.slice(0, 24)) || 'Momento';
  let o = '';

  o += ln() + Y('@dataclass') + '\n';
  o += ln() + KW('class ') + F(name) + Op(':') + '\n';
  ws.forEach((word) => {
    o += ln() + '    ' + V(snake(word)) + Op(': ') + KW('str') + '\n';
  });
  o += ln() + '\n';
  o += ln() + C('instantiating reality') + '\n';
  o += ln() + V('now') + Op(' = ') + F(name) + Op('(') + '\n';
  ws.forEach((word, i) => {
    o += ln() + '    ' + V(snake(word)) + Op('=') + S(quoteSafe(word.toLowerCase())) + (i < ws.length - 1 ? Op(',') : '') + '\n';
  });
  o += ln() + Op(')');

  return o;
}

const VARIANTS = [
  { fn: v1, name: 'variable · 01' },
  { fn: v2, name: 'function · 02' },
  { fn: v3, name: 'dict / enum · 03' },
  { fn: v4, name: 'try / except · 04' },
  { fn: v5, name: 'list comprehension · 05' },
  { fn: v6, name: 'dataclass · 06' }
];

// ── TEMPLATES ─────────────────────────────────────────────────────────────────

function buildCard(variant, index, raw) {
  const num = String(index + 1).padStart(2, '0');
  return `
    <div class="tcard">
      <div class="tcard-header">
        <div class="tdots">
          <div class="tdot tdot-r"></div>
          <div class="tdot tdot-y"></div>
          <div class="tdot tdot-g"></div>
        </div>
        <span class="tcard-name">main_${num}.py · ${variant.name}</span>
        <button class="copy-btn" type="button" data-copy-index="${index}">copy</button>
      </div>
      <div class="tcard-body" id="vb-${index}">${variant.fn(raw)}</div>
    </div>`;
}

function buildEmptyState() {
  return `
    <div class="tcard">
      <div class="tcard-body empty-state">
        <span style="color:#30363d">$ </span>awaiting input...<span class="empty-cursor">&#9608;</span>
      </div>
    </div>`;
}

// ── COPY ──────────────────────────────────────────────────────────────────────

function copyCard(index, button) {
  const element = document.getElementById(`vb-${index}`);
  if (!element || !navigator.clipboard) return;

  const text = element.innerText.replace(/^\s*\d+\s/gm, '');
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'copied ✓';
    button.classList.add('done');
    setTimeout(() => {
      button.textContent = 'copy';
      button.classList.remove('done');
    }, 1800);
  });
}

// ── LOADER ────────────────────────────────────────────────────────────────────

function getTimestamp() {
  return new Date().toTimeString().split(' ')[0];
}

async function startLoader() {
  const logContainer = document.getElementById('loader-logs');
  const loader = document.getElementById('loader');
  if (!logContainer || !loader) return;

  for (const msg of logs) {
    if (msg === 'ASCII_ART') {
      const block = document.createElement('div');
      block.className = 'ascii-box';
      block.textContent = ascii;
      logContainer.appendChild(block);
      await wait(100);
      block.classList.add('active');
      await wait(800);
      continue;
    }

    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-ts">${getTimestamp()}</span>
      <span class="log-msg ${msg.includes('LIVE') ? 'highlight' : ''}">${escapeHtml(msg)}</span>`;
    logContainer.appendChild(line);
    await wait(50);
    line.classList.add('active');
    await wait(Math.random() * 400 + 200);
  }

  setTimeout(() => loader.classList.add('hidden'), 1000);
}

// ── DEV PRANK ─────────────────────────────────────────────────────────────────

function devPrank() {
  setTimeout(() => {
    console.log('%c NEØ PROTOCOL // SYSTEM OVERRIDE ', 'background:#f85149;color:#fff;font-weight:bold;padding:4px;');
    console.log('%c[!] Warning: Reality.py has been modified.', 'color:#f85149;');
    console.log('%c[i] Establishing proxy through 127.0.0.1...', 'color:#79c0ff;');
    console.log('%c[✓] Root access granted. Downloading cookies...', 'color:#3fb950;');
    setTimeout(() => {
      console.log('%c I GET // U - Its a joke ', 'background:#3fb950;color:#000;font-weight:bold;padding:4px;');
    }, 3000);
  }, 2000);
}

// ── INIT ──────────────────────────────────────────────────────────────────────

function init() {
  const yearEl = document.getElementById('yr');
  const inputEl = document.getElementById('txt');
  const counterEl = document.getElementById('cc');
  const variantsEl = document.getElementById('variants');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!inputEl || !counterEl || !variantsEl) return;

  const render = (raw) => {
    counterEl.textContent = `${raw.length} chars`;
    variantsEl.innerHTML = raw.trim()
      ? VARIANTS.map((variant, i) => buildCard(variant, i, raw)).join('')
      : buildEmptyState();
  };

  variantsEl.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-copy-index]');
    if (!button) return;
    copyCard(Number(button.dataset.copyIndex), button);
  });

  inputEl.addEventListener('input', (event) => render(event.target.value));

  render('');
  devPrank();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', startLoader);
