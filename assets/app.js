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
      | _   _ ______ ____     _____  _____   ____ _______ ____   _____ ____  _ |
      | | \\ | | ____ / __ \\   | __ \\| __ \\ / __ \\__   __/ __ \\ / ____/ __ \\| |      |
      | |  \\| | | __ | |  | |  | | __) | | __) | |  | | | | | |  | | |   | |  | | |      |
      | | . \` |  __|| |  | |  |  ___/|  _  /| |  | | | | | |  | | |   | |  | | |      |
      | | |\\  | |___| |__| |  | |    | | \\ \\| |__| | | | | |__| | |___| |__| | |____  |
      | |_| \\_|______\\____/   |_|    |_|  \\_\\\\____/  |_|  \\____/ \\_____\\____/|______| |
      '-------------------------------------------------------------------------------'
`;

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
  return value.length > length ? `${value.slice(0, length)}…` : value;
}

function span(className, content) {
  return `<span class="${className}">${escapeHtml(content)}</span>`;
}

const K = (value) => span('k', value);
const KW = (value) => span('kw', value);
const S = (value) => span('s', `"${value}"`);
const F = (value) => span('f', value);
const C = (value) => span('c', `# ${value}`);
const V = (value) => span('v', value);
const N = (value) => span('n', value);
const Op = (value) => span('op', value);
const G = (value) => span('g', value);
const Y = (value) => span('y', value);
const E = (value) => span('e', value);

let lineNumber = 0;
function resetLineNumber() {
  lineNumber = 0;
}

function ln() {
  lineNumber += 1;
  return span('ln', String(lineNumber).padStart(2, ' '));
}

function v1(raw) {
  resetLineNumber();
  const name = snake(raw);
  const trimmed = raw.trim();
  let output = '';

  output += ln() + C(trunc(trimmed)) + '\n';
  output += ln() + V(name) + Op(' = ') + S(quoteSafe(trunc(trimmed, 50))) + '\n';
  output += ln() + '\n';
  output += ln() + F('print') + Op('(') + K('f') + S(`{${name}}`) + Op(')');

  return output;
}

function v2(raw) {
  resetLineNumber();
  const fname = snake(raw.slice(0, 28));
  const ws = words(raw);
  const arg = snake(ws[ws.length - 1] || 'x');
  let output = '';

  output += ln() + C('© NEØ Protocol') + '\n';
  output += ln() + KW('def ') + F(fname) + Op('(') + V(arg) + Op(': ') + KW('str') + Op(') -> ') + KW('str') + Op(':') + '\n';
  output += ln() + '    ' + S(quoteSafe(trunc(raw.trim(), 50))) + '\n';
  output += ln() + '    ' + K('return ') + K('f') + S(`{${arg}.upper()}`);

  return output;
}

function v3(raw) {
  resetLineNumber();
  const ws = words(raw).slice(0, 5);
  const name = cls(raw.slice(0, 20)).toUpperCase();
  let output = '';

  output += ln() + C('vibe check') + '\n';
  output += ln() + V(name) + Op(' = ') + Op('{') + '\n';
  ws.forEach((word, index) => {
    output +=
      ln() +
      '    ' +
      S(word.toLowerCase()) +
      Op(': ') +
      N(index + 1) +
      (index < ws.length - 1 ? Op(',') : '') +
      '\n';
  });
  output += ln() + Op('}') + '\n';
  output += ln() + '\n';
  output += ln() + V('estado') + Op(' = ') + V(name) + Op('[') + S(quoteSafe(ws[0] || '?')) + Op(']');

  return output;
}

function v4(raw) {
  resetLineNumber();
  const fname = snake(raw.slice(0, 24));
  let output = '';

  output += ln() + KW('try') + Op(':') + '\n';
  output += ln() + '    ' + F(fname) + Op('()') + '\n';
  output += ln() + '    ' + F('print') + Op('(') + G('"✓ ') + G(quoteSafe(trunc(raw.trim(), 34))) + G('"') + Op(')') + '\n';
  output += ln() + KW('except ') + E('Exception') + Op(' as ') + V('e') + Op(':') + '\n';
  output += ln() + '    ' + F('print') + Op('(') + K('f') + S('erro: {e}') + Op(')') + '\n';
  output += ln() + KW('finally') + Op(':') + '\n';
  output += ln() + '    ' + KW('import') + G(' NoCODE.webapp') + '  ' + C('sempre python');

  return output;
}

function v5(raw) {
  resetLineNumber();
  const ws = words(raw);
  const items = ws
    .slice(0, 5)
    .map((word) => S(word.toLowerCase()))
    .join(Op(', '));
  const item = snake(ws[0] || 'x');
  let output = '';

  output += ln() + C(trunc(raw.trim(), 50)) + '\n';
  output += ln() + V('vida') + Op(' = [') + items + Op(']') + '\n';
  output += ln() + '\n';
  output += ln() + V('resultado') + Op(' = [') + '\n';
  output += ln() + '    ' + V(item) + '\n';
  output += ln() + '    ' + KW('for ') + V(item) + KW(' in ') + V('vida') + '\n';
  output += ln() + '    ' + KW('if ') + V(item) + Op(' != ') + S('') + '\n';
  output += ln() + Op(']');

  return output;
}

