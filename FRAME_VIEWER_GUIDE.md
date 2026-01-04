# 🎬 Frame Viewer - Perfect for Cursor IDE

## ✅ Exactly What You Asked For

> "No need a code editor just see visualization of 60 frames so I can prompt with precision at Cursor"

**Perfect!** The **Frame Viewer** shows you **all 60 frames** visually. You edit the code in **Cursor IDE**, and the viewer updates automatically.

---

## 🚀 Launch

```bash
npm run viewer
```

Opens: **http://localhost:5173/frame-viewer.html**

---

## 🎯 How It Works

### **1. Edit Code in Cursor IDE**

Open `/src/FrameViewerApp.tsx` in Cursor:

```typescript
// Edit this component in Cursor IDE
function AnimatedComponent() {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],      // ← Edit here
        scale: [1, 1.2, 1],    // ← Edit here
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: 120,
        height: 120,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 20,
      }}
    />
  );
}
```

### **2. Save in Cursor**
- Hot reload updates browser automatically
- No compile button needed
- Instant visual feedback

### **3. See All 60 Frames**
- Timeline shows frames 0-59
- Click any frame to see that moment
- Current frame highlighted in blue
- Frame info overlay shows exact values

---

## 🖥️ Interface

```
┌──────────────────────────────────────────────────────┐
│ FRAME VIEWER  Frame 1/60  Time: 0.00s  ▶ Play  30fps│ ← Top Bar
├──────────────────────────────────────────────────────┤
│  ┌─────────────┐                                     │
│  │CURRENT FRAME│                                      │
│  │Frame: 0     │         [Animated Shape]             │ ← Preview
│  │Time: 0.000s │                                      │
│  │Progress: 0  │                                      │
│  └─────────────┘                                     │
├──────────────────────────────────────────────────────┤
│  ALL FRAMES    [Select All]   1 selected             │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐  │
│  │0 │1 │2 │3 │4 │5 │6 │7 │8 │9 │10│11│12│13│14│15│  │ ← Timeline
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘  │
│  ... (60 frames total)                               │
└──────────────────────────────────────────────────────┘
```

---

## 📝 Workflow

### **Perfect Cursor IDE Workflow:**

```
1. Open Cursor IDE
2. Edit: src/FrameViewerApp.tsx
3. Save (Cmd/Ctrl + S)
4. Browser updates automatically
5. Click frames to inspect
6. Repeat
```

### **No Code Editor in Browser**
- ✅ Just visualization
- ✅ All 60 frames visible
- ✅ Edit in Cursor IDE
- ✅ Hot reload

---

## 🎨 Features

### ✅ **60 Frame Timeline**
- All frames visible in grid
- Click any frame to jump to it
- Current frame highlighted (blue border)
- Frame numbers 0-59

### ✅ **Frame Info Overlay**
- Current frame number
- Exact time (seconds)
- Progress (0-1)
- Always visible top-left

### ✅ **Playback Controls**
- Play/Pause button
- 30fps playback
- Loop automatically
- Smooth animation

### ✅ **Frame Selection**
- Click frame: Select single
- Shift+Click: Select multiple
- Select All button
- Shows selection count

### ✅ **Hot Reload**
- Edit in Cursor
- Save file
- Browser updates instantly
- No manual refresh

---

## 💻 Edit in Cursor IDE

### **File to Edit:**
```
src/FrameViewerApp.tsx
```

### **What to Change:**

```typescript
// Change these values in Cursor:
animate={{
  rotate: [0, 360],        // Rotation keyframes
  scale: [1, 1.2, 1],      // Scale keyframes
  x: [0, 100, 0],          // Position X
  y: [0, -50, 0],          // Position Y
  opacity: [1, 0.5, 1],    // Opacity
}}

transition={{
  duration: 2,             // Animation length
  repeat: Infinity,        // Loop forever
  ease: "easeInOut"        // Easing function
}}
```

### **Example Edits:**

**Spinning:**
```typescript
animate={{ rotate: [0, 720] }}  // 2 full rotations
```

**Bouncing:**
```typescript
animate={{ y: [0, -100, 0] }}  // Bounce up 100px
```

