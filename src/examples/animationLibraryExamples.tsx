/**
 * Animation Library Usage Examples
 * 
 * This file demonstrates how to use the animation library
 * in TypeScript/React projects with Framer Motion.
 */

import { motion, Variants, Transition } from 'framer-motion';
import { animationLibrary } from './animations-config';

// ============================================================================
// TYPE-SAFE HELPERS
// ============================================================================

/**
 * Get a spring configuration by name
 */
export const getSpring = (name: keyof typeof animationLibrary.springs): Transition => {
  const spring = animationLibrary.springs[name];
  return {
    type: spring.type,
    stiffness: spring.stiffness,
    damping: spring.damping,
    mass: spring.mass
  };
};

/**
 * Get a duration value (in seconds)
 */
export const getDuration = (name: keyof typeof animationLibrary.durations): number => {
  return animationLibrary.durations[name].value;
};

/**
 * Get an easing array
 */
export const getEasing = (name: keyof typeof animationLibrary.easings): number[] => {
  return [...animationLibrary.easings[name].bezier];
};

/**
 * Get a variant configuration
 */
export const getVariant = (name: keyof typeof animationLibrary.variants): Variants => {
  return animationLibrary.variants[name] as any;
};

// ============================================================================
// EXAMPLE 1: ANIMATED BUTTON
// ============================================================================

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick }) => {
  const buttonState = animationLibrary.interactionStates.buttonHover;
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={buttonState.whileHover}
      whileTap={buttonState.whileTap}
      transition={buttonState.transition}
      style={{
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer'
      }}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// EXAMPLE 2: MODAL WITH LIQUID GLASS EFFECT
// ============================================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const LiquidGlassModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const variant = animationLibrary.variants.liquidGlass;
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant as any}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '90%'
      }}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 3: STAGGERED LIST
// ============================================================================

interface StaggeredListProps {
  items: string[];
}

export const StaggeredList: React.FC<StaggeredListProps> = ({ items }) => {
  const stagger = animationLibrary.stagger.normal;
  const fadeIn = animationLibrary.variants.fadeIn;
  
  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: stagger.staggerChildren,
        delayChildren: stagger.delayChildren
      }
    }
  };
  
  const itemVariants: Variants = {
    initial: fadeIn.initial,
    animate: fadeIn.animate
  };
  
  return (
    <motion.ul
      initial="initial"
      animate="animate"
      variants={containerVariants}
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          style={{
            padding: '16px',
            marginBottom: '8px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

// ============================================================================
// EXAMPLE 4: ANIMATED CARD
// ============================================================================

interface CardProps {
  title: string;
  description: string;
  image?: string;
}

export const AnimatedCard: React.FC<CardProps> = ({ title, description, image }) => {
  const cardState = animationLibrary.interactionStates.cardHover;
  const scaleIn = animationLibrary.variants.scaleIn;
  
  return (
    <motion.div
      initial={scaleIn.initial}
      animate={scaleIn.animate}
      whileHover={cardState.whileHover}
      whileTap={cardState.whileTap}
      transition={cardState.transition}
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}
    >
      {image && (
        <img 
          src={image} 
          alt={title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
        <p style={{ margin: 0, color: '#666' }}>{description}</p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 5: SLIDE-IN NOTIFICATION
// ============================================================================

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

export const SlideNotification: React.FC<NotificationProps> = ({ message, isVisible }) => {
  const slideDown = animationLibrary.variants.slideDown;
  const spring = getSpring('bouncy');
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={slideDown.initial}
      animate={slideDown.animate}
      exit={slideDown.exit}
      transition={spring}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#4CAF50',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 1000
      }}
    >
      {message}
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 6: SVG PATH ANIMATION
// ============================================================================

export const AnimatedCheckmark: React.FC<{ isComplete: boolean }> = ({ isComplete }) => {
  const checkmarkTiming = animationLibrary.svgDraw.checkmark;
  
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      style={{ overflow: 'visible' }}
    >
      <motion.path
        d="M 12 24 L 20 32 L 36 16"
        fill="none"
        stroke="#34D399"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isComplete ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          duration: checkmarkTiming.duration,
          ease: checkmarkTiming.ease
        }}
      />
    </motion.svg>
  );
};

// ============================================================================
// EXAMPLE 7: RESPONSIVE WITH REDUCED MOTION
// ============================================================================

/**
 * Hook to detect prefers-reduced-motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
};

/**
 * Accessible animated component
 */
export const AccessibleAnimatedDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scaleIn = animationLibrary.variants.scaleIn;
  const spring = getSpring('default');
  
  const transition = prefersReducedMotion 
    ? { duration: 0.01 } // Nearly instant
    : spring;
  
  const variants = prefersReducedMotion
    ? { initial: {}, animate: {} } // No animation
    : scaleIn;
  
  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 8: CUSTOM TIMING FUNCTION
// ============================================================================

/**
 * Create a custom transition with library presets
 */
export const createCustomTransition = (
  springName: keyof typeof animationLibrary.springs,
  durationOverride?: number
): Transition => {
  const spring = getSpring(springName);
  
  if (durationOverride) {
    return {
      ...spring,
      duration: durationOverride
    };
  }
  
  return spring;
};

// Usage example:
export const CustomTimingExample: React.FC = () => {
  const customTransition = createCustomTransition('bouncy', 0.5);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={customTransition}
    >
      Custom timing animation
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 9: CAMERA SUCCESS ANIMATION
// ============================================================================

export const CameraSuccessAnimation: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const timeline = animationLibrary.cameraSuccess.timeline;
  const [phase, setPhase] = React.useState<'idle' | 'recognition' | 'convergence' | 'green' | 'checkmark'>('idle');
  
  const startAnimation = () => {
    setPhase('recognition');
    
    // Recognition phase
    setTimeout(() => setPhase('convergence'), timeline.recognition.duration);
    
    // Convergence phase
    setTimeout(() => setPhase('green'), timeline.convergence.timeRange[1]);
    
    // Green phase
    setTimeout(() => setPhase('checkmark'), timeline.green.timeRange[0]);
    
    // Complete
    setTimeout(() => {
      onComplete?.();
    }, timeline.meta.duration);
  };
  
  return (
    <div>
      <button onClick={startAnimation}>Start Camera Success</button>
      <div>Current Phase: {phase}</div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 10: UTILITY TO CONVERT TO CSS
// ============================================================================

/**
 * Generate CSS transition string from library presets
 */
export const generateCSSTransition = (
  property: string = 'all',
  durationKey: keyof typeof animationLibrary.durations = 'normal',
  easingKey: keyof typeof animationLibrary.easings = 'default'
): string => {
  const duration = getDuration(durationKey);
  const easing = animationLibrary.easings[easingKey].css;
  
  return `${property} ${duration}s ${easing}`;
};

// Usage in styled component:
export const CSSAnimatedDiv = () => {
  const transition = generateCSSTransition('transform', 'fast', 'decelerate');
  
  return (
    <div
      style={{
        transition,
        transform: 'scale(1)',
        // On hover: transform: 'scale(1.05)'
      }}
    >
      CSS Animated Element
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  animationLibrary,
  getSpring,
  getDuration,
  getEasing,
  getVariant,
  generateCSSTransition
};

// Import React for JSX
import React from 'react';



