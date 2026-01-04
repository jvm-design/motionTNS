/**
 * Animation Presets - Complete Library
 * Based on Apple's Motion Principles and Motion Autoya specifications
 * 
 * Export this as JSON with:
 * console.log(JSON.stringify(animationPresets, null, 2));
 */

// Spring Presets
export const springs = {
  // Default - balanced and natural (Apple's standard)
  default: {
    type: "spring" as const,
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  },
  
  // Bouncy - playful and energetic
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  },
  
  // Stiff - quick and responsive
  stiff: {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
  
  // Gentle - smooth and calm
  gentle: {
    type: "spring" as const,
    stiffness: 200,
    damping: 30,
    mass: 1.0,
  },
  
  // Wobbly - exaggerated bounce
  wobbly: {
    type: "spring" as const,
    stiffness: 250,
    damping: 15,
    mass: 1.0,
  },
  
  // Camera Spring - responsive with 1.5% overshoot
  cameraSpring: {
    type: "spring" as const,
    stiffness: 340,
    damping: 28,
    mass: 0.7,
  },
} as const;

// Duration-based timing presets (in seconds)
export const durations = {
  instant: 0.1,
  quick: 0.2,
  fast: 0.3,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  camera: 0.7,
  premium: 1.5,
} as const;

// Cubic-bezier easing functions
export const easings = {
  // Apple's standard easing
  default: [0.4, 0.0, 0.2, 1.0] as const,
  
  // Smooth deceleration (ease-out)
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  
  // Smooth acceleration (ease-in)
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,
  
  // Sharp movement
  sharp: [0.4, 0.0, 0.6, 1.0] as const,
  
  // Emphasis (ease-in-out)
  emphasis: [0.4, 0.0, 0.2, 1.0] as const,
  
  // Ease-out quad (for checkmark drawing)
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

// Common animation variants for Framer Motion
export const variants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Scale + fade (modal/card entry)
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  
  // Liquid glass effect - premium entrance
  liquidGlass: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
  
  // Slide from bottom (sheet/drawer)
  slideUp: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  
  // Slide from top (notification)
  slideDown: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  
  // Slide from right (sidebar)
  slideLeft: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  
  // Slide from left
  slideRight: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  
  // Expand/collapse
  expand: {
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    exit: { scaleY: 0, opacity: 0 },
  },
  
  // Blur fade (backdrop)
  blurIn: {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, backdropFilter: "blur(12px)" },
    exit: { opacity: 0, backdropFilter: "blur(0px)" },
  },
} as const;

// Hover/tap states for interactive elements
export const interactionStates = {
  // Subtle hover (most UI elements)
  subtleHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: springs.stiff,
  },
  
  // Button hover (more pronounced)
  buttonHover: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: springs.bouncy,
  },
  
  // Icon hover
  iconHover: {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.9 },
    transition: springs.stiff,
  },
  
  // Card hover
  cardHover: {
    whileHover: { y: -8, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: springs.default,
  },
} as const;

// Stagger configurations for list animations
export const stagger = {
  fast: {
    staggerChildren: 0.03,
    delayChildren: 0,
  },
  
  normal: {
    staggerChildren: 0.05,
    delayChildren: 0,
  },
  
  slow: {
    staggerChildren: 0.1,
    delayChildren: 0,
  },
  
  withDelay: {
    staggerChildren: 0.05,
    delayChildren: 0.2,
  },
  
  convergence: {
    staggerChildren: 0.02,
    delayChildren: 0,
  },
} as const;

// SVG drawing animation timing
export const svgDraw = {
  fast: {
    duration: 1,
    ease: easings.decelerate,
  },
  
  normal: {
    duration: 1.5,
    ease: easings.decelerate,
  },
  
  slow: {
    duration: 2.5,
    ease: easings.decelerate,
  },
  
  checkmark: {
    duration: 0.35,
    ease: easings.easeOutQuad,
  },
} as const;

// Logo path draw animation
export const logoPathDraw = {
  pathLength: { from: 0, to: 1 },
  duration: 2,
  ease: "easeInOut" as const,
};

// GSAP-specific configurations for SVG morphing
export const gsapConfig = {
  morphDefault: {
    duration: 0.8,
    ease: "power2.inOut",
  },
  
  morphSmooth: {
    duration: 1.2,
    ease: "power1.inOut",
  },
  
  morphSnappy: {
    duration: 0.5,
    ease: "back.out(1.2)",
  },
} as const;

