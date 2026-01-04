# 🚀 Animation Presets - Copy & Paste Templates

**Ready-to-use code snippets for common animations**

Just copy, paste, and customize!

---

## 📦 Setup

### React/TypeScript
```tsx
import { motion } from 'framer-motion';
import { 
  springs, 
  durations, 
  easings, 
  variants, 
  interactionStates,
  stagger,
  colors 
} from '@/utils/animationPresets';
```

---

## 🎨 Basic Animations

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={springs.default}
>
  Content
</motion.div>
```

### Scale In (Modal/Card)
```tsx
<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={springs.gentle}
>
  Modal Content
</motion.div>
```

### Liquid Glass Effect (Premium)
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={springs.bouncy}
>
  Premium Content
</motion.div>
```

---

## 🖱️ Interactive Elements

### Primary Button
```tsx
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={springs.bouncy}
  className="btn-primary"
>
  Click Me
</motion.button>
```

### Secondary Button (Subtle)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.stiff}
  className="btn-secondary"
>
  Secondary
</motion.button>
```

### Icon Button
```tsx
<motion.button
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.9 }}
  transition={springs.stiff}
  className="btn-icon"
>
  🎨
</motion.button>
```

### Interactive Card
```tsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.default}
  className="card"
>
  Card Content
</motion.div>
```

---

## 📱 Slide Animations

### Notification (from top)
```tsx
<motion.div
  initial={{ y: "-100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: "-100%", opacity: 0 }}
  transition={springs.stiff}
  className="notification"
>
  Notification Message
</motion.div>
```

### Drawer (from bottom)
```tsx
<motion.div
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: "100%", opacity: 0 }}
  transition={springs.gentle}
  className="drawer"
>
  Drawer Content
</motion.div>
```

### Sidebar (from right)
```tsx
<motion.div
  initial={{ x: "100%", opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: "100%", opacity: 0 }}
  transition={springs.default}
  className="sidebar"
>
  Sidebar Content
</motion.div>
```

### Menu (from left)
```tsx
<motion.div
  initial={{ x: "-100%", opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: "-100%", opacity: 0 }}
  transition={springs.default}
  className="menu"
>
  Menu Items
</motion.div>
```

---

## 🪟 Modal with Backdrop

```tsx
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: durations.fast }}
        className="modal-backdrop"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={springs.gentle}
        className="modal"
      >
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </>
  );
};
```

---

## 📜 Staggered Lists

```tsx
const container = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    }
  }
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

<motion.ul
  variants={container}
  initial="initial"
  animate="animate"
>
  {items.map((item, index) => (
    <motion.li
      key={index}
      variants={item}
      transition={springs.stiff}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

---

## 📏 Expand/Collapse (Accordion)

```tsx
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={springs.default}
          style={{ originY: 0 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
```

---

## ✏️ SVG Path Drawing

### Circle Progress
```tsx
<svg width="100" height="100" viewBox="0 0 100 100">
  <motion.circle
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke={colors.success.solid}
    strokeWidth="4"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1.5, ease: easings.decelerate }}
  />
</svg>
```

### Checkmark
```tsx
<svg width="100" height="100" viewBox="0 0 100 100">
  <motion.path
    d="M 20 50 L 40 70 L 80 30"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.35, ease: easings.easeOutQuad }}
  />
</svg>
```

---

## 📸 Camera Success Animation

### Fast Version (700ms)
```tsx
import { cameraSuccessTimeline, colors, easings } from '@/utils/animationPresets';

const CameraSuccess = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const { recognition, convergence, beat, green, checkmark } = cameraSuccessTimeline;
  
  const trigger = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };
  
  return (
    <>
      <button onClick={trigger}>Take Photo</button>
      
      <svg width="160" height="160" viewBox="0 0 59 61">
        {/* Success Circle */}
        <motion.circle
          cx="29.27"
          cy="30.5"
          r="5.2"
          initial={{ fill: '#FFFFFF' }}
          animate={isAnimating ? {
            fill: colors.success.solid,
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: green.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration) / 1000,
          }}
        />
        
        {/* Checkmark */}
        <motion.path
          d="M 26.5 30.5 L 28.5 32.8 L 32 28.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: checkmark.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration + green.duration) / 1000,
            ease: easings.easeOutQuad,
          }}
        />
      </svg>
    </>
  );
};
```

---

## 🎭 Page Transitions

### Using Framer Motion's AnimatePresence
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={springs.default}
  >
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

---

## 🎨 Loading States

### Spinner
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
  className="spinner"
/>
```

### Pulse
```tsx
<motion.div
  animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="pulse"
/>
```

### Skeleton Loading
```tsx
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="skeleton"
/>
```

---

## 📊 Progress Bars

### Animated Progress
```tsx
<motion.div
  initial={{ scaleX: 0 }}
  animate={{ scaleX: progress / 100 }}
  transition={springs.default}
  style={{ originX: 0 }}
  className="progress-bar"
/>
```

---

## ♿ Accessibility (Reduced Motion)

### Complete Template with Reduced Motion Support
```tsx
import { useReducedMotion } from 'framer-motion';

const AnimatedComponent = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : springs.default}
    >
      Content
    </motion.div>
  );
};
```

---

## 🎯 Common Combinations

### Hero Section Entry
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={springs.gentle}
  className="hero"
>
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...springs.default, delay: 0.2 }}
  >
    Hero Title
  </motion.h1>
  
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...springs.default, delay: 0.4 }}
  >
    Hero description
  </motion.p>
  
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...springs.default, delay: 0.6 }}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    Call to Action
  </motion.button>
</motion.div>
```

### Card Grid with Stagger
```tsx
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

<motion.div
  variants={containerVariants}
  initial="initial"
  animate="animate"
  className="card-grid"
>
  {cards.map((card) => (
    <motion.div
      key={card.id}
      variants={cardVariants}
      transition={springs.default}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card"
    >
      {card.content}
    </motion.div>
  ))}
</motion.div>
```

### Toast Notification System
```tsx
const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={springs.stiff}
    className="toast"
  >
    <span>{message}</span>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
    >
      ×
    </motion.button>
  </motion.div>
);

// Usage with AnimatePresence
<AnimatePresence>
  {toasts.map(toast => (
    <Toast key={toast.id} {...toast} />
  ))}
</AnimatePresence>
```

---

## 💾 Save These Patterns

Copy this entire file to your project for quick reference!

Each snippet is:
✅ Production-ready  
✅ Uses presets correctly  
✅ Includes accessibility  
✅ Follows best practices  
✅ Copy-paste ready  

---

**More Examples**: See `src/AnimationPresetsDemo.tsx` for 12 complete working demos!

**Full Guide**: See `ANIMATION_PRESETS_GUIDE.md` for platform-specific implementations!



