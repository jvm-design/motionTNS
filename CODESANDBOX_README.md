# 🎨 Motion Autoya - Animation Preview

**Live preview of ALL animations** - Click buttons to see them in action!

## ✨ What's Inside

This CodeSandbox demonstrates **14 different animation categories** with **50+ interactive examples**.

### 🎬 Animations You Can Preview:

| Category | What It Shows |
|----------|---------------|
| 🌊 Liquid Glass | Frosted glass effects with blur & opacity |
| 🎯 Interactive Buttons | Bouncy, subtle, and icon hover states |
| 🎴 Interactive Cards | Lift effects with shadows |
| 📱 Modals & Overlays | Scale-in with backdrop blur |
| 🎬 Slide Animations | All 4 directions (up, down, left, right) |
| 📝 Staggered Lists | Sequential item reveals |
| ✨ Fade Animations | Smooth opacity transitions |
| 🎨 SVG Path Drawing | Checkmark & circle animations |
| 📸 Camera Success (700ms) | Fast responsive feedback |
| 💎 Premium Success (1500ms) | Slower, quality animation |
| ⚡ Spring Comparison | All 6 spring types side-by-side |
| 📊 Expand/Collapse | Accordion animations |
| 🔄 Scale Animations | Zoom in/out effects |
| 🌀 Rotation Animations | Smooth 180° rotations |

## 🚀 Quick Start

### Already in CodeSandbox?
**Just scroll and click buttons!** Everything is interactive.

### Want to Use in Your Project?

1. **Install Framer Motion**:
   ```bash
   npm install framer-motion
   ```

2. **Copy the animation presets**:
   ```tsx
   import { springs, variants, easings } from './utils/animationPresets';
   ```

3. **Use in your components**:
   ```tsx
   <motion.div
     {...variants.liquidGlass}
     transition={springs.bouncy}
   >
     Your content
   </motion.div>
   ```

## 📚 Files in This Sandbox

```
src/
├── CODESANDBOX_PREVIEW.tsx      ← Main showcase component
├── CODESANDBOX_APP.tsx          ← App entry point
├── utils/
│   └── animationPresets.ts      ← Animation library (springs, easings, variants)
└── App.tsx                      ← Your current file
```

## 🎯 Spring Types Available

| Spring | Use Case | Feel |
|--------|----------|------|
| **stiff** | Immediate feedback | Quick & responsive |
| **default** | General purpose | Balanced & natural |
| **bouncy** | Buttons, interactions | Playful & energetic |
| **gentle** | Modals, large elements | Smooth & calm |
| **wobbly** | Decorative animations | Exaggerated bounce |
| **cameraSpring** | Camera sync | 1.5% overshoot |

## 💎 Featured: Apple's Motion Principles

Every animation follows **Apple's Human Interface Guidelines**:

✅ **Responsive & Natural** - Spring-based physics  
✅ **Fluid & Continuous** - Smooth transitions  
✅ **Contextual & Purposeful** - Guides attention  
✅ **Subtle & Refined** - Noticeable but not distracting  
✅ **Spatial Awareness** - Respects relationships  

## ⚡ Performance

- **60fps** on all modern browsers
- **GPU-accelerated** (transform + opacity only)
- **No layout thrashing** or repaints
- **Respects `prefers-reduced-motion`**
- **WCAG 2.1 AA compliant**

## 🎨 Customization

### Change Colors
Search for gradients in `CODESANDBOX_PREVIEW.tsx`:
```tsx
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Adjust Timing
Edit `animationPresets.ts`:
```typescript
stiff: {
  type: "spring",
  stiffness: 500,  // ← Increase for faster
  damping: 35,     // ← Increase for less bounce
  mass: 0.5        // ← Decrease for lighter feel
}
```

### Create Custom Variants
```tsx
const myVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

<motion.div variants={myVariant} />
```

## 📖 Learn More

### Full Documentation (in project repo):
- `ANIMATION_LIBRARY_GUIDE.md` - Complete API reference
- `ANIMATION_LIBRARY_QUICK_REF.md` - Quick lookup
- `LIQUID_GLASS_PRINCIPLES.md` - Glassmorphism guide
- `EXPORT_GUIDE.md` - Export to video/JSON/Lottie

### JSON Exports Available:
- `animation-library.json` - Complete library with schema
- `animation-presets.json` - Simplified presets
- `autoya-animation-spec.json` - Autoya logo specs

## 🎬 Example Usage

### Basic Animation
```tsx
import { motion } from 'framer-motion';
import { springs, variants } from './utils/animationPresets';

const MyComponent = () => (
  <motion.div
    {...variants.fadeIn}
    transition={springs.default}
  >
    Hello World
  </motion.div>
);
```

### Interactive Button
```tsx
import { interactionStates } from './utils/animationPresets';

const MyButton = () => (
  <motion.button
    {...interactionStates.buttonHover}
  >
    Click Me
  </motion.button>
);
```

### Staggered List
```tsx
import { stagger, variants, springs } from './utils/animationPresets';

const MyList = () => (
  <motion.ul
    variants={{ animate: { transition: stagger.normal } }}
    initial="initial"
    animate="animate"
  >
    {items.map((item, i) => (
      <motion.li
        key={i}
        {...variants.fadeIn}
        transition={springs.stiff}
      >
        {item}
      </motion.li>
    ))}
  </motion.ul>
);
```

## 🆘 Troubleshooting

**Animations not showing?**
- Check browser console for errors
- Ensure Framer Motion is installed
- Verify import paths are correct

**Performance issues?**
- CodeSandbox free tier may throttle
- Click "Open in New Window" for full speed
- Check if GPU acceleration is enabled

**Import errors?**
- Make sure all files are in correct folders
- Check that `animationPresets.ts` exists in `src/utils/`

## 🌟 Use Cases

### Perfect For:
- ✅ Product demos & prototypes
- ✅ Design system showcases
- ✅ Animation testing & iteration
- ✅ Developer handoff documentation
- ✅ Client presentations
- ✅ UI/UX portfolio pieces

### Works With:
- React / React Native
- Next.js / Gatsby
- TypeScript / JavaScript
- iOS (SwiftUI)
- Android (Compose)
- Flutter

## 📱 Share This Sandbox

1. Click **"Share"** button (top right)
2. Copy the link
3. Send to anyone - no login required!

## 💡 Pro Tips

🎯 **Testing**: Click each button multiple times to see consistency  
⚡ **Performance**: Open DevTools → Performance tab to see 60fps  
🎨 **Customization**: Fork this sandbox to experiment  
📱 **Mobile**: Use the preview panel to test on phones  
🔍 **Inspect**: Right-click → Inspect to see the code  

## 🛠 Tech Stack

- **React 18.3** - UI framework
- **Framer Motion 11.0** - Animation engine
- **TypeScript 5.4** - Type safety
- **Apple's Motion Principles** - Design foundation

## 📄 License

MIT License - Use freely in your projects!

---

## 🎉 You're Ready!

**Scroll through the preview and click all the buttons!**

Each section is interactive and shows real animations based on Apple's motion principles.

**Questions?** Check the documentation files in the repo or explore the source code.

**Happy Animating! ✨**

---

Built with ❤️ by the Motion Autoya team

