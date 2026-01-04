# 📊 Animation Library Visual Summary

Quick visual reference for all available animations and configurations.

## 🎯 Quick Access

```bash
npm run export:animations  # Export to JSON
```

```javascript
import animations from './animation-library.json'
const lib = animations.library
```

---

## 🔧 Configuration Categories

### 📍 Springs (6 configs)

```
┌──────────────┬──────────┬─────────┬──────┬────────────────────┐
│ Name         │ Stiff    │ Damping │ Mass │ Use For            │
├──────────────┼──────────┼─────────┼──────┼────────────────────┤
│ default      │ 380      │ 30      │ 0.8  │ ⚖️  General UI      │
│ bouncy       │ 300      │ 20      │ 0.8  │ 🎾 Buttons          │
│ stiff        │ 500      │ 35      │ 0.5  │ ⚡ Hover            │
│ gentle       │ 200      │ 30      │ 1.0  │ 🌊 Modals           │
│ wobbly       │ 250      │ 15      │ 1.0  │ 🎉 Success          │
│ cameraSpring │ 340      │ 28      │ 0.7  │ 📷 Camera           │
└──────────────┴──────────┴─────────┴──────┴────────────────────┘
```

### ⏱️ Durations (8 presets)

```
┌─────────┬───────┬────────┬────────────────────────┐
│ Name    │ Sec   │ MS     │ Use For                │
├─────────┼───────┼────────┼────────────────────────┤
│ instant │ 0.1s  │ 100ms  │ Tooltips              │
│ quick   │ 0.2s  │ 200ms  │ Hover                 │
│ fast    │ 0.3s  │ 300ms  │ Buttons               │
│ normal  │ 0.4s  │ 400ms  │ Modals                │
│ slow    │ 0.6s  │ 600ms  │ Transitions           │
│ slower  │ 0.8s  │ 800ms  │ Emphasis              │
│ camera  │ 0.7s  │ 700ms  │ Camera feedback       │
│ premium │ 1.5s  │ 1500ms │ Success animations    │
└─────────┴───────┴────────┴────────────────────────┘
```

### 🎨 Easings (6 functions)

```
┌──────────────┬──────────────────────────────┬────────────────┐
│ Name         │ Bezier                       │ Use For        │
├──────────────┼──────────────────────────────┼────────────────┤
│ default      │ [0.4, 0.0, 0.2, 1.0]         │ General        │
│ decelerate   │ [0.0, 0.0, 0.2, 1.0]         │ Entrances      │
│ accelerate   │ [0.4, 0.0, 1.0, 1.0]         │ Exits          │
│ sharp        │ [0.4, 0.0, 0.6, 1.0]         │ Quick snaps    │
│ emphasis     │ [0.4, 0.0, 0.2, 1.0]         │ Emphasized     │
│ easeOutQuad  │ [0.25, 0.46, 0.45, 0.94]     │ SVG drawing    │
└──────────────┴──────────────────────────────┴────────────────┘
```

---

## 🎭 Animation Variants

### Entry/Exit States (9 variants)

```
╔══════════════╦════════════════════════════════════╗
║ fadeIn       ║ opacity: 0 → 1                     ║
╠══════════════╬════════════════════════════════════╣
║ scaleIn      ║ scale: 0.95 → 1, opacity: 0 → 1    ║
╠══════════════╬════════════════════════════════════╣
║ liquidGlass  ║ scale: 0.8 → 1, blur: 8 → 0        ║
║              ║ 🌟 Premium effect                   ║
╠══════════════╬════════════════════════════════════╣
║ slideUp      ║ y: 100% → 0                        ║
║              ║ 📱 Bottom sheets                    ║
╠══════════════╬════════════════════════════════════╣
║ slideDown    ║ y: -100% → 0                       ║
║              ║ 🔔 Notifications                    ║
╠══════════════╬════════════════════════════════════╣
║ slideLeft    ║ x: 100% → 0                        ║
║              ║ 📂 Right sidebars                   ║
╠══════════════╬════════════════════════════════════╣
║ slideRight   ║ x: -100% → 0                       ║
║              ║ 📂 Left sidebars                    ║
╠══════════════╬════════════════════════════════════╣
║ expand       ║ scaleY: 0 → 1                      ║
║              ║ 📋 Accordions                       ║
╠══════════════╬════════════════════════════════════╣
║ blurIn       ║ backdropFilter: blur 0 → 12        ║
║              ║ 🪟 Backdrops                        ║
╚══════════════╩════════════════════════════════════╝
```

