# Motion Studio Usage Guide

This guide provides detailed examples and best practices for using Motion Studio components in your projects.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Component Deep Dive](#component-deep-dive)
3. [Animation Patterns](#animation-patterns)
4. [Advanced Techniques](#advanced-techniques)
5. [Performance Optimization](#performance-optimization)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation in Your Project

If you want to use these components in your own project:

```bash
npm install framer-motion gsap @react-spring/web
```

Then copy the components you need from `src/components/SVGAnimations/` and the utilities from `src/utils/`.

### Basic Usage

```tsx
import { AnimatedLogo } from './components/SVGAnimations';

function App() {
  return <AnimatedLogo size={120} animate={true} />;
}
```

## Component Deep Dive

### 1. Logo Animations

#### Basic Logo
```tsx
<AnimatedLogo 
  size={150}      // Size in pixels
  animate={true}  // Enable entry animation
/>
```

**Best for:**
- Hero sections
- Loading screens
- App splash screens

**Customization:**
```tsx
// Custom colors by modifying the gradient in Logo.tsx
<linearGradient id="gradient1">
  <stop offset="0%" stopColor="#your-color" />
  <stop offset="100%" stopColor="#your-color" />
</linearGradient>
```

### 2. Loading States

#### Circular Spinner
```tsx
<LoadingSpinner 
  size={80}
  color="#667eea"  // Custom color
/>
```

#### Dots Spinner
```tsx
<DotsSpinner size={60} />
```

**Best for:**
- API call feedback
- Content loading
- Processing states

**Usage Pattern:**
```tsx
function DataFetcher() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size={60} />
        <p>Loading data...</p>
      </div>
    );
  }
  
  return <DataDisplay />;
}
```

### 3. Interactive Buttons

#### Heart Button (Like/Favorite)
```tsx
const [liked, setLiked] = useState(false);

<HeartButton 
  size={48}
  isActive={liked}
  onClick={() => setLiked(!liked)}
/>
```

**Features:**
- Particle burst on activation
- Smooth color transition
- Spring-based scaling

#### Menu Button (Hamburger)
```tsx
const [menuOpen, setMenuOpen] = useState(false);

<MenuButton 
  size={48}
  isActive={menuOpen}
  onClick={() => setMenuOpen(!menuOpen)}
/>
```

**Features:**
- Morphing X animation
- Smooth line rotation
- Fade middle line

#### Play/Pause Button
```tsx
const [playing, setPlaying] = useState(false);

<PlayPauseButton 
  size={60}
  isActive={playing}
  onClick={() => setPlaying(!playing)}
/>
```

**Features:**
- Icon morphing
- Circular border
- Smooth transitions

#### Check Button
```tsx
const [checked, setChecked] = useState(false);

<CheckButton 
  size={48}
  isActive={checked}
  onClick={() => setChecked(!checked)}
/>
```

**Features:**
- Path drawing animation
- Color state transition
- Bounce feedback

### 4. Progress Indicators

#### Circular Progress
```tsx
const [progress, setProgress] = useState(0);

// Simulate progress
useEffect(() => {
  const timer = setInterval(() => {
    setProgress(p => p >= 100 ? 0 : p + 1);
  }, 50);
  return () => clearInterval(timer);
}, []);

<CircularProgress 
  progress={progress}
  size={140}
  showLabel={true}
/>
```

**Best for:**
- Upload/download progress
- Task completion
- Timer displays

#### Linear Progress
```tsx
<LinearProgress 
  progress={75}
  width={400}
  height={12}
  showLabel={true}
/>
```

**Features:**
- Shimmer effect
- Gradient fill
- Smooth transitions

#### Step Progress
```tsx
const [step, setStep] = useState(1);

<StepProgress 
  currentStep={step}
  totalSteps={5}
  size={500}
/>

<button onClick={() => setStep(s => Math.min(5, s + 1))}>
  Next Step
</button>
```

**Best for:**
- Multi-step forms
- Onboarding flows
- Checkout processes

### 5. Notifications

#### Notification Badge
```tsx
const [notificationCount, setCount] = useState(0);

<div style={{ position: 'relative' }}>
  <BellIcon />
  {notificationCount > 0 && (
    <div style={{ position: 'absolute', top: -10, right: -10 }}>
      <NotificationBadge 
        count={notificationCount}
        size={24}
      />
    </div>
  )}
</div>
```

**Features:**
- Pulse animation
- Sparkle effects
- 99+ overflow handling

#### Bell Notification
```tsx
<BellNotification 
  hasNotification={hasUnread}
  size={80}
/>
```

**Features:**
- Ring animation
- Sound waves
- Notification dot

### 6. Data Visualization

#### Animated Bar Chart
```tsx
const data = [45, 78, 62, 90, 55, 88, 70];

<AnimatedBarChart 
  data={data}
  width={500}
  height={300}
  maxValue={100}  // Optional, auto-calculated if not provided
/>
```

**Features:**
- Staggered entry animation
- Hover effects
- Grid lines
- Value labels

#### Animated Line Chart
```tsx
const data = [30, 45, 35, 60, 50, 75, 65, 85];

<AnimatedLineChart 
  data={data}
  width={500}
  height={300}
/>
```

**Features:**
- Path drawing animation
- Gradient fill
- Interactive points
- Glow effect

#### Animated Donut Chart
```tsx
const data = [
  { value: 35, label: 'Design', color: '#667eea' },
  { value: 28, label: 'Development', color: '#764ba2' },
  { value: 22, label: 'Marketing', color: '#f093fb' },
  { value: 15, label: 'Other', color: '#4facfe' },
];

<AnimatedDonutChart 
  data={data}
  size={300}
/>
```

**Features:**
- Staggered slice animation
- Hover scaling
- Percentage labels
- Center total

### 7. Background Effects

#### Floating Orbs
```tsx
<div style={{ position: 'relative', height: '100vh' }}>
  <FloatingOrbs count={8} />
  <div style={{ position: 'relative', zIndex: 1 }}>
    {/* Your content */}
  </div>
</div>
```

**Configuration:**
- Adjust `count` for density
- Orbs move in continuous loops
- Glow effect for depth

#### Animated Waves
```tsx
<div style={{ position: 'relative', height: '400px' }}>
  <AnimatedWaves layers={3} />
</div>
```

**Best for:**
- Footer sections
- Hero backgrounds
- Page dividers

#### Gradient Mesh
```tsx
<div style={{ position: 'relative', minHeight: '100vh' }}>
  <GradientMesh />
  <div style={{ position: 'relative', zIndex: 1 }}>
    {/* Your content */}
  </div>
</div>
```

**Best for:**
- Hero sections
- Full-page backgrounds
- Landing pages

### 8. Morphing Shapes

#### Simple Morph
```tsx
const [state, setState] = useState(0);

<SimpleMorph morphState={state} />

<button onClick={() => setState(s => (s + 1) % 4)}>
  Morph Shape
</button>
```

**Shapes:**
- Circle (0)
- Square (1)
- Triangle (2)
- Star (3)

#### Blob Morph
```tsx
<BlobMorph />
```

**Features:**
- Automatic continuous morphing
- Goo filter effect
- Organic shapes

#### Liquid Button
```tsx
<LiquidButton 
  text="Click Me"
  onClick={() => console.log('Clicked!')}
/>
```

**Features:**
- Morph on hover
- Gradient background
- Spring physics

## Animation Patterns

### 1. Staggered Children

```tsx
import { motion } from 'framer-motion';
import { stagger, variants } from '@/utils/motionConfig';

const container = {
  animate: {
    transition: stagger.normal
  }
};

function List() {
  return (
    <motion.div variants={container} animate="animate">
      {items.map(item => (
        <motion.div key={item.id} variants={variants.fadeIn}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 2. Orchestrated Sequence

```tsx
import { motion } from 'framer-motion';
import { springs } from '@/utils/motionConfig';

function Sequence() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.default }}
      >
        First
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.default, delay: 0.2 }}
      >
        Second
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.default, delay: 0.4 }}
      >
        Third
      </motion.div>
    </>
  );
}
```

### 3. Exit Animations

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from '@/utils/motionConfig';

function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={variants.scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="modal-content">
            {/* Modal content */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Advanced Techniques

### Custom Spring Configuration

```tsx
const customSpring = {
  type: "spring",
  stiffness: 300,  // Higher = faster
  damping: 25,     // Higher = less bounce
  mass: 0.8,       // Higher = more momentum
};

