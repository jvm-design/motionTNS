/**
 * Accessibility utilities for respecting user motion preferences
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get safe animation config based on user preference
export const getSafeTransition = (transition: any) => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 }; // Nearly instant, but not jarring
  }
  return transition;
};

// Create a reduced motion variant
export const createAccessibleVariant = (normalVariant: any, reducedVariant?: any) => {
  if (prefersReducedMotion()) {
    return reducedVariant || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    };
  }
  return normalVariant;
};

// Hook to listen for motion preference changes
export const useMotionPreference = () => {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const [reducedMotion, setReducedMotion] = React.useState(mediaQuery.matches);

  React.useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
};

// Safe animation wrapper
export const withAccessibleMotion = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const reducedMotion = prefersReducedMotion();
    
    return (
      <Component
        {...props}
        transition={getSafeTransition(props.transition)}
        reducedMotion={reducedMotion}
      />
    );
  };
};

import * as React from 'react';






