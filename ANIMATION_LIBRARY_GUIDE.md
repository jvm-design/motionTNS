# Animation Library Guide

Complete guide to using the Motion Autoya animation configuration library across different platforms and frameworks.

## 📦 What's Included

### Configuration Files

- **`src/animations-config.ts`** - TypeScript definitions with full type safety
- **`animation-library.json`** - Production-ready JSON export with metadata
- **`animation-presets.json`** - Source animation data

### Export Scripts

- **`export-animations-simple.js`** - Quick JSON export (recommended)
- **`export-animations.js`** - Advanced export with custom options

## 🚀 Quick Start

### 1. Export the Animation Library

```bash
# Quick export (recommended)
npm run export:animations

# Or run directly
node export-animations-simple.js
```

This creates `animation-library.json` with all your animation configurations.

### 2. Import in Your Project

#### React with Framer Motion

```typescript
import animations from './animation-library.json';

// Use a spring preset
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={animations.library.springs.bouncy}
/>

// Use a variant
<motion.div
  variants={animations.library.variants.liquidGlass}
  initial="initial"
  animate="animate"
/>
```

#### React Native

```javascript
import animations from './animation-library.json';
import Animated from 'react-native-reanimated';

const spring = animations.library.springs.default;

Animated.spring(animatedValue, {
  toValue: 1,
  stiffness: spring.stiffness,
  damping: spring.damping,
  mass: spring.mass,
  useNativeDriver: true
}).start();
```

#### Flutter

```dart
import 'dart:convert';
import 'package:flutter/services.dart';

// Load JSON
final String response = await rootBundle.loadString('assets/animation-library.json');
final data = await json.decode(response);

// Use duration preset
final duration = data['library']['durations']['normal']['ms'];
final controller = AnimationController(
  duration: Duration(milliseconds: duration),
  vsync: this,
);
```

#### iOS (Swift)

```swift
// Parse JSON
guard let url = Bundle.main.url(forResource: "animation-library", withExtension: "json"),
      let data = try? Data(contentsOf: url),
      let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
      let library = json["library"] as? [String: Any],
      let springs = library["springs"] as? [String: Any],
      let bouncy = springs["bouncy"] as? [String: Any] else {
    return
}

// Create spring animation
let animation = CASpringAnimation(keyPath: "position")
animation.damping = bouncy["damping"] as! CGFloat
animation.stiffness = bouncy["stiffness"] as! CGFloat
animation.mass = bouncy["mass"] as! CGFloat
```

#### Android (Kotlin)

```kotlin
import org.json.JSONObject

// Parse JSON
val json = JSONObject(assets.open("animation-library.json").bufferedReader().use { it.readText() })
val library = json.getJSONObject("library")
val durations = library.getJSONObject("durations")
val normalDuration = durations.getJSONObject("normal").getInt("ms")

// Create animator
val animator = ObjectAnimator.ofFloat(view, "translationY", 0f, 100f)
animator.duration = normalDuration.toLong()
```

#### CSS/Web

```javascript
import animations from './animation-library.json';

// Get easing function
const easing = animations.library.easings.default.css;
const duration = animations.library.durations.normal.value;

// Apply as CSS
element.style.transition = `transform ${duration}s ${easing}`;
```

## 📚 Library Structure

### Springs
Physics-based spring animations for natural, organic motion.

```typescript
{
  default: { stiffness: 380, damping: 30, mass: 0.8 },
  bouncy: { stiffness: 300, damping: 20, mass: 0.8 },
  stiff: { stiffness: 500, damping: 35, mass: 0.5 },
  gentle: { stiffness: 200, damping: 30, mass: 1.0 },
  wobbly: { stiffness: 250, damping: 15, mass: 1.0 },
  cameraSpring: { stiffness: 340, damping: 28, mass: 0.7 }
}
```

**Use Cases:**
- `default` - General UI animations, modals, cards
- `bouncy` - Button presses, toggles, interactive feedback
- `stiff` - Hover effects, tooltips, quick interactions
- `gentle` - Large movements, sheets, drawers
- `wobbly` - Success celebrations, playful UI
- `cameraSpring` - Camera animations, synchronized motion

### Durations
Time-based duration presets in seconds and milliseconds.

```typescript
{
  instant: 0.1s (100ms),
  quick: 0.2s (200ms),
  fast: 0.3s (300ms),
  normal: 0.4s (400ms),
  slow: 0.6s (600ms),
  slower: 0.8s (800ms),
  camera: 0.7s (700ms),
  premium: 1.5s (1500ms)
}
```

### Easings
Cubic-bezier easing functions with CSS equivalents.

```typescript
{
  default: [0.4, 0.0, 0.2, 1.0],
  decelerate: [0.0, 0.0, 0.2, 1.0],
  accelerate: [0.4, 0.0, 1.0, 1.0],
  sharp: [0.4, 0.0, 0.6, 1.0],
  emphasis: [0.4, 0.0, 0.2, 1.0],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94]
}
```

### Variants
Pre-configured animation states for Framer Motion.

```typescript
{
  fadeIn: { initial, animate, exit },
  scaleIn: { initial, animate, exit },
  liquidGlass: { initial, animate, exit, transition },
  slideUp: { initial, animate, exit },
  slideDown: { initial, animate, exit },
  slideLeft: { initial, animate, exit },
  slideRight: { initial, animate, exit },
  expand: { initial, animate, exit },
  blurIn: { initial, animate, exit }
}
```

### Interaction States
Hover and tap configurations for interactive elements.

