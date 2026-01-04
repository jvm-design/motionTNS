# Quick Start Guide 🚀

Get Motion Studio up and running in 3 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18.3
- Framer Motion 11.0
- GSAP 3.12
- TypeScript 5.4
- Vite 5.2

## Step 2: Start the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Step 3: Explore the Components

Open your browser and navigate through the different sections:

1. **Overview** - Learn about the system
2. **Logos & Branding** - Animated logos with path drawing
3. **Loading States** - Spinners and loading indicators
4. **Interactive Buttons** - Hearts, menus, play/pause, checkmarks
5. **Progress Indicators** - Circular, linear, and step progress
6. **Notifications** - Badges and bell notifications
7. **Data Visualization** - Bar, line, and donut charts
8. **Background Effects** - Floating orbs, waves, gradients
9. **Morphing Shapes** - Fluid shape transformations

## Using Components in Your Own Project

### 1. Copy the Components You Need

```bash
# Copy a specific component
cp src/components/SVGAnimations/Logo.tsx your-project/components/

# Copy utilities
cp src/utils/motionConfig.ts your-project/utils/
cp src/utils/accessibility.ts your-project/utils/
```

### 2. Install Required Dependencies

```bash
cd your-project
npm install framer-motion gsap @react-spring/web
```

### 3. Import and Use

```tsx
import { AnimatedLogo } from './components/Logo';

function App() {
  return (
    <div>
      <AnimatedLogo size={120} />
    </div>
  );
}
```

## Key Files

- **Components**: `src/components/SVGAnimations/*.tsx`
- **Motion Config**: `src/utils/motionConfig.ts`
- **Accessibility**: `src/utils/accessibility.ts`
- **Documentation**: `APPLE_MOTION_PRINCIPLES.md`
- **Usage Examples**: `USAGE_GUIDE.md`

## Common Commands

```bash
# Development
npm run dev         # Start dev server

# Production
npm run build       # Build for production
npm run preview     # Preview production build

# Code Quality
npm run lint        # Run ESLint
```

## Customization

### Change Colors

Edit the gradients in individual component files:

```tsx
// In Logo.tsx (or any component)
<linearGradient id="gradient1">
  <stop offset="0%" stopColor="#your-color-1" />
  <stop offset="100%" stopColor="#your-color-2" />
</linearGradient>
```

### Adjust Spring Physics

Edit `src/utils/motionConfig.ts`:

```ts
export const springs = {
  default: {
    stiffness: 380,  // Increase for faster motion
    damping: 30,     // Increase for less bounce
    mass: 0.8,       // Increase for more weight
  },
  // Add your own presets
  custom: {
    stiffness: 400,
    damping: 25,
    mass: 0.6,
  },
};
```

### Create New Animations

Follow the pattern in existing components:

```tsx
import { motion } from 'framer-motion';
import { springs } from '@/utils/motionConfig';

export const MyAnimation = ({ size = 100 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={springs.bouncy}
    >
      {/* Your SVG content */}
    </motion.svg>
  );
};
```

## Performance Tips

✅ **Do:**
- Animate `transform` and `opacity` only
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`
- Test on actual devices

❌ **Don't:**
- Animate `width`, `height`, `top`, `left`
- Stack too many animations
- Ignore performance warnings
- Forget accessibility

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 📚 Check the [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- 🎨 Review [APPLE_MOTION_PRINCIPLES.md](./APPLE_MOTION_PRINCIPLES.md)
- 🐛 Open an issue on GitHub

## Next Steps

1. Explore all sections in the demo
2. Read the Apple Motion Principles document
3. Check out the Usage Guide for detailed examples
4. Start building your own animated components!

---

Happy animating! ✨






