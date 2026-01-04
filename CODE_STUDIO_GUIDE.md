# 💻 Code-First Studio Guide

## Perfect for Cursor IDE Users

Since you're working in **Cursor IDE**, this studio lets you **edit animation code directly** instead of using prompts. Write JavaScript code to define your animations with full control.

---

## 🚀 Launch

```bash
npm run studio:code
```

Opens: **http://localhost:5173/studio-code.html**

---

## 🎯 Key Features

### ✅ **Direct Code Editing**
- Write JavaScript to define animation properties
- Full control over every frame
- No prompts needed - pure code

### ✅ **Live Preview**
- Instant visual feedback
- See your code in action
- Frame-by-frame timeline

### ✅ **Frame Selection**
- Select single, multiple, or all frames
- Apply code changes to selected frames
- Update specific moments

### ✅ **Project Management**
- Save multiple projects
- Load and edit existing work
- History tracking

### ✅ **Export Everything**
- JSON, Lottie, MP4 formats
- All frame modifications preserved
- Production-ready output

---

## 📝 Code Interface

### **Split View Layout**

```
┌──────────────────────────────────────────────┐
│  [Projects] animation-1  Frame 1/60  [Export]│
├─────────────────┬────────────────────────────┤
│  CODE EDITOR    │     LIVE PREVIEW          │
│                 │                            │
│  // Your code   │   [Animated Shape]         │
│  function       │                            │
│  generateFrames │                            │
│  {             │                            │
│    ...         │                            │
│  }             │                            │
│                 │                            │
│  [Compile]      │   [Timeline Grid]          │
└─────────────────┴────────────────────────────┘
```

---

## 📖 How to Use

### Step 1: Write Code

The editor comes with a default template:

```javascript
// Edit animation properties directly
// Each frame has: rotation, scaleX, scaleY, x, y, opacity

function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    
    frames.push({
      time: time,
      properties: {
        rotation: progress * 360,  // 0 to 360 degrees
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
        opacity: 1
      }
    });
  }
  
  return frames;
}
```

### Step 2: Configure Settings

- **Name**: Project name (e.g., "my-animation")
- **FPS**: Frames per second (default: 30)
- **Duration**: Animation length in seconds (default: 2)

### Step 3: Compile

Click **"▶ Compile & Create Project"**
- Code is evaluated
- Frames are generated
- Preview appears
- Timeline shows all frames

### Step 4: Edit Frames

Select specific frames and update them:
1. Click frames in timeline (Shift for multiple)
2. Modify code for selected frames
3. Click **"⚡ Update X Selected Frames"**

### Step 5: Export

Click export buttons: **↓ JSON**, **↓ Lottie**, **↓ MP4**

---

## 🎨 Code Examples

### Example 1: Simple Rotation

```javascript
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    
    frames.push({
      time: time,
      properties: {
        rotation: progress * 360,  // Full rotation
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
        opacity: 1
      }
    });
  }
  
  return frames;
}
```

### Example 2: Pulsing Scale

```javascript
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.3;
    
    frames.push({
      time: time,
      properties: {
        rotation: 0,
        scaleX: scale,  // Pulse between 0.7 and 1.3
        scaleY: scale,
        x: 0,
        y: 0,
        opacity: 1
      }
    });
  }
  
  return frames;
}
```

### Example 3: Bouncing Motion

```javascript
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    const bounce = Math.abs(Math.sin(progress * Math.PI * 4));
    
    frames.push({
      time: time,
      properties: {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: -bounce * 100,  // Bounce up to 100px
        opacity: 1
      }
    });
  }
  
  return frames;
}
```

### Example 4: Fade In/Out

```javascript
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    
    // Fade in first half, fade out second half
    let opacity;
    if (progress < 0.5) {
      opacity = progress * 2;  // 0 to 1
    } else {
      opacity = (1 - progress) * 2;  // 1 to 0
    }
    
    frames.push({
      time: time,
      properties: {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
        opacity: opacity
      }
    });
  }
  
  return frames;
}
```

