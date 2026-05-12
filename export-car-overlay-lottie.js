#!/usr/bin/env node
/**
 * LOTTIE GENERATOR — Car overlay (manouvellevoiture-style)
 *
 * Builds a Lottie v5.9 JSON that reproduces the animated overlays
 * (title banner, intro pill, specs card, side icons w/ tooltips, end slate,
 * watermark). Designed to be played on top of a video source with the
 * same aspect ratio (1920x1080).
 *
 * Run:  node export-car-overlay-lottie.js
 * Out:  public/car-overlay.lottie.json
 *
 * Edit the CONFIG object below to retarget the template for another car.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* =============================================================== CONFIG */
const CONFIG = {
  width:  1920,
  height: 1080,
  fps:    30,
  duration: 22, // seconds

  brand:        [0.122, 0.667, 0.796], // #1FAACB
  ink:          [0.133, 0.133, 0.133],
  white:        [1, 1, 1],
  shadowOpacity: 18,

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

/* ============================================================ TIMINGS  */
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
  iconStep:   T(1.7),  // duration of each icon spotlight
  endIn:      T(12.0),
};

/* ============================================================ HELPERS  */
let _ind = 0;
const nextInd = () => ++_ind;

const EASE_IN  = { x: [0.42], y: [0] };
const EASE_OUT = { x: [0.0],  y: [1] };
const EASE_INOUT_O = { x: [0.42], y: [0] };
const EASE_INOUT_I = { x: [0.58], y: [1] };

// Single value keyframe pair (animated property)
function kf(values) {
  // values: [{ t, s, easeOut?, easeIn? }]
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

// Static value
function val(v)  { return { a: 0, k: Array.isArray(v) ? v : [v] }; }

// Standard layer transform block
function transform({ pos = [0,0], anchor = [0,0], scale = [100,100], rot = 0, opacity = 100 }) {
  return {
    o: typeof opacity === 'number' ? val(opacity) : opacity,
    r: typeof rot === 'number' ? val(rot) : rot,
    p: Array.isArray(pos) && typeof pos[0] === 'number' ? val(pos.concat([0])) : pos,
    a: val((Array.isArray(anchor) ? anchor : [0,0]).concat([0])),
    s: Array.isArray(scale) && typeof scale[0] === 'number' ? val(scale.concat([100])) : scale,
  };
}

/* ============================================================ SHAPES   */
function shapeRect({ size, position = [0,0], roundness = 0 }) {
  return {
    ty: "rc",
    d: 1,
    s: { a: 0, k: size },
    p: { a: 0, k: position },
    r: { a: 0, k: roundness },
    nm: "rect",
  };
}

function shapeFill(rgb, opacity = 100) {
  return {
    ty: "fl",
    c: { a: 0, k: [rgb[0], rgb[1], rgb[2], 1] },
    o: { a: 0, k: opacity },
    r: 1,
    nm: "fill",
  };
}

function shapeStroke(rgb, width, opacity = 100) {
  return {
    ty: "st",
    c: { a: 0, k: [rgb[0], rgb[1], rgb[2], 1] },
    o: { a: 0, k: opacity },
    w: { a: 0, k: width },
    lc: 2, lj: 2, ml: 4,
    nm: "stroke",
  };
}

function shapeEllipse({ size, position = [0,0] }) {
  return {
    ty: "el",
    d: 1,
    s: { a: 0, k: size },
    p: { a: 0, k: position },
    nm: "ellipse",
  };
}

function shapeGroup(items, opacity = 100) {
  return {
    ty: "gr",
    it: [
      ...items,
      {
        ty: "tr",
        p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] },
        s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 },
        o: { a: 0, k: opacity }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 },
      },
    ],
    nm: "group",
  };
}

/* ============================================================ FONTS    */
const FONTS = {
  list: [
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "800", fStyle: "ExtraBold", fName: "Inter-ExtraBold", ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "700", fStyle: "Bold",      fName: "Inter-Bold",      ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "500", fStyle: "Medium",    fName: "Inter-Medium",    ascent: 75 },
    { origin: 0, fPath: "", fClass: "", fFamily: "Inter", fWeight: "400", fStyle: "Regular",   fName: "Inter-Regular",   ascent: 75 },
  ],
};

