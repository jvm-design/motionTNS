# Animation Library Quick Reference

One-page reference for the Motion Autoya animation library.

## 🚀 Getting Started

```bash
# Export the library
npm run export:animations

# Import in your code
import animations from './animation-library.json'
const lib = animations.library
```

## ⚡ Common Use Cases

### 1. Button Animation (React)
```jsx
import { motion } from 'framer-motion'
import { library } from './animation-library.json'

<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={library.springs.bouncy}
>
  Click Me
</motion.button>
```

### 2. Modal Animation
```jsx
<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.95, opacity: 0 }}
  transition={library.springs.default}
>
  Modal Content
</motion.div>
```

### 3. List Stagger
```jsx
<motion.ul variants={{ animate: { transition: library.stagger.normal } }}>
  {items.map(item => (
    <motion.li variants={library.variants.fadeIn}>
      {item}
    </motion.li>
  ))}
</motion.ul>
```

## 📊 Preset Quick Reference

### Springs (Physics-based)
| Name | Use For | Feel |
|------|---------|------|
| `default` | General UI | Balanced ⚖️ |
| `bouncy` | Buttons, toggles | Playful 🎾 |
| `stiff` | Hover effects | Quick ⚡ |
| `gentle` | Modals, sheets | Smooth 🌊 |
| `wobbly` | Success states | Fun 🎉 |
| `cameraSpring` | Camera feedback | Responsive 📷 |

### Durations (Time-based)
| Name | Value | Use For |
|------|-------|---------|
| `instant` | 100ms | Tooltips |
| `quick` | 200ms | Hover |
| `fast` | 300ms | Buttons |
| `normal` | 400ms | Modals |
| `slow` | 600ms | Transitions |
| `premium` | 1500ms | Success |

### Easings (Cubic Bezier)
| Name | Bezier | Use For |
|------|--------|---------|
| `default` | `[0.4, 0.0, 0.2, 1.0]` | General |
| `decelerate` | `[0.0, 0.0, 0.2, 1.0]` | Entrances |
| `accelerate` | `[0.4, 0.0, 1.0, 1.0]` | Exits |
| `easeOutQuad` | `[0.25, 0.46, 0.45, 0.94]` | SVG draw |

### Variants (Pre-configured States)
| Name | Effect | Use For |
|------|--------|---------|
| `fadeIn` | Opacity fade | Content reveals |
| `scaleIn` | Scale + fade | Modals, cards |
| `liquidGlass` | Scale + blur | Premium UI |
| `slideUp` | Slide from bottom | Bottom sheets |
| `slideDown` | Slide from top | Notifications |

## 🎯 Platform-Specific Imports

### React / Framer Motion
```javascript
import animations from './animation-library.json'
const spring = animations.library.springs.bouncy

<motion.div transition={spring} />
```

### React Native
```javascript
import animations from './animation-library.json'
const { stiffness, damping, mass } = animations.library.springs.default

Animated.spring(value, { stiffness, damping, mass })
```

### Flutter
```dart
final json = jsonDecode(animationJson);
final duration = json['library']['durations']['normal']['ms'];

AnimationController(duration: Duration(milliseconds: duration))
```

### iOS (Swift)
```swift
let library = json["library"] as! [String: Any]
let springs = library["springs"] as! [String: Any]
let bouncy = springs["bouncy"] as! [String: Any]

animation.stiffness = bouncy["stiffness"] as! CGFloat
```

### Android (Kotlin)
```kotlin
val library = json.getJSONObject("library")
val duration = library.getJSONObject("durations")
  .getJSONObject("normal").getInt("ms")

animator.duration = duration.toLong()
```

### CSS / Web
```javascript
const lib = animations.library
const easing = lib.easings.default.css
const duration = lib.durations.normal.value

element.style.transition = `transform ${duration}s ${easing}`
```

## 🎨 Interaction Patterns

### Subtle Hover (Most Elements)
```javascript
whileHover: { scale: 1.02 }
whileTap: { scale: 0.98 }
```

### Button Hover
```javascript
whileHover: { scale: 1.05, y: -2 }
whileTap: { scale: 0.95 }
```

### Icon Hover
```javascript
whileHover: { scale: 1.1, rotate: 5 }
whileTap: { scale: 0.9 }
```

### Card Hover
```javascript
whileHover: { y: -8, scale: 1.02 }
whileTap: { scale: 0.98 }
```

## ⚡ Performance Rules

### ✅ Use These (GPU Accelerated)
- `transform` (scale, translate, rotate)
- `opacity`
- `filter` (blur)

### ❌ Avoid These (Slow)
- `width`, `height`
- `margin`, `padding`
- `color`, `background`
- `border`

## ♿ Accessibility

```javascript
// Respect user preferences
const shouldReduce = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

const transition = shouldReduce 
  ? { duration: 0.01 }  // Nearly instant
  : animations.library.springs.default
```

## 🎬 Complete Animation Timelines

### Camera Success (700ms - Fast)
```javascript
const timeline = animations.library.cameraSuccess.timeline

// Phase 1: Recognition (0-183ms)
// Phase 2: Convergence (183-300ms) 
// Phase 3: Green pulse (350-533ms)
// Phase 4: Checkmark (533-700ms)
```

### Premium Success (1500ms - Slow)
```javascript
const timeline = animations.library.premiumSuccess.timeline

// Phase 1: Recognition (0-400ms)
// Phase 2: Convergence (400-750ms)
// Phase 3: Green pulse (800-1150ms)
// Phase 4: Checkmark (1150-1500ms)
```

## 🍎 Apple Motion Principles

| Principle | Implementation |
|-----------|----------------|
| **Responsive** | Spring physics, feels immediate |
| **Fluid** | Smooth, no abrupt stops |
| **Contextual** | Every animation has purpose |
| **Subtle** | Noticeable, not distracting |
| **Spatial** | Respect 3D relationships |

## 📦 File Structure

```
Motion Autoya/
├── animation-library.json          ← Production JSON
├── animation-presets.json          ← Source data
├── src/animations-config.ts        ← TypeScript definitions
├── export-animations-simple.js     ← Export script
└── ANIMATION_LIBRARY_GUIDE.md     ← Full documentation
```

## 🔄 Update Workflow

1. Edit `src/animations-config.ts` (add new animations)
2. Run `npm run export:animations`
3. Test in your app
4. Commit both `.ts` and `.json` files

## 📖 More Resources

- Full Guide: `ANIMATION_LIBRARY_GUIDE.md`
- Preset Details: `ANIMATION_PRESETS_GUIDE.md`
- Apple Principles: `APPLE_MOTION_PRINCIPLES.md`
- Live Demo: Open `frame-viewer.html`

---

**Pro Tip:** Start with `springs.default` and `durations.normal` for 90% of use cases. Customize from there!



