/**
 * Apple-inspired motion configuration presets
 * Based on Apple's Human Interface Guidelines and observed behaviors
 */

// Spring Presets
export const springs = {
  // Default - balanced and natural
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
} as const;

// Duration-based timing presets (for non-spring animations)
export const durations = {
  instant: 0.1,
  quick: 0.2,
  fast: 0.3,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
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
} as const;

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