function text({ text, font = "Inter-Bold", size = 36, color = CONFIG.ink, align = 0 }) {
  return {
    d: {
      k: [{
        s: {
          sz: [1000, 100], ps: [0, 0],
          s: size, f: font, t: text,
          j: align, tr: 0,
          lh: size * 1.2, ls: 0,
          fc: color,
        },
        t: 0,
      }],
    },
    p: {}, m: { g: 1, a: { a: 0, k: [0,0] } }, a: [],
  };
}

function textLayer({ nm, text: txt, font, size, color, position, anchor = [0,0], ip = 0, op = TOTAL, opacity = 100, align = 0 }) {
  return {
    ddd: 0, ind: nextInd(), ty: 5, nm,
    sr: 1, ip, op, st: 0, bm: 0,
    ks: transform({ pos: position, anchor, opacity }),
    t: text({ text: txt, font, size, color, align }),
  };
}

function shapeLayer({ nm, shapes, position, anchor = [0,0], scale, opacity, rotation, ip = 0, op = TOTAL }) {
  return {
    ddd: 0, ind: nextInd(), ty: 4, nm,
    sr: 1, ip, op, st: 0, bm: 0,
    ks: transform({ pos: position, anchor, scale: scale || [100,100], opacity: opacity ?? 100, rot: rotation ?? 0 }),
    shapes,
  };
}

/* ============================================================ LAYERS   */
const layers = [];

/* --- Watermark (always visible) --- */
{
  const wmW = 220, wmH = 110;
  const wmX = CONFIG.width - 130;
  const wmY = CONFIG.height - 90;

  layers.push(shapeLayer({
    nm: "wm-bg",
    position: [wmX, wmY],
    shapes: [
      shapeGroup([
        shapeRect({ size: [wmW, wmH], roundness: 8 }),
        shapeFill(CONFIG.white),
      ]),
    ],
  }));
  layers.push(textLayer({
    nm: "wm-ma", text: "ma", font: "Inter-Bold", size: 22,
    color: [0.35,0.35,0.35], position: [wmX, wmY - 28], align: 2,
  }));
  layers.push(textLayer({
    nm: "wm-mid", text: "nouvelle\nvoiture", font: "Inter-ExtraBold", size: 30,
    color: CONFIG.brand, position: [wmX, wmY], align: 2,
  }));
  layers.push(textLayer({
    nm: "wm-com", text: ".com", font: "Inter-Bold", size: 18,
    color: [0.35,0.35,0.35], position: [wmX, wmY + 38], align: 2,
  }));
}