// Camera Success Animation Timeline (700ms - fast/responsive)
export const cameraSuccessTimeline = {
  meta: {
    duration: 700,
    fps: 60,
    totalFrames: 42,
    syncPoint: { frame: 18, time: 300 },
  },
  
  recognition: {
    frameRange: [0, 11] as const,
    timeRange: [0, 183] as const,
    duration: 183,
  },
  
  convergence: {
    frameRange: [11, 18] as const,
    timeRange: [183, 300] as const,
    duration: 117,
    stagger: 0.02,
    easing: "cameraSpring",
    scaleStart: 0.55,
    opacityFade: 0.75,
  },
  
  beat: {
    frameRange: [18, 21] as const,
    timeRange: [300, 350] as const,
    duration: 50,
  },
  
  green: {
    frameRange: [21, 32] as const,
    timeRange: [350, 533] as const,
    duration: 183,
    pulse: {
      maxScale: 1.10,
      peakAt: 0.35,
    },
  },
  
  checkmark: {
    frameRange: [32, 42] as const,
    timeRange: [533, 700] as const,
    duration: 167,
  },
} as const;

// Premium Success Animation Timeline (1500ms - slow/appreciable)
export const premiumSuccessTimeline = {
  meta: {
    duration: 1500,
    fps: 60,
    totalFrames: 90,
  },
  
  recognition: {
    frameRange: [0, 24] as const,
    timeRange: [0, 400] as const,
    duration: 400,
  },
  
  convergence: {
    frameRange: [24, 45] as const,
    timeRange: [400, 750] as const,
    duration: 350,
    stagger: 0.02,
    easing: "cameraSpring",
    scaleStart: 0.55,
    opacityFade: 0.75,
  },
  
  beat: {
    frameRange: [45, 48] as const,
    timeRange: [750, 800] as const,
    duration: 50,
  },
  
  green: {
    frameRange: [48, 69] as const,
    timeRange: [800, 1150] as const,
    duration: 350,
    pulse: {
      maxScale: 1.10,
      peakAt: 0.35,
    },
  },
  
  checkmark: {
    frameRange: [69, 90] as const,
    timeRange: [1150, 1500] as const,
    duration: 350,
  },
} as const;

// Color presets
export const colors = {
  success: {
    gradient: {
      type: "radial" as const,
      stops: [
        { offset: "0%", color: "#86EFAC" },
        { offset: "45%", color: "#34D399" },
        { offset: "100%", color: "#059669" },
      ],
    },
    solid: "#34D399",
  },
  white: "#FFFFFF",
  liquidGlass: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
    heavy: "rgba(255, 255, 255, 0.3)",
  },
} as const;

// Timing guide for different interaction types
export const timingGuide = {
  quickInteractions: {
    range: [100, 200] as const,
    examples: ["button hover", "toggles", "checkboxes", "tooltips"],
  },
  standardTransitions: {
    range: [300, 400] as const,
    examples: ["modals", "dropdowns", "cards", "page transitions"],
  },
  elaborateAnimations: {
    range: [500, 800] as const,
    examples: ["complex state changes", "multi-step sequences"],
  },
  premiumExperiences: {
    range: [1000, 2000] as const,
    examples: ["onboarding", "success confirmations", "branded moments"],
  },
} as const;

// Apple Motion Principles
export const applePrinciples = {
  responsive: {
    spring: true,
    stiffness: [300, 400] as const,
    damping: [25, 35] as const,
    mass: [0.5, 1.0] as const,
  },
  fluid: {
    interruptible: true,
    velocityPreservation: true,
  },
  contextual: {
    entryScale: [0.95, 1.0] as const,
    exitScale: [1.0, 0.95] as const,
    duration: [0.3, 0.6] as const,
  },
  subtle: {
    scaleRange: [0.95, 1.05] as const,
    blurRange: [0, 20] as const,
    opacityRange: [0.8, 1.0] as const,
  },
  spatial: {
    directionalAwareness: true,
    curvedPaths: true,
    parallax: true,
  },
} as const;

// Performance guidelines
export const performance = {
  gpuAccelerated: ["transform", "opacity", "filter"] as const,
  avoid: ["width", "height", "margin", "padding", "color", "background", "border"] as const,
} as const;

// Complete preset object for JSON export
export const animationPresets = {
  springs,
  durations,
  easings,
  variants,
  interactionStates,
  stagger,
  svgDraw,
  logoPathDraw,
  gsapConfig,
  cameraSuccessTimeline,
  premiumSuccessTimeline,
  colors,
  timingGuide,
  applePrinciples,
  performance,
} as const;

// Export individual presets for convenience
export default animationPresets;

// Utility function to convert to JSON
export const toJSON = () => {
  return JSON.stringify(animationPresets, null, 2);
};

// Log to console (for quick export)
if (typeof window !== 'undefined' && (window as any).__EXPORT_PRESETS__) {
  console.log('📦 Animation Presets JSON:');
  console.log(toJSON());
}