function v6(raw) {
  resetLineNumber();
  const ws = words(raw).slice(0, 4);
  const name = cls(raw.slice(0, 24)) || 'Momento';
  let output = '';

  output += ln() + Y('@dataclass') + '\n';
  output += ln() + KW('class ') + F(name) + Op(':') + '\n';
  ws.forEach((word) => {
    output += ln() + '    ' + V(snake(word)) + Op(': ') + KW('str') + '\n';
  });
  output += ln() + '\n';
  output += ln() + C('instantiating reality') + '\n';
  output += ln() + V('now') + Op(' = ') + F(name) + Op('(') + '\n';
  ws.forEach((word, index) => {
    output +=
      ln() +
      '    ' +
      V(snake(word)) +
      Op('=') +
      S(quoteSafe(word.toLowerCase())) +
      (index < ws.length - 1 ? Op(',') : '') +
      '\n';
  });
  output += ln() + Op(')');

  return output;
}

const VARIANTS = [
  { fn: v1, name: 'variable · 01' },
  { fn: v2, name: 'function · 02' },
  { fn: v3, name: 'dict / enum · 03' },
  { fn: v4, name: 'try / except · 04' },
  { fn: v5, name: 'list comprehension · 05' },
  { fn: v6, name: 'dataclass · 06' }
];

function buildCard(variant, index, raw) {
  return `
    <div class="tcard">
      <div class="tcard-header">
        <div class="tdots"><div class="tdot tdot-r"></div><div class="tdot tdot-y"></div><div class="tdot tdot-g"></div></div>
        <span class="tcard-name">main_${String(index + 1).padStart(2, '0')}.py · ${variant.name}</span>
        <button class="copy-btn" type="button" data-copy-index="${index}">copy</button>
      </div>
      <div class="tcard-body" id="vb-${index}">${variant.fn(raw)}</div>
    </div>
  `;
}

function buildEmptyState() {
  return `
    <div class="tcard">
      <div class="tcard-body empty-state"><span style="color:#30363d">$ </span>awaiting input...<span class="empty-cursor">▌</span></div>
    </div>
  `;
}

function copyCard(index, button) {
  const element = document.getElementById(`vb-${index}`);
  if (!element) {
    return;
  }

  const text = element.innerText.replace(/^\s*\d+\s/gm, '');
  if (!navigator.clipboard) {
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'copied ✓';
    button.classList.add('done');
    setTimeout(() => {
      button.textContent = 'copy';
      button.classList.remove('done');
    }, 1800);
  });
}

function getTimestamp() {
  return new Date().toTimeString().split(' ')[0];
}

async function startLoader() {
  const logContainer = document.getElementById('loader-logs');
  const loader = document.getElementById('loader');

  if (!logContainer || !loader) {
    return;
  }

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
    const mode = msg.includes('LIVE') ? 'highlight' : '';
    line.innerHTML = `<span class="log-ts">${getTimestamp()}</span><span class="log-msg ${mode}">${escapeHtml(msg)}</span>`;
    logContainer.appendChild(line);
    await wait(50);
    line.classList.add('active');
    await wait(Math.random() * 400 + 200);
  }

  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);
}

function init() {
  const yearElement = document.getElementById('yr');
  const inputElement = document.getElementById('txt');
  const counterElement = document.getElementById('cc');
  const variantsElement = document.getElementById('variants');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (!inputElement || !counterElement || !variantsElement) {
    return;
  }

  const render = (raw) => {
    counterElement.textContent = `${raw.length} chars`;

    if (!raw.trim()) {
      variantsElement.innerHTML = buildEmptyState();
      return;
    }

    variantsElement.innerHTML = VARIANTS.map((variant, index) => buildCard(variant, index, raw)).join('');
  };

  variantsElement.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-copy-index]');
    if (!button) {
      return;
    }

    const index = Number(button.dataset.copyIndex);
    copyCard(index, button);
  });

  inputElement.addEventListener('input', (event) => {
    render(event.target.value);
  });

  render('');

  setTimeout(() => {
    console.log('%c NEØ PROTOCOL // SYSTEM OVERRIDE ', 'background: #f85149; color: #fff; font-weight: bold; padding: 4px;');
    console.log('%c[!] Warning: Reality.py has been modified.', 'color: #f85149;');
    console.log('%c[i] Establishing proxy through 127.0.0.1...', 'color: #79c0ff;');
    console.log('%c[✓] Root access granted. Downloading cookies...', 'color: #3fb950;');
    setTimeout(() => {
      console.log('%c I GET // U - Its a joke ', 'background: #3fb950; color: #000; font-weight: bold; padding: 4px;');
    }, 3000);
  }, 2000);
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', startLoader);
