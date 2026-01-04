/**
 * React Native Animation Player
 * 
 * Universal animation player that consumes the animation-library.json
 * and applies animations using react-native-reanimated.
 * 
 * Usage:
 *   <AnimationPlayer preset="liquidGlass">
 *     <Text>Animated Content</Text>
 *   </AnimationPlayer>
 */

import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  SharedValue,
} from 'react-native-reanimated';
import animationLibrary from '../../animation-library.json';

// ============================================================================
// TYPES
// ============================================================================

type AnimationLibrary = typeof animationLibrary.library;
type SpringPreset = keyof AnimationLibrary['springs'];
type VariantPreset = keyof AnimationLibrary['variants'];
type DurationPreset = keyof AnimationLibrary['durations'];
type EasingPreset = keyof AnimationLibrary['easings'];

interface AnimationPlayerProps {
  children: React.ReactNode;
  preset?: VariantPreset;
  spring?: SpringPreset;
  duration?: DurationPreset;
  easing?: EasingPreset;
  custom?: Partial<AnimatedStyleValue>;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  onComplete?: () => void;
}

interface AnimatedStyleValue {
  opacity?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
  rotate?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert library spring config to React Native Reanimated spring config
 */
const getSpringConfig = (springName: SpringPreset) => {
  const spring = animationLibrary.library.springs[springName];
  return {
    stiffness: spring.stiffness,
    damping: spring.damping,
    mass: spring.mass,
  };
};

/**
 * Convert library easing to React Native Easing
 */
const getEasing = (easingName: EasingPreset): Easing.EasingFunction => {
  const bezier = animationLibrary.library.easings[easingName].bezier;
  return Easing.bezier(bezier[0], bezier[1], bezier[2], bezier[3]);
};

/**
 * Get duration in milliseconds
 */
const getDuration = (durationName: DurationPreset): number => {
  return animationLibrary.library.durations[durationName].ms;
};

/**
 * Parse filter values (for blur effects)
 */
const parseFilter = (filter: string): number => {
  const match = filter.match(/blur\((\d+)px\)/);
  return match ? parseInt(match[1], 10) : 0;
};

// ============================================================================
// ANIMATION PLAYER COMPONENT
// ============================================================================

export const AnimationPlayer: React.FC<AnimationPlayerProps> = ({
  children,
  preset,
  spring = 'default',
  duration = 'normal',
  easing = 'default',
  custom,
  style,
  delay = 0,
  onComplete,
}) => {
  // Shared values for animation
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  // Get configuration
  const springConfig = getSpringConfig(spring);
  const durationMs = getDuration(duration);
  const easingFn = getEasing(easing);

  useEffect(() => {
    let animationConfig: any;

    if (preset) {
      // Use preset variant
      const variant = animationLibrary.library.variants[preset];
      
      // Set initial values
      if ('opacity' in variant.initial) {
        opacity.value = variant.initial.opacity as number;
      }
      if ('scale' in variant.initial) {
        scale.value = variant.initial.scale as number;
      }
      if ('x' in variant.initial) {
        translateX.value = typeof variant.initial.x === 'string' 
          ? parseFloat(variant.initial.x) 
          : variant.initial.x as number;
      }
      if ('y' in variant.initial) {
        translateY.value = typeof variant.initial.y === 'string'
          ? parseFloat(variant.initial.y)
          : variant.initial.y as number;
      }

      // Determine animation type (spring or timing)
      const useSpring = variant.transition && 'type' in variant.transition 
        && variant.transition.type === 'spring';

      // Animate to target values
      const animateValue = (
        value: SharedValue<number>,
        target: number,
        callback?: () => void
      ) => {
        if (useSpring) {
          const customSpring = variant.transition as any;
          value.value = withDelay(
            delay,
            withSpring(target, {
              stiffness: customSpring.stiffness || springConfig.stiffness,
              damping: customSpring.damping || springConfig.damping,
              mass: customSpring.mass || springConfig.mass,
            }, callback)
          );
        } else {
          value.value = withDelay(
            delay,
            withTiming(target, {
              duration: durationMs,
              easing: easingFn,
            }, callback)
          );
        }
      };

      // Animate each property
      if ('opacity' in variant.animate) {
        animateValue(opacity, variant.animate.opacity as number);
      }
      if ('scale' in variant.animate) {
        animateValue(scale, variant.animate.scale as number);
      }
      if ('x' in variant.animate) {
        const targetX = typeof variant.animate.x === 'string'
          ? parseFloat(variant.animate.x)
          : variant.animate.x as number;
        animateValue(translateX, targetX);
      }
      if ('y' in variant.animate) {
        const targetY = typeof variant.animate.y === 'string'
          ? parseFloat(variant.animate.y)
          : variant.animate.y as number;
        animateValue(translateY, targetY, onComplete);
      }
      if ('rotate' in variant.animate) {
        const targetRotate = typeof variant.animate.rotate === 'string'
          ? parseFloat(variant.animate.rotate)
          : variant.animate.rotate as number;
        animateValue(rotate, targetRotate);
      }
    } else if (custom) {
      // Use custom animation values
      if (custom.opacity !== undefined) {
        opacity.value = withSpring(custom.opacity, springConfig);
      }
      if (custom.scale !== undefined) {
        scale.value = withSpring(custom.scale, springConfig);
      }
      if (custom.translateX !== undefined) {
        translateX.value = withSpring(custom.translateX, springConfig);
      }
      if (custom.translateY !== undefined) {
        translateY.value = withSpring(custom.translateY, springConfig);
      }
    }
  }, [preset, custom, spring, duration, easing, delay]);

  // Create animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

// ============================================================================
// SPECIALIZED COMPONENTS
// ============================================================================

/**
 * Spring-based animated view
 */
export const SpringView: React.FC<{
  children: React.ReactNode;
  spring?: SpringPreset;
  from?: Partial<AnimatedStyleValue>;
  to?: Partial<AnimatedStyleValue>;
  style?: StyleProp<ViewStyle>;
}> = ({ children, spring = 'default', from = {}, to = {}, style }) => {
  const opacity = useSharedValue(from.opacity ?? 1);
  const scale = useSharedValue(from.scale ?? 1);

  const springConfig = getSpringConfig(spring);

  useEffect(() => {
    if (to.opacity !== undefined) {
      opacity.value = withSpring(to.opacity, springConfig);
    }
    if (to.scale !== undefined) {
      scale.value = withSpring(to.scale, springConfig);
    }
  }, [to]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

/**
 * Fade-in component
 */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  duration?: DurationPreset;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ children, duration = 'normal', delay = 0, style }) => {
  return (
    <AnimationPlayer 
      preset="fadeIn" 
      duration={duration}
      delay={delay}
      style={style}
    >
      {children}
    </AnimationPlayer>
  );
};

/**
 * Scale-in component (for modals, cards)
 */
export const ScaleIn: React.FC<{
  children: React.ReactNode;
  spring?: SpringPreset;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ children, spring = 'default', delay = 0, style }) => {
  return (
    <AnimationPlayer 
      preset="scaleIn" 
      spring={spring}
      delay={delay}
      style={style}
    >
      {children}
    </AnimationPlayer>
  );
};

/**
 * Slide from bottom (sheets, drawers)
 */
export const SlideUp: React.FC<{
  children: React.ReactNode;
  spring?: SpringPreset;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ children, spring = 'gentle', delay = 0, style }) => {
  return (
    <AnimationPlayer 
      preset="slideUp" 
      spring={spring}
      delay={delay}
      style={style}
    >
      {children}
    </AnimationPlayer>
  );
};