---

## 🖱️ Interaction States

### Hover & Tap Animations (4 states)

```
┌──────────────┬──────────────────────────────────────────────┐
│ Type         │ Behavior                                     │
├──────────────┼──────────────────────────────────────────────┤
│ subtleHover  │ Hover: scale 1.02                            │
│              │ Tap:   scale 0.98                            │
│              │ ➜ Most UI elements                           │
├──────────────┼──────────────────────────────────────────────┤
│ buttonHover  │ Hover: scale 1.05, y: -2                     │
│              │ Tap:   scale 0.95                            │
│              │ ➜ Primary buttons, CTAs                      │
├──────────────┼──────────────────────────────────────────────┤
│ iconHover    │ Hover: scale 1.1, rotate: 5°                 │
│              │ Tap:   scale 0.9                             │
│              │ ➜ Icon buttons, tools                        │
├──────────────┼──────────────────────────────────────────────┤
│ cardHover    │ Hover: y: -8, scale 1.02                     │
│              │ Tap:   scale 0.98                            │
│              │ ➜ Cards, tiles, products                     │
└──────────────┴──────────────────────────────────────────────┘
```

---

## 📊 Stagger Patterns

### Sequential Animation Timing (5 patterns)

```
┌─────────────┬──────────┬──────────┬─────────────────────┐
│ Pattern     │ Stagger  │ Delay    │ Use For             │
├─────────────┼──────────┼──────────┼─────────────────────┤
│ fast        │ 0.03s    │ 0s       │ Quick reveals       │
│ normal      │ 0.05s    │ 0s       │ Standard lists      │
│ slow        │ 0.10s    │ 0s       │ Emphasized          │
│ withDelay   │ 0.05s    │ 0.2s     │ Delayed sequences   │
│ convergence │ 0.02s    │ 0s       │ Camera/logo effects │
└─────────────┴──────────┴──────────┴─────────────────────┘
```

---

## 🎨 Complete Animation Timelines

### 📷 Camera Success (700ms - Fast & Responsive)

```
Timeline:
0ms     ░░░░░░░░░░░░░░░░░░░░░░░ 183ms   Recognition
183ms   ████████████░░░░░░░░░░░ 300ms   Convergence
300ms   ░░░░░░░░░░░░░░░ 350ms           Beat (pause)
350ms   ████████████████████░░░ 533ms   Green pulse
533ms   ████████████████████░░░ 700ms   Checkmark

Phases:
├─ Recognition:  183ms  (0-183ms)   Logo visible
├─ Convergence:  117ms  (183-300ms) Shapes merge
├─ Beat:         50ms   (300-350ms) Micro-pause
├─ Green:        183ms  (350-533ms) Success color
└─ Checkmark:    167ms  (533-700ms) Confirmation

Total: 700ms
```

### 🌟 Premium Success (1500ms - Slow & Appreciable)

```
Timeline:
0ms     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 400ms    Recognition
400ms   ████████████████████████░░░░░░░░░ 750ms    Convergence
750ms   ░░░░░░░░░░░░░░░ 800ms                      Beat (pause)
800ms   ████████████████████████████░░░░░ 1150ms   Green pulse
1150ms  ████████████████████████████░░░░░ 1500ms   Checkmark

Phases:
├─ Recognition:  400ms  (0-400ms)      GENEROUS time
├─ Convergence:  350ms  (400-750ms)    VISIBLE motion
├─ Beat:         50ms   (750-800ms)    Appreciation
├─ Green:        350ms  (800-1150ms)   SMOOTH signal
└─ Checkmark:    350ms  (1150-1500ms)  CLEAR confirm

Total: 1500ms (Premium quality - 2x slower)
```

---

## 🎯 Common Patterns at a Glance

### Button
```
Spring:      bouncy
Hover:       scale 1.05, y -2
Tap:         scale 0.95
Duration:    ~300ms
```

