# Animation Presets - Quick Reference

One-page cheatsheet for Motion Autoya animation presets.

## 🚀 Quick Import

```typescript
// TypeScript/React
import { springs, variants, easings, durations } from '@/utils/animationPresets';

// JSON (any platform)
import presets from './animation-presets.json';
```

---

## 🎪 Spring Presets

```typescript
springs.stiff       // Quick & responsive (500, 35, 0.5)
springs.default     // Balanced & natural (380, 30, 0.8) ⭐
springs.bouncy      // Playful & energetic (300, 20, 0.8)
springs.gentle      // Smooth & calm (200, 30, 1.0)
springs.wobbly      // Exaggerated bounce (250, 15, 1.0)
springs.cameraSpring // Camera sync (340, 28, 0.7)
```

### Usage
```tsx
<motion.div transition={springs.bouncy} />
```

---

## ⏱️ Duration Presets

```typescript
durations.instant   // 0.1s - Immediate feedback
durations.quick     // 0.2s - Hover states
durations.fast      // 0.3s - Quick transitions
durations.normal    // 0.4s - Standard UI ⭐
durations.slow      // 0.6s - Emphasis
durations.slower    // 0.8s - Complex changes
durations.camera    // 0.7s - Camera success
durations.premium   // 1.5s - Branded moments
```

---

## 📐 Easing Presets

```typescript
easings.default     // [0.4, 0.0, 0.2, 1.0] - Apple standard ⭐
easings.decelerate  // [0.0, 0.0, 0.2, 1.0] - Ease out
easings.accelerate  // [0.4, 0.0, 1.0, 1.0] - Ease in
easings.sharp       // [0.4, 0.0, 0.6, 1.0] - Sharp movement
easings.easeOutQuad // [0.25, 0.46, 0.45, 0.94] - Checkmark
```

### Usage
```tsx
<motion.div transition={{ duration: 0.4, ease: easings.default }} />
```

---

## 🎨 Animation Variants

```typescript
// Fade
variants.fadeIn
// { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

// Scale + Fade (modals/cards)
variants.scaleIn
// { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 } }

// Liquid Glass (premium)
variants.liquidGlass
// { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } }

// Slides
variants.slideUp    // From bottom (sheets/drawers)
variants.slideDown  // From top (notifications)
variants.slideLeft  // From right (sidebars)
variants.slideRight // From left

// Expand
variants.expand
// { initial: { scaleY: 0, opacity: 0 }, animate: { scaleY: 1, opacity: 1 } }

// Blur (backdrop)
variants.blurIn
// { initial: { opacity: 0, backdropFilter: "blur(0px)" }, 
//   animate: { opacity: 1, backdropFilter: "blur(12px)" } }
```

### Usage
```tsx
<motion.div {...variants.scaleIn} transition={springs.gentle} />
```

---

## 🖱️ Interaction States

```typescript
// Subtle (most UI)
interactionStates.subtleHover
// { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }

// Button (pronounced)
interactionStates.buttonHover
// { whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.95 } }

// Icon (with rotation)
interactionStates.iconHover
// { whileHover: { scale: 1.1, rotate: 5 }, whileTap: { scale: 0.9 } }

// Card (lift effect)
interactionStates.cardHover
// { whileHover: { y: -8, scale: 1.02 }, whileTap: { scale: 0.98 } }
```

### Usage
```tsx
<motion.button {...interactionStates.buttonHover}>Click</motion.button>
```

---

## 🎭 Stagger Configurations

```typescript
stagger.fast        // 0.03s between children
stagger.normal      // 0.05s between children ⭐
stagger.slow        // 0.1s between children
stagger.withDelay   // 0.05s + 0.2s initial delay
stagger.convergence // 0.02s (camera animation)
```

### Usage
```tsx
const container = {
  animate: { transition: stagger.normal }
};

<motion.ul variants={container} animate="animate">
  <motion.li {...variants.fadeIn} />
  <motion.li {...variants.fadeIn} />
</motion.ul>
```

---

## ✏️ SVG Path Drawing

```typescript
svgDraw.fast      // 1s
svgDraw.normal    // 1.5s ⭐
svgDraw.slow      // 2.5s
svgDraw.checkmark // 0.35s (camera animation)
```

### Usage
```tsx
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={svgDraw.normal}
/>
```

---

## 📸 Camera Success Animation

### 700ms Timeline (Fast/Responsive)

