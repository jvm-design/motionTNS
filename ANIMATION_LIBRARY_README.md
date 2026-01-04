# 🎨 Motion Autoya Animation Library

A complete, production-ready animation configuration system based on Apple's Motion Principles. Export to JSON and use across any platform or framework.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Platforms](https://img.shields.io/badge/platforms-React%20%7C%20React%20Native%20%7C%20Flutter%20%7C%20iOS%20%7C%20Android%20%7C%20Web-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## ✨ Features

- 🍎 **Apple Motion Principles** - Based on iOS and macOS animation standards
- 🎯 **Type-Safe** - Full TypeScript support with intellisense
- 📦 **JSON Export** - Use in any framework or language
- ⚡ **Performance Optimized** - GPU-accelerated transforms only
- ♿ **Accessible** - Respects `prefers-reduced-motion`
- 🎨 **6 Spring Configs** - Physics-based natural motion
- ⏱️ **8 Duration Presets** - Consistent timing across your app
- 🎭 **9 Animation Variants** - Pre-configured entrance/exit animations
- 🖱️ **4 Interaction States** - Hover, tap, and press animations

## 🚀 Quick Start

### 1. Export the Library

```bash
npm run export:animations
```

This creates `animation-library.json` with all configurations.

### 2. Import and Use

#### React with Framer Motion

```tsx
import { motion } from 'framer-motion';
import animations from './animation-library.json';

const { springs, variants } = animations.library;

export const MyComponent = () => (
  <motion.div
    initial={variants.liquidGlass.initial}
    animate={variants.liquidGlass.animate}
    transition={springs.bouncy}
  >
    Hello, World!
  </motion.div>
);
```

#### React Native

```javascript
import Animated from 'react-native-reanimated';
import animations from './animation-library.json';

const { stiffness, damping, mass } = animations.library.springs.default;

Animated.spring(animatedValue, {
  toValue: 1,
  stiffness,
  damping,
  mass,
  useNativeDriver: true
}).start();
```

#### CSS / Web

```javascript
import animations from './animation-library.json';

const { easings, durations } = animations.library;
const transition = `transform ${durations.normal.value}s ${easings.default.css}`;

element.style.transition = transition;
```

## 📚 What's Included

### Spring Physics

Natural, organic motion using spring-mass-damper physics:

```typescript
springs: {
  default:      { stiffness: 380, damping: 30, mass: 0.8 }  // Balanced
  bouncy:       { stiffness: 300, damping: 20, mass: 0.8 }  // Playful
  stiff:        { stiffness: 500, damping: 35, mass: 0.5 }  // Quick
  gentle:       { stiffness: 200, damping: 30, mass: 1.0 }  // Smooth
  wobbly:       { stiffness: 250, damping: 15, mass: 1.0 }  // Fun
  cameraSpring: { stiffness: 340, damping: 28, mass: 0.7 }  // Camera
}
```

### Duration Presets

Consistent timing values across your entire app:

```typescript
durations: {
  instant: 100ms   // Tooltips, immediate feedback
  quick:   200ms   // Hover effects
  fast:    300ms   // Button interactions
  normal:  400ms   // Standard transitions
  slow:    600ms   // Deliberate motion
  slower:  800ms   // Emphasis
  camera:  700ms   // Camera feedback
  premium: 1500ms  // Success animations
}
```

### Easing Functions

Cubic-bezier curves for smooth, natural motion:

```typescript
easings: {
  default:     [0.4, 0.0, 0.2, 1.0]     // Apple standard
  decelerate:  [0.0, 0.0, 0.2, 1.0]     // Ease out
  accelerate:  [0.4, 0.0, 1.0, 1.0]     // Ease in
  sharp:       [0.4, 0.0, 0.6, 1.0]     // Sharp snap
  emphasis:    [0.4, 0.0, 0.2, 1.0]     // Emphasized
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] // SVG drawing
}
```

### Animation Variants

Pre-configured animation states for common patterns:

- **fadeIn** - Simple opacity fade
- **scaleIn** - Scale + fade for modals/cards
- **liquidGlass** - Premium blur + scale effect
- **slideUp** - Bottom sheets and drawers
- **slideDown** - Notifications
- **slideLeft** / **slideRight** - Sidebars
- **expand** - Accordions and dropdowns
- **blurIn** - Backdrop overlays

### Interaction States

Hover and tap animations for UI elements:

- **subtleHover** - Most UI elements (scale 1.02)
- **buttonHover** - Pronounced button feedback (scale 1.05 + lift)
- **iconHover** - Icons with rotation
- **cardHover** - Card lift effect

### Complete Animation Timelines

Two professionally designed success animations:

#### Camera Success (700ms)
Fast, responsive camera capture feedback:
- Recognition: 183ms
- Convergence: 117ms
- Green pulse: 183ms
- Checkmark: 167ms

#### Premium Success (1500ms)
Slow, appreciable quality experience:
- Recognition: 400ms
- Convergence: 350ms
- Green pulse: 350ms
- Checkmark: 350ms

## 🎯 Real-World Examples

### Animated Button

```tsx
import { motion } from 'framer-motion';
import { library } from './animation-library.json';

export const Button = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={library.springs.bouncy}
  >
    {children}
  </motion.button>
);
```