### Modal
```
Variant:     scaleIn
Spring:      default
Entry:       scale 0.95 → 1
Exit:        scale 1 → 0.95
Duration:    ~400ms
```

### Notification
```
Variant:     slideDown
Spring:      bouncy
Entry:       y: -100% → 0
Exit:        y: 0 → -100%
Duration:    ~300ms
```

### Card
```
Variant:     scaleIn
Hover:       y: -8, scale 1.02
Tap:         scale 0.98
Spring:      default
Duration:    ~400ms
```

### List
```
Stagger:     normal (0.05s)
Variant:     fadeIn
Spring:      default
Per item:    ~50ms delay
```

---

## 🍎 Apple Motion Principles Map

```
┌────────────────┬──────────────────────────────────────────┐
│ Principle      │ Implementation                           │
├────────────────┼──────────────────────────────────────────┤
│ 1. Responsive  │ • Spring physics (stiffness 300-400)     │
│                │ • Feels immediate                        │
│                │ • Connected to input                     │
├────────────────┼──────────────────────────────────────────┤
│ 2. Fluid       │ • No abrupt stops                        │
│                │ • Interruptible                          │
│                │ • Velocity preservation                  │
├────────────────┼──────────────────────────────────────────┤
│ 3. Contextual  │ • Entry: scale 0.95 → 1.0                │
│                │ • Exit: scale 1.0 → 0.95                 │
│                │ • Duration: 300-600ms                    │
├────────────────┼──────────────────────────────────────────┤
│ 4. Subtle      │ • Scale range: 0.95 - 1.05               │
│                │ • Blur range: 0 - 20px                   │
│                │ • Noticeable, not distracting            │
├────────────────┼──────────────────────────────────────────┤
│ 5. Spatial     │ • Directional awareness                  │
│                │ • Curved paths                           │
│                │ • Natural physics                        │
└────────────────┴──────────────────────────────────────────┘
```

---

## ⚡ Performance Checklist

```
✅ DO USE (GPU Accelerated):
   • transform (translate, scale, rotate)
   • opacity
   • filter (blur)

❌ AVOID (Slow):
   • width, height
   • margin, padding
   • color, background
   • border

♿ ACCESSIBILITY:
   • Always check prefers-reduced-motion
   • Disable decorative animations when requested
   • Keep functional animations instant (10ms)
```

---

## 📱 Platform Quick Import

```javascript
// React
import animations from './animation-library.json'
const spring = animations.library.springs.bouncy

// React Native  
const { stiffness, damping, mass } = animations.library.springs.default

// Flutter
final duration = json['library']['durations']['normal']['ms']

// iOS
let stiffness = bouncy["stiffness"] as! CGFloat

// Android
val duration = durations.getJSONObject("normal").getInt("ms")

// Web/CSS
const easing = animations.library.easings.default.css
```

---

## 🎓 Learning Path

```
1. START HERE:
   ├─ springs.default
   ├─ durations.normal  
   └─ variants.scaleIn

2. INTERACTIVE ELEMENTS:
   ├─ interactionStates.buttonHover
   ├─ interactionStates.cardHover
   └─ springs.bouncy

3. COMPLEX ANIMATIONS:
   ├─ variants.liquidGlass
   ├─ stagger.normal
   └─ cameraSuccess timeline

4. PLATFORM SPECIFIC:
   ├─ Export to JSON
   ├─ Import in your framework
   └─ Adapt to platform APIs
```

---

## 📁 File Reference

```
Animation Library Files:
├── animation-library.json              ← Production export
├── animation-presets.json              ← Source data
├── src/animations-config.ts            ← TypeScript defs
├── ANIMATION_LIBRARY_README.md        ← Main docs
├── ANIMATION_LIBRARY_GUIDE.md         ← Full guide
├── ANIMATION_LIBRARY_QUICK_REF.md     ← Quick reference
└── src/examples/
    └── animationLibraryExamples.tsx   ← Code examples
```

---

**📚 Need More Details?**
- Quick Reference: `ANIMATION_LIBRARY_QUICK_REF.md`
- Full Guide: `ANIMATION_LIBRARY_GUIDE.md`
- Main README: `ANIMATION_LIBRARY_README.md`
- Live Demo: Open `frame-viewer.html`

---

**Motion Autoya** - Premium animation library based on Apple's motion principles