### Example 5: Complex Multi-Stage

```javascript
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const time = progress * duration;
    
    let rotation, scale, opacity;
    
    // Stage 1: Fade in + rotate (0-33%)
    if (progress < 0.33) {
      const stage = progress / 0.33;
      rotation = stage * 180;
      scale = 0.5 + stage * 0.5;
      opacity = stage;
    }
    // Stage 2: Full visibility + continue rotation (33-66%)
    else if (progress < 0.66) {
      const stage = (progress - 0.33) / 0.33;
      rotation = 180 + stage * 180;
      scale = 1;
      opacity = 1;
    }
    // Stage 3: Fade out (66-100%)
    else {
      const stage = (progress - 0.66) / 0.34;
      rotation = 360;
      scale = 1 - stage * 0.5;
      opacity = 1 - stage;
    }
    
    frames.push({
      time: time,
      properties: {
        rotation: rotation,
        scaleX: scale,
        scaleY: scale,
        x: 0,
        y: 0,
        opacity: opacity
      }
    });
  }
  
  return frames;
}
```

---

## 🎯 Advanced Techniques

### Technique 1: Using Math Functions

```javascript
const wave = Math.sin(progress * Math.PI * 4);
const bounce = Math.abs(Math.cos(progress * Math.PI * 3));
const ease = progress * progress * (3 - 2 * progress); // Smooth step
```

### Technique 2: Conditional Logic

```javascript
if (progress < 0.25) {
  // First quarter
} else if (progress < 0.75) {
  // Middle half
} else {
  // Last quarter
}
```

### Technique 3: Multiple Properties

```javascript
properties: {
  rotation: progress * 720,        // 2 full rotations
  scaleX: 1 + Math.sin(progress * Math.PI * 2) * 0.2,
  scaleY: 1 + Math.cos(progress * Math.PI * 2) * 0.2,
  x: Math.sin(progress * Math.PI * 2) * 50,
  y: Math.cos(progress * Math.PI * 2) * 50,
  opacity: Math.sin(progress * Math.PI)
}
```

### Technique 4: Frame-Specific Updates

When updating selected frames, you can access:
- `frame` - Current frame object
- `index` - Frame number (0-based)
- `progress` - Normalized progress (0-1)

```javascript
// This code runs for each selected frame
frame.properties.rotation += 45;  // Add 45 degrees
frame.properties.scaleX *= 1.5;   // Increase scale 1.5x
```

---

## 🔧 Properties Reference

### Available Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `rotation` | number | Rotation in degrees | `0` to `360` |
| `scaleX` | number | Horizontal scale | `1` = 100%, `2` = 200% |
| `scaleY` | number | Vertical scale | `1` = 100%, `0.5` = 50% |
| `x` | number | Horizontal position (px) | `-100` to `100` |
| `y` | number | Vertical position (px) | `-100` to `100` |
| `opacity` | number | Transparency | `0` = invisible, `1` = opaque |

---

## 💡 Workflow Examples

### Workflow 1: Create New Animation

```
1. Set Name: "spinning-logo"
2. Set FPS: 30
3. Set Duration: 2
4. Write code (rotation animation)
5. Click "Compile & Create Project"
6. Preview appears
7. Export as Lottie
```

### Workflow 2: Edit Specific Frames

```
1. Create project with code
2. Select frames 0-10 (Shift+Click)
3. Modify code to fade in
4. Click "Update Selected Frames"
5. Select frames 50-60
6. Modify code to fade out
7. Click "Update Selected Frames"
8. Play to preview
9. Export
```

### Workflow 3: Iterative Development

```
1. Write initial code
2. Compile
3. See result
4. Modify code
5. Select all frames
6. Update
7. Repeat until perfect
8. Export
```

---

## 🎬 Frame Selection

