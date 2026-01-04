# 📋 WHICH JSON FILE DO I USE?

## 🎯 Quick Decision Guide

```
┌─────────────────────────────────────────────────┐
│  What do you want to do?                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  🎨 Use the animation library in code          │
│     ➜ animation-library.json                   │
│     ➜ animation-presets.json (simpler)         │
│                                                 │
│  📸 Build the Autoya success animation         │
│     ➜ autoya-animation-spec.json               │
│                                                 │
│  📱 Send to iOS/Android/Flutter developers     │
│     ➜ autoya-success-animation-motion.json     │
│                                                 │
│  🎬 Preview animations in browser              │
│     ➜ Use CODESANDBOX_PREVIEW.tsx              │
│                                                 │
│  📦 Build/install the project                  │
│     ➜ package.json                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📁 File Breakdown

### ⭐ **PRIMARY FILES** (Use These!)

#### 1. `animation-library.json` (896 lines)
**WHEN TO USE**: Implementing animations in your app
```json
{
  "$schema": "...",
  "library": {
    "springs": { ... },
    "easings": { ... },
    "variants": { ... },
    "presets": { ... }
  }
}
```
✅ Complete library with JSON schema  
✅ All springs, easings, variants, presets  
✅ Documentation included  
✅ Type-safe with schema validation  

**USE FOR**:
- React/React Native implementation
- TypeScript projects
- Schema validation
- Complete documentation

---

#### 2. `animation-presets.json` (571 lines)
**WHEN TO USE**: Quick reference or simpler imports
```json
{
  "meta": { ... },
  "springs": { ... },
  "easings": { ... }
}
```
✅ Cleaner, no schema overhead  
✅ Same data as animation-library  
✅ Easier to read  

**USE FOR**:
- Quick lookups
- JavaScript projects (no schema needed)
- Copy-paste into other tools

---

#### 3. `autoya-animation-spec.json`
**WHEN TO USE**: Building the Autoya logo success animation
```json
{
  "name": "Autoya Success Animation",
  "duration": 1500,
  "fps": 60,
  "totalFrames": 90,
  "shapes": [ ... ],
  "timeline": [ ... ]
}
```
✅ Frame-by-frame specification  
✅ Camera sync timing (300ms)  
✅ 5-phase animation breakdown  
✅ SVG path data included  

**USE FOR**:
- Implementing the exact Autoya success animation
- Understanding the timeline phases
- Camera overlay integration

---

#### 4. `autoya-success-animation-motion.json`
**WHEN TO USE**: Sending to mobile/cross-platform developers
```json
{
  "motion": {
    "timeline": [ ... ],
    "elements": [ ... ],
    "platform": "universal"
  }
}
```
✅ Platform-ready format  
✅ iOS/Android/Flutter compatible  
✅ Includes easing curves  
✅ Ready for native implementation  

**USE FOR**:
- iOS Swift/SwiftUI implementation
- Android Kotlin/Compose implementation
- Flutter Dart implementation
- Unity/Unreal Engine

---

### 🎨 **MOTION STUDIO VARIANTS** (Alternative Branding)

#### 5-7. `motion-studio-*.json`
Same content as `autoya-*.json` but branded as "Motion Studio"

**USE WHEN**: You want "Motion Studio" branding instead of "Autoya"

---

### 📦 **BUILD/CONFIG FILES** (Don't Edit These!)

#### 8. `package.json`
Node.js project configuration - dependencies, scripts

#### 9. `package-react-native.json`
React Native specific setup

#### 10. `animations-EXPORTED.json`
Auto-generated export data

#### 11-12. `autoya-simple.json`, `autoya-success-animation.json`
Alternative/legacy formats

---

## 🚀 Quick Start by Use Case

### Frontend Developer (React/Web)
```bash
1. Use: animation-library.json
2. Import in TypeScript
3. Apply to Framer Motion components
```

### Mobile Developer (iOS/Android)
```bash
1. Use: autoya-success-animation-motion.json
2. Parse JSON
3. Implement native animations
```

### Designer
```bash
1. Use: autoya-animation-spec.json
2. Review timing/phases
3. Export to design tools
```

### Quick Browser Preview
```bash
1. Open: CODESANDBOX_PREVIEW.tsx
2. Upload to CodeSandbox
3. See all animations live!
```

---

## 📊 Feature Comparison

| Feature | animation-library.json | animation-presets.json | autoya-animation-spec.json |
|---------|----------------------|----------------------|--------------------------|
| Complete library | ✅ | ✅ | ❌ |
| JSON Schema | ✅ | ❌ | ❌ |
| All springs | ✅ | ✅ | ❌ |
| All easings | ✅ | ✅ | ✅ (subset) |
| All variants | ✅ | ✅ | ❌ |
| Autoya timeline | ❌ | ❌ | ✅ |
| Frame-by-frame | ❌ | ❌ | ✅ |
| SVG paths | ❌ | ❌ | ✅ |
| Camera sync | ❌ | ❌ | ✅ |
| Platform-ready | ❌ | ❌ | ✅ |
| Size | 896 lines | 571 lines | 238 lines |

---

## 🎯 Decision Tree

```
START
  |
  ├─ Need the FULL animation library?
  │   ├─ Yes, with schema validation
  │   │   └─ animation-library.json ✅
  │   └─ Yes, but simpler format
  │       └─ animation-presets.json ✅
  |
  ├─ Need the AUTOYA SUCCESS animation?
  │   ├─ For implementation (spec)
  │   │   └─ autoya-animation-spec.json ✅
  │   └─ For mobile devs (motion)
  │       └─ autoya-success-animation-motion.json ✅
  |
  └─ Want to SEE animations in action?
      └─ CODESANDBOX_PREVIEW.tsx ✅
