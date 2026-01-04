#!/usr/bin/env node
/**
 * React Native Setup Script
 * 
 * Copies necessary files to your React Native project
 * and provides setup instructions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 React Native Animation Setup');
console.log('================================\n');

// Files to copy
const filesToCopy = [
  {
    src: 'animation-library.json',
    dest: 'animation-library.json',
    description: 'Animation library data'
  },
  {
    src: 'src/react-native/AnimationPlayer.tsx',
    dest: 'components/AnimationPlayer.tsx',
    description: 'Animation player component'
  },
  {
    src: 'src/react-native/AnimationExamples.tsx',
    dest: 'components/AnimationExamples.tsx',
    description: 'Example components'
  }
];

// Check if we're in a React Native project
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ No package.json found. Please run this in your React Native project root.\n');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
if (!packageJson.dependencies || !packageJson.dependencies['react-native']) {
  console.warn('⚠️  Warning: This doesn\'t appear to be a React Native project.\n');
}

// Create components directory if it doesn't exist
const componentsDir = path.join(process.cwd(), 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
  console.log('✓ Created components directory\n');
}

// Copy files
console.log('📦 Copying files...\n');
filesToCopy.forEach(({ src, dest, description }) => {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(process.cwd(), dest);
  
  try {
    // Create destination directory if needed
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ ${description}`);
    console.log(`  → ${dest}\n`);
  } catch (error) {
    console.error(`✗ Failed to copy ${src}:`, error.message, '\n');
  }
});

// Check for react-native-reanimated
console.log('📋 Checking dependencies...\n');
if (!packageJson.dependencies['react-native-reanimated']) {
  console.log('⚠️  react-native-reanimated is not installed!\n');
  console.log('Install it with:');
  console.log('  npm install react-native-reanimated');
  console.log('  # or');
  console.log('  yarn add react-native-reanimated\n');
} else {
  console.log('✓ react-native-reanimated is installed\n');
}

// Check babel config
const babelConfigPath = path.join(process.cwd(), 'babel.config.js');
if (fs.existsSync(babelConfigPath)) {
  const babelConfig = fs.readFileSync(babelConfigPath, 'utf-8');
  if (!babelConfig.includes('react-native-reanimated/plugin')) {
    console.log('⚠️  Babel plugin not configured!\n');
    console.log('Add to babel.config.js:');
    console.log('  plugins: [\'react-native-reanimated/plugin\']\n');
  } else {
    console.log('✓ Babel plugin configured\n');
  }
}

// Success message
console.log('🎉 Setup complete!\n');
console.log('📖 Next steps:\n');
console.log('1. Make sure react-native-reanimated is installed');
console.log('2. Add \'react-native-reanimated/plugin\' to babel.config.js');
console.log('3. Restart Metro bundler: npx react-native start --reset-cache');
console.log('4. Import and use:');
console.log('   import { AnimationPlayer, FadeIn } from \'./components/AnimationPlayer\'\n');
console.log('📚 Documentation: REACT_NATIVE_GUIDE.md\n');
console.log('🎬 Examples: components/AnimationExamples.tsx\n');



