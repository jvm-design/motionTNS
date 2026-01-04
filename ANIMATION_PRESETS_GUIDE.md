# Animation Presets - Usage Guide

Complete guide for using the Motion Autoya animation preset library across different platforms and frameworks.

## 📦 Files Created

1. **`animation-presets.json`** - Complete JSON export ready for any platform
2. **`src/utils/animationPresets.ts`** - TypeScript/React implementation  
3. **`export-animation-presets.js`** - Node.js script for custom exports

---

## 🚀 Quick Start

### Option 1: Use JSON Directly
```javascript
import presets from './animation-presets.json';

const spring = presets.springs.bouncy;
// { type: "spring", stiffness: 300, damping: 20, mass: 0.8 }
```

### Option 2: Import TypeScript Module
```typescript
import { springs, variants, easings } from '@/utils/animationPresets';

// Use with Framer Motion
<motion.div
  initial={variants.liquidGlass.initial}
  animate={variants.liquidGlass.animate}
  transition={springs.bouncy}
/>
```

### Option 3: Export Custom JSON
```bash
node export-animation-presets.js > my-presets.json
```

---

## 🎨 Framer Motion (React)

### Basic Usage

```tsx
import { motion } from 'framer-motion';
import { springs, variants } from '@/utils/animationPresets';

export const MyComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.default}
    >
      Content
    </motion.div>
  );
};
```

### Using Variants

```tsx
import { motion } from 'framer-motion';
import { variants, springs } from '@/utils/animationPresets';

export const Modal = () => {
  return (
    <motion.div
      {...variants.scaleIn}
      transition={springs.gentle}
    >
      Modal Content
    </motion.div>
  );
};
```

### Interactive Elements

```tsx
import { motion } from 'framer-motion';
import { interactionStates } from '@/utils/animationPresets';

export const Button = () => {
  return (
    <motion.button
      {...interactionStates.buttonHover}
    >
      Click Me
    </motion.button>
  );
};
```

### List Animations with Stagger

```tsx
import { motion } from 'framer-motion';
import { stagger, variants, springs } from '@/utils/animationPresets';

const container = {
  animate: { transition: stagger.normal }
};

export const List = ({ items }) => {
  return (
    <motion.ul variants={container} animate="animate">
      {items.map((item) => (
        <motion.li
          key={item.id}
          {...variants.fadeIn}
          transition={springs.stiff}
        >
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
};
```

---

## ⚛️ React Native

```tsx
import { Animated } from 'react-native';
import presets from './animation-presets.json';

const animatedValue = new Animated.Value(0);

// Using spring preset
Animated.spring(animatedValue, {
  toValue: 1,
  stiffness: presets.springs.bouncy.stiffness,
  damping: presets.springs.bouncy.damping,
  mass: presets.springs.bouncy.mass,
  useNativeDriver: true,
}).start();

// Using duration preset
Animated.timing(animatedValue, {
  toValue: 1,
  duration: presets.durations.normal * 1000, // Convert to ms
  easing: Easing.bezier(...presets.easings.default.bezier),
  useNativeDriver: true,
}).start();
```

---

## 🎯 Flutter

```dart
import 'package:flutter/material.dart';
import 'dart:convert';

// Load presets from JSON
final presets = json.decode(presetsJsonString);

// Create animation controller
AnimationController controller = AnimationController(
  duration: Duration(
    milliseconds: (presets['durations']['camera'] * 1000).toInt()
  ),
  vsync: this,
);

// Create spring simulation
final spring = SpringSimulation(
  SpringDescription(
    mass: presets['springs']['bouncy']['mass'],
    stiffness: presets['springs']['bouncy']['stiffness'],
    damping: presets['springs']['bouncy']['damping'],
  ),
  0.0, // start
  1.0, // end
  0.0, // velocity
);

controller.animateWith(spring);
```

### Camera Success Animation (Flutter)

```dart
// Using the camera success timeline
final timeline = presets['cameraSuccessTimeline'];

AnimationController _controller = AnimationController(
  duration: Duration(milliseconds: timeline['meta']['duration']),
  vsync: this,
);

// Recognition stage
final recognitionEnd = timeline['recognition']['duration'] / timeline['meta']['duration'];

// Convergence stage  
final convergenceEnd = timeline['convergence']['timeRange'][1] / timeline['meta']['duration'];

Animation<double> _convergence = Tween<double>(
  begin: 0.0,
  end: 1.0,
).animate(CurvedAnimation(
  parent: _controller,
  curve: Interval(recognitionEnd, convergenceEnd, curve: Curves.easeOut),
));
```

---

## 🍎 iOS (Swift)

