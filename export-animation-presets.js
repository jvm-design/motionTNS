#!/usr/bin/env node

/**
 * Export Animation Presets to JSON
 * 
 * Usage:
 *   node export-animation-presets.js
 *   node export-animation-presets.js > my-presets.json
 */

import fs from 'fs';
import path from 'path';

// Animation Presets - Complete Library
const springs = {
  default: {
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8,
    description: "Balanced and natural - Apple's standard spring"
  },
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.8,
    description: "Playful and energetic"
  },
  stiff: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 0.5,
    description: "Quick and responsive"
  },
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 1.0,
    description: "Smooth and calm"
  },
  wobbly: {
    type: "spring",
    stiffness: 250,
    damping: 15,
    mass: 1.0,
    description: "Exaggerated bounce"
  },
  cameraSpring: {
    type: "spring",
    stiffness: 340,
    damping: 28,
    mass: 0.7,
    description: "Camera sync responsive spring (1.5% overshoot)"
  }
};

const durations = {
  instant: 0.1,
  quick: 0.2,
  fast: 0.3,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  camera: 0.7,
  premium: 1.5
};

const easings = {
  default: {
    bezier: [0.4, 0.0, 0.2, 1.0],
    description: "Apple's standard easing"
  },
  decelerate: {
    bezier: [0.0, 0.0, 0.2, 1.0],
    description: "Smooth deceleration"
  },
  accelerate: {
    bezier: [0.4, 0.0, 1.0, 1.0],
    description: "Smooth acceleration"
  },
  sharp: {
    bezier: [0.4, 0.0, 0.6, 1.0],
    description: "Sharp movement"
  },
  emphasis: {
    bezier: [0.4, 0.0, 0.2, 1.0],
    description: "Emphasis"
  },
  easeOutQuad: {
    bezier: [0.25, 0.46, 0.45, 0.94],
    description: "Decisive checkmark drawing"
  }
};

const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  },
  liquidGlass: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  slideUp: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  slideDown: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  },
  slideLeft: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  },
  slideRight: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  expand: {
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    exit: { scaleY: 0, opacity: 0 }
  },
  blurIn: {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, backdropFilter: "blur(12px)" },
    exit: { opacity: 0, backdropFilter: "blur(0px)" }
  }
};

const interactionStates = {
  subtleHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: springs.stiff
  },
  buttonHover: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: springs.bouncy
  },
  iconHover: {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.9 },
    transition: springs.stiff
  },
  cardHover: {
    whileHover: { y: -8, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: springs.default
  }
};

const stagger = {
  fast: { staggerChildren: 0.03, delayChildren: 0 },
  normal: { staggerChildren: 0.05, delayChildren: 0 },
  slow: { staggerChildren: 0.1, delayChildren: 0 },
  withDelay: { staggerChildren: 0.05, delayChildren: 0.2 },
  convergence: { staggerChildren: 0.02, delayChildren: 0 }
};

const svgDraw = {
  fast: { duration: 1, ease: [0.0, 0.0, 0.2, 1.0] },
  normal: { duration: 1.5, ease: [0.0, 0.0, 0.2, 1.0] },
  slow: { duration: 2.5, ease: [0.0, 0.0, 0.2, 1.0] },
  checkmark: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
};

const logoPathDraw = {
  pathLength: { from: 0, to: 1 },
  duration: 2,
  ease: "easeInOut"
};

const animationPresets = {
  meta: {
    name: "Motion Autoya Animation Presets",
    version: "2.0.0",
    description: "Complete animation preset library based on Apple's Motion Principles"
  },
  springs,
  durations,
  easings,
  variants,
  interactionStates,
  stagger,
  svgDraw,
  logoPathDraw
};

// Export as formatted JSON
const json = JSON.stringify(animationPresets, null, 2);

// If running as script, output to console
console.log(json);

export default animationPresets;

