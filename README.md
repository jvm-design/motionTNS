# Motion Autoya 🎨

A premium motion design system built with **Apple's Motion Principles** for creating flawless, high-quality SVG animations. Perfect for modern web applications that demand professional motion design.

![Motion Autoya](https://img.shields.io/badge/Motion-Premium-blueviolet)
![React](https://img.shields.io/badge/React-18.3-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)

## ✨ Features

### 🎬 Export Capabilities (NEW!)
Export your animations in multiple formats:
- **JSON Export** - Structured animation keyframe data
- **Lottie Export** - Industry-standard JSON format for Lottie players
- **MP4 Export** - High-quality video recording at 60fps

See [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) for complete documentation.

### 💎 Liquid Glass Design (NEW!)
Implements Apple's premium glassmorphism effects:
- **Frosted Glass** - Heavy blur with opacity for depth
- **Crystal Glass** - Clear refraction with edge highlights
- **Tinted Glass** - Color-washed gradients
- **Liquid Glass** - Flowing, dynamic glass effects
- **Glass Textures** - Grain, frost, bubbles, and shimmer
- **Interactive Glass Cards** - Hover effects with enhanced blur
- **Glass Modals** - Full-screen overlays with backdrop blur

See [LIQUID_GLASS_PRINCIPLES.md](./LIQUID_GLASS_PRINCIPLES.md) for complete design guidelines.

### 🎯 Apple Motion Principles
Every animation follows Apple's Human Interface Guidelines:
- **Responsive & Natural** - Spring-based physics for organic movement
- **Fluid & Continuous** - Smooth transitions that can be interrupted gracefully
- **Contextual & Purposeful** - Motion that guides attention and communicates relationships
- **Subtle & Refined** - Noticeable but not distracting animations
- **Spatial Awareness** - Respects spatial relationships and orientation

### ⚡ High Performance
- GPU-accelerated animations using `transform` and `opacity`
- Optimized for 60fps on all devices
- No layout thrashing or repaints
- Efficient SVG path animations

### ♿ Accessibility First
- Respects `prefers-reduced-motion` system settings
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly

### 🎨 Comprehensive Component Library
- **Liquid Glass** - Glassmorphism cards, modals, SVG effects (NEW!)
- **Logos & Branding** - Path drawing, bounce animations
- **Loading States** - Spinners, dots, skeletons
- **Interactive Buttons** - Hearts, menus, play/pause, checkmarks
- **Progress Indicators** - Circular, linear, stepped progress
- **Notifications** - Badges, bells, alerts
- **Data Visualization** - Bar charts, line charts, donut charts
- **Background Effects** - Floating orbs, waves, gradients, grids
- **Morphing Shapes** - Fluid shape transformations

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/motion-autoya.git
cd motion-autoya

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

```tsx
import { AnimatedLogo, HeartButton, CircularProgress } from '@/components/SVGAnimations';

function MyComponent() {
  return (
    <>
      <AnimatedLogo size={120} />
      <HeartButton isActive={liked} onClick={() => setLiked(!liked)} />
      <CircularProgress progress={75} />
    </>
  );
}
```

## 🎬 Quick Export Example

```tsx
import ExportPanel from './components/ExportPanel';
import { useRef } from 'react';

function MyComponent() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  return (
    <>
      <svg ref={svgRef}>
        {/* Your animated content */}
      </svg>
      <ExportPanel 
        targetElementRef={svgRef} 
        animationName="My Animation"
      />
    </>
  );
}
```

## 📚 Component Categories

### 1. Liquid Glass (NEW!)
```tsx
import { GlassCard, GlassOrb, GlassModal } from '@/components/LiquidGlass';

// Glass Card
<GlassCard variant="frosted">
  <h3>Premium Glass Effect</h3>
  <p>With backdrop blur and textures</p>
</GlassCard>

// Glass Orb
<GlassOrb size={200} variant="crystal" animate={true} />

// Glass Modal
<GlassModal isOpen={isOpen} onClose={handleClose} variant="tinted">
  <h2>Beautiful Glass Modal</h2>
</GlassModal>
```

**Available Variants:**
- `thin` - Ultra light (8px blur)
- `regular` - Standard (16px blur)
- `thick` - Heavy emphasis (24px blur)
- `frosted` - Opaque frosted (32px blur)
- `crystal` - Clear with refraction
- `tinted` - Color gradient wash
- `liquid` - Flowing animation

**Glass Components:**
- `GlassCard` - Glassmorphic card with variants
- `GlassModal` - Full-screen modal with backdrop
- `GlassOrb` - Animated glass sphere
- `GlassButton` - Interactive glass button
- `GlassPanel` - SVG glass panel
- `GlassLogoBadge` - Badge with glass effect
- `GlassWave` - Animated liquid waves

**Glass Textures:**
- `GrainTexture` - Fine particle noise
- `FrostPattern` - Crystalline formations
- `BubblePattern` - Organic bubbles
- `ShimmerFilter` - Light refraction
- `IridescentGradient` - Rainbow colors

### 2. Logos & Branding
```tsx
import { AnimatedLogo } from '@/components/SVGAnimations';

<AnimatedLogo size={150} animate={true} />
```

### 3. Loading States
```tsx
import { LoadingSpinner, DotsSpinner } from '@/components/SVGAnimations';

<LoadingSpinner size={60} color="#667eea" />
<DotsSpinner size={80} />
```

### 4. Interactive Buttons
```tsx
import { HeartButton, MenuButton, PlayPauseButton, CheckButton } from '@/components/SVGAnimations';

<HeartButton isActive={liked} onClick={handleLike} />
<MenuButton isActive={menuOpen} onClick={toggleMenu} />
```

### 5. Progress Indicators
```tsx
import { CircularProgress, LinearProgress, StepProgress } from '@/components/SVGAnimations';

<CircularProgress progress={65} size={140} showLabel />
<LinearProgress progress={65} width={400} />
<StepProgress currentStep={2} totalSteps={5} />
```

### 6. Notifications
```tsx
import { NotificationBadge, BellNotification } from '@/components/SVGAnimations';

<NotificationBadge count={9} size={60} />
<BellNotification hasNotification={true} />
```

### 7. Data Visualization
```tsx
import { AnimatedBarChart, AnimatedLineChart, AnimatedDonutChart } from '@/components/SVGAnimations';

<AnimatedBarChart data={[45, 78, 62, 90]} width={500} height={300} />
<AnimatedLineChart data={[30, 45, 60, 85]} width={500} height={300} />
<AnimatedDonutChart data={donutData} size={300} />
```

### 8. Background Effects
```tsx
import { FloatingOrbs, AnimatedWaves, GradientMesh } from '@/components/SVGAnimations';

<FloatingOrbs count={8} />
<AnimatedWaves layers={3} />
<GradientMesh />
```

### 9. Morphing Shapes
```tsx
import { SimpleMorph, BlobMorph, LiquidButton } from '@/components/SVGAnimations';

<SimpleMorph morphState={0} />
<BlobMorph />
<LiquidButton text="Click Me" onClick={handleClick} />
```

## 🎛️ Motion Configuration

### Spring Presets
```ts
import { springs } from '@/utils/motionConfig';

// Available presets
springs.default  // Balanced and natural
springs.bouncy   // Playful and energetic
springs.stiff    // Quick and responsive
springs.gentle   // Smooth and calm
springs.wobbly   // Exaggerated bounce
```

### Animation Variants
```ts
import { variants } from '@/utils/motionConfig';

// Pre-built variants
variants.fadeIn
variants.scaleIn
variants.slideUp
variants.slideDown
variants.slideLeft
variants.slideRight
variants.expand
variants.blurIn
```

### Interaction States
```ts
import { interactionStates } from '@/utils/motionConfig';

<motion.div {...interactionStates.buttonHover}>
  Button
</motion.div>
```

## 🎨 Customization

### Custom Spring Configuration
```tsx
<motion.div
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8
  }}
/>
```

### Custom Variants
```tsx
const customVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

<motion.div variants={customVariants} />
```

## 📖 Apple Motion Principles

This system is built on Apple's core motion principles:

1. **Spring Physics** - All animations use spring-based timing, not linear
2. **Responsive Feedback** - Immediate response to user interaction
3. **Natural Motion** - Movement feels physically realistic
4. **Interruption Handling** - Animations can be interrupted smoothly
5. **Performance First** - Only animate GPU-accelerated properties

See [APPLE_MOTION_PRINCIPLES.md](./APPLE_MOTION_PRINCIPLES.md) for detailed guidelines.

## 🏗️ Tech Stack

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Framer Motion 11** - Animation library
- **GSAP 3** - SVG morphing and advanced animations
- **Vite 5** - Build tool and dev server

## 📁 Project Structure

```
motion-autoya/
├── src/
│   ├── components/
│   │   └── SVGAnimations/
│   │       ├── Logo.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── IconButton.tsx
│   │       ├── ProgressIndicator.tsx
│   │       ├── NotificationBadge.tsx
│   │       ├── DataVisualization.tsx
│   │       ├── BackgroundEffects.tsx
│   │       ├── MorphingShapes.tsx
│   │       └── index.ts
│   ├── utils/
│   │   ├── motionConfig.ts
│   │   └── accessibility.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── APPLE_MOTION_PRINCIPLES.md
├── package.json
└── README.md
```

## 🎯 Best Practices

### Performance
- ✅ Animate `transform` and `opacity` only
- ✅ Use `will-change` sparingly
- ❌ Don't animate `width`, `height`, `top`, `left`
- ❌ Don't stack too many animations

### Accessibility
```tsx
import { prefersReducedMotion } from '@/utils/accessibility';

const shouldAnimate = !prefersReducedMotion();
```

### Timing Guidelines
- **Quick interactions**: 100-200ms (hover states)
- **Standard transitions**: 300-400ms (modals, dropdowns)
- **Elaborate animations**: 500-800ms (complex state changes)

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌟 Examples

Visit the live demo to see all animations in action:

```bash
npm run dev
```

Then navigate to `http://localhost:5173`

## 📄 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Apple's Motion Principles

