#!/usr/bin/env node
/**
 * LOTTIE GENERATOR — Car overlay (manouvellevoiture-style)
 *
 * Produces one Lottie JSON per aspect ratio:
 *   - 16:9  (1920x1080)  → public/car-overlay.16x9.lottie.json
 *   - 4:3   (1440x1080)  → public/car-overlay.4x3.lottie.json
 *   - 9:16  (1080x1920)  → public/car-overlay.9x16.lottie.json
 *
 * Run:  node export-car-overlay-lottie.js          (all formats)
 *       node export-car-overlay-lottie.js 16:9     (one format)
 *
 * Edit the CONFIG object below to retarget the template.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* =============================================================== CONFIG */
const CONFIG = {
  fps:    30,
  duration: 22,

  brand: [0.122, 0.667, 0.796], // #1FAACB
  ink:   [0.133, 0.133, 0.133],
  white: [1, 1, 1],

  model:   "PEUGEOT 308",
  version: "Electrique 55 kWh 156ch - GT Exclusive",

  specs: [
    { label: "Kilométrage :",          value: "1 500" },
    { label: "Mise en circulation :",  value: "30/10/2025" },
    { label: "Transmission :",         value: "Automatique" },
    { label: "Puissance :",            value: "156 ch" },
  ],

  features: [
    "Jantes alliage 18\"",
    "Climatisation automatique bi-zone",
    "Navigation connectée",
    "Direction assistée",
  ],

  endPoints: [
    "Garantie",
    "Satisfait ou remboursé",
    "Prête-à-partir",
    "Révisée",
  ],
  endFootnote: "Plus de 3000 véhicules d'occasion en stock",
};

/* ============================================================ LAYOUTS  *
 * Per-format layout dictionaries — geometry only. Timings are shared.
 *
 *  pillX/Y           : intro pill center
 *  bannerY           : title banner Y center (banner is anchored left edge)
 *  bannerW/H         : banner pill size
 *  specsX/Y/rowH     : top-left of specs column
 *  iconsX/Y/rowH     : icons strip position
 *  iconsDir          : 'col' (vertical strip, tooltip on right)
 *                    | 'row' (horizontal strip, tooltip above)
 *  endMode           : 'right' (right panel slides from right) | 'bottom' (slides from below)
 *  endSize           : panel size [w,h]
 *  wmX/Y             : watermark center
 *  fonts.{name}: size for each text role
 */
