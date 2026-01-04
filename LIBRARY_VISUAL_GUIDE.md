# Motion Library - Visual Guide 🎨

## Interface Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  FRAME VIEWER    [Autoya Validation]    [▶ Play] [Export] [📚 Library] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                                                                     │
│                         [Animation Preview]                         │
│                                                                     │
│                                                                     │
│  ┌─────────────────┐                                               │
│  │ CURRENT FRAME   │                                               │
│  │ Frame: 0        │                                               │
│  │ Time: 0.000s    │                                               │
│  │ Progress: 0.000 │                                               │
│  └─────────────────┘                                               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ALL FRAMES                [Select All]  0 selected                │
│  [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] ...                      │
│                                                                     │
│  💡 Tip: Click frames • Shift+Click for multiple • Edit in Cursor  │
└─────────────────────────────────────────────────────────────────────┘
```

## Library Side Sheet (Opened)

```
┌─────────────────────────────────────────────────────┐
│  Motion Library                              [×]    │
│  1 project                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Autoya Validation                          ●  │ │ ← Active
│  │ Premium validation animation with liquid      │ │
│  │ convergence and success checkmark             │ │
│  │ ─────────────────────────────────────────────  │ │
│  │ [🟢 Validation]  1.5s @ 60fps                 │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ [Future Project 2]                            │ │
│  │ Description...                                │ │
│  │ ─────────────────────────────────────────────  │ │
│  │ [Category]  Duration                          │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [          + New Project          ]                │
└─────────────────────────────────────────────────────┘
```

## Header Components

### Left Side
```
┌──────────────────────────────────────────┐
│ FRAME VIEWER  [● Autoya Validation]      │
│                                          │
│ ↑              ↑                         │
│ Title          Current Project Badge     │
└──────────────────────────────────────────┘
```

### Right Side
```
┌────────────────────────────────────────────────┐
│  [▶ Play]  [Export]  [📚 Library]             │
│                                                │
│     ↑         ↑           ↑                    │
│  Playback   Export    Library Button           │
└────────────────────────────────────────────────┘
```

## Library Button States

### Default
```
┌──────────────┐
│ 📚 Library   │  ← Gradient purple background
└──────────────┘
```

### Hover
```
┌──────────────┐
│ 📚 Library   │  ← Lifts up with shadow
└──────────────┘
   ↑ Elevated
```

## Project Card States

### Inactive Project
```
┌─────────────────────────────────────────┐
│ Project Name                            │  ← Dark background
│ Description text here...                │     Border: #1a1a1a
│ ─────────────────────────────────────   │
│ [Category Badge]  Duration              │
└─────────────────────────────────────────┘
```

### Active Project
```
┌─────────────────────────────────────────┐
│ Project Name                         ●  │  ← Lighter background
│ Description text here...                │     Border: #667eea (purple)
│ ─────────────────────────────────────   │     Blue dot indicator
│ [Category Badge]  Duration              │
└─────────────────────────────────────────┘
```

### Hover State
```
┌─────────────────────────────────────────┐
│ Project Name                            │  ← Scale: 1.02x
│ Description text here...                │     Smooth transition
│ ─────────────────────────────────────   │
│ [Category Badge]  Duration              │
└─────────────────────────────────────────┘
```

## Category Badges

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ● Validation │  │ ● Success    │  │ ● Loading    │
└──────────────┘  └──────────────┘  └──────────────┘
   Green            Lighter Green      Blue

┌──────────────┐  ┌──────────────┐
│ ● Transition │  │ ● Other      │
└──────────────┘  └──────────────┘
   Purple           Gray
```

## Side Sheet Animation

### Opening
```
Frame 1:  [Hidden]                          |
Frame 2:      [Sliding in]                  |
Frame 3:          [Sliding in]              |
Frame 4:              [Fully visible]       |
          
          ← Spring animation (300ms)
```

### Closing
```
Frame 1:  [Fully visible]                   |
Frame 2:      [Sliding out]                 |
Frame 3:          [Sliding out]             |
Frame 4:              [Hidden]              |
          
          ← Spring animation (300ms)
```

## Color Palette

### Backgrounds
```
#000000  ████  Main background
#0a0a0a  ████  Side sheet background
#0f0f0f  ████  Card background (inactive)
#1a1a1a  ████  Card background (active)
```

### Borders
```
#1a1a1a  ████  Default border
#333333  ████  Button border
#667eea  ████  Active border (purple)
```

### Text
```
#ffffff  ████  Primary text
#999999  ████  Secondary text
#666666  ████  Tertiary text
```

### Accents
```
#667eea  ████  Primary accent (purple)
#764ba2  ████  Gradient end (purple)
#10b981  ████  Validation (green)
#22c55e  ████  Success (green)
#3b82f6  ████  Loading (blue)
#8b5cf6  ████  Transition (purple)
#6b7280  ████  Other (gray)
```

## Interaction Flow

### Opening Library
```
1. User clicks "📚 Library" button
   ↓
2. Backdrop fades in (200ms)
   ↓
3. Side sheet slides in from right (300ms spring)
   ↓
4. Projects list is visible
```

### Selecting Project
```
1. User hovers over project card
   ↓
2. Card scales up to 1.02x
   ↓
3. User clicks card
   ↓
4. Side sheet closes
   ↓
5. New project loads instantly
   ↓
6. Animation starts playing
```

### Closing Library
```
Option A: Click X button
Option B: Click backdrop
   ↓
1. Side sheet slides out (300ms spring)
   ↓
2. Backdrop fades out (200ms)
   ↓
3. Library hidden
```

## Responsive Behavior

### Desktop (> 420px available)
```
┌────────────────────────────────────────┐
│                              [420px]   │  ← Full width
│                              Library   │
│                                        │
└────────────────────────────────────────┘
```

### Mobile (< 420px available)
```
┌──────────────────────────────────┐
│                          [90vw]  │  ← Adapts to screen
│                          Library │
│                                  │
└──────────────────────────────────┘
```

## Typography Scale

```
20px  ██████  Side sheet title (weight: 600)
15px  █████   Project name (weight: 600)
14px  ████    Button text (weight: 600)
13px  ████    Project count
12px  ███     Description, meta info
11px  ███     Duration/FPS (Monaco monospace)
```

## Spacing System

```
24px  ████████  Header padding
16px  ██████    Content padding
12px  ████      Button gap
8px   ███       Small gap
6px   ██        Tiny gap
4px   █         Minimal gap
```

## Border Radius

```
8px   ████  Cards, buttons (large)
6px   ███   Buttons (medium)
4px   ██    Badges, small elements
50%   ●     Dots, circles
```

## Shadows

### Button Hover
```
0 4px 12px rgba(102, 126, 234, 0.4)
   ↑    ↑              ↑
  Blur Spread      Purple glow
```

### Side Sheet
```
-4px 0 24px rgba(0, 0, 0, 0.5)
  ↑       ↑
 Left   Strong shadow
```

## Z-Index Layers

```
1001  ████  Side sheet (top)
1000  ███   Backdrop
100   ██    Overlays
1     █     Base content
```

---

**This visual guide shows the complete UI structure and design system of the Motion Library.**





