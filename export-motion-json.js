#!/usr/bin/env node

/**
 * SIMPLE MOTION JSON EXPORT - No browser needed!
 * Run this to generate the motion JSON file for your dev team
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Motion specification - exactly matching AutoyaLogoFrameControlled component
const motionSpec = {
  name: "Autoya Logo Success Animation",
  version: "1.0.0",
  generatedBy: "Motion Autoya Export Script",
  exportDate: new Date().toISOString(),
  
  // Animation settings
  animation: {
    duration: 1.5,        // seconds
    fps: 60,              // frames per second
    totalFrames: 90,      // total frames
    loop: false,
    autoplay: false,
  },

  // Timing in seconds
  timing: {
    logoRecognition: { start: 0.000, end: 0.400 },
    convergence: { start: 0.400, end: 0.750 },
    beatPause: { start: 0.750, end: 0.800 },
    greenTransform: { start: 0.800, end: 1.150 },
    checkmark: { start: 1.150, end: 1.500 },
  },

  // Frame numbers (60fps)
  frames: {
    logoRecognition: { start: 0, end: 24 },
    convergence: { start: 24, end: 45 },
    beatPause: { start: 45, end: 48 },
    greenTransform: { start: 48, end: 69 },
    checkmark: { start: 69, end: 90 },
  },

  // Motion principles
  principles: {
    appleMotion: true,
    clarity: "Every stage is visible and understandable",
    deference: "Motion guides attention smoothly",
    continuity: "Smooth, followable transitions",
    premium: "Quality timing matches Apple Pay success (1.5s)",
    responsive: "Fast enough to feel responsive",
    delightful: "Users can appreciate the craftsmanship",
  },

  // Animation phases with detailed specs
  phases: [
    {
      name: "Logo Recognition",
      startFrame: 0,
      endFrame: 24,
      startTime: 0.000,
      endTime: 0.400,
      duration: 0.400,
      description: "Initial logo visibility - generous recognition time",
      easing: "linear",
    },
    {
      name: "Convergence",
      startFrame: 24,
      endFrame: 45,
      startTime: 0.400,
      endTime: 0.750,
      duration: 0.350,
      description: "Liquid motion - shapes converge to center with spring physics",
      easing: "camera-spring",
      easingFunction: "smoothstep with overshoot",
      easingParams: {
        type: "spring",
        overshoot: 0.015,
        stagger: 0.02,
        description: "Fast responsive start, smooth confident settle"
      },
      bezier: null, // Custom spring function
    },
    {
      name: "Beat Pause",
      startFrame: 45,
      endFrame: 48,
      startTime: 0.750,
      endTime: 0.800,
      duration: 0.050,
      description: "Appreciation moment - brief pause before transformation",
      easing: "linear",
    },
    {
      name: "Green Transform",
      startFrame: 48,
      endFrame: 69,
      startTime: 0.800,
      endTime: 1.150,
      duration: 0.350,
      description: "Success color transformation with confident pulse",
      easing: "ease-out",
      transform: {
        scale: {
          keyframes: [
            { progress: 0.00, value: 1.00, description: "Start at normal size" },
            { progress: 0.35, value: 1.10, description: "Quick grow to 110%" },
            { progress: 1.00, value: 1.00, description: "Smooth settle back" },
          ],
        },
        opacity: {
          fadeIn: { threshold: 0.08, rate: 12.5 }
        }
      },
    },
    {
      name: "Checkmark Draw",
      startFrame: 69,
      endFrame: 90,
      startTime: 1.150,
      endTime: 1.500,
      duration: 0.350,
      description: "Confident checkmark stroke drawing",
      easing: "ease-out-quad",
      easingFunction: "1 - (1 - t) * (1 - t)",
      bezier: [0.25, 0.46, 0.45, 0.94],
      strokeAnimation: {
        dasharray: 15,
        dashoffset: { from: 15, to: 0 }
      }
    },
  ],

  // Visual elements specifications
  elements: {
    logo: {
      type: "group",
      elementCount: 9,
      description: "8 surrounding shapes + 1 center dot",
      centerPoint: { x: 29.27, y: 30.5 },
      shapes: [
        { id: 0, x: 17.24, y: 37.80, type: "organic-blob" },
        { id: 1, x: 5.22, y: 30.50, type: "circle" },
        { id: 2, x: 17.24, y: 23.07, type: "organic-blob" },
        { id: 3, x: 29.27, y: 5.09, type: "circle" },
        { id: 4, x: 41.30, y: 23.07, type: "organic-blob" },
        { id: 5, x: 53.33, y: 30.50, type: "circle" },
        { id: 6, x: 41.30, y: 37.80, type: "organic-blob" },
        { id: 7, x: 29.27, y: 55.91, type: "circle" },
        { id: 8, x: 29.27, y: 30.50, type: "circle-center" },
      ],
      convergencePhysics: {
        targetCenter: { x: 29.27, y: 30.5 },
        stagger: 0.02,
        scaleCollapse: { from: 1.0, to: 0.07, threshold: 0.55 },
        fadeOut: { threshold: 0.75, duration: 0.25 }
      }
    },
    
    successCircle: {
      type: "circle",
      center: { x: 29.27, y: 30.5 },
      radius: 5.2,
      fill: "radial-gradient",
      gradient: {
        type: "radial",
        center: { cx: "38%", cy: "38%" },
        radius: "62%",
        stops: [
          { offset: 0.00, color: "#86EFAC", opacity: 1.0, name: "green-300" },
          { offset: 0.45, color: "#34D399", opacity: 1.0, name: "green-400" },
          { offset: 1.00, color: "#059669", opacity: 1.0, name: "green-600" },
        ],
      },
      glassHighlight: {
        type: "radial-gradient",
        center: { cx: "32%", cy: "32%" },
        radius: "48%",
        stops: [
          { offset: 0.00, color: "white", opacity: 0.45 },
          { offset: 0.70, color: "white", opacity: 0.12 },
          { offset: 1.00, color: "white", opacity: 0.00 },
        ],
        description: "Crisp glass highlight - Apple's signature shine"
      }
    },
    
    checkmark: {
      type: "path",
      pathData: "M 26.5 30.5 L 28.5 32.8 L 32 28.5",
      stroke: "white",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      animation: {
        type: "stroke-draw",
        dasharray: 15,
        dashoffset: { from: 15, to: 0 },
        easing: "ease-out-quad"
      }
    },
  },

  // Camera shutter synchronization
  synchronization: {
    enabled: true,
    description: "Animation synced with iOS camera shutter sound",
    syncPoint: {
      frame: 18,
      time: 0.300,
      event: "shutter-sound-end",
      description: "Convergence completes as shutter sound ends",
    },
    hapticFeedback: {
      trigger: "onStart",
      time: 0.000,
      type: "impact-medium",
      description: "Haptic fires when user presses shutter button"
    },
    audioSync: {
      shutterSound: {
        start: 0.000,
        end: 0.300,
        description: "iOS camera shutter sound duration"
      },
      convergenceCompletes: 0.300,
      visualConfirmation: 0.800
    }
  },

  // Platform implementation notes
  implementation: {
    web: {
      libraries: ["react", "framer-motion", "gsap"],
      viewport: { width: 59, height: 61 },
      background: "transparent",
      format: "SVG"
    },
    ios: {
      framework: "SwiftUI",
      animation: "withAnimation(.spring(response: 0.35, dampingFraction: 0.85))",
      haptics: "UIImpactFeedbackGenerator(style: .medium)",
    },
    android: {
      framework: "Jetpack Compose",
      animation: "animateFloatAsState(tween(durationMillis: 350, easing: FastOutSlowInEasing))",
      haptics: "HapticFeedbackConstants.CONTEXT_CLICK"
    },
    flutter: {
      framework: "Flutter",
      animation: "AnimationController(duration: Duration(milliseconds: 1500), vsync: this)",
      curve: "Curves.easeOutQuad"
    }
  },

  // Export metadata
  export: {
    formats: ["svg", "json", "lottie", "mp4", "webm"],
    compatibility: {
      ios: "iOS 13+",
      android: "Android 5.0+",
      web: "All modern browsers",
      flutter: "Flutter 2.0+"
    }
  }
};

// Export as JSON
const outputDir = __dirname;
const outputFile = path.join(outputDir, 'autoya-success-animation-motion.json');

try {
  fs.writeFileSync(outputFile, JSON.stringify(motionSpec, null, 2), 'utf8');
  console.log('\n✅ SUCCESS! Motion JSON file created!\n');
  console.log('📁 File location:');
  console.log('   ' + outputFile + '\n');
  console.log('📦 File contains:');
  console.log('   ✓ Animation settings (1.5s, 60fps, 90 frames)');
  console.log('   ✓ Timing breakpoints (5 phases)');
  console.log('   ✓ Frame numbers');
  console.log('   ✓ Easing functions');
  console.log('   ✓ Visual element specs');
  console.log('   ✓ Camera shutter sync points');
  console.log('   ✓ Apple Motion Principles');
  console.log('   ✓ Platform implementation notes\n');
  console.log('📤 Send this file to your dev team!\n');
  
  // Also create a simple README
  const readme = `# Autoya Logo Success Animation

## Motion Specification Export

This JSON file contains the complete motion specification for the Autoya logo success animation.

### Animation Details
- **Duration**: 1.5 seconds
- **Frame Rate**: 60fps
- **Total Frames**: 90
- **Philosophy**: Apple Motion Principles

### Timing Phases
1. Logo Recognition (0-0.4s) - Initial visibility
2. Convergence (0.4-0.75s) - Liquid motion to center
3. Beat Pause (0.75-0.8s) - Brief pause
4. Green Transform (0.8-1.15s) - Success color
5. Checkmark (1.15-1.5s) - Confirmation stroke

### Camera Sync
- Synced with iOS camera shutter sound
- Convergence completes at 300ms (shutter sound end)
- Haptic feedback on start

### Platform Support
- iOS (SwiftUI)
- Android (Jetpack Compose)
- Web (React/Framer Motion/GSAP)
- Flutter

### Usage
Import this JSON into your animation tool or use the timing values to recreate the exact motion on any platform.

Generated: ${new Date().toISOString()}
`;
  
  const readmeFile = path.join(outputDir, 'MOTION_EXPORT_README.md');
  fs.writeFileSync(readmeFile, readme, 'utf8');
  console.log('📄 Also created: MOTION_EXPORT_README.md\n');
  
  console.log('🎉 DONE! Your motion export is ready for the dev team!\n');
  
} catch (error) {
  console.error('❌ Error creating file:', error.message);
  process.exit(1);
}