```swift
import UIKit

// Load presets from JSON
guard let url = Bundle.main.url(forResource: "animation-presets", withExtension: "json"),
      let data = try? Data(contentsOf: url),
      let presets = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
    return
}

// Using spring animation
if let springs = presets["springs"] as? [String: Any],
   let bouncy = springs["bouncy"] as? [String: Any] {
    
    let animation = CASpringAnimation(keyPath: "transform.scale")
    animation.damping = bouncy["damping"] as! CGFloat
    animation.stiffness = bouncy["stiffness"] as! CGFloat
    animation.mass = bouncy["mass"] as! CGFloat
    animation.fromValue = 0.8
    animation.toValue = 1.0
    animation.duration = animation.settlingDuration
    
    view.layer.add(animation, forKey: "scale")
}

// Using cubic-bezier easing
if let easings = presets["easings"] as? [String: Any],
   let defaultEasing = easings["default"] as? [String: Any],
   let bezier = defaultEasing["bezier"] as? [CGFloat] {
    
    let timing = CAMediaTimingFunction(
        controlPoints: Float(bezier[0]),
                      Float(bezier[1]),
                      Float(bezier[2]),
                      Float(bezier[3])
    )
    
    let animation = CABasicAnimation(keyPath: "opacity")
    animation.timingFunction = timing
    animation.duration = 0.4
    animation.fromValue = 0
    animation.toValue = 1
    
    view.layer.add(animation, forKey: "fade")
}
```

---

## 🤖 Android (Kotlin)

```kotlin
import android.animation.ObjectAnimator
import android.view.View
import android.view.animation.PathInterpolator
import org.json.JSONObject

// Load presets
val presetsJson = assets.open("animation-presets.json").bufferedReader().use { it.readText() }
val presets = JSONObject(presetsJson)

// Using duration preset
val durations = presets.getJSONObject("durations")
val normalDuration = (durations.getDouble("normal") * 1000).toLong()

val animator = ObjectAnimator.ofFloat(view, "alpha", 0f, 1f)
animator.duration = normalDuration

// Using cubic-bezier easing
val easings = presets.getJSONObject("easings")
val defaultEasing = easings.getJSONObject("default")
val bezier = defaultEasing.getJSONArray("bezier")

val interpolator = PathInterpolator(
    bezier.getDouble(0).toFloat(),
    bezier.getDouble(1).toFloat(),
    bezier.getDouble(2).toFloat(),
    bezier.getDouble(3).toFloat()
)
animator.interpolator = interpolator
animator.start()

// Spring animation (using AndroidX)
val springAnim = SpringAnimation(view, DynamicAnimation.SCALE_X, 1f)
val springs = presets.getJSONObject("springs")
val bouncy = springs.getJSONObject("bouncy")

springAnim.spring.stiffness = bouncy.getDouble("stiffness").toFloat()
springAnim.spring.dampingRatio = bouncy.getDouble("damping").toFloat()
springAnim.start()
```

---

## 🌐 Web (CSS)

```css
/* Using easing presets */
.fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0.0, 0.2, 1.0);
}

.slide-up {
  animation: slideUp 0.4s cubic-bezier(0.0, 0.0, 0.2, 1.0);
}

/* Button hover - bouncy spring approximation */
.button {
  transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1.0);
}

.button:hover {
  transform: scale(1.05) translateY(-2px);
}

.button:active {
  transform: scale(0.95);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(100%);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

### JavaScript with Web Animations API

```javascript
import presets from './animation-presets.json';

const element = document.querySelector('.my-element');

// Using spring (approximated with easing)
element.animate(
  [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  {
    duration: presets.durations.normal * 1000,
    easing: `cubic-bezier(${presets.easings.default.bezier.join(',')})`,
    fill: 'forwards'
  }
);
```

---

## 🎬 GSAP

```javascript
import gsap from 'gsap';
import presets from './animation-presets.json';

// Using duration and easing presets
gsap.to('.element', {
  opacity: 1,
  scale: 1,
  duration: presets.durations.normal,
  ease: `cubic-bezier(${presets.easings.default.bezier.join(',')})`,
});

// Using GSAP config
gsap.to('.morphing-shape', {
  morphSVG: '.target-shape',
  ...presets.gsapConfig.morphSmooth,
});

// Camera success animation
const timeline = gsap.timeline();
const ct = presets.cameraSuccessTimeline;

timeline
  .to('.logo', {
    duration: ct.recognition.duration / 1000,
  })
  .to('.shapes', {
    scale: 0,
    opacity: 0,
    duration: ct.convergence.duration / 1000,
    stagger: ct.convergence.stagger,
    ease: 'power2.out',
  })
  .to('.circle', {
    background: presets.colors.success.solid,
    duration: ct.green.duration / 1000,
  })
  .to('.checkmark', {
    strokeDashoffset: 0,
    duration: ct.checkmark.duration / 1000,
  });
```

---

## 📱 Camera Success Animation Implementation

### Full React Example

```tsx
import { motion } from 'framer-motion';
import { cameraSuccessTimeline, colors } from '@/utils/animationPresets';

export const CameraSuccessAnimation = () => {
  const { meta, recognition, convergence, green, checkmark } = cameraSuccessTimeline;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: recognition.duration / 1000 }}
    >
      {/* Convergence animation */}
      <motion.svg
        animate={{ scale: [1, 0.55], opacity: [1, 0] }}
        transition={{
          duration: convergence.duration / 1000,
          delay: recognition.duration / 1000,
          ease: [0.22, 0.61, 0.36, 1.0],
        }}
      >
        {/* SVG shapes */}
      </motion.svg>
      
      {/* Green pulse */}
      <motion.circle
        animate={{
          scale: [1, 1.1, 1],
          fill: colors.success.solid,
        }}
        transition={{
          duration: green.duration / 1000,
          delay: (recognition.duration + convergence.duration) / 1000,
        }}
      />
      
      {/* Checkmark */}
      <motion.path
        d="M 26.5 30.5 L 28.5 32.8 L 32 28.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: checkmark.duration / 1000,
          delay: (recognition.duration + convergence.duration + green.duration) / 1000,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
    </motion.div>
  );
};
```

---

## 🎯 Best Practices

### 1. Choose the Right Spring

```typescript
// Quick, immediate feedback
springs.stiff       // Buttons, toggles, quick interactions

