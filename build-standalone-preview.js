#!/usr/bin/env node
/**
 * Build a single self-contained HTML preview file:
 *   public/car-overlay-preview.html
 *
 * All 3 Lottie JSONs are embedded inline so the file works when opened
 * directly via file:// (no server needed). The lottie-web runtime is loaded
 * from a CDN, but can be swapped for an inline copy if you want full offline.
 *
 * Run:  node build-standalone-preview.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lotties = {
  '16x9': fs.readFileSync(path.join(__dirname, 'public/car-overlay.16x9.lottie.json'), 'utf8'),
  '4x3':  fs.readFileSync(path.join(__dirname, 'public/car-overlay.4x3.lottie.json'),  'utf8'),
  '9x16': fs.readFileSync(path.join(__dirname, 'public/car-overlay.9x16.lottie.json'), 'utf8'),
};

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Car Overlay — Lottie preview (standalone)</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width:100%; height:100%; background:#111; font-family:"Inter",system-ui,sans-serif; color:#fff; }
  .stage { position:relative; width:100vw; height:100vh; overflow:hidden; display:grid; place-items:center; }
  .frame { position:relative; background:#000; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,.5); }
  .frame.r-16x9 { aspect-ratio:16/9; width:min(100vw, calc(100vh * 16 / 9)); height:auto; }
  .frame.r-4x3  { aspect-ratio:4/3;  width:min(100vw, calc(100vh * 4  / 3 )); height:auto; }
  .frame.r-9x16 { aspect-ratio:9/16; width:min(100vw, calc(100vh * 9  / 16)); height:auto; }
  .frame > video, .frame > img.bg {
    position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  }
  .frame > #lottie { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
  .panel {
    position:fixed; top:8px; left:8px; z-index:50;
    background:rgba(0,0,0,.72); border-radius:10px; padding:10px 12px;
    font:12px/1.4 ui-monospace, monospace;
    display:flex; gap:12px; align-items:center; flex-wrap:wrap;
  }
  .panel button { background:#fff; color:#111; border:0; border-radius:4px; padding:6px 10px; cursor:pointer; font-weight:600; }
  .panel button.active { background:#1FAACB; color:#fff; }
  .panel input[type="file"] { color:#fff; max-width:200px; }
  .panel .sep { width:1px; height:18px; background:#444; }
  .panel small { opacity:.65; }
  .panel .group { display:flex; gap:4px; }
  .empty-msg {
    position:absolute; inset:0; display:grid; place-items:center;
    color:#666; font-size:14px; pointer-events:none; text-align:center;
  }
</style>
</head>
<body>

<!-- All 3 Lottie variants are embedded inline so the file works via file:// -->
<script type="application/json" id="lottie-16x9">${lotties['16x9']}</script>
<script type="application/json" id="lottie-4x3">${lotties['4x3']}</script>
<script type="application/json" id="lottie-9x16">${lotties['9x16']}</script>

<div class="panel">
  <div class="group">
    <button class="ratio" data-r="16x9">16:9</button>
    <button class="ratio" data-r="4x3">4:3</button>
    <button class="ratio" data-r="9x16">9:16</button>
  </div>
  <span class="sep"></span>
  <button id="play">▶ Rejouer</button>
  <label>Vidéo/GIF: <input id="src" type="file" accept="video/*,image/gif,image/*"></label>
  <span class="sep"></span>
  <small>Fichier autonome — Lottie inline, aucun serveur requis.</small>
</div>

<div class="stage">
  <div class="frame r-16x9" id="frame">
    <video id="bg" autoplay muted loop playsinline></video>
    <img class="bg" id="bgImg" alt="" style="display:none">
    <div class="empty-msg" id="empty">↑ Choisir une vidéo ou un GIF pour voir l'overlay par dessus</div>
    <div id="lottie"></div>
  </div>
</div>

<!-- lottie-web from a CDN (~190 KB) -->
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>
<script>
const DATA = {
  '16x9': JSON.parse(document.getElementById('lottie-16x9').textContent),
  '4x3':  JSON.parse(document.getElementById('lottie-4x3').textContent),
  '9x16': JSON.parse(document.getElementById('lottie-9x16').textContent),
};

let anim = null;
let currentRatio = '16x9';

function setRatio(r) {
  currentRatio = r;
  const frame = document.getElementById('frame');
  frame.classList.remove('r-16x9','r-4x3','r-9x16');
  frame.classList.add('r-' + r);
  document.querySelectorAll('.ratio').forEach(b => b.classList.toggle('active', b.dataset.r === r));
  loadLottie();
}

function loadLottie() {
  if (anim) anim.destroy();
  anim = lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: DATA[currentRatio],
    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
  });
}

function play() {
  if (anim) anim.goToAndPlay(0, true);
  const v = document.getElementById('bg');
  if (v && v.src) { v.currentTime = 0; v.play().catch(()=>{}); }
}

document.querySelectorAll('.ratio').forEach(b => b.addEventListener('click', () => setRatio(b.dataset.r)));
document.getElementById('play').addEventListener('click', play);

document.getElementById('src').addEventListener('change', (e) => {
  const f = e.target.files[0]; if (!f) return;
  document.getElementById('empty').style.display = 'none';
  const url = URL.createObjectURL(f);
  const v = document.getElementById('bg');
  const img = document.getElementById('bgImg');
  if (f.type.startsWith('video/')) {
    img.style.display = 'none';
    v.style.display = '';
    v.src = url; v.play().catch(()=>{});
  } else {
    v.style.display = 'none';
    v.removeAttribute('src');
    img.style.display = '';
    img.src = url;
  }
  play();
});

setRatio('16x9');
</script>
</body>
</html>
`;

const outPath = path.join(__dirname, 'public/car-overlay-preview.html');
fs.writeFileSync(outPath, html);
console.log(`Written ${path.relative(__dirname, outPath)} (${(html.length/1024).toFixed(1)} KB)`);