function layoutFor(format) {
  switch (format) {
    case '16:9': return {
      w: 1920, h: 1080,
      pillX: 460, pillY: 950, pillW: 720, pillH: 130,
      bannerX: 540, bannerY: 95, bannerW: 1080, bannerH: 90,
      specsX: 100, specsY: 280, specsRowH: 110, specsLabel: 22, specsValue: 30,
      iconsX: 70, iconsY: 320, iconsRowH: 130, iconsDir: 'col',
      iconSize: 70, tipFont: 22,
      endMode: 'right',
      endW: 1920 * 0.35, endH: 1080,
      endLabelFont: 30, endFootFont: 18,
      wmX: 1920 - 130, wmY: 1080 - 90, wmScale: 1,
      bannerFont: 36, introModelFont: 40, introVersionFont: 26,
    };

    case '4:3': return {
      w: 1440, h: 1080,
      pillX: 420, pillY: 950, pillW: 680, pillH: 130,
      bannerX: 510, bannerY: 95, bannerW: 1020, bannerH: 90,
      specsX: 100, specsY: 270, specsRowH: 110, specsLabel: 22, specsValue: 30,
      iconsX: 70, iconsY: 310, iconsRowH: 130, iconsDir: 'col',
      iconSize: 70, tipFont: 22,
      endMode: 'right',
      endW: 1440 * 0.40, endH: 1080,
      endLabelFont: 28, endFootFont: 17,
      wmX: 1440 - 120, wmY: 1080 - 90, wmScale: 1,
      bannerFont: 34, introModelFont: 38, introVersionFont: 24,
    };

    case '9:16': return {
      // Portrait: everything moves to top/bottom strips. No left vertical strip.
      w: 1080, h: 1920,
      pillX: 540, pillY: 280, pillW: 880, pillH: 150,
      bannerX: 540, bannerY: 130, bannerW: 1000, bannerH: 110,
      specsX: 100, specsY: 480, specsRowH: 110, specsLabel: 24, specsValue: 32,
      iconsX: 540, iconsY: 1320, iconsRowH: 230, iconsDir: 'row',
      iconSize: 90, tipFont: 26,
      endMode: 'bottom',
      endW: 1080, endH: 1920 * 0.55,
      endLabelFont: 38, endFootFont: 22,
      wmX: 1080 - 130, wmY: 1920 - 130, wmScale: 1.1,
      bannerFont: 42, introModelFont: 48, introVersionFont: 28,
      bannerCentered: true,
    };

    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

/* ============================================================ HELPERS  */
const FPS = CONFIG.fps;
const T   = (sec) => Math.round(sec * FPS);
const TOTAL = T(CONFIG.duration);

const TL = {
  introIn:    T(0.2),
  introOut:   T(2.4),
  bannerIn:   T(0.4),
  bannerOut:  T(11.5),
  specsIn:    T(1.4),
  specsOut:   T(4.0),
  iconsIn:    T(5.0),
  iconStep:   T(1.7),
  endIn:      T(12.0),
};

const EASE_IO_O = { x: [0.42], y: [0] };
const EASE_IO_I = { x: [0.58], y: [1] };

function kf(values) {
  const k = [];
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const entry = { t: v.t, s: Array.isArray(v.s) ? v.s : [v.s] };
    if (i < values.length - 1) {
      entry.i = v.easeIn || { x: [0.2], y: [1] };
      entry.o = v.easeOut || { x: [0.2], y: [0] };
    }
    k.push(entry);
  }
  return { a: 1, k };
}

function val(v) { return { a: 0, k: Array.isArray(v) ? v : [v] }; }

function shapeRect({ size, position = [0,0], roundness = 0 }) {
  return { ty: "rc", d: 1,
    s: { a: 0, k: size }, p: { a: 0, k: position },
    r: { a: 0, k: roundness }, nm: "rect" };
}
function shapeEllipse({ size, position = [0,0] }) {
  return { ty: "el", d: 1,
    s: { a: 0, k: size }, p: { a: 0, k: position }, nm: "ellipse" };
}
function shapeFill(rgb, opacity = 100) {
  return { ty: "fl", c: { a: 0, k: [rgb[0],rgb[1],rgb[2],1] },
    o: { a: 0, k: opacity }, r: 1, nm: "fill" };
}
function shapeStroke(rgb, width, opacity = 100) {
  return { ty: "st", c: { a: 0, k: [rgb[0],rgb[1],rgb[2],1] },
    o: { a: 0, k: opacity }, w: { a: 0, k: width },
    lc: 2, lj: 2, ml: 4, nm: "stroke" };
}
function shapeGroup(items, opacity = 100) {
  return { ty: "gr", it: [
    ...items,
    { ty: "tr",
      p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] },
      s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 },
      o: { a: 0, k: opacity }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
  ], nm: "group" };
}

const FONTS = {
  list: [
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "800", fStyle: "ExtraBold", fName: "Inter-ExtraBold", ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "700", fStyle: "Bold",      fName: "Inter-Bold",      ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "500", fStyle: "Medium",    fName: "Inter-Medium",    ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "400", fStyle: "Regular",   fName: "Inter-Regular",   ascent: 75 },
  ],
};

function text({ text: txt, font = "Inter-Bold", size = 36, color = CONFIG.ink, align = 0 }) {
  return {
    d: { k: [{
      s: { sz: [1000, 100], ps: [0, 0],
        s: size, f: font, t: txt, j: align, tr: 0,
        lh: size * 1.2, ls: 0, fc: color }, t: 0,
    }]},
    p: {}, m: { g: 1, a: { a: 0, k: [0,0] } }, a: [],
  };
}