// Standard, balanced
springs.default     // Cards, modals, general UI

// Smooth, large movements  
springs.gentle      // Drawers, sheets, page transitions

// Playful, energetic
springs.bouncy      // Decorative elements, success states

// Camera sync
springs.cameraSpring // Photo confirmations, camera UI
```

### 2. Timing Guidelines

```typescript
// 100-200ms: Instant feedback
durations.quick     // Hover states, toggles

// 300-400ms: Standard transitions
durations.normal    // Modals, dropdowns, cards

// 600-800ms: Elaborate animations
durations.slow      // Complex state changes

// 1000-2000ms: Premium moments
durations.premium   // Onboarding, success confirmations
```

### 3. Accessibility

```typescript
import { useReducedMotion } from 'framer-motion';

const MyComponent = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={
        shouldReduceMotion 
          ? { duration: 0 } 
          : springs.default
      }
    />
  );
};
```

### 4. Performance

```typescript
// ✅ Good - GPU accelerated
animate={{ opacity: 1, scale: 1, x: 100 }}

// ❌ Bad - Layout thrashing
animate={{ width: '100%', height: 200 }}

// Use transform instead
animate={{ scaleX: 2, translateY: 50 }}
```

---

## 📊 Preset Reference

### Spring Types

| Preset | Stiffness | Damping | Mass | Use Case |
|--------|-----------|---------|------|----------|
| `stiff` | 500 | 35 | 0.5 | Quick interactions |
| `default` | 380 | 30 | 0.8 | General UI |
| `bouncy` | 300 | 20 | 0.8 | Playful elements |
| `gentle` | 200 | 30 | 1.0 | Large movements |
| `wobbly` | 250 | 15 | 1.0 | Decorative |
| `cameraSpring` | 340 | 28 | 0.7 | Camera sync |

### Duration Types

| Preset | Value (s) | Use Case |
|--------|-----------|----------|
| `instant` | 0.1 | Immediate feedback |
| `quick` | 0.2 | Hover states |
| `fast` | 0.3 | Quick transitions |
| `normal` | 0.4 | Standard UI |
| `slow` | 0.6 | Emphasis |
| `slower` | 0.8 | Complex changes |
| `camera` | 0.7 | Camera success |
| `premium` | 1.5 | Branded moments |

---

## 🔧 Customization

### Creating Custom Presets

```typescript
// In your project
import { springs } from '@/utils/animationPresets';

export const customSprings = {
  ...springs,
  
  // Add your own
  ultraBouncy: {
    type: "spring" as const,
    stiffness: 200,
    damping: 10,
    mass: 1.2,
  },
};
```

### Modifying Existing Presets

```typescript
import { springs } from '@/utils/animationPresets';

// Make it bouncier
const mySpring = {
  ...springs.default,
  damping: springs.default.damping - 5,
};
```

---

## 📚 Resources

- **Apple HIG Motion**: https://developer.apple.com/design/human-interface-guidelines/motion
- **Framer Motion Docs**: https://www.framer.com/motion/
- **Material Motion**: https://material.io/design/motion/

---

## 🎉 Examples in This Project

Check these files for real implementations:
- `src/components/SVGAnimations/AutoyaLogoFrameControlled.tsx` - Camera success animation
- `src/utils/motionConfig.ts` - Original preset definitions
- `autoya-animation-spec.json` - Full animation specification
- `motion-studio-animation-spec.json` - Camera sync timing

---

**Happy Animating! ✨**



