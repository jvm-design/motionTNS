# 🎨 Animation Presets Package

**Complete animation preset library based on Apple's Motion Principles**

A production-ready collection of animation presets, timings, and configurations extracted from Motion Autoya project. Use across any platform: React, React Native, Flutter, iOS, Android, or Web.

---

## 📦 What's Included

### Core Files
- **`animation-presets.json`** - Complete JSON export (platform-agnostic)
- **`src/utils/animationPresets.ts`** - TypeScript/React implementation
- **`export-animation-presets.js`** - Node.js export script

### Documentation
- **`ANIMATION_PRESETS_GUIDE.md`** - Complete guide with platform examples
- **`ANIMATION_PRESETS_QUICK_REF.md`** - One-page cheatsheet
- **`src/AnimationPresetsDemo.tsx`** - Live React examples

---

## 🚀 Quick Start

### Install Dependencies (for React)

```bash
npm install framer-motion
# or
yarn add framer-motion
```

### Import and Use

```typescript
import { springs, variants, easings } from '@/utils/animationPresets';
import { motion } from 'framer-motion';

// Basic fade
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={springs.default}
/>

// Modal with variant
<motion.div
  {...variants.scaleIn}
  transition={springs.gentle}
/>

// Interactive button
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={springs.bouncy}
/>
```

---

## 📚 Available Presets

### 🎪 Springs
6 carefully tuned spring configurations following Apple's motion design

```typescript
springs.stiff       // Quick & responsive (500, 35, 0.5)
springs.default     // Balanced & natural (380, 30, 0.8) ⭐
springs.bouncy      // Playful & energetic (300, 20, 0.8)
springs.gentle      // Smooth & calm (200, 30, 1.0)
springs.wobbly      // Exaggerated bounce (250, 15, 1.0)
springs.cameraSpring // Camera sync (340, 28, 0.7)
```

### ⏱️ Durations
8 timing presets for different interaction types

```typescript
durations.instant   // 0.1s
durations.quick     // 0.2s
durations.fast      // 0.3s
durations.normal    // 0.4s ⭐
durations.slow      // 0.6s
durations.slower    // 0.8s
durations.camera    // 0.7s
durations.premium   // 1.5s
```

### 📐 Easings
6 cubic-bezier easing functions

```typescript
easings.default     // [0.4, 0.0, 0.2, 1.0] - Apple standard
easings.decelerate  // [0.0, 0.0, 0.2, 1.0] - Ease out
easings.accelerate  // [0.4, 0.0, 1.0, 1.0] - Ease in
easings.sharp       // [0.4, 0.0, 0.6, 1.0]
easings.emphasis    // [0.4, 0.0, 0.2, 1.0]
easings.easeOutQuad // [0.25, 0.46, 0.45, 0.94] - Checkmark
```

### 🎨 Variants
9 ready-to-use animation patterns

```typescript
variants.fadeIn        // Simple fade
variants.scaleIn       // Scale + fade (modals)
variants.liquidGlass   // Premium entrance
variants.slideUp       // Bottom sheet
variants.slideDown     // Notification
variants.slideLeft     // Sidebar
variants.slideRight    // Menu
variants.expand        // Accordion
variants.blurIn        // Backdrop
```

### 🖱️ Interaction States
4 hover/tap configurations

```typescript
interactionStates.subtleHover  // Most UI elements
interactionStates.buttonHover  // Primary buttons
interactionStates.iconHover    // Icon buttons
interactionStates.cardHover    // Cards with lift
```

### 🎭 Stagger
5 stagger timing configurations for list animations

```typescript
stagger.fast        // 0.03s between items
stagger.normal      // 0.05s between items
stagger.slow        // 0.1s between items
stagger.withDelay   // 0.05s + 0.2s delay
stagger.convergence // 0.02s (camera animation)
```

### ✏️ SVG Draw
4 path drawing presets

```typescript
svgDraw.fast      // 1s
svgDraw.normal    // 1.5s
svgDraw.slow      // 2.5s
svgDraw.checkmark // 0.35s
```

### 📸 Camera Timelines
Complete frame-by-frame specifications

```typescript
cameraSuccessTimeline    // 700ms - Fast/responsive
premiumSuccessTimeline   // 1500ms - Premium/appreciable
```

---

## 🎯 Common Use Cases

### Modal/Dialog
```tsx
<motion.div {...variants.scaleIn} transition={springs.gentle} />
```

### Button
```tsx
<motion.button {...interactionStates.buttonHover} />
```

### Notification
```tsx
<motion.div {...variants.slideDown} transition={springs.stiff} />
```

### Staggered List
```tsx
<motion.ul variants={{ animate: { transition: stagger.normal } }}>
  {items.map(item => (
    <motion.li {...variants.fadeIn} transition={springs.stiff} />
  ))}
</motion.ul>
```