/* --- Intro pill (bottom-left) --- */
{
  const pillW = 720, pillH = 130;
  const pillX = pillW / 2 + 60;
  const pillY = CONFIG.height - 130;

  const pos = kf([
    { t: 0,           s: [pillX, pillY + 200, 0], easeOut: EASE_IN, easeIn: EASE_OUT },
    { t: TL.introIn,  s: [pillX, pillY, 0],       easeOut: EASE_INOUT_O, easeIn: EASE_INOUT_I },
    { t: TL.introOut, s: [pillX, pillY, 0],       easeOut: EASE_IN, easeIn: EASE_OUT },
    { t: TL.introOut + T(0.5), s: [pillX, pillY + 200, 0] },
  ]);
  const op = kf([
    { t: 0,                       s: 0 },
    { t: TL.introIn,              s: 100 },
    { t: TL.introOut,             s: 100 },
    { t: TL.introOut + T(0.5),    s: 0 },
  ]);

  layers.push({
    ddd: 0, ind: nextInd(), ty: 4, nm: "intro-pill",
    sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
    ks: {
      o: op, r: val(0), p: pos,
      a: val([0,0,0]), s: val([100,100,100]),
    },
    shapes: [
      shapeGroup([
        shapeRect({ size: [pillW, pillH], roundness: pillH/2 }),
        shapeFill(CONFIG.white),
      ]),
      shapeGroup([
        shapeRect({ size: [6, 70], roundness: 3, position: [-pillW/2 + 60, 0] }),
        shapeFill(CONFIG.brand),
      ]),
    ],
  });

  // labels
  const lblOp = kf([
    { t: 0, s: 0 },
    { t: TL.introIn + T(0.1), s: 100 },
    { t: TL.introOut, s: 100 },
    { t: TL.introOut + T(0.4), s: 0 },
  ]);
  const lblPos = (yOff) => kf([
    { t: 0,                       s: [pillX - pillW/2 + 100, pillY + 200 + yOff, 0] },
    { t: TL.introIn,              s: [pillX - pillW/2 + 100, pillY + yOff, 0] },
    { t: TL.introOut,             s: [pillX - pillW/2 + 100, pillY + yOff, 0] },
    { t: TL.introOut + T(0.5),    s: [pillX - pillW/2 + 100, pillY + 200 + yOff, 0] },
  ]);

  layers.push({
    ddd: 0, ind: nextInd(), ty: 5, nm: "intro-model",
    sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
    ks: { o: lblOp, r: val(0), p: lblPos(-14), a: val([0,0,0]), s: val([100,100,100]) },
    t: text({ text: CONFIG.model, font: "Inter-ExtraBold", size: 40, color: CONFIG.ink }),
  });
  layers.push({
    ddd: 0, ind: nextInd(), ty: 5, nm: "intro-version",
    sr: 1, ip: 0, op: TL.introOut + T(0.6), st: 0, bm: 0,
    ks: { o: lblOp, r: val(0), p: lblPos(28), a: val([0,0,0]), s: val([100,100,100]) },
    t: text({ text: CONFIG.version, font: "Inter-Medium", size: 26, color: [0.4,0.4,0.4] }),
  });
}

/* --- Title banner (top-left, blue) --- */
{
  const txt   = `${CONFIG.model} | ${CONFIG.version}`;
  const bnH   = 90;
  const bnW   = 1080;
  const bnX   = bnW / 2 - 60;            // slightly offscreen on the left
  const bnY   = 90;

  const pos = kf([
    { t: 0,                            s: [bnX - bnW, bnY, 0] },
    { t: TL.bannerIn,                  s: [bnX - bnW, bnY, 0], easeOut: EASE_INOUT_O, easeIn: EASE_INOUT_I },
    { t: TL.bannerIn + T(0.6),         s: [bnX, bnY, 0] },
    { t: TL.bannerOut,                 s: [bnX, bnY, 0], easeOut: EASE_IN, easeIn: EASE_OUT },
    { t: TL.bannerOut + T(0.5),        s: [bnX - bnW, bnY, 0] },
  ]);
  const opa = kf([
    { t: 0, s: 100 },
    { t: TL.bannerOut, s: 100 },
    { t: TL.bannerOut + T(0.5), s: 0 },
  ]);

  // Rounded only on right side: we draw a rectangle that goes off the left edge.
  layers.push({
    ddd: 0, ind: nextInd(), ty: 4, nm: "banner-bg",
    sr: 1, ip: 0, op: TL.bannerOut + T(0.6), st: 0, bm: 0,
    ks: { o: opa, r: val(0), p: pos, a: val([0,0,0]), s: val([100,100,100]) },
    shapes: [
      shapeGroup([
        shapeRect({ size: [bnW, bnH], roundness: bnH/2 }),
        shapeFill(CONFIG.brand),
      ]),
    ],
  });

  layers.push({
    ddd: 0, ind: nextInd(), ty: 5, nm: "banner-text",
    sr: 1, ip: 0, op: TL.bannerOut + T(0.6), st: 0, bm: 0,
    ks: {
      o: opa, r: val(0),
      p: kf([
        { t: 0,                            s: [bnX - bnW - bnW/2 + 90, bnY + 12, 0] },
        { t: TL.bannerIn,                  s: [bnX - bnW - bnW/2 + 90, bnY + 12, 0] },
        { t: TL.bannerIn + T(0.6),         s: [bnX - bnW/2 + 90, bnY + 12, 0] },
        { t: TL.bannerOut,                 s: [bnX - bnW/2 + 90, bnY + 12, 0] },
        { t: TL.bannerOut + T(0.5),        s: [bnX - bnW - bnW/2 + 90, bnY + 12, 0] },
      ]),
      a: val([0,0,0]), s: val([100,100,100]),
    },
    t: text({ text: txt, font: "Inter-ExtraBold", size: 36, color: CONFIG.white }),
  });
}