/* ============================================================ BUILD    */
function buildAnimation(format) {
  const L = layoutFor(format);
  let _ind = 0;
  const ind = () => ++_ind;
  const layers = [];

  /* -- Watermark ------------------------------------------------------ */
  {
    const wmW = 220 * L.wmScale, wmH = 110 * L.wmScale;
    layers.push({
      ddd: 0, ind: ind(), ty: 4, nm: "wm-bg", sr: 1, ip: 0, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: val([L.wmX, L.wmY, 0]), a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [shapeGroup([shapeRect({ size: [wmW, wmH], roundness: 8 }), shapeFill(CONFIG.white)])],
    });
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "wm-ma", sr: 1, ip: 0, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: val([L.wmX, L.wmY - 28*L.wmScale, 0]), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: "ma", font: "Inter-Bold", size: 22*L.wmScale, color: [0.35,0.35,0.35], align: 2 }),
    });
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "wm-mid", sr: 1, ip: 0, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: val([L.wmX, L.wmY, 0]), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: "nouvelle voiture", font: "Inter-ExtraBold", size: 26*L.wmScale, color: CONFIG.brand, align: 2 }),
    });
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "wm-com", sr: 1, ip: 0, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: val([L.wmX, L.wmY + 32*L.wmScale, 0]), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: ".com", font: "Inter-Bold", size: 18*L.wmScale, color: [0.35,0.35,0.35], align: 2 }),
    });
  }

  /* -- Intro pill ----------------------------------------------------- */
  {
    const pos = kf([
      { t: 0,                    s: [L.pillX, L.pillY + 200, 0] },
      { t: TL.introIn,           s: [L.pillX, L.pillY, 0],       easeOut: EASE_IO_O, easeIn: EASE_IO_I },
      { t: TL.introOut,          s: [L.pillX, L.pillY, 0] },
      { t: TL.introOut + T(0.5), s: [L.pillX, L.pillY + 200, 0] },
    ]);
    const op = kf([
      { t: 0, s: 0 },
      { t: TL.introIn, s: 100 },
      { t: TL.introOut, s: 100 },
      { t: TL.introOut + T(0.5), s: 0 },
    ]);

    layers.push({
      ddd: 0, ind: ind(), ty: 4, nm: "intro-pill", sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
      ks: { o: op, r: val(0), p: pos, a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [
        shapeGroup([shapeRect({ size: [L.pillW, L.pillH], roundness: L.pillH/2 }), shapeFill(CONFIG.white)]),
        shapeGroup([shapeRect({ size: [6, 70], roundness: 3, position: [-L.pillW/2 + 60, 0] }), shapeFill(CONFIG.brand)]),
      ],
    });

    const lblOp = kf([
      { t: 0, s: 0 },
      { t: TL.introIn + T(0.1), s: 100 },
      { t: TL.introOut, s: 100 },
      { t: TL.introOut + T(0.4), s: 0 },
    ]);
    const lblPos = (yOff) => kf([
      { t: 0,                    s: [L.pillX - L.pillW/2 + 100, L.pillY + 200 + yOff, 0] },
      { t: TL.introIn,           s: [L.pillX - L.pillW/2 + 100, L.pillY + yOff, 0] },
      { t: TL.introOut,          s: [L.pillX - L.pillW/2 + 100, L.pillY + yOff, 0] },
      { t: TL.introOut + T(0.5), s: [L.pillX - L.pillW/2 + 100, L.pillY + 200 + yOff, 0] },
    ]);

    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "intro-model", sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
      ks: { o: lblOp, r: val(0), p: lblPos(-14), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: CONFIG.model, font: "Inter-ExtraBold", size: L.introModelFont, color: CONFIG.ink }),
    });
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "intro-version", sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
      ks: { o: lblOp, r: val(0), p: lblPos(28), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: CONFIG.version, font: "Inter-Medium", size: L.introVersionFont, color: [0.4,0.4,0.4] }),
    });
  }

  /* -- Title banner --------------------------------------------------- */
  {
    const txt = `${CONFIG.model} | ${CONFIG.version}`;
    const offscreen = L.bannerCentered ? -L.w : -L.bannerW;

    const pos = kf([
      { t: 0,                     s: [L.bannerX + offscreen, L.bannerY, 0] },
      { t: TL.bannerIn,           s: [L.bannerX + offscreen, L.bannerY, 0], easeOut: EASE_IO_O, easeIn: EASE_IO_I },
      { t: TL.bannerIn + T(0.6),  s: [L.bannerX, L.bannerY, 0] },
      { t: TL.bannerOut,          s: [L.bannerX, L.bannerY, 0] },
      { t: TL.bannerOut + T(0.5), s: [L.bannerX + offscreen, L.bannerY, 0] },
    ]);
    const opa = kf([
      { t: 0, s: 100 },
      { t: TL.bannerOut, s: 100 },
      { t: TL.bannerOut + T(0.5), s: 0 },
    ]);

    layers.push({
      ddd: 0, ind: ind(), ty: 4, nm: "banner-bg", sr: 1, ip: 0, op: TL.bannerOut + T(0.6), st: 0, bm: 0,
      ks: { o: opa, r: val(0), p: pos, a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [shapeGroup([shapeRect({ size: [L.bannerW, L.bannerH], roundness: L.bannerH/2 }), shapeFill(CONFIG.brand)])],
    });

    const textOffset = L.bannerCentered ? 0 : -L.bannerW/2 + 90;
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "banner-text", sr: 1, ip: 0, op: TL.bannerOut + T(0.6), st: 0, bm: 0,
      ks: {
        o: opa, r: val(0),
        p: kf([
          { t: 0,                     s: [L.bannerX + offscreen + textOffset, L.bannerY + 12, 0] },
          { t: TL.bannerIn,           s: [L.bannerX + offscreen + textOffset, L.bannerY + 12, 0] },
          { t: TL.bannerIn + T(0.6),  s: [L.bannerX + textOffset, L.bannerY + 12, 0] },
          { t: TL.bannerOut,          s: [L.bannerX + textOffset, L.bannerY + 12, 0] },
          { t: TL.bannerOut + T(0.5), s: [L.bannerX + offscreen + textOffset, L.bannerY + 12, 0] },
        ]),
        a: val([0,0,0]), s: val([100,100,100]),
      },
      t: text({ text: txt, font: "Inter-ExtraBold", size: L.bannerFont, color: CONFIG.white, align: L.bannerCentered ? 2 : 0 }),
    });
  }

  /* -- Specs card ----------------------------------------------------- */
  {
    const op = kf([
      { t: 0, s: 0 },
      { t: TL.specsIn, s: 100 },
      { t: TL.specsOut, s: 100 },
      { t: TL.specsOut + T(0.4), s: 0 },
    ]);
    const px = (yOff) => kf([
      { t: 0,                    s: [L.specsX - 60, yOff, 0] },
      { t: TL.specsIn,           s: [L.specsX, yOff, 0] },
      { t: TL.specsOut,          s: [L.specsX, yOff, 0] },
      { t: TL.specsOut + T(0.4), s: [L.specsX - 60, yOff, 0] },
    ]);

    CONFIG.specs.forEach((s, i) => {
      const y = L.specsY + i * L.specsRowH;
      layers.push({
        ddd: 0, ind: ind(), ty: 4, nm: `spec-ic-${i}`, sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
        ks: { o: op, r: val(0), p: px(y), a: val([0,0,0]), s: val([100,100,100]) },
        shapes: [
          shapeGroup([shapeEllipse({ size: [56, 56] }), shapeStroke(CONFIG.brand, 3)]),
          shapeGroup([shapeEllipse({ size: [8, 8] }), shapeFill(CONFIG.brand)]),
        ],
      });
      layers.push({
        ddd: 0, ind: ind(), ty: 5, nm: `spec-lbl-${i}`, sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
        ks: { o: op, r: val(0), p: px(y - 12), a: val([0,0,0]), s: val([100,100,100]) },
        t: text({ text: s.label, font: "Inter-Medium", size: L.specsLabel, color: [0.35,0.35,0.35] }),
      });
      layers.push({
        ddd: 0, ind: ind(), ty: 5, nm: `spec-val-${i}`, sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
        ks: { o: op, r: val(0), p: px(y + 18), a: val([0,0,0]), s: val([100,100,100]) },
        t: text({ text: s.value, font: "Inter-ExtraBold", size: L.specsValue, color: CONFIG.ink }),
      });
    });
  }

  /* -- Side icons strip ----------------------------------------------- */
  {
    const horizontal = L.iconsDir === 'row';

    CONFIG.features.forEach((label, i) => {
      const iconX = horizontal ? L.iconsX + (i - (CONFIG.features.length - 1) / 2) * L.iconsRowH : L.iconsX;
      const iconY = horizontal ? L.iconsY : L.iconsY + i * L.iconsRowH;
      const activeFrom = TL.iconsIn + i * TL.iconStep;
      const activeTo   = activeFrom + TL.iconStep - T(0.1);

      const fadeOp = kf([
        { t: 0, s: 0 },
        { t: TL.iconsIn, s: 100 },
        { t: TL.endIn, s: 100 },
        { t: TL.endIn + T(0.4), s: 0 },
      ]);

      // outline base
      layers.push({
        ddd: 0, ind: ind(), ty: 4, nm: `icon-out-${i}`, sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
        ks: { o: fadeOp, r: val(0), p: val([iconX, iconY, 0]), a: val([0,0,0]), s: val([100,100,100]) },
        shapes: [
          shapeGroup([shapeEllipse({ size: [L.iconSize, L.iconSize] }), shapeStroke(CONFIG.brand, 4)]),
          shapeGroup([shapeRect({ size: [14, 14], roundness: 3 }), shapeFill(CONFIG.brand)]),
        ],
      });

      // filled active state
      const activeOp = kf([
        { t: 0, s: 0 },
        { t: activeFrom, s: 0 },
        { t: activeFrom + T(0.15), s: 100 },
        { t: activeTo, s: 100 },
        { t: activeTo + T(0.15), s: 0 },
      ]);
      layers.push({
        ddd: 0, ind: ind(), ty: 4, nm: `icon-in-${i}`, sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
        ks: {
          o: activeOp, r: val(0), p: val([iconX, iconY, 0]),
          a: val([0,0,0]),
          s: kf([
            { t: 0, s: [90, 90, 100] },
            { t: activeFrom, s: [90, 90, 100] },
            { t: activeFrom + T(0.15), s: [110, 110, 100] },
            { t: activeFrom + T(0.4),  s: [106, 106, 100] },
            { t: activeTo, s: [106, 106, 100] },
          ]),
        },
        shapes: [
          shapeGroup([shapeEllipse({ size: [L.iconSize, L.iconSize] }), shapeFill(CONFIG.brand)]),
          shapeGroup([shapeRect({ size: [14, 14], roundness: 3 }), shapeFill(CONFIG.white)]),
        ],
      });

      // Tooltip: vertical strip → tooltip to the right; horizontal strip → tooltip above
      const tipFontPx = L.tipFont;
      const tipW = Math.max(280, label.length * tipFontPx * 0.6 + 60);
      const tipH = tipFontPx * 2.4;

      let tipBaseX, tipBaseY, tipShiftX, tipShiftY;
      if (horizontal) {
        tipBaseX = iconX; tipBaseY = iconY - L.iconSize - tipH/2 - 30;
        tipShiftX = 0; tipShiftY = 16;
      } else {
        tipBaseX = iconX + L.iconSize/2 + tipW/2 + 30; tipBaseY = iconY;
        tipShiftX = -24; tipShiftY = 0;
      }

      const tipOp = kf([
        { t: 0, s: 0 },
        { t: activeFrom, s: 0 },
        { t: activeFrom + T(0.18), s: 100 },
        { t: activeTo, s: 100 },
        { t: activeTo + T(0.18), s: 0 },
      ]);
      const tipPos = kf([
        { t: 0,                       s: [tipBaseX + tipShiftX, tipBaseY + tipShiftY, 0] },
        { t: activeFrom,              s: [tipBaseX + tipShiftX, tipBaseY + tipShiftY, 0] },
        { t: activeFrom + T(0.18),    s: [tipBaseX, tipBaseY, 0] },
        { t: activeTo,                s: [tipBaseX, tipBaseY, 0] },
        { t: activeTo + T(0.18),      s: [tipBaseX + tipShiftX, tipBaseY + tipShiftY, 0] },
      ]);

      layers.push({
        ddd: 0, ind: ind(), ty: 4, nm: `tip-bg-${i}`, sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
        ks: { o: tipOp, r: val(0), p: tipPos, a: val([0,0,0]), s: val([100,100,100]) },
        shapes: [shapeGroup([shapeRect({ size: [tipW, tipH], roundness: tipH/2 }), shapeFill(CONFIG.white)])],
      });

      // Text alignment: centered if horizontal, left-aligned if vertical
      const textAlign = horizontal ? 2 : 0;
      const textAnchorX = horizontal ? 0 : -tipW/2 + 24;
      layers.push({
        ddd: 0, ind: ind(), ty: 5, nm: `tip-text-${i}`, sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
        ks: {
          o: tipOp, r: val(0),
          p: kf([
            { t: 0,                    s: [tipBaseX + tipShiftX + textAnchorX, tipBaseY + tipShiftY + 8, 0] },
            { t: activeFrom,           s: [tipBaseX + tipShiftX + textAnchorX, tipBaseY + tipShiftY + 8, 0] },
            { t: activeFrom + T(0.18), s: [tipBaseX + textAnchorX, tipBaseY + 8, 0] },
            { t: activeTo,             s: [tipBaseX + textAnchorX, tipBaseY + 8, 0] },
            { t: activeTo + T(0.18),   s: [tipBaseX + tipShiftX + textAnchorX, tipBaseY + tipShiftY + 8, 0] },
          ]),
          a: val([0,0,0]), s: val([100,100,100]),
        },
        t: text({ text: label, font: "Inter-Bold", size: tipFontPx, color: CONFIG.ink, align: textAlign }),
      });
    });
  }

  /* -- End slate ------------------------------------------------------- */
  {
    const fromRight = L.endMode === 'right';
    const panelX = fromRight ? L.w - L.endW/2 : L.w/2;
    const panelY = fromRight ? L.h/2 : L.h - L.endH/2;
    const offX   = fromRight ? L.w + L.endW/2 : panelX;
    const offY   = fromRight ? panelY : L.h + L.endH/2;

    const slideIn = kf([
      { t: 0,                  s: [offX, offY, 0] },
      { t: TL.endIn,           s: [offX, offY, 0], easeOut: EASE_IO_O, easeIn: EASE_IO_I },
      { t: TL.endIn + T(0.7),  s: [panelX, panelY, 0] },
      { t: TOTAL,              s: [panelX, panelY, 0] },
    ]);

    layers.push({
      ddd: 0, ind: ind(), ty: 4, nm: "end-panel", sr: 1, ip: TL.endIn - T(0.1), op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: slideIn, a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [shapeGroup([shapeRect({ size: [L.endW, L.endH] }), shapeFill(CONFIG.white)])],
    });

    // Items layout: vertical list inside the panel
    const itemsCount = CONFIG.endPoints.length;
    const itemGap = 110;
    const startY  = panelY - (itemsCount * itemGap) / 2 + itemGap/2;
    const itemX   = fromRight ? panelX - L.endW/2 + 80 : panelX - L.endW/2 + 100;
    const lblX    = fromRight ? panelX - L.endW/2 + 130 : panelX - L.endW/2 + 160;
    const offIcon = fromRight ? L.w + 300 : panelX;
    const offLbl  = fromRight ? L.w + 400 : panelX;
    const offIconY= fromRight ? 0 : L.endH/2 + 200;
    const offLblY = offIconY;

    CONFIG.endPoints.forEach((p, i) => {
      const yy = startY + i * itemGap;
      const iconPos = kf([
        { t: 0,                  s: [offIcon, fromRight ? yy : yy + offIconY, 0] },
        { t: TL.endIn,           s: [offIcon, fromRight ? yy : yy + offIconY, 0] },
        { t: TL.endIn + T(0.8),  s: [itemX, yy, 0] },
        { t: TOTAL,              s: [itemX, yy, 0] },
      ]);
      layers.push({
        ddd: 0, ind: ind(), ty: 4, nm: `end-ic-${i}`, sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
        ks: { o: val(100), r: val(0), p: iconPos, a: val([0,0,0]), s: val([100,100,100]) },
        shapes: [
          shapeGroup([shapeEllipse({ size: [48, 48] }), shapeStroke(CONFIG.brand, 3)]),
          shapeGroup([shapeEllipse({ size: [10, 10] }), shapeFill(CONFIG.brand)]),
        ],
      });

      const lblPos = kf([
        { t: 0,                  s: [offLbl, fromRight ? yy + 8 : yy + offLblY + 8, 0] },
        { t: TL.endIn,           s: [offLbl, fromRight ? yy + 8 : yy + offLblY + 8, 0] },
        { t: TL.endIn + T(0.8),  s: [lblX, yy + 8, 0] },
        { t: TOTAL,              s: [lblX, yy + 8, 0] },
      ]);
      layers.push({
        ddd: 0, ind: ind(), ty: 5, nm: `end-lbl-${i}`, sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
        ks: { o: val(100), r: val(0), p: lblPos, a: val([0,0,0]), s: val([100,100,100]) },
        t: text({ text: p, font: "Inter-Bold", size: L.endLabelFont, color: CONFIG.ink }),
      });
    });

    // footnote (under the list)
    const footY = startY + itemsCount * itemGap + 20;
    const footPos = kf([
      { t: 0,                  s: [panelX, fromRight ? footY : footY + offLblY, 0] },
      { t: TL.endIn,           s: [panelX, fromRight ? footY : footY + offLblY, 0] },
      { t: TL.endIn + T(0.9),  s: [panelX, footY, 0] },
      { t: TOTAL,              s: [panelX, footY, 0] },
    ]);
    layers.push({
      ddd: 0, ind: ind(), ty: 5, nm: "end-foot", sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: footPos, a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: CONFIG.endFootnote, font: "Inter-Medium", size: L.endFootFont, color: [0.4,0.4,0.4], align: 2 }),
    });
  }

  return {
    v: "5.9.0",
    fr: FPS,
    ip: 0,
    op: TOTAL,
    w: L.w,
    h: L.h,
    nm: `Car Overlay ${format}`,
    ddd: 0,
    assets: [],
    fonts: FONTS,
    layers: layers.reverse(), // first-pushed = top in Lottie
    markers: [],
  };
}

/* ============================================================ WRITE    */
const FORMATS = {
  '16:9': '16x9',
  '4:3':  '4x3',
  '9:16': '9x16',
};

const target = process.argv[2];
const toBuild = target ? [target] : Object.keys(FORMATS);

const outDir = path.join(__dirname, 'public');
fs.mkdirSync(outDir, { recursive: true });

for (const fmt of toBuild) {
  if (!FORMATS[fmt]) {
    console.error(`Unknown format: ${fmt}. Accepted: ${Object.keys(FORMATS).join(', ')}`);
    process.exit(1);
  }
  const anim = buildAnimation(fmt);
  const outPath = path.join(outDir, `car-overlay.${FORMATS[fmt]}.lottie.json`);
  fs.writeFileSync(outPath, JSON.stringify(anim, null, 2));
  console.log(`  ✓ ${fmt.padEnd(5)} → ${path.relative(__dirname, outPath)}  (${anim.layers.length} layers, ${anim.w}×${anim.h})`);
}
