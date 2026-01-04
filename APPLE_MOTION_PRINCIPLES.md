# Apple Motion Principles

This document outlines the core motion principles used by Apple, which we implement in our animation system.

## Core Principles

### 1. **Responsive & Natural**
Motion should feel immediate and connected to user interaction. The system responds instantly to input, creating a sense of direct manipulation.

**Implementation:**
- Spring-based animations (not linear)
- Stiffness: 300-400
- Damping: 25-35
- Mass: 0.5-1.0

### 2. **Fluid & Continuous**
Animations should flow smoothly without abrupt starts or stops. Interruptions should be handled gracefully.

**Implementation:**
- Spring physics that can be interrupted mid-animation
- Smooth velocity preservation when interrupted
- Avoid sudden stops or starts

### 3. **Contextual & Purposeful**
Every animation should have a clear purpose and provide meaningful feedback. Motion guides attention and communicates relationships.

**Implementation:**
- Entry animations: Scale + Fade (0.95 → 1.0, 0 → 1)
- Exit animations: Scale + Fade (1.0 → 0.95, 1 → 0)
- Duration: 0.3-0.6s for most transitions

### 4. **Subtle & Refined**
Animations should be noticeable but not distracting. The movement should feel natural, as if governed by physics.

**Implementation:**
- Small scale changes (0.95-1.05 range)
- Blur for depth perception (0-20px)
- Subtle opacity changes (0.8-1.0 for hover states)

### 5. **Spatial Awareness**
Motion should respect spatial relationships and maintain orientation. Elements should move along meaningful paths.

**Implementation:**
- Directional awareness (elements move toward their trigger)
- Curved paths for natural movement
- Parallax for depth
- Transform-origin based on interaction point

## Animation Timing Reference

### Quick Interactions (100-200ms)
- Button hover states
- Toggle switches
- Radio/checkbox selections
- Tooltip appearances

### Standard Transitions (300-400ms)
- Modal open/close
- Dropdown menus
- Card expansions
- Page transitions

### Elaborate Animations (500-800ms)
- Complex state changes
- Multi-step sequences
- Decorative animations
- Onboarding flows

## Easing Functions

Apple primarily uses spring-based animations, but when using cubic-bezier:

```
Default: cubic-bezier(0.4, 0.0, 0.2, 1.0)
Deceleration: cubic-bezier(0.0, 0.0, 0.2, 1.0)
Acceleration: cubic-bezier(0.4, 0.0, 1.0, 1.0)
Sharp: cubic-bezier(0.4, 0.0, 0.6, 1.0)
```

## Spring Animation Parameters

```typescript
// Default Spring
{ stiffness: 380, damping: 30, mass: 0.8 }

// Bouncy (for playful elements)
{ stiffness: 300, damping: 20, mass: 0.8 }

// Stiff (for quick, responsive elements)
{ stiffness: 500, damping: 35, mass: 0.5 }

// Gentle (for large movements)
{ stiffness: 200, damping: 30, mass: 1.0 }
```

## Do's and Don'ts

### ✅ Do
- Use spring physics for natural motion
- Respect user's motion preferences (prefers-reduced-motion)
- Keep animations performant (use transform and opacity)
- Test on actual devices
- Interrupt animations gracefully

### ❌ Don't
- Use linear easing
- Animate width/height/top/left (use transform instead)
- Create long, elaborate animations for common actions
- Stack too many animations simultaneously
- Ignore accessibility preferences

## Performance Optimization

### GPU-Accelerated Properties
Only animate these for best performance:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness, etc.)

### Avoid
- Layout-triggering properties (width, height, margin, padding)
- Paint-triggering properties (color, background, border)

## Implementation Examples

### Entry Animation (Modal/Card)
```typescript
{
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { 
    type: "spring",
    stiffness: 380,
    damping: 30
  }
}
```

### Hover State (Button/Interactive)
```typescript
{
  whileHover: { 
    scale: 1.02,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  whileTap: { 
    scale: 0.98
  }
}
```

### Stagger Children (List)
```typescript
{
  animate: "visible",
  variants: {
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }
}
```






