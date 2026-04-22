let currentR = 0, currentG = 0, currentB = 0;
let colorHistory = [];
let totalGenerated = 0;
const colorStage    = document.getElementById('colorStage');
const stageLabel    = document.getElementById('stageLabel');
const stageHint     = document.getElementById('stageHint');
const stageHex      = document.getElementById('stageHex');
const generateBtn   = document.getElementById('generateBtn');
const genCounter    = document.getElementById('genCounter');
const footerTotal   = document.getElementById('footerTotal');
const historyGrid   = document.getElementById('historyGrid');
const historyEmpty  = document.getElementById('historyEmpty');
const historyCount  = document.getElementById('historyCount');
const shadesStrip   = document.getElementById('shadesStrip');
const harmonyRow    = document.getElementById('harmonyRow');
function randomChannel() {
  return Math.floor(Math.random() * 256);
}
function generateColor() {
  currentR = randomChannel();
  currentG = randomChannel();
  currentB = randomChannel();

  applyColor(currentR, currentG, currentB);
  totalGenerated++;

  genCounter.textContent  = totalGenerated;
  footerTotal.textContent = `${totalGenerated} generated`;

  addToHistory(currentR, currentG, currentB);
}
function applyColor(r, g, b) {
  const hex  = rgbToHex(r, g, b);
  const hsl  = rgbToHsl(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  colorStage.style.background = `rgb(${r}, ${g}, ${b})`;
  stageLabel.textContent = `rgb(${r}, ${g}, ${b})`;
  stageHex.textContent   = hex;
  stageHint.style.opacity = '0.7';
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textColor = luminance > 0.5 ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)';
  stageLabel.style.color    = textColor;
  stageHex.style.color      = textColor;
  stageHint.style.color     = textColor;
  document.getElementById('valRgb').textContent  = `rgb(${r}, ${g}, ${b})`;
  document.getElementById('valHex').textContent  = hex;
  document.getElementById('valHsl').textContent  = hsl;
  document.getElementById('valCmyk').textContent = cmyk;

  updateBars(r, g, b);
  renderShades(r, g, b);
  renderHarmony(r, g, b);
}
function updateBars(r, g, b) {
  document.getElementById('barR').style.width = `${(r / 255) * 100}%`;
  document.getElementById('barG').style.width = `${(g / 255) * 100}%`;
  document.getElementById('barB').style.width = `${(b / 255) * 100}%`;

  document.getElementById('numR').textContent = r;
  document.getElementById('numG').textContent = g;
  document.getElementById('numB').textContent = b;

  document.getElementById('pctR').textContent = `${Math.floor((r / 255) * 100)}%`;
  document.getElementById('pctG').textContent = `${Math.floor((g / 255) * 100)}%`;
  document.getElementById('pctB').textContent = `${Math.floor((b / 255) * 100)}%`;
}
function renderShades(r, g, b) {
  shadesStrip.innerHTML = '';
  const steps = 11;

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);                   
    const sr = Math.floor(r * t + 0 * (1 - t));
    const sg = Math.floor(g * t + 0 * (1 - t));
    const sb = Math.floor(b * t + 0 * (1 - t));
    const mixR = Math.floor(r + (255 - r) * (i / (steps - 1)));
    const mixG = Math.floor(g + (255 - g) * (i / (steps - 1)));
    const mixB = Math.floor(b + (255 - b) * (i / (steps - 1)));
    let fr, fg, fb;
    if (i < Math.floor(steps / 2)) {
      const ratio = i / Math.floor(steps / 2);
      fr = Math.floor(r * ratio);
      fg = Math.floor(g * ratio);
      fb = Math.floor(b * ratio);
    } else if (i === Math.floor(steps / 2)) {
      fr = r; fg = g; fb = b;
    } else {
      const ratio = (i - Math.floor(steps / 2)) / Math.floor(steps / 2);
      fr = Math.floor(r + (255 - r) * ratio);
      fg = Math.floor(g + (255 - g) * ratio);
      fb = Math.floor(b + (255 - b) * ratio);
    }

    const hex = rgbToHex(fr, fg, fb);

    const swatch = document.createElement('div');
    swatch.className = 'shade-swatch';
    swatch.style.background = `rgb(${fr},${fg},${fb})`;
    swatch.title = hex;
    swatch.innerHTML = `<span class="shade-swatch-label">${hex}</span>`;
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      currentR = fr; currentG = fg; currentB = fb;
      applyColor(fr, fg, fb);
      addToHistory(fr, fg, fb);
    });
    shadesStrip.appendChild(swatch);
  }
}
function renderHarmony(r, g, b) {
  const [h, s, l] = hslValues(r, g, b);

  const harmonies = [
    { type: 'COMPLEMENTARY',    hue: (h + 180) % 360 },
    { type: 'SPLIT COMP. 1',    hue: (h + 150) % 360 },
    { type: 'SPLIT COMP. 2',    hue: (h + 210) % 360 },
    { type: 'TRIADIC 1',        hue: (h + 120) % 360 },
    { type: 'TRIADIC 2',        hue: (h + 240) % 360 },
    { type: 'ANALOGOUS −30°',   hue: (h + 330) % 360 },
    { type: 'ANALOGOUS +30°',   hue: (h + 30)  % 360 },
    { type: 'TETRADIC',         hue: (h + 90)  % 360 },
  ];

  harmonyRow.innerHTML = harmonies.map(harm => {
    const hexColor = hslToHex(harm.hue, s, l);
    return `
      <div class="col-6 col-md-3">
        <div class="harmony-card" onclick="pickHarmonyColor('${hexColor}')">
          <div class="harmony-swatch" style="background:${hexColor};"></div>
          <div class="harmony-info">
            <div class="harmony-type">${harm.type}</div>
            <div class="harmony-hex">${hexColor}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.pickHarmonyColor = function(hex) {
  const { r, g, b } = hexToRgb(hex);
  currentR = r; currentG = g; currentB = b;
  applyColor(r, g, b);
  addToHistory(r, g, b);
};
function addToHistory(r, g, b) {
  const hex = rgbToHex(r, g, b);
  const entry = { r, g, b, hex };
  if (colorHistory.length > 0) {
    const last = colorHistory[colorHistory.length - 1];
    if (last.hex === hex) return;
  }

  colorHistory.push(entry);
  if (colorHistory.length > 40) colorHistory.shift();

  renderHistory();
}

function renderHistory() {
  if (historyEmpty) historyEmpty.remove();

  historyGrid.innerHTML = colorHistory.slice().reverse().map((c, i) => `
    <div class="history-swatch"
         style="background: rgb(${c.r},${c.g},${c.b});"
         onclick="pickHistory(${c.r},${c.g},${c.b})"
         title="${c.hex}">
      <div class="history-swatch-label">${c.hex}</div>
    </div>
  `).join('');

  historyCount.textContent = `${colorHistory.length} color${colorHistory.length !== 1 ? 's' : ''}`;
}

window.pickHistory = function(r, g, b) {
  currentR = r; currentG = g; currentB = b;
  applyColor(r, g, b);
};

window.clearHistory = function() {
  colorHistory = [];
  historyGrid.innerHTML = `
    <div class="history-empty" id="historyEmpty">
      <i class="bi bi-palette2"></i>
      <span>No colors yet — click the stage or hit Generate</span>
    </div>`;
  historyCount.textContent = '0 colors';
};
window.copyCode = function(type) {
  const map = {
    rgb:  document.getElementById('valRgb').textContent,
    hex:  document.getElementById('valHex').textContent,
    hsl:  document.getElementById('valHsl').textContent,
    cmyk: document.getElementById('valCmyk').textContent,
  };

  const cardMap = {
    rgb: 'cardRgb', hex: 'cardHex', hsl: 'cardHsl', cmyk: 'cardCmyk'
  };

  const text = map[type];
  if (!text || text === '—') return;

  navigator.clipboard.writeText(text).then(() => {
    const card = document.getElementById(cardMap[type]);
    card.classList.add('copied');
    const action = card.querySelector('.code-card-action');
    const prev = action.innerHTML;
    action.innerHTML = '<i class="bi bi-check2"></i> COPIED!';
    setTimeout(() => {
      card.classList.remove('copied');
      action.innerHTML = prev;
    }, 1800);
  });
};

window.copyAll = function() {
  const all = [
    document.getElementById('valRgb').textContent,
    document.getElementById('valHex').textContent,
    document.getElementById('valHsl').textContent,
    document.getElementById('valCmyk').textContent,
  ].filter(v => v && v !== '—').join('  |  ');

  if (!all) return;
  navigator.clipboard.writeText(all);

  const btn = document.querySelector('.gen-btn--ghost:last-child span');
  if (btn) { btn.textContent = 'COPIED!'; setTimeout(() => btn.textContent = 'COPY ALL', 1800); }
};

function rgbToHex(r, g, b) {
  const toH = n => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toH(r)}${toH(g)}${toH(b)}`;
}

function rgbToHsl(r, g, b) {
  const [h, s, l] = hslValues(r, g, b);
  return `hsl(${h}°, ${s}%, ${l}%)`;
}

function hslValues(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = Math.floor(((max + min) / 2) * 100);

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = Math.floor((l > 50 ? d / (2 - max - min) : d / (max + min)) * 100);
    switch (max) {
      case r: h = Math.floor((((g - b) / d + (g < b ? 6 : 0)) / 6) * 360); break;
      case g: h = Math.floor((((b - r) / d + 2) / 6) * 360); break;
      case b: h = Math.floor((((r - g) / d + 4) / 6) * 360); break;
    }
  }
  return [h, s, l];
}

function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return 'cmyk(0%, 0%, 0%, 100%)';
  const rp = r / 255, gp = g / 255, bp = b / 255;
  const k  = 1 - Math.max(rp, gp, bp);
  const c  = Math.floor(((1 - rp - k) / (1 - k)) * 100);
  const m  = Math.floor(((1 - gp - k) / (1 - k)) * 100);
  const y  = Math.floor(((1 - bp - k) / (1 - k)) * 100);
  return `cmyk(${c}%, ${m}%, ${y}%, ${Math.floor(k * 100)}%)`;
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }

  r = Math.floor((r + m) * 255);
  g = Math.floor((g + m) * 255);
  b = Math.floor((b + m) * 255);

  return rgbToHex(r, g, b);
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

colorStage.addEventListener('click', generateColor);
generateBtn.addEventListener('click', generateColor);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    generateColor();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  generateColor();
});