### Modal with Liquid Glass Effect

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { library } from './animation-library.json';

export const Modal = ({ isOpen, children, onClose }) => {
  const variant = library.variants.liquidGlass;
  
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

### Staggered List Animation

```tsx
import { motion } from 'framer-motion';
import { library } from './animation-library.json';

export const List = ({ items }) => (
  <motion.ul
    initial="initial"
    animate="animate"
    variants={{
      animate: {
        transition: library.stagger.normal
      }
    }}
  >
    {items.map((item, i) => (
      <motion.li
        key={i}
        variants={library.variants.fadeIn}
      >
        {item}
      </motion.li>
    ))}
  </motion.ul>
);
```

## 🍎 Apple Motion Principles

This library implements Apple's five core motion principles:

### 1. Responsive
Motion feels immediate and connected to user interaction.
- Spring physics with stiffness 300-400
- Damping 25-35 for natural feel

### 2. Fluid
Animations flow smoothly without abrupt starts or stops.
- Interruptible animations
- Velocity preservation
- Natural deceleration

### 3. Contextual
Every animation has a clear purpose.
- Entry: scale 0.95 → 1.0
- Exit: scale 1.0 → 0.95
- Duration: 300-600ms

### 4. Subtle
Noticeable but not distracting.
- Scale range: 0.95 - 1.05
- Subtle transforms
- Opacity 0.8 - 1.0

### 5. Spatial
Respect spatial relationships and physics.
- Directional awareness
- Curved motion paths
- Natural trajectories

## ⚡ Performance Best Practices

### ✅ Use These (GPU Accelerated)
```javascript
transform   // translate, scale, rotate
opacity     // fade effects
filter      // blur effects
```

### ❌ Avoid These (Slow)
```javascript
width, height          // Layout changes
margin, padding        // Layout shifts
color, background      // Paint operations
border                 // Paint operations
```

### Example: Efficient Animation

```tsx
// ✅ Good - GPU accelerated
<motion.div
  animate={{ 
    scale: 1.1,           // Transform
    opacity: 0.8,         // Opacity
    filter: 'blur(4px)'   // Filter
  }}
/>

// ❌ Bad - Forces reflow/repaint
<motion.div
  animate={{ 
    width: '100px',       // Layout
    background: 'red',    // Paint
    padding: '20px'       // Layout
  }}
/>
```

## ♿ Accessibility

Always respect user motion preferences:

```tsx
import { library } from './animation-library.json';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = () => setPrefersReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReduced;
};

// Usage
const Component = () => {
  const shouldReduce = usePrefersReducedMotion();
  const transition = shouldReduce 
    ? { duration: 0.01 } 
    : library.springs.default;
  
  return <motion.div transition={transition} />;
};
```

## 📱 Platform Support

| Platform | Format | Import Method |
|----------|--------|---------------|
| React | JSON/TS | `import animations from './animation-library.json'` |
| React Native | JSON | `import animations from './animation-library.json'` |
| Flutter | JSON | `rootBundle.loadString('assets/animation-library.json')` |
| iOS (Swift) | JSON | `Bundle.main.url(forResource: "animation-library", withExtension: "json")` |
| Android (Kotlin) | JSON | `assets.open("animation-library.json")` |
| Web/CSS | JSON | `import animations from './animation-library.json'` |

## 📖 Documentation

- **[Quick Reference](ANIMATION_LIBRARY_QUICK_REF.md)** - One-page cheat sheet
- **[Full Guide](ANIMATION_LIBRARY_GUIDE.md)** - Complete documentation
- **[Usage Examples](src/examples/animationLibraryExamples.tsx)** - Code samples
- **[Apple Principles](APPLE_MOTION_PRINCIPLES.md)** - Design philosophy

## 🛠️ Development

### File Structure

```
Motion Autoya/
├── animation-library.json              ← Production JSON export
├── animation-presets.json              ← Source animation data
├── src/
│   ├── animations-config.ts            ← TypeScript definitions
│   └── examples/
│       └── animationLibraryExamples.tsx ← Usage examples
├── export-animations-simple.js         ← Quick export script
├── export-animations.js                ← Advanced export
└── ANIMATION_LIBRARY_GUIDE.md         ← Full documentation
```

### Export Commands

```bash
# Quick export (recommended)
npm run export:animations

# Export all formats
npm run export:all

# Manual export
node export-animations-simple.js
```

### Customization

1. Edit `src/animations-config.ts`
2. Add your custom animations
3. Run `npm run export:animations`
4. Import the updated JSON

Example:

```typescript
// src/animations-config.ts
export const animationLibrary = {
  springs: {
    ...existingSprings,
    myCustom: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
      mass: 0.9
    }
  }
};
```

## 🤝 Contributing

Contributions welcome! Please:

1. Add animations to `src/animations-config.ts`
2. Document use cases and examples
3. Test across platforms
4. Update documentation
5. Export to JSON

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

Based on Apple's Human Interface Guidelines and observed iOS/macOS animation behaviors.

---

**Made with ❤️ by the Motion Autoya team**

For questions or support, please open an issue on GitHub.