### SVG Path Drawing
```tsx
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={svgDraw.normal}
/>
```

---

## 🌍 Platform Support

### ✅ Supported Platforms
- **React** (Framer Motion) - Primary implementation
- **React Native** (Reanimated) - Full support
- **Flutter** - Spring & timing presets
- **iOS** (UIKit/SwiftUI) - CASpringAnimation compatible
- **Android** (Compose/View) - SpringAnimation compatible
- **Web** (CSS/GSAP) - Cubic-bezier compatible

### 📖 Platform Guides
See `ANIMATION_PRESETS_GUIDE.md` for detailed implementation examples for each platform.

---

## 📱 Export Options

### To Console
```bash
node export-animation-presets.js
```

### To File
```bash
node export-animation-presets.js > my-presets.json
```

### Using npm script
```bash
npm run export:presets          # Console output
npm run export:presets:file     # Save to file
```

---

## 🎨 Design Philosophy

Based on Apple's Human Interface Guidelines:

1. **Responsive** - Feels immediate and connected (spring-based)
2. **Fluid** - Smooth, no abrupt starts/stops
3. **Contextual** - Every animation has clear purpose
4. **Subtle** - Noticeable but not distracting
5. **Spatial** - Respects spatial relationships

---

## ⚡ Performance

### GPU-Accelerated ✅
Only animate these properties:
- `transform` (scale, translate, rotate)
- `opacity`
- `filter` (blur, brightness)

### Avoid ❌
- `width`, `height`, `margin`, `padding`
- `color`, `background`, `border`

---

## ♿ Accessibility

All presets respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  transition={shouldReduceMotion ? { duration: 0 } : springs.default}
/>
```

---

## 📊 Animation Specifications

### Camera Success (Fast - 700ms)
```
Recognition:  0-183ms   (183ms)
Convergence:  183-300ms (117ms)
Beat:         300-350ms (50ms)
Green:        350-533ms (183ms)
Checkmark:    533-700ms (167ms)
```

### Premium Success (Appreciable - 1500ms)
```
Recognition:  0-400ms    (400ms)
Convergence:  400-750ms  (350ms)
Beat:         750-800ms  (50ms)
Green:        800-1150ms (350ms)
Checkmark:    1150-1500ms (350ms)
```

---

## 🎬 Live Demo

Run the demo to see all presets in action:

```bash
npm run dev
```

Then navigate to the presets demo section or import:

```tsx
import AnimationPresetsDemo from '@/AnimationPresetsDemo';
```

---

## 📚 Full Documentation

- **Complete Guide**: `ANIMATION_PRESETS_GUIDE.md`
- **Quick Reference**: `ANIMATION_PRESETS_QUICK_REF.md`
- **Examples**: `src/AnimationPresetsDemo.tsx`
- **Original Specs**:
  - `autoya-animation-spec.json` (1500ms premium)
  - `motion-studio-animation-spec.json` (700ms camera)

---

## 🔧 Customization

### Extend Presets

```typescript
import { springs } from '@/utils/animationPresets';

export const customSprings = {
  ...springs,
  ultraBouncy: {
    type: "spring" as const,
    stiffness: 200,
    damping: 10,
    mass: 1.2,
  },
};
```

### Modify Existing

```typescript
const mySpring = {
  ...springs.default,
  damping: springs.default.damping - 5, // More bouncy
};
```

---

## 🎯 Decision Tree

**Need immediate feedback?** → `springs.stiff` + `durations.quick`

**Standard UI transition?** → `springs.default` + `durations.normal`

**Large modal/drawer?** → `springs.gentle` + `durations.slow`

**Playful button?** → `springs.bouncy` + `interactionStates.buttonHover`

**Success moment?** → `variants.liquidGlass` + `durations.premium`

**List animation?** → `variants.fadeIn` + `stagger.normal`

---

## 🏆 Key Features

✅ **Production-Ready** - Battle-tested in real projects  
✅ **Platform-Agnostic** - JSON export works everywhere  
✅ **Apple-Quality** - Based on HIG motion principles  
✅ **Type-Safe** - Full TypeScript support  
✅ **Accessible** - Respects motion preferences  
✅ **Performant** - GPU-accelerated animations  
✅ **Well-Documented** - Complete guides and examples  

---

## 📄 License

See LICENSE file in project root.

---

## 🤝 Contributing

These presets are extracted from the Motion Autoya project. Improvements and platform implementations welcome!

---

## 💡 Pro Tips

1. **Start simple**: Use `springs.default` + `durations.normal` for everything first
2. **Optimize later**: Only customize what needs special attention
3. **Test on devices**: Animations feel different on real hardware
4. **Respect preferences**: Always honor `prefers-reduced-motion`
5. **Keep it subtle**: Less is more with animation

---

**Ready to animate? Start with the Quick Reference guide! 🚀**

`ANIMATION_PRESETS_QUICK_REF.md`