**Pulsing:**
```typescript
animate={{ scale: [1, 1.5, 1] }}  // Pulse to 150%
```

**Fading:**
```typescript
animate={{ opacity: [0, 1, 0] }}  // Fade in/out
```

---

## 🎯 Frame Selection

### **Single Frame**
```
Click frame 15 → See that exact moment
```

### **Multiple Frames**
```
Click frame 10
Shift + Click frame 20
→ Both selected
```

### **All Frames**
```
Click "Select All" → All 60 frames selected
```

---

## 📊 Frame Information

### **Top Bar Shows:**
- Current frame number (1-60)
- Time in seconds
- Progress percentage
- FPS and duration

### **Overlay Shows:**
- Frame index (0-59)
- Exact time (3 decimals)
- Progress (0-1, 3 decimals)

---

## 🎬 Example: Create Spinning Animation

### **1. Open in Cursor:**
```
src/FrameViewerApp.tsx
```

### **2. Edit Code:**
```typescript
function AnimatedComponent() {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],  // Full rotation
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{
        width: 120,
        height: 120,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 20,
      }}
    />
  );
}
```

### **3. Save (Cmd+S)**

### **4. See in Browser:**
- All 60 frames show rotation
- Click frame 15 → See 90° rotation
- Click frame 30 → See 180° rotation
- Click frame 45 → See 270° rotation

---

## 💡 Tips

### **Tip 1: Use Frame Numbers**
- Frame 0 = Start (0%)
- Frame 15 = Quarter (25%)
- Frame 30 = Half (50%)
- Frame 45 = Three-quarters (75%)
- Frame 59 = End (98%)

### **Tip 2: Test Keyframes**
```typescript
// Click frames to verify each keyframe
animate={{
  rotate: [0, 90, 180, 270, 360]  // 5 keyframes
}}
// Frame 0: 0°
// Frame 15: 90°
// Frame 30: 180°
// Frame 45: 270°
// Frame 59: 360°
```

### **Tip 3: Adjust FPS/Duration**
```typescript
<FrameViewer fps={60} duration={3}>  // 180 frames
<FrameViewer fps={24} duration={1}>  // 24 frames
```

---

## 🔧 Customization

### **Change FPS:**
```typescript
<FrameViewer fps={60} duration={2}>
```

### **Change Duration:**
```typescript
<FrameViewer fps={30} duration={5}>
```

### **Custom Component:**
```typescript
<FrameViewer>
  <YourCustomAnimation />
</FrameViewer>
```

---

## 📦 No Export Needed

This is **just for visualization**. When you're happy with your animation:

1. Copy the code from `FrameViewerApp.tsx`
2. Use it in your actual project
3. Or use one of the other studios to export

---

## 🎯 Perfect For

### ✅ **Testing Animations**
- See every frame
- Verify timing
- Check keyframes
- Debug issues

### ✅ **Cursor IDE Workflow**
- Edit code in Cursor
- See results in browser
- No context switching
- Fast iteration

### ✅ **Precision Work**
- Click exact frame
- See exact values
- Frame-by-frame inspection
- Perfect timing

---

## 🚀 Quick Start

```bash
# 1. Launch viewer
npm run viewer

# 2. Open in Cursor
src/FrameViewerApp.tsx

# 3. Edit animation
animate={{ rotate: [0, 360] }}

# 4. Save (Cmd+S)

# 5. See all 60 frames in browser
```

---

## 📚 Summary

**Frame Viewer** is perfect for you because:

✅ **No code editor in browser** - Just visualization  
✅ **All 60 frames visible** - Complete timeline  
✅ **Edit in Cursor IDE** - Your preferred environment  
✅ **Hot reload** - Instant updates  
✅ **Frame inspection** - Click any frame  
✅ **Playback controls** - Test animation  
✅ **Frame info** - Exact values displayed  

**Edit code in Cursor → See all 60 frames in browser** 🎬

---

## 🎉 Start Now

```bash
npm run viewer
```

Then open `src/FrameViewerApp.tsx` in Cursor IDE and start editing!

**No code editor needed in browser. Just pure visualization of all 60 frames.** ✨






