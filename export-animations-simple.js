#!/usr/bin/env node
/**
 * Quick JSON Export Script
 * Exports animation presets directly from the existing JSON file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 Quick Animation Library Export');
console.log('==================================\n');

// Read the existing animation-presets.json
const presetsPath = path.join(__dirname, 'animation-presets.json');

try {
  const presetsData = fs.readFileSync(presetsPath, 'utf-8');
  const presets = JSON.parse(presetsData);
  
  // Create enhanced export with metadata
  const exportData = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://motionautoya.com/animation-library.schema.json",
    title: "Motion Autoya Animation Library",
    description: "Complete animation configuration library based on Apple's Motion Principles",
    version: "2.0.0",
    exported: new Date().toISOString(),
    library: presets
  };
  
  // Write to animation-library.json
  const outputPath = path.join(__dirname, 'animation-library.json');
  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');
  
  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  
  console.log('✓ Animation library exported successfully!\n');
  console.log(`📄 File:     ${outputPath}`);
  console.log(`📦 Size:     ${sizeKB} KB\n`);
  
  // Count presets
  console.log('📊 Library Contents:');
  console.log(`   • ${Object.keys(presets.springs || {}).length} spring configurations`);
  console.log(`   • ${Object.keys(presets.durations || {}).length} duration presets`);
  console.log(`   • ${Object.keys(presets.easings || {}).length} easing functions`);
  console.log(`   • ${Object.keys(presets.variants || {}).length} animation variants`);
  console.log(`   • ${Object.keys(presets.interactionStates || {}).length} interaction states`);
  console.log(`   • ${Object.keys(presets.stagger || {}).length} stagger patterns`);
  console.log(`   • ${Object.keys(presets.svgDraw || {}).length} SVG drawing presets`);
  console.log(`   • 2 complete success animations (camera & premium)\n`);
  
  console.log('🎯 Files Ready for Your Team:');
  console.log('   ✓ animation-library.json      (Production JSON)');
  console.log('   ✓ animation-presets.json       (Source data)');
  console.log('   ✓ src/animations-config.ts     (TypeScript definitions)\n');
  
  console.log('📖 Import Examples:');
  console.log('   JavaScript:  const animations = require("./animation-library.json")');
  console.log('   TypeScript:  import animations from "./animation-library.json"');
  console.log('   React:       import { library } from "./animation-library.json"');
  console.log('');
  
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
}



