# 🚀 CodeSandbox Setup Guide

## Quick Start: View ALL Animations in CodeSandbox

### Method 1: Import to CodeSandbox (Easiest)

1. **Go to CodeSandbox**: https://codesandbox.io
2. **Click "Import"** or **"Create Sandbox"**
3. **Choose "Import from GitHub"** or drag/drop your project folder
4. CodeSandbox will auto-detect React and install dependencies

### Method 2: Manual Setup

1. **Create New React + TypeScript Sandbox**
   - Go to https://codesandbox.io/s/
   - Choose "React TypeScript" template

2. **Upload Required Files**
   ```
   src/
     ├── CODESANDBOX_PREVIEW.tsx  ← Main preview component
     ├── utils/
     │   └── animationPresets.ts   ← Animation library
     └── App.tsx                    ← Update to import preview
   ```

3. **Install Dependencies**
   ```json
   {
     "dependencies": {
       "react": "^18.3.1",
       "react-dom": "^18.3.1",
       "framer-motion": "^11.0.3"
     }
   }
   ```

4. **Update App.tsx**
   ```tsx
   import MotionAutoyaPreview from './CODESANDBOX_PREVIEW';
   
   function App() {
     return <MotionAutoyaPreview />;
   }
   
   export default App;
   ```

5. **Hit Save** - CodeSandbox auto-runs!

---

## 📦 Files You Need

### Essential Files:
- ✅ `CODESANDBOX_PREVIEW.tsx` - Complete animation showcase
- ✅ `src/utils/animationPresets.ts` - Animation configuration library
- ✅ `package.json` - Dependencies (React, Framer Motion)

### Optional (for full features):
- `animation-library.json` - JSON animation data
- `animation-presets.json` - Simplified presets
- `autoya-animation-spec.json` - Autoya logo animation specs

---

## 🎯 What You'll See

Your CodeSandbox preview includes:

### 🌊 **14 Interactive Sections**

1. **Liquid Glass Effects** - Frosted blur effects
2. **Interactive Buttons** - Bouncy, subtle, icon buttons
3. **Interactive Cards** - Hover lift effects
4. **Modal & Overlays** - Backdrop blur modals
5. **Slide Animations** - All 4 directions
6. **Staggered Lists** - Sequential item animations
7. **Fade Animations** - Smooth opacity transitions
8. **SVG Path Drawing** - Checkmark animations
9. **Camera Success (700ms)** - Fast responsive animation
10. **Premium Success (1500ms)** - Slower, quality animation
11. **Spring Comparison** - All 6 spring types side-by-side
12. **Expand/Collapse** - Accordion animations
13. **Scale Animations** - Zoom in/out effects
14. **Rotation Animations** - Smooth rotations

### ⚡ **Performance Features**
- 60fps GPU-accelerated
- Respects `prefers-reduced-motion`
- WCAG 2.1 compliant
- Apple's Motion Principles

---

## 🔧 Troubleshooting

### "Cannot find module 'framer-motion'"
**Solution**: Install dependencies
```bash
npm install framer-motion
```

### "Cannot find './utils/animationPresets'"
**Solution**: Make sure you have these files:
- `src/utils/animationPresets.ts`
- Import path matches your folder structure

### Animations not smooth
**Solution**: 
- CodeSandbox may throttle performance in free tier
- Try "Open in New Window" for full speed
- Check browser console for errors

---

## 📱 Share Your Preview

Once running in CodeSandbox:

1. **Click "Share"** button (top right)
2. **Copy link** 
3. **Send to anyone** - No login required to view!

Example link format:
```
https://codesandbox.io/s/your-sandbox-id
```

---

## 🎨 Customize It

### Change Colors
In `CODESANDBOX_PREVIEW.tsx`, search for gradients:
```tsx
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Add Your Logo
Replace SVG viewBox and paths in the Camera Success sections

### Adjust Timing
Import from `animationPresets.ts`:
```tsx
import { springs, durations } from './utils/animationPresets';
```

---

## 📚 Full Documentation

- **Animation Library Guide**: `ANIMATION_LIBRARY_GUIDE.md`
- **Quick Reference**: `ANIMATION_LIBRARY_QUICK_REF.md`
- **Export Guide**: `EXPORT_GUIDE.md`
- **Liquid Glass**: `LIQUID_GLASS_PRINCIPLES.md`

---

## 🎬 Next Steps

### For Developers:
1. **Explore the preview** - Click all the buttons!
2. **View source code** - See how each animation works
3. **Copy snippets** - Use in your projects
4. **Read docs** - Deep dive into the library

### For Designers:
1. **Test timing** - See what feels right
2. **Adjust springs** - Tweak stiffness/damping
3. **Export specs** - Use `animation-library.json`

### For Product Managers:
1. **Share link** - With stakeholders
2. **Get feedback** - On animation styles
3. **Choose presets** - For your product

---

## 💡 Pro Tips

✨ **CodeSandbox Features:**
- **Live editing** - Changes update instantly
- **Console access** - Bottom panel for debugging
- **Mobile preview** - Test on different screens
- **Export code** - Download as ZIP

🚀 **Performance:**
- Animations use GPU acceleration
- All transforms are optimized
- No layout thrashing
- 60fps on modern browsers

🎯 **Accessibility:**
- All animations respect user preferences
- Keyboard navigation works
- Screen reader friendly
- WCAG 2.1 AA compliant

---

## ❤️ Built With

- **React 18.3** - UI framework
- **Framer Motion 11.0** - Animation library
- **TypeScript 5.4** - Type safety
- **Apple's Motion Principles** - Design guidelines

---

## 🆘 Need Help?

1. Check the `/docs` folder for detailed guides
2. Read `START_HERE.md` for project overview
3. View `ANIMATION_LIBRARY_GUIDE.md` for API reference
4. See `EXPORT_GUIDE.md` for export options

---

**Happy Animating! 🎨✨**