/**
 * Liquid glass effect (premium entrance)
 */
export const LiquidGlass: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ children, delay = 0, style }) => {
  return (
    <AnimationPlayer 
      preset="liquidGlass" 
      spring="bouncy"
      delay={delay}
      style={style}
    >
      {children}
    </AnimationPlayer>
  );
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to create animated value with spring
 */
export const useSpringAnimation = (
  initialValue: number,
  springPreset: SpringPreset = 'default'
) => {
  const value = useSharedValue(initialValue);
  const config = getSpringConfig(springPreset);

  const animate = (toValue: number, onComplete?: () => void) => {
    value.value = withSpring(toValue, config, onComplete);
  };

  return { value, animate };
};

/**
 * Hook to create animated value with timing
 */
export const useTimingAnimation = (
  initialValue: number,
  durationPreset: DurationPreset = 'normal',
  easingPreset: EasingPreset = 'default'
) => {
  const value = useSharedValue(initialValue);
  const duration = getDuration(durationPreset);
  const easing = getEasing(easingPreset);

  const animate = (toValue: number, onComplete?: () => void) => {
    value.value = withTiming(toValue, { duration, easing }, onComplete);
  };

  return { value, animate };
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  getSpringConfig,
  getEasing,
  getDuration,
};

export type {
  AnimationPlayerProps,
  SpringPreset,
  VariantPreset,
  DurationPreset,
  EasingPreset,
};