<motion.div
  animate={{ x: 100 }}
  transition={customSpring}
/>
```

### Gesture Animations

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
/>
```

### Scroll-Triggered Animations

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

function ScrollAnimation() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  return (
    <motion.div
      style={{ opacity, scale }}
    >
      Scroll to see effect
    </motion.div>
  );
}
```

## Performance Optimization

### 1. Use will-change Sparingly

```tsx
// ❌ Bad - always on
<motion.div style={{ willChange: 'transform' }} />

// ✅ Good - only during animation
<motion.div
  whileHover={{ willChange: 'transform' }}
  animate={{ willChange: 'auto' }}
/>
```

### 2. Optimize Heavy Components

```tsx
import { memo } from 'react';

const HeavyComponent = memo(({ data }) => {
  return <AnimatedBarChart data={data} />;
});
```

### 3. Reduce Motion for Accessibility

```tsx
import { prefersReducedMotion } from '@/utils/accessibility';

function Component() {
  const shouldReduce = prefersReducedMotion();
  
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={shouldReduce ? { duration: 0.01 } : springs.default}
    />
  );
}
```

## Troubleshooting

### Animation Not Starting

**Problem:** Component renders but doesn't animate

**Solution:**
```tsx
// ❌ Missing initial state
<motion.div animate={{ opacity: 1 }} />

// ✅ Include initial state
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

### Jerky Animations

**Problem:** Animation stutters or lags

**Solutions:**
1. Check you're only animating `transform` and `opacity`
2. Reduce the number of simultaneous animations
3. Use `transform` instead of `left`/`top`
4. Check browser DevTools Performance tab

### SVG Path Not Morphing Smoothly

**Problem:** Shape morph looks glitchy

**Solution:**
- Ensure paths have the same number of points
- Use compatible path commands
- Consider using GSAP for complex morphing

### TypeScript Errors

**Problem:** Type errors with motion components

**Solution:**
```tsx
// Add type annotation
const MyComponent: React.FC<{ size: number }> = ({ size }) => {
  return <AnimatedLogo size={size} />;
};
```

---

For more examples, check out the demo application by running `npm run dev`!






