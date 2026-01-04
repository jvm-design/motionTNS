import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// READ THE DAMN FILE
console.log('🔥 SIMPLE EXPORT - JUST WORKS\n');

const inputFile = path.join(__dirname, 'animation-library.json');
const outputFile = path.join(__dirname, 'animations-EXPORTED.json');

console.log('📖 Reading:', inputFile);

// Load the file
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Extract JUST the animations (no wrapper bullshit)
let animations = {};

if (data.library && data.library.animations) {
    // If it's wrapped in library.animations
    animations = data.library.animations;
    console.log('✅ Found animations in data.library.animations');
} else if (data.animations) {
    // If it's in data.animations
    animations = data.animations;
    console.log('✅ Found animations in data.animations');
} else if (data.library) {
    // Maybe it's the whole library object
    animations = data.library;
    console.log('✅ Using data.library');
} else {
    // Maybe the whole file IS the animations
    animations = data;
    console.log('✅ Using entire data object');
}

// Count them
const count = Object.keys(animations).length;
console.log(`📊 Found ${count} items\n`);

// Write clean output
fs.writeFileSync(outputFile, JSON.stringify(animations, null, 2));

console.log('✅ EXPORTED TO:', outputFile);
console.log('💾 File size:', (fs.statSync(outputFile).size / 1024).toFixed(2), 'KB');
console.log('\n🎉 DONE! Use this file now.');