```

---

## 💡 Pro Tips

### ✅ Best Practices

1. **For Development**: Use `animation-library.json`
   - Most complete
   - Schema validation
   - Type-safe

2. **For Documentation**: Use `animation-presets.json`
   - Cleaner format
   - Easier to read
   - No schema noise

3. **For Specific Animation**: Use `autoya-animation-spec.json`
   - Detailed timeline
   - Frame-by-frame data
   - Camera sync info

4. **For Cross-Platform**: Use `autoya-success-animation-motion.json`
   - Platform-agnostic
   - Ready for native code
   - Universal format

### 🚫 Avoid

- ❌ Don't edit multiple JSON files
- ❌ Don't use legacy/simple formats for production
- ❌ Don't manually edit exported files
- ❌ Don't mix Motion Studio and Autoya variants

---

## 📚 Related Files

### Documentation
- `ANIMATION_LIBRARY_GUIDE.md` - Complete guide
- `ANIMATION_LIBRARY_QUICK_REF.md` - Quick reference
- `CODESANDBOX_SETUP.md` - Browser preview setup

### Code
- `CODESANDBOX_PREVIEW.tsx` - Visual showcase
- `src/utils/animationPresets.ts` - TypeScript implementation
- `export-motion-json.js` - JSON export script

---

## 🆘 Still Confused?

### Common Questions

**Q: Which file has the most complete data?**  
A: `animation-library.json` (896 lines, with schema)

**Q: Which file is easiest to read?**  
A: `animation-presets.json` (571 lines, clean format)

**Q: Which file for the logo animation?**  
A: `autoya-animation-spec.json` (has timeline & frames)

**Q: Which file to send developers?**  
A: `autoya-success-animation-motion.json` (platform-ready)

**Q: How do I preview everything?**  
A: Use `CODESANDBOX_PREVIEW.tsx` in CodeSandbox

---

## ✨ Summary

```
┌────────────────────────────────────┐
│  RECOMMENDED FOR MOST USERS:      │
│                                    │
│  1. animation-library.json         │
│     (Complete animation library)   │
│                                    │
│  2. CODESANDBOX_PREVIEW.tsx        │
│     (Visual preview)               │
│                                    │
│  3. autoya-animation-spec.json     │
│     (Specific logo animation)      │
└────────────────────────────────────┘
```

**Need more help?** Read `START_HERE.md` or `ANIMATION_LIBRARY_GUIDE.md`

---

🎉 **You're all set!**