/* --- Specs card (left, 4 lines) --- */
{
  const baseX = 100;
  const baseY = 280;
  const rowH  = 110;

  const op = kf([
    { t: 0, s: 0 },
    { t: TL.specsIn, s: 100 },
    { t: TL.specsOut, s: 100 },
    { t: TL.specsOut + T(0.4), s: 0 },
  ]);
  const px = (frame) => kf([
    { t: 0, s: [baseX - 60, frame, 0] },
    { t: TL.specsIn, s: [baseX, frame, 0] },
    { t: TL.specsOut, s: [baseX, frame, 0] },
    { t: TL.specsOut + T(0.4), s: [baseX - 60, frame, 0] },
  ]);

  CONFIG.specs.forEach((s, i) => {
    const y = baseY + i * rowH;
    // icon circle
    layers.push({
      ddd: 0, ind: nextInd(), ty: 4, nm: `spec-ic-${i}`,
      sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
      ks: { o: op, r: val(0), p: px(y), a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [
        shapeGroup([
          shapeEllipse({ size: [56, 56] }),
          shapeStroke(CONFIG.brand, 3),
        ]),
        shapeGroup([
          shapeEllipse({ size: [8, 8] }),
          shapeFill(CONFIG.brand),
        ]),
      ],
    });
    // label
    layers.push({
      ddd: 0, ind: nextInd(), ty: 5, nm: `spec-lbl-${i}`,
      sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
      ks: { o: op, r: val(0), p: px(y - 12).k ? px(y - 12) : val([baseX + 60, y - 12, 0]),
            a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: s.label, font: "Inter-Medium", size: 22, color: [0.35,0.35,0.35] }),
    });
    // value
    layers.push({
      ddd: 0, ind: nextInd(), ty: 5, nm: `spec-val-${i}`,
      sr: 1, ip: 0, op: TL.specsOut + T(0.5), st: 0, bm: 0,
      ks: { o: op, r: val(0), p: px(y + 18), a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: s.value, font: "Inter-ExtraBold", size: 30, color: CONFIG.ink }),
    });
  });
}