### Single Frame
```
Click frame 15
→ Only frame 15 selected
```

### Multiple Frames
```
Click frame 10
Shift + Click frame 20
Shift + Click frame 30
→ Frames 10, 20, 30 selected
```

### All Frames
```
Click "Select All"
→ All 60 frames selected
```

---

## 📦 Export Formats

### JSON
- Raw frame data
- Perfect for version control
- Easy to parse and manipulate

### Lottie
- Industry standard
- Works on web, iOS, Android
- Small file size

### MP4/WebM
- Video format
- 60fps recording
- Social media ready

---

## 🐛 Error Handling

### Common Errors

**Error**: "generateFrames must return an array"
- **Fix**: Ensure your function returns `frames` array

**Error**: "Cannot read property 'rotation'"
- **Fix**: Ensure all properties exist in frame.properties

**Error**: "Unexpected token"
- **Fix**: Check JavaScript syntax (missing brackets, commas)

### Debugging Tips

1. **Use console.log**: Add logging to see values
2. **Start simple**: Test with basic rotation first
3. **Check progress**: Verify progress value (0-1)
4. **Validate properties**: Ensure all properties are numbers

---

## 🎯 Best Practices

### 1. **Code Organization**
```javascript
// Good: Clear, commented code
function generateFrames(totalFrames, duration) {
  const frames = [];
  
  // Generate each frame
  for (let i = 0; i < totalFrames; i++) {
    // Calculate progress (0 to 1)
    const progress = i / (totalFrames - 1);
    
    // Create frame
    frames.push({...});
  }
  
  return frames;
}
```

### 2. **Use Constants**
```javascript
const MAX_ROTATION = 360;
const BOUNCE_HEIGHT = 100;
const PULSE_AMOUNT = 0.3;
```

### 3. **Helper Functions**
```javascript
function easeInOut(t) {
  return t * t * (3 - 2 * t);
}

function bounce(t) {
  return Math.abs(Math.sin(t * Math.PI * 4));
}
```

### 4. **Validate Values**
```javascript
opacity: Math.max(0, Math.min(1, calculatedOpacity))
```

---

## 🚀 Quick Start Checklist

- [ ] Launch: `npm run studio:code`
- [ ] Set project name
- [ ] Configure FPS and duration
- [ ] Write or edit code
- [ ] Click "Compile & Create Project"
- [ ] View preview and timeline
- [ ] Select frames (optional)
- [ ] Update frames (optional)
- [ ] Click Play to preview
- [ ] Export in desired format

---

## 🎉 Advantages

### Why Code-First Studio?

1. **Full Control** - Every property, every frame
2. **Cursor IDE Perfect** - You're already coding
3. **No Prompts** - Direct manipulation
4. **Powerful** - Use JavaScript's full power
5. **Precise** - Mathematical accuracy
6. **Fast** - No AI delays
7. **Professional** - Production-ready code

---

## 📚 Comparison

| Feature | Prompt Studio | Code Studio |
|---------|---------------|-------------|
| Input Method | Natural language | JavaScript code |
| Control Level | High-level | Low-level |
| Learning Curve | Easy | Medium |
| Flexibility | Limited | Unlimited |
| Speed | Fast (1-2s) | Instant |
| Precision | Good | Perfect |
| Best For | Quick prototypes | Complex animations |
| Cursor IDE Fit | Good | **Perfect** ✨ |

---

## 🎯 Summary

**Code-First Studio** is perfect for you because:

✅ **Direct code editing** - No prompts needed  
✅ **Full JavaScript power** - Use any logic  
✅ **Frame-by-frame control** - Select and update  
✅ **Instant feedback** - See results immediately  
✅ **Professional workflow** - Code in Cursor, preview in browser  
✅ **All exports** - JSON, Lottie, MP4  

**Start coding your animations now:**

```bash
npm run studio:code
```

**Edit code → Compile → Preview → Export** 🚀






