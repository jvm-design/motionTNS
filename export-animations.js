#!/usr/bin/env node
/**
 * Export Animation Library to JSON
 * 
 * This script exports the complete animation library from TypeScript to JSON format.
 * 
 * Usage:
 *   node export-animations.js
 *   node export-animations.js --output custom-name.json
 *   node export-animations.js --minify
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const outputArg = args.find(arg => arg.startsWith('--output=')) || args[args.indexOf('--output') + 1];
const minify = args.includes('--minify');

// Default output filename
const defaultOutput = 'animation-library.json';
const outputFile = outputArg?.replace('--output=', '') || defaultOutput;

console.log('🎨 Motion Autoya Animation Library Exporter');
console.log('===========================================');
console.log('');

// Try to import the TypeScript config (assuming it's compiled or we use a TS runner)
let animationLibrary;

try {
  // Try importing from compiled JS (if built)
  const module = await import('./src/animations-config.ts');
  animationLibrary = module.animationLibrary;
  console.log('✓ Animation library loaded from TypeScript');
} catch (error) {
  console.error('✗ Error loading animation library:', error.message);
  console.log('');
  console.log('💡 Tip: Make sure your TypeScript files are accessible.');
  console.log('   You may need to build the project first or use ts-node.');
  process.exit(1);
}

// Create the JSON export
const jsonOutput = JSON.stringify(animationLibrary, null, minify ? 0 : 2);

// Add metadata
const exportData = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://motionautoya.com/animation-library.schema.json",
  title: "Motion Autoya Animation Library",
  description: "Complete animation configuration library based on Apple's Motion Principles",
  version: "2.0.0",
  exported: new Date().toISOString(),
  library: animationLibrary
};

const finalOutput = JSON.stringify(exportData, null, minify ? 0 : 2);

// Write to file
try {
  fs.writeFileSync(outputFile, finalOutput, 'utf-8');
  
  const stats = fs.statSync(outputFile);
  const sizeKB = (stats.size / 1024).toFixed(2);
  
  console.log('✓ Animation library exported successfully!');
  console.log('');
  console.log(`📄 File:     ${path.resolve(outputFile)}`);
  console.log(`📦 Size:     ${sizeKB} KB`);
  console.log(`🗜️  Format:   ${minify ? 'Minified' : 'Pretty-printed (2 spaces)'}`);
  console.log('');
  
  // Count animations
  const counts = {
    springs: Object.keys(animationLibrary.springs).length,
    durations: Object.keys(animationLibrary.durations).length,
    easings: Object.keys(animationLibrary.easings).length,
    variants: Object.keys(animationLibrary.variants).length,
    interactionStates: Object.keys(animationLibrary.interactionStates).length,
    stagger: Object.keys(animationLibrary.stagger).length,
    svgDraw: Object.keys(animationLibrary.svgDraw).length,
  };
  
  console.log('📊 Library Contents:');
  console.log(`   • ${counts.springs} spring configurations`);
  console.log(`   • ${counts.durations} duration presets`);
  console.log(`   • ${counts.easings} easing functions`);
  console.log(`   • ${counts.variants} animation variants`);
  console.log(`   • ${counts.interactionStates} interaction states`);
  console.log(`   • ${counts.stagger} stagger patterns`);
  console.log(`   • ${counts.svgDraw} SVG drawing presets`);
  console.log(`   • 2 complete success animations (camera & premium)`);
  console.log('');
  
  console.log('🎯 Next Steps:');
  console.log('   1. Share this file with your development team');
  console.log('   2. Import into your animation framework');
  console.log('   3. Use presets in your app components');
  console.log('');
  console.log('📖 Usage Examples:');
  console.log('   React:    import animations from "./animation-library.json"');
  console.log('   Flutter:  Load JSON and map to Animation configs');
  console.log('   iOS:      Parse JSON and map to CASpringAnimation');
  console.log('   Android:  Parse JSON and map to ObjectAnimator');
  console.log('');
  
} catch (error) {
  console.error('✗ Error writing file:', error.message);
  process.exit(1);
}