/* --- Side icons strip with sequential tooltips --- */
{
  const baseX = 70;
  const baseY = 320;
  const rowH  = 130;

  CONFIG.features.forEach((label, i) => {
    const y = baseY + i * rowH;
    const activeFrom = TL.iconsIn + i * TL.iconStep;
    const activeTo   = activeFrom + TL.iconStep - T(0.1);

    // icon base appearance (fades in at iconsIn, fades out at endIn)
    const fadeOp = kf([
      { t: 0, s: 0 },
      { t: TL.iconsIn, s: 100 },
      { t: TL.endIn, s: 100 },
      { t: TL.endIn + T(0.4), s: 0 },
    ]);

    // Outline icon (visible always while strip is shown)
    layers.push({
      ddd: 0, ind: nextInd(), ty: 4, nm: `icon-out-${i}`,
      sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
      ks: { o: fadeOp, r: val(0), p: val([baseX, y, 0]), a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [
        shapeGroup([
          shapeEllipse({ size: [70, 70] }),
          shapeStroke(CONFIG.brand, 4),
        ]),
        // small inner symbol (variation by index)
        shapeGroup([
          shapeRect({ size: [14, 14], roundness: 3, position: [0, 0] }),
          shapeFill(CONFIG.brand),
        ]),
      ],
    });

    // Filled "active" icon: blue circle + white symbol, appears on its slot
    const activeOp = kf([
      { t: 0, s: 0 },
      { t: activeFrom, s: 0 },
      { t: activeFrom + T(0.15), s: 100 },
      { t: activeTo, s: 100 },
      { t: activeTo + T(0.15), s: 0 },
    ]);
    layers.push({
      ddd: 0, ind: nextInd(), ty: 4, nm: `icon-in-${i}`,
      sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
      ks: { o: activeOp, r: val(0), p: val([baseX, y, 0]),
            a: val([0,0,0]),
            s: kf([
              { t: 0, s: [90,90,100] },
              { t: activeFrom, s: [90,90,100] },
              { t: activeFrom + T(0.15), s: [110,110,100] },
              { t: activeFrom + T(0.4),  s: [106,106,100] },
              { t: activeTo, s: [106,106,100] },
            ]) },
      shapes: [
        shapeGroup([
          shapeEllipse({ size: [70, 70] }),
          shapeFill(CONFIG.brand),
        ]),
        shapeGroup([
          shapeRect({ size: [14, 14], roundness: 3, position: [0, 0] }),
          shapeFill(CONFIG.white),
        ]),
      ],
    });

    // Tooltip background pill
    const tipW = Math.max(280, label.length * 16);
    const tipH = 60;
    const tipX = baseX + 70 + tipW/2;

    const tipOp = kf([
      { t: 0, s: 0 },
      { t: activeFrom, s: 0 },
      { t: activeFrom + T(0.18), s: 100 },
      { t: activeTo, s: 100 },
      { t: activeTo + T(0.18), s: 0 },
    ]);
    const tipPos = kf([
      { t: 0, s: [tipX - 24, y, 0] },
      { t: activeFrom, s: [tipX - 24, y, 0] },
      { t: activeFrom + T(0.18), s: [tipX, y, 0] },
      { t: activeTo, s: [tipX, y, 0] },
      { t: activeTo + T(0.18), s: [tipX - 24, y, 0] },
    ]);

    layers.push({
      ddd: 0, ind: nextInd(), ty: 4, nm: `tip-bg-${i}`,
      sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
      ks: { o: tipOp, r: val(0), p: tipPos, a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [
        shapeGroup([
          shapeRect({ size: [tipW, tipH], roundness: tipH/2 }),
          shapeFill(CONFIG.white),
        ]),
      ],
    });
    layers.push({
      ddd: 0, ind: nextInd(), ty: 5, nm: `tip-text-${i}`,
      sr: 1, ip: 0, op: TL.endIn + T(0.6), st: 0, bm: 0,
      ks: {
        o: tipOp, r: val(0),
        p: kf([
          { t: 0, s: [tipX - tipW/2 + 24 - 24, y + 8, 0] },
          { t: activeFrom, s: [tipX - tipW/2 + 24 - 24, y + 8, 0] },
          { t: activeFrom + T(0.18), s: [tipX - tipW/2 + 24, y + 8, 0] },
          { t: activeTo, s: [tipX - tipW/2 + 24, y + 8, 0] },
          { t: activeTo + T(0.18), s: [tipX - tipW/2 + 24 - 24, y + 8, 0] },
        ]),
        a: val([0,0,0]), s: val([100,100,100]),
      },
      t: text({ text: label, font: "Inter-Bold", size: 22, color: CONFIG.ink }),
    });
  });
}

/* --- End slate (right panel) --- */
{
  const panelW = CONFIG.width * 0.35;
  const panelX = CONFIG.width - panelW/2;
  const panelY = CONFIG.height / 2;

  const slideIn = kf([
    { t: 0,                          s: [CONFIG.width + panelW/2, panelY, 0] },
    { t: TL.endIn,                   s: [CONFIG.width + panelW/2, panelY, 0], easeOut: EASE_INOUT_O, easeIn: EASE_INOUT_I },
    { t: TL.endIn + T(0.7),          s: [panelX, panelY, 0] },
    { t: TOTAL,                      s: [panelX, panelY, 0] },
  ]);

  layers.push({
    ddd: 0, ind: nextInd(), ty: 4, nm: "end-panel",
    sr: 1, ip: TL.endIn - T(0.1), op: TOTAL, st: 0, bm: 0,
    ks: { o: val(100), r: val(0), p: slideIn, a: val([0,0,0]), s: val([100,100,100]) },
    shapes: [
      shapeGroup([
        shapeRect({ size: [panelW, CONFIG.height] }),
        shapeFill(CONFIG.white),
      ]),
    ],
  });

  // Checklist items
  const startY = panelY - (CONFIG.endPoints.length * 90) / 2;
  CONFIG.endPoints.forEach((p, i) => {
    const yy = startY + i * 110;
    const xPos = kf([
      { t: 0,                   s: [CONFIG.width + 300, yy, 0] },
      { t: TL.endIn,            s: [CONFIG.width + 300, yy, 0] },
      { t: TL.endIn + T(0.8),   s: [panelX - panelW/2 + 80, yy, 0] },
      { t: TOTAL,               s: [panelX - panelW/2 + 80, yy, 0] },
    ]);
    // icon
    layers.push({
      ddd: 0, ind: nextInd(), ty: 4, nm: `end-ic-${i}`,
      sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: xPos, a: val([0,0,0]), s: val([100,100,100]) },
      shapes: [
        shapeGroup([
          shapeEllipse({ size: [48, 48] }),
          shapeStroke(CONFIG.brand, 3),
        ]),
        shapeGroup([
          shapeEllipse({ size: [10, 10] }),
          shapeFill(CONFIG.brand),
        ]),
      ],
    });

    const txtPos = kf([
      { t: 0,                   s: [CONFIG.width + 400, yy + 8, 0] },
      { t: TL.endIn,            s: [CONFIG.width + 400, yy + 8, 0] },
      { t: TL.endIn + T(0.8),   s: [panelX - panelW/2 + 130, yy + 8, 0] },
      { t: TOTAL,               s: [panelX - panelW/2 + 130, yy + 8, 0] },
    ]);
    layers.push({
      ddd: 0, ind: nextInd(), ty: 5, nm: `end-lbl-${i}`,
      sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
      ks: { o: val(100), r: val(0), p: txtPos, a: val([0,0,0]), s: val([100,100,100]) },
      t: text({ text: p, font: "Inter-Bold", size: 30, color: CONFIG.ink }),
    });
  });

  // footnote
  const footPos = kf([
    { t: 0,                   s: [CONFIG.width + 400, panelY + (CONFIG.endPoints.length * 110)/2 + 60, 0] },
    { t: TL.endIn,            s: [CONFIG.width + 400, panelY + (CONFIG.endPoints.length * 110)/2 + 60, 0] },
    { t: TL.endIn + T(0.9),   s: [panelX, panelY + (CONFIG.endPoints.length * 110)/2 + 60, 0] },
    { t: TOTAL,               s: [panelX, panelY + (CONFIG.endPoints.length * 110)/2 + 60, 0] },
  ]);
  layers.push({
    ddd: 0, ind: nextInd(), ty: 5, nm: "end-foot",
    sr: 1, ip: TL.endIn, op: TOTAL, st: 0, bm: 0,
    ks: { o: val(100), r: val(0), p: footPos, a: val([0,0,0]), s: val([100,100,100]) },
    t: text({ text: CONFIG.endFootnote, font: "Inter-Medium", size: 18, color: [0.4,0.4,0.4], align: 2 }),
  });
}

/* ============================================================ ASSEMBLE */
// Reverse so first-pushed layers render on top (Lottie renders array in reverse order)
const animation = {
  v: "5.9.0",
  fr: FPS,
  ip: 0,
  op: TOTAL,
  w: CONFIG.width,
  h: CONFIG.height,
  nm: "Car Overlay Template",
  ddd: 0,
  assets: [],
  fonts: FONTS,
  layers: layers.reverse(),
  markers: [],
};

const outDir  = path.join(__dirname, 'public');
const outPath = path.join(outDir, 'car-overlay.lottie.json');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(animation, null, 2));
console.log(`Lottie JSON written: ${outPath}`);
console.log(`  ${animation.layers.length} layers, ${TOTAL} frames @ ${FPS}fps (${CONFIG.duration}s)`);
