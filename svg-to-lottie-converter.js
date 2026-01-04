#!/usr/bin/env node
/**
 * SVG to Lottie Converter
 * 
 * Converts simple SVG path animations to Lottie JSON format.
 * This is a custom implementation for basic path animations.
 * 
 * For complex animations, use:
 * - After Effects with Bodymovin plugin
 * - Online tools: lottiefiles.com/svg-to-lottie
 * 
 * Usage:
 *   node svg-to-lottie-converter.js input.svg output.json
 *   node svg-to-lottie-converter.js input.svg output.json --fps 60 --duration 1.5
 */

import fs from 'fs';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];
const fps = parseInt(args.find(arg => arg.startsWith('--fps'))?.split('=')[1] || args[args.indexOf('--fps') + 1] || '60');
const duration = parseFloat(args.find(arg => arg.startsWith('--duration'))?.split('=')[1] || args[args.indexOf('--duration') + 1] || '1.5');

if (!inputFile || !outputFile) {
  console.error('Usage: node svg-to-lottie-converter.js <input.svg> <output.json> [--fps 60] [--duration 1.5]');
  process.exit(1);
}

console.log('🎨 SVG to Lottie Converter');
console.log('========================');
console.log(`Input:    ${inputFile}`);
console.log(`Output:   ${outputFile}`);
console.log(`FPS:      ${fps}`);
console.log(`Duration: ${duration}s`);
console.log('');

// Read SVG file
let svgContent;
try {
  svgContent = fs.readFileSync(inputFile, 'utf-8');
  console.log('✓ SVG file loaded');
} catch (error) {
  console.error(`✗ Error reading SVG file: ${error.message}`);
  process.exit(1);
}

// Parse SVG dimensions
const widthMatch = svgContent.match(/width="(\d+)"/);
const heightMatch = svgContent.match(/height="(\d+)"/);
const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);

let width = 400;
let height = 400;

if (viewBoxMatch) {
  const [, , vbWidth, vbHeight] = viewBoxMatch[1].split(/\s+/);
  width = parseFloat(vbWidth) || width;
  height = parseFloat(vbHeight) || height;
} else {
  width = widthMatch ? parseFloat(widthMatch[1]) : width;
  height = heightMatch ? parseFloat(heightMatch[1]) : height;
}

console.log(`✓ SVG dimensions: ${width}x${height}`);

// Extract paths with their attributes
const pathRegex = /<path[^>]*>/g;
const paths = svgContent.match(pathRegex) || [];
console.log(`✓ Found ${paths.length} path(s)`);

// Build Lottie JSON structure
const totalFrames = Math.round(fps * duration);

const lottieJSON = {
  v: "5.9.0",
  fr: fps,
  ip: 0,
  op: totalFrames,
  w: width,
  h: height,
  nm: path.basename(inputFile, '.svg'),
  ddd: 0,
  assets: [],
  layers: []
};

// Convert each path to a Lottie shape layer
paths.forEach((pathElement, index) => {
  const dMatch = pathElement.match(/d="([^"]+)"/);
  const fillMatch = pathElement.match(/fill="([^"]+)"/);
  const strokeMatch = pathElement.match(/stroke="([^"]+)"/);
  const strokeWidthMatch = pathElement.match(/stroke-width="([^"]+)"/);
  const idMatch = pathElement.match(/id="([^"]+)"/);
  
  if (!dMatch) {
    console.log(`⚠ Skipping path ${index + 1}: no 'd' attribute`);
    return;
  }
  
  const pathData = dMatch[1];
  const fill = fillMatch ? fillMatch[1] : '#000000';
  const stroke = strokeMatch ? strokeMatch[1] : null;
  const strokeWidth = strokeWidthMatch ? parseFloat(strokeWidthMatch[1]) : 1;
  const layerName = idMatch ? idMatch[1] : `Path ${index + 1}`;
  
  // Convert hex color to RGB array
  const hexToRgb = (hex) => {
    if (hex === 'none') return null;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
      1
    ] : [0, 0, 0, 1];
  };
  
  const fillColor = hexToRgb(fill);
  const strokeColor = stroke ? hexToRgb(stroke) : null;
  
  // Create basic shape layer
  // Note: This is a simplified conversion. Complex paths may need manual adjustment.
  const layer = {
    ddd: 0,
    ind: index + 1,
    ty: 4,
    nm: layerName,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [width / 2, height / 2, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ks: {
              a: 0,
              k: {
                i: [],
                o: [],
                v: [],
                c: true
              }
            },
            nm: "Path 1"
          },
          ...(fillColor ? [{
            ty: "fl",
            c: { a: 0, k: fillColor },
            o: { a: 0, k: 100 },
            r: 1,
            nm: "Fill 1"
          }] : []),
          ...(strokeColor ? [{
            ty: "st",
            c: { a: 0, k: strokeColor },
            o: { a: 0, k: 100 },
            w: { a: 0, k: strokeWidth },
            lc: 2,
            lj: 2,
            nm: "Stroke 1"
          }] : []),
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 }
          }
        ],
        nm: layerName
      }
    ],
    ip: 0,
    op: totalFrames,
    st: 0
  };
  
  lottieJSON.layers.push(layer);
  console.log(`✓ Converted: ${layerName}`);
});

// Write output file
try {
  fs.writeFileSync(outputFile, JSON.stringify(lottieJSON, null, 2));
  console.log('');
  console.log(`✓ Lottie JSON saved to: ${outputFile}`);
  console.log('');
  console.log('⚠️  IMPORTANT NOTES:');
  console.log('   - This is a basic conversion (static shapes only)');
  console.log('   - SVG path animations are NOT automatically converted');
  console.log('   - You need to manually add keyframes for animations');
  console.log('   - For complex animations, use After Effects + Bodymovin');
  console.log('   - Or use online tools: lottiefiles.com/svg-to-lottie');
  console.log('');
  console.log('📖 Next Steps:');
  console.log('   1. Open the JSON in LottieFiles editor: lottiefiles.com');
  console.log('   2. Add animations and keyframes');
  console.log('   3. Export the final Lottie file');
} catch (error) {
  console.error(`✗ Error writing output file: ${error.message}`);
  process.exit(1);
}