```typescript
{
  subtleHover: { whileHover, whileTap, transition },
  buttonHover: { whileHover, whileTap, transition },
  iconHover: { whileHover, whileTap, transition },
  cardHover: { whileHover, whileTap, transition }
}
```

### Stagger Patterns
Timing for sequential animations.

```typescript
{
  fast: { staggerChildren: 0.03, delayChildren: 0 },
  normal: { staggerChildren: 0.05, delayChildren: 0 },
  slow: { staggerChildren: 0.1, delayChildren: 0 },
  withDelay: { staggerChildren: 0.05, delayChildren: 0.2 },
  convergence: { staggerChildren: 0.02, delayChildren: 0 }
}
```

### SVG Drawing
Path animation configurations.

```typescript
{
  fast: { duration: 1, ease: [0.0, 0.0, 0.2, 1.0] },
  normal: { duration: 1.5, ease: [0.0, 0.0, 0.2, 1.0] },
  slow: { duration: 2.5, ease: [0.0, 0.0, 0.2, 1.0] },
  checkmark: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
}
```

## 🎯 Complete Examples

### Example 1: Button with Spring Animation (React)

```typescript
import { motion } from 'framer-motion';
import animations from './animation-library.json';

const Button = () => {
  const buttonAnimation = animations.library.interactionStates.buttonHover;
  
  return (
    <motion.button
      whileHover={buttonAnimation.whileHover}
      whileTap={buttonAnimation.whileTap}
      transition={buttonAnimation.transition}
    >
      Click Me
    </motion.button>
  );
};
```

### Example 2: Modal with Liquid Glass Effect

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import animations from './animation-library.json';

const Modal = ({ isOpen, children }) => {
  const variant = animations.library.variants.liquidGlass;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={variant.transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

### Example 3: Staggered List Animation

```typescript
import { motion } from 'framer-motion';
import animations from './animation-library.json';

const List = ({ items }) => {
  const stagger = animations.library.stagger.normal;
  const fadeIn = animations.library.variants.fadeIn;
  
  return (
    <motion.ul
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: stagger } }}
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={fadeIn}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};
```

### Example 4: Success Animation Timeline

```typescript
import animations from './animation-library.json';

// Access the camera success animation timeline
const timeline = animations.library.cameraSuccess.timeline;

// Use frame ranges for precise timing
const recognitionDuration = timeline.recognition.duration; // 183ms
const convergenceDuration = timeline.convergence.duration; // 117ms

// Implement the animation sequence
const playSuccessAnimation = () => {
  // Phase 1: Recognition (0-183ms)
  setTimeout(() => {
    // Phase 2: Convergence (183-300ms)
    animateConvergence();
  }, recognitionDuration);
  
  setTimeout(() => {
    // Phase 3: Green transformation (350-533ms)
    animateGreen();
  }, timeline.green.timeRange[0]);
  
  setTimeout(() => {
    // Phase 4: Checkmark (533-700ms)
    drawCheckmark();
  }, timeline.checkmark.timeRange[0]);
};
```

## 🎨 Apple Motion Principles

The library follows Apple's core motion principles:

### Responsive
Motion feels immediate and connected to user interaction.
- Use spring physics
- Stiffness: 300-400
- Damping: 25-35

### Fluid
Animations flow smoothly without abrupt starts/stops.
- Enable interruptible animations
- Preserve velocity on interruption
- Avoid sudden stops

### Contextual
Every animation has a clear purpose.
- Entry: scale 0.95 → 1.0 with fade
- Exit: scale 1.0 → 0.95 with fade
- Duration: 300-600ms

### Subtle
Noticeable but not distracting.
- Scale range: 0.95 - 1.05
- Blur range: 0 - 20px
- Opacity range: 0.8 - 1.0

### Spatial
Respect spatial relationships.
- Directional awareness
- Curved motion paths
- Parallax effects

## ⚡ Performance Tips

### Use GPU-Accelerated Properties
✅ **Preferred:**
- `transform`
- `opacity`
- `filter`

❌ **Avoid:**
- `width`, `height`
- `margin`, `padding`
- `color`, `background`
- `border`

### Accessibility

```typescript
// Respect prefers-reduced-motion
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const transition = shouldReduceMotion 
  ? { duration: 0.01 } 
  : animations.library.springs.default;
```

## 🛠️ Customization

### Creating Custom Presets

```typescript
// animations-config.ts
import { animationLibrary } from './animations-config';

export const customAnimations = {
  ...animationLibrary,
  springs: {
    ...animationLibrary.springs,
    myCustomSpring: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
      mass: 0.9,
      description: 'My custom spring animation'
    }
  }
};
```

### Exporting Custom Library

```javascript
import fs from 'fs';
import { customAnimations } from './animations-config';

fs.writeFileSync(
  'custom-animation-library.json',
  JSON.stringify(customAnimations, null, 2)
);
```

## 📖 Additional Resources

- **Frame Viewer**: Open `frame-viewer.html` to see animations in action
- **Animation Presets Guide**: See `ANIMATION_PRESETS_GUIDE.md`
- **Liquid Glass Guide**: See `LIQUID_GLASS_SUMMARY.md`
- **Apple Motion Principles**: See `APPLE_MOTION_PRINCIPLES.md`

## 🤝 Contributing

To add new animations to the library:

1. Edit `src/animations-config.ts`
2. Add your animation configuration
3. Run `npm run export:animations`
4. Test with your framework
5. Document use cases and examples

## 📝 License

See LICENSE file for details.

---

**Motion Autoya** - Premium animation library based on Apple's motion principles.



