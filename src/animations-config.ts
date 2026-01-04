/**
 * Motion Autoya Animation Library
 * Complete animation configuration system
 * 
 * This file contains all animation definitions used across the project.
 * Based on Apple's Motion Principles and optimized for modern frameworks.
 * 
 * Export to JSON:
 *   npm run export:animations
 * 
 * Or programmatically:
 *   import { animationLibrary, exportToJSON } from './animations-config';
 *   console.log(exportToJSON());
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SpringConfig = {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
};

export type KeyframeConfig = {
  type: 'keyframes';
  property: string;
  from: number | string | { [key: string]: number | string };
  to: number | string | { [key: string]: number | string };
  duration: number;
  easing: string | number[];
};

export type TimingConfig = {
  duration: number;
  ease: string | number[];
};

// ============================================================================
// ANIMATION LIBRARY - MAIN EXPORT
// ============================================================================

export const animationLibrary = {
  // ==========================================================================
  // SPRING PHYSICS
  // ==========================================================================
  springs: {
    default: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.8,
      description: 'Balanced and natural - Apple\'s standard spring',
      useCases: ['General UI animations', 'Modal entrances', 'Card transitions']
    },
    
    bouncy: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
      mass: 0.8,
      description: 'Playful and energetic - for buttons and interactive elements',
      useCases: ['Button presses', 'Toggle switches', 'Interactive feedback']
    },
    
    stiff: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 35,
      mass: 0.5,
      description: 'Quick and responsive - for immediate feedback',
      useCases: ['Hover effects', 'Tooltips', 'Quick interactions']
    },
    
    gentle: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 30,
      mass: 1.0,
      description: 'Smooth and calm - for large movements and modals',
      useCases: ['Modals', 'Drawers', 'Large panels']
    },
    
    wobbly: {
      type: 'spring' as const,
      stiffness: 250,
      damping: 15,
      mass: 1.0,
      description: 'Exaggerated bounce - for playful decorative animations',
      useCases: ['Success celebrations', 'Playful UI', 'Attention grabbers']
    },
    
    cameraSpring: {
      type: 'spring' as const,
      stiffness: 340,
      damping: 28,
      mass: 0.7,
      description: 'Camera sync responsive spring (1.5% overshoot)',
      bezier: [0.22, 0.61, 0.36, 1.0],
      formula: 'smoothstep + sin(t * π) * 0.015 * (1 - t)',
      useCases: ['Camera animations', 'Synchronized motion', 'Photo capture feedback']
    }
  },

  // ==========================================================================
  // DURATION PRESETS (in seconds)
  // ==========================================================================
  durations: {
    instant: { value: 0.1, ms: 100, description: 'Near-instant response' },
    quick: { value: 0.2, ms: 200, description: 'Quick interactions' },
    fast: { value: 0.3, ms: 300, description: 'Fast transitions' },
    normal: { value: 0.4, ms: 400, description: 'Standard timing' },
    slow: { value: 0.6, ms: 600, description: 'Deliberate motion' },
    slower: { value: 0.8, ms: 800, description: 'Slower transitions' },
    camera: { value: 0.7, ms: 700, description: 'Camera feedback' },
    premium: { value: 1.5, ms: 1500, description: 'Premium quality timing' }
  },

  // ==========================================================================
  // EASING FUNCTIONS (Cubic Bezier)
  // ==========================================================================
  easings: {
    default: {
      bezier: [0.4, 0.0, 0.2, 1.0],
      css: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
      description: 'Apple\'s standard easing',
      useCases: ['General animations', 'Default choice']
    },
    
    decelerate: {
      bezier: [0.0, 0.0, 0.2, 1.0],
      css: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
      description: 'Smooth deceleration (ease-out)',
      useCases: ['Entrances', 'Expanding elements', 'Fade-ins']
    },
    
    accelerate: {
      bezier: [0.4, 0.0, 1.0, 1.0],
      css: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',
      description: 'Smooth acceleration (ease-in)',
      useCases: ['Exits', 'Collapsing elements', 'Fade-outs']
    },
    
    sharp: {
      bezier: [0.4, 0.0, 0.6, 1.0],
      css: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)',
      description: 'Sharp movement',
      useCases: ['Quick snaps', 'Precise movements']
    },
    
    emphasis: {
      bezier: [0.4, 0.0, 0.2, 1.0],
      css: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
      description: 'Emphasis (ease-in-out)',
      useCases: ['Emphasized transitions', 'Important changes']
    },
    
    easeOutQuad: {
      bezier: [0.25, 0.46, 0.45, 0.94],
      css: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      formula: '1 - (1 - t)²',
      description: 'Decisive checkmark drawing',
      useCases: ['SVG drawing', 'Checkmarks', 'Progress indicators']
    }
  },

  // ==========================================================================
  // ANIMATION VARIANTS (Framer Motion)
  // ==========================================================================
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      description: 'Simple fade animation',
      useCases: ['General content reveals', 'Overlays']
    },
    
    scaleIn: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
      description: 'Scale + fade - for modals and cards',
      useCases: ['Modals', 'Cards', 'Popovers']
    },
    
    liquidGlass: {
      initial: { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
      transition: { type: 'spring', stiffness: 300, damping: 20 },
      description: 'Liquid glass effect - premium entrance',
      useCases: ['Premium animations', 'Hero elements', 'Feature reveals']
    },
    
    slideUp: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
      description: 'Slide from bottom - sheets and drawers',
      useCases: ['Bottom sheets', 'Drawers', 'Mobile panels']
    },
    
    slideDown: {
      initial: { y: '-100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100%', opacity: 0 },
      description: 'Slide from top - notifications',
      useCases: ['Notifications', 'Top banners', 'Alerts']
    },
    
    slideLeft: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 },
      description: 'Slide from right - sidebars',
      useCases: ['Sidebars', 'Right panels', 'Navigation']
    },
    
    slideRight: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
      description: 'Slide from left',
      useCases: ['Left sidebars', 'Back navigation']
    },
    
    expand: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1 },
      exit: { scaleY: 0, opacity: 0 },
      description: 'Vertical expand/collapse',
      useCases: ['Accordions', 'Dropdowns', 'Expanding panels']
    },
    
    blurIn: {
      initial: { opacity: 0, backdropFilter: 'blur(0px)' },
      animate: { opacity: 1, backdropFilter: 'blur(12px)' },
      exit: { opacity: 0, backdropFilter: 'blur(0px)' },
      description: 'Blur fade - for backdrops and overlays',
      useCases: ['Modal backdrops', 'Frosted glass effects', 'Overlays']
    }
  },

  // ==========================================================================
  // INTERACTION STATES
  // ==========================================================================
  interactionStates: {
    subtleHover: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 500, damping: 35, mass: 0.5 },
      description: 'Subtle hover for most UI elements',
      useCases: ['Buttons', 'Links', 'Clickable cards']
    },
    
    buttonHover: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.8 },
      description: 'Button hover - more pronounced',
      useCases: ['Primary buttons', 'CTA buttons', 'Action buttons']
    },
    
    iconHover: {
      whileHover: { scale: 1.1, rotate: 5 },
      whileTap: { scale: 0.9 },
      transition: { type: 'spring', stiffness: 500, damping: 35, mass: 0.5 },
      description: 'Icon hover with rotation',
      useCases: ['Icon buttons', 'Tool icons', 'Social icons']
    },
    
    cardHover: {
      whileHover: { y: -8, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 },
      description: 'Card hover - lift effect',
      useCases: ['Cards', 'Tiles', 'Product items']
    }
  },

  // ==========================================================================
  // STAGGER CONFIGURATIONS
  // ==========================================================================
  stagger: {
    fast: {
      staggerChildren: 0.03,
      delayChildren: 0,
      description: 'Fast stagger for quick reveals',
      useCases: ['List items', 'Menu items', 'Quick sequences']
    },
    
    normal: {
      staggerChildren: 0.05,
      delayChildren: 0,
      description: 'Standard stagger timing',
      useCases: ['Cards', 'Grid items', 'Standard lists']
    },
    
    slow: {
      staggerChildren: 0.1,
      delayChildren: 0,
      description: 'Slow stagger for emphasis',
      useCases: ['Featured content', 'Hero sections', 'Emphasized reveals']
    },
    
    withDelay: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      description: 'Stagger with initial delay',
      useCases: ['Delayed sequences', 'After other animations']
    },
    
    convergence: {
      staggerChildren: 0.02,
      delayChildren: 0,
      description: 'Camera convergence stagger pattern',
      useCases: ['Logo animations', 'Converging elements', 'Camera effects']
    }
  },

  // ==========================================================================
  // SVG DRAWING ANIMATIONS
  // ==========================================================================
  svgDraw: {
    fast: {
      duration: 1,
      ease: [0.0, 0.0, 0.2, 1.0],
      description: 'Fast SVG path drawing',
      useCases: ['Quick icons', 'Simple paths']
    },
    
    normal: {
      duration: 1.5,
      ease: [0.0, 0.0, 0.2, 1.0],
      description: 'Standard SVG path drawing',
      useCases: ['Standard icons', 'Logo reveals']
    },
    
    slow: {
      duration: 2.5,
      ease: [0.0, 0.0, 0.2, 1.0],
      description: 'Slow SVG path drawing for emphasis',
      useCases: ['Premium logos', 'Hero graphics', 'Emphasized drawings']
    },
    
    checkmark: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
      description: 'Decisive checkmark drawing',
      useCases: ['Success checkmarks', 'Completion indicators']
    }
  },

  // ==========================================================================
  // LOGO PATH DRAWING
  // ==========================================================================
  logoPathDraw: {
    type: 'keyframes' as const,
    property: 'strokeDashoffset',
    from: 1000,
    to: 0,
    duration: 2000,
    easing: 'easeInOut',
    pathLength: { from: 0, to: 1 },
    description: 'Logo path reveal animation',
    useCases: ['Logo reveals', 'Path animations', 'Brand intros']
  },

  // ==========================================================================
  // GSAP CONFIGURATIONS
  // ==========================================================================
  gsapConfig: {
    morphDefault: {
      duration: 0.8,
      ease: 'power2.inOut',
      description: 'Default SVG morphing',
      useCases: ['Shape morphing', 'Icon transitions']
    },
    
    morphSmooth: {
      duration: 1.2,
      ease: 'power1.inOut',
      description: 'Smooth SVG morphing',
      useCases: ['Smooth shape changes', 'Organic transitions']
    },
    
    morphSnappy: {
      duration: 0.5,
      ease: 'back.out(1.2)',
      description: 'Snappy SVG morphing with overshoot',
      useCases: ['Quick transformations', 'Playful morphs']
    }
  },

  // ==========================================================================
  // CAMERA SUCCESS ANIMATION (700ms - Fast/Responsive)
  // ==========================================================================
  cameraSuccess: {
    meta: {
      name: 'Camera Success Animation',
      duration: 700,
      fps: 60,
      totalFrames: 42,
      syncPoint: {
        frame: 18,
        time: 300,
        description: 'Camera shutter sound ends - shapes fully merged'
      }
    },
    
    timeline: {
      recognition: {
        frameRange: [0, 11],
        timeRange: [0, 183],
        duration: 183,
        description: 'Logo visible, no motion - PRIMARY cognitive recognition time'
      },
      
      convergence: {
        frameRange: [11, 18],
        timeRange: [183, 300],
        duration: 117,
        description: 'All 8 outer shapes converge to center - fast responsive action',
        animation: {
          stagger: 0.02,
          easing: 'cameraSpring',
          scaleStart: 0.55,
          opacityFade: 0.75,
          filter: {
            active: 'frame 16-18 only',
            blur: '1.4px',
            type: 'shutterBlend'
          }
        }
      },
      
      beat: {
        frameRange: [18, 21],
        timeRange: [300, 350],
        duration: 50,
        description: 'White circle holds (micro-pause for clarity)'
      },
      
      green: {
        frameRange: [21, 32],
        timeRange: [350, 533],
        duration: 183,
        description: 'White to green transformation with pulse',
        animation: {
          colorTransition: {
            from: '#FFFFFF',
            to: {
              type: 'radial',
              cx: '38%',
              cy: '38%',
              stops: [
                { offset: '0%', color: '#86EFAC' },
                { offset: '45%', color: '#34D399' },
                { offset: '100%', color: '#059669' }
              ]
            }
          },
          pulse: {
            maxScale: 1.10,
            peakAt: 0.35,
            easing: 'ease-in-out'
          }
        }
      },
      
      checkmark: {
        frameRange: [32, 42],
        timeRange: [533, 700],
        duration: 167,
        description: 'Checkmark draws on green circle',
        animation: {
          path: 'M 26.5 30.5 L 28.5 32.8 L 32 28.5',
          stroke: '#FFFFFF',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          drawFrom: 0,
          drawTo: 100,
          easing: 'ease-out-quad'
        }
      }
    }
  },

  // ==========================================================================
  // PREMIUM SUCCESS ANIMATION (1500ms - Slow/Appreciable)
  // ==========================================================================
  premiumSuccess: {
    meta: {
      name: 'Premium Success Animation - Apple Quality',
      duration: 1500,
      fps: 60,
      totalFrames: 90,
      philosophy: 'Fast enough to feel responsive, slow enough to be SEEN and APPRECIATED'
    },
    
    timeline: {
      recognition: {
        frameRange: [0, 24],
        timeRange: [0, 400],
        duration: 400,
        description: 'GENEROUS recognition time for quality perception',
        applePrinciple: 'Clarity - give users time to understand'
      },
      
      convergence: {
        frameRange: [24, 45],
        timeRange: [400, 750],
        duration: 350,
        description: 'VISIBLE, FOLLOWABLE liquid motion',
        animation: {
          stagger: 0.02,
          easing: 'cameraSpring',
          scaleStart: 0.55,
          opacityFade: 0.75,
          filter: {
            active: 'frame 16-18 only',
            blur: '1.4px',
            type: 'shutterBlend'
          }
        }
      },
      
      beat: {
        frameRange: [45, 48],
        timeRange: [750, 800],
        duration: 50,
        description: 'Moment to breathe and appreciate the merge',
        applePrinciple: 'Deference - time to appreciate quality'
      },
      
      green: {
        frameRange: [48, 69],
        timeRange: [800, 1150],
        duration: 350,
        description: 'SMOOTH, VISIBLE success signal',
        applePrinciple: 'Clarity - transformation is understandable',
        animation: {
          colorTransition: {
            from: '#FFFFFF',
            to: {
              type: 'radial',
              cx: '38%',
              cy: '38%',
              stops: [
                { offset: '0%', color: '#86EFAC' },
                { offset: '45%', color: '#34D399' },
                { offset: '100%', color: '#059669' }
              ]
            }
          },
          pulse: {
            maxScale: 1.10,
            peakAt: 0.35,
            easing: 'ease-in-out'
          }
        }
      },
      
      checkmark: {
        frameRange: [69, 90],
        timeRange: [1150, 1500],
        duration: 350,
        description: 'CLEAR, CONFIDENT confirmation',
        applePrinciple: 'Premium - quality confirmation takes time',
        animation: {
          path: 'M 26.5 30.5 L 28.5 32.8 L 32 28.5',
          stroke: '#FFFFFF',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          drawFrom: 0,
          drawTo: 100,
          easing: 'ease-out-quad'
        }
      }
    }
  },

  // ==========================================================================
  // TIMING GUIDELINES
  // ==========================================================================
  timingGuide: {
    quickInteractions: {
      range: [100, 200],
      description: 'Button hover, toggles, checkboxes, tooltips',
      examples: ['Button hover', 'Toggles', 'Checkboxes', 'Tooltips']
    },
    
    standardTransitions: {
      range: [300, 400],
      description: 'Modals, dropdowns, cards, page transitions',
      examples: ['Modals', 'Dropdowns', 'Cards', 'Page transitions']
    },
    
    elaborateAnimations: {
      range: [500, 800],
      description: 'Complex state changes, multi-step sequences',
      examples: ['Complex state changes', 'Multi-step sequences']
    },
    
    premiumExperiences: {
      range: [1000, 2000],
      description: 'Onboarding, success confirmations, branded moments',
      examples: ['Onboarding', 'Success confirmations', 'Branded moments']
    }
  },

  // ==========================================================================
  // APPLE MOTION PRINCIPLES
  // ==========================================================================
  applePrinciples: {
    responsive: {
      description: 'Motion feels immediate and connected to interaction',
      implementation: {
        spring: true,
        stiffness: [300, 400],
        damping: [25, 35],
        mass: [0.5, 1.0]
      }
    },
    
    fluid: {
      description: 'Animations flow smoothly without abrupt starts/stops',
      implementation: {
        interruptible: true,
        velocityPreservation: true,
        avoidSuddenStops: true
      }
    },
    
    contextual: {
      description: 'Every animation has clear purpose',
      implementation: {
        entryAnimation: 'scale + fade (0.95 → 1.0)',
        exitAnimation: 'scale + fade (1.0 → 0.95)',
        duration: [0.3, 0.6]
      }
    },
    
    subtle: {
      description: 'Noticeable but not distracting',
      implementation: {
        scaleRange: [0.95, 1.05],
        blurRange: [0, 20],
        opacityRange: [0.8, 1.0]
      }
    },
    
    spatial: {
      description: 'Respect spatial relationships',
      implementation: {
        directionalAwareness: true,
        curvedPaths: true,
        parallax: true,
        transformOrigin: 'interaction-based'
      }
    }
  },

  // ==========================================================================
  // PERFORMANCE GUIDELINES
  // ==========================================================================
  performance: {
    gpuAccelerated: ['transform', 'opacity', 'filter'],
    avoid: ['width', 'height', 'margin', 'padding', 'color', 'background', 'border'],
    tips: [
      'Use transform and opacity only',
      'Respect prefers-reduced-motion',
      'Test on actual devices',
      'Use will-change sparingly'
    ]
  },

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================
  accessibility: {
    prefersReducedMotion: {
      description: 'Respect user\'s motion preferences',
      implementation: {
        disable: ['decorative animations', 'parallax', 'spring animations'],
        keep: ['opacity transitions', 'instant state changes'],
        duration: 'reduce to instant or 100ms max'
      }
    }
  },

  // ==========================================================================
  // COLORS
  // ==========================================================================
  colors: {
    success: {
      gradient: {
        type: 'radial',
        cx: '38%',
        cy: '38%',
        stops: [
          { offset: '0%', color: '#86EFAC', name: 'green-300' },
          { offset: '45%', color: '#34D399', name: 'green-400' },
          { offset: '100%', color: '#059669', name: 'green-600' }
        ]
      },
      solid: '#34D399'
    },
    
    white: '#FFFFFF',
    
    liquidGlass: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      heavy: 'rgba(255, 255, 255, 0.3)'
    }
  },

  // ==========================================================================
  // FRAMEWORK USAGE EXAMPLES
  // ==========================================================================
  usage: {
    reactFramerMotion: {
      import: "import { motion } from 'framer-motion';",
      example: `const spring = { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 };
<motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={spring} 
/>`,
      packages: ['framer-motion']
    },
    
    reactNative: {
      import: "import Animated from 'react-native-reanimated';",
      example: `Animated.spring(animatedValue, { 
  toValue: 1, 
  useNativeDriver: true, 
  ...preset 
}).start();`,
      packages: ['react-native-reanimated', 'react-native-svg']
    },
    
    flutter: {
      import: "import 'package:flutter/animation.dart';",
      example: `AnimationController(
  duration: Duration(milliseconds: 700), 
  vsync: this
);`,
      packages: ['flutter_svg']
    },
    
    ios: {
      import: "import UIKit",
      example: `let animation = CASpringAnimation(keyPath: 'position')
animation.damping = 30
animation.stiffness = 380`,
      framework: 'CoreAnimation'
    },
    
    android: {
      import: "import android.animation.ObjectAnimator",
      example: `val animator = ObjectAnimator.ofFloat(view, 'translationX', 0f, targetX)
animator.duration = 700`,
      framework: 'AnimatedVectorDrawable / ObjectAnimator'
    },
    
    web: {
      import: "// CSS or Web Animations API",
      example: "element.style.transition = 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1.0)';",
      css: 'Use cubic-bezier values from easings'
    }
  }
} as const;

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Convert animation library to JSON string
 */
export const exportToJSON = (pretty: boolean = true): string => {
  return JSON.stringify(animationLibrary, null, pretty ? 2 : 0);
};

/**
 * Get a specific animation preset by path
 * @example getPreset('springs.bouncy')
 * @example getPreset('variants.liquidGlass')
 */
export const getPreset = (path: string): any => {
  const parts = path.split('.');
  let current: any = animationLibrary;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  return current;
};

/**
 * Create a Framer Motion transition from a spring preset
 */
export const createSpringTransition = (springName: keyof typeof animationLibrary.springs) => {
  const spring = animationLibrary.springs[springName];
  return {
    type: spring.type,
    stiffness: spring.stiffness,
    damping: spring.damping,
    mass: spring.mass
  };
};

/**
 * Create a CSS transition string from an easing preset
 */
export const createCSSTransition = (
  property: string,
  durationKey: keyof typeof animationLibrary.durations,
  easingKey: keyof typeof animationLibrary.easings
): string => {
  const duration = animationLibrary.durations[durationKey].value;
  const easing = animationLibrary.easings[easingKey].css;
  return `${property} ${duration}s ${easing}`;
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default animationLibrary;