```typescript
const ct = cameraSuccessTimeline;

// Stage 1: Recognition (0-183ms)
ct.recognition.duration // 183ms

// Stage 2: Convergence (183-300ms)
ct.convergence.duration // 117ms
ct.convergence.stagger  // 0.02

// Stage 3: Beat/Pause (300-350ms)
ct.beat.duration        // 50ms

// Stage 4: Green Transform (350-533ms)
ct.green.duration       // 183ms
ct.green.pulse.maxScale // 1.10

// Stage 5: Checkmark (533-700ms)
ct.checkmark.duration   // 167ms
```

### 1500ms Timeline (Premium/Appreciable)

```typescript
const pt = premiumSuccessTimeline;

pt.recognition.duration  // 400ms (generous)
pt.convergence.duration  // 350ms (visible)
pt.beat.duration         // 50ms
pt.green.duration        // 350ms (smooth)
pt.checkmark.duration    // 350ms (confident)
```

---

## 🎨 Colors

```typescript
colors.success.solid        // "#34D399"
colors.success.gradient     // Radial: #86EFAC → #34D399 → #059669

colors.white                // "#FFFFFF"

colors.liquidGlass.light    // "rgba(255, 255, 255, 0.1)"
colors.liquidGlass.medium   // "rgba(255, 255, 255, 0.2)"
colors.liquidGlass.heavy    // "rgba(255, 255, 255, 0.3)"
```

---

## ⚡ Performance Tips

### ✅ GPU Accelerated (Use These)
- `transform` (scale, translate, rotate)
- `opacity`
- `filter` (blur, brightness)

### ❌ Avoid (Layout/Paint)
- `width`, `height`
- `margin`, `padding`
- `color`, `background`, `border`

---

## ♿ Accessibility

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  transition={shouldReduceMotion ? { duration: 0 } : springs.default}
/>
```

---

## 🎯 Common Patterns

### Modal/Dialog
```tsx
<motion.div
  {...variants.scaleIn}
  transition={springs.gentle}
/>
```

### Button
```tsx
<motion.button
  {...interactionStates.buttonHover}
/>
```

### Notification
```tsx
<motion.div
  {...variants.slideDown}
  transition={springs.stiff}
/>
```

### Card Grid
```tsx
const container = {
  animate: { transition: stagger.normal }
};

<motion.div variants={container} animate="animate">
  {items.map(item => (
    <motion.div
      key={item.id}
      {...variants.scaleIn}
      transition={springs.default}
    />
  ))}
</motion.div>
```

### SVG Drawing
```tsx
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={svgDraw.normal}
/>
```

### Camera Success
```tsx
// Fast version (700ms)
<CameraSuccess timeline={cameraSuccessTimeline} />

// Premium version (1500ms)  
<CameraSuccess timeline={premiumSuccessTimeline} />
```

---

## 🔢 Quick Decision Tree

**Need immediate feedback?** → `springs.stiff` + `durations.quick`

**Standard UI transition?** → `springs.default` + `durations.normal`

**Large modal/drawer?** → `springs.gentle` + `durations.slow`

**Playful button?** → `springs.bouncy` + `interactionStates.buttonHover`

**Success moment?** → `variants.liquidGlass` + `durations.premium`

**List animation?** → `variants.fadeIn` + `stagger.normal`

**SVG drawing?** → `svgDraw.normal`

**Camera confirmation?** → `cameraSuccessTimeline` (700ms) or `premiumSuccessTimeline` (1500ms)

---

## 📱 Platform-Specific

### React/Framer Motion
```tsx
import { motion } from 'framer-motion';
<motion.div {...variants.scaleIn} transition={springs.default} />
```

### React Native
```tsx
Animated.spring(value, { 
  ...springs.bouncy, 
  useNativeDriver: true 
})
```

### Flutter
```dart
controller.animateWith(SpringSimulation(
  SpringDescription(
    mass: springs.bouncy.mass,
    stiffness: springs.bouncy.stiffness,
    damping: springs.bouncy.damping,
  ), 0, 1, 0
));
```

### iOS
```swift
let anim = CASpringAnimation(keyPath: "transform.scale")
anim.stiffness = springs.bouncy.stiffness
anim.damping = springs.bouncy.damping
```

### Android
```kotlin
SpringAnimation(view, DynamicAnimation.SCALE_X, 1f).apply {
  spring.stiffness = springs.bouncy.stiffness
  spring.dampingRatio = springs.bouncy.damping
}
```

### CSS
```css
transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1.0);
```

---

## 📦 Export JSON

```bash
# Export to console
node export-animation-presets.js

# Save to file
node export-animation-presets.js > my-presets.json
```

---

**💡 Pro Tip**: Start with `springs.default` + `durations.normal` for everything, then customize only what needs it.

**Full Guide**: See `ANIMATION_PRESETS_GUIDE.md` for detailed examples and platform implementations.



