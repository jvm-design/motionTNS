# 🎬 Frame-by-Frame Editing Guide

## Overview

The **Studio Advanced** version adds powerful frame-by-frame editing capabilities, allowing you to:
- View your animation frame by frame
- Select individual frames, multiple frames, or all frames
- Apply prompt modifications to targeted frames
- Create complex, multi-layered animations

## 🚀 Quick Start

### Launch Advanced Studio

```bash
npm run studio:advanced
```

Opens at: **http://localhost:5173/studio-advanced.html**

## 🎯 Key Features

### 1. **Frame-by-Frame View**
- Visual timeline with all animation frames
- Grid display showing each frame as a thumbnail
- Frame numbers and indicators
- Blue dot on frames with custom prompts

### 2. **Frame Selection Modes**

#### Single Frame Selection (Default)
- Click any frame to select it
- Only one frame selected at a time
- Preview updates to show selected frame

#### Multiple Frame Selection
- Hold **Shift** and click frames
- Or enable multiple mode and click frames
- Select non-consecutive frames
- Great for applying effects to specific moments

#### All Frames Selection
- Click **"Select All"** button
- Applies modifications to entire animation
- Easy bulk editing

### 3. **Targeted Prompt Modifications**
- Apply different prompts to different frames
- Create complex multi-stage animations
- Override specific frame properties
- Mix animation styles within one project

### 4. **Playback Controls**
- **Play/Pause** button in top bar
- Real-time preview of animation
- Scrubbing through timeline
- Configurable FPS (default 30fps)

## 📖 How to Use

### Step 1: Create Initial Animation

1. Type a prompt: `"spinning logo"`
2. Click **Generate**
3. Animation is created with 60 frames (2 seconds @ 30fps)
4. Timeline appears at bottom showing all frames

### Step 2: View Frame by Frame

- Frames displayed in grid at bottom
- Current frame highlighted in **blue border**
- Selected frames have **dark background**
- Click any frame to preview it

### Step 3: Select Frames

**Select Single Frame:**
```
Click on frame → Frame selected
```

**Select Multiple Frames:**
```
Shift + Click frames → Multiple frames selected
```

**Select All Frames:**
```
Click "Select All" button → All frames selected
```

### Step 4: Apply Modifications

1. Select target frames (single, multiple, or all)
2. Type modification prompt in timeline input
3. Click **Apply** or press **Enter**
4. Selected frames update with new properties

## 🎨 Example Workflows

### Example 1: Create Fade-In Effect

```
1. Create animation: "pulsing circle"
2. Select first 15 frames (0-14)
3. Apply prompt: "fade in from 0 to 1"
4. Result: Pulsing circle that fades in at start
```

### Example 2: Multi-Stage Animation

```
1. Create animation: "spinning logo"
2. Select frames 0-20
   Apply: "rotate clockwise"
3. Select frames 21-40
   Apply: "pulse scale"
4. Select frames 41-60
   Apply: "fade out"
5. Result: Spin → Pulse → Fade animation
```

### Example 3: Accent Specific Moments

```
1. Create animation: "bouncing ball"
2. Select frames 10, 20, 30 (apex points)
3. Apply: "scale up 1.5x"
4. Result: Emphasized bounces at peak
```

### Example 4: Smooth Transitions

```
1. Create animation: "spinning square"
2. Select frames 0-10
   Apply: "slow rotation start"
3. Select frames 50-60
   Apply: "slow rotation end"
4. Result: Smooth acceleration/deceleration
```

## 🎬 Timeline Interface

### Timeline Components

```
┌─────────────────────────────────────────────────────┐
│ TIMELINE          [Select All]   3 frames selected  │
├─────────────────────────────────────────────────────┤
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐  │
│ │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 │ │ 7 │ │ 8 │  │ ← Frame Grid
│ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘  │
│                                                      │
│ Apply prompt to 3 frames                            │
│ [Modify selected frames...            ] [Apply]     │ ← Modification Input
└─────────────────────────────────────────────────────┘
```

### Timeline Features

- **Frame Grid**: Visual representation of all frames
- **Frame Numbers**: 1-indexed display
- **Selection Indicator**: Dark background on selected frames
- **Current Frame**: Blue border around active frame
- **Modified Indicator**: Blue dot on frames with custom prompts
- **Scroll Support**: Horizontal scroll for long animations

## 🎮 Controls & Shortcuts

### Mouse Controls

| Action | Result |
|--------|--------|
| **Click frame** | Select single frame |
| **Shift + Click** | Add/remove from selection |
| **Click "Select All"** | Select all frames |
| **Click "Apply"** | Apply prompt to selection |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Enter** | Apply frame modification |
| **Space** | Play/Pause (when focused) |

## 🎯 Frame Selection Strategies

### Strategy 1: Sequential Selection
Select consecutive frames for smooth transitions:
```
Frames 0-10: Fade in
Frames 11-50: Main animation
Frames 51-60: Fade out
```

### Strategy 2: Interval Selection
Select every Nth frame for rhythmic effects:
```
Frames 0, 10, 20, 30, 40, 50, 60: Accent beats
```

### Strategy 3: Range Selection
Select ranges for multi-stage animations:
```
First third: Spin
Middle third: Scale
Last third: Rotate
```

### Strategy 4: Individual Selection
Target specific critical frames:
```
Frame 0: Start pose
Frame 30: Peak pose
Frame 60: End pose
```

## 🎨 Prompt Modification Examples

### Rotation Prompts
```
"rotate 45 degrees"
"spin faster"
"reverse rotation"
"stop rotation"
```

### Scale Prompts
```
"scale up 2x"
"shrink to 0.5"
"pulse between 0.8 and 1.2"
"grow gradually"
```

### Position Prompts
```
"move up 50px"
"bounce horizontally"
"circle path"
"zigzag motion"
```

### Opacity Prompts
```
"fade in"
"fade out"
"blink effect"
"transparent"
```

### Combined Prompts
```
"rotate and fade out"
"scale up while spinning"
"bounce and pulse"
"spiral movement"
```

## 📊 Technical Details

### Frame Generation

```typescript
interface Frame {
  id: string;           // Unique frame ID
  index: number;        // Frame number (0-based)
  time: number;         // Time in seconds
  properties: {         // Animatable properties
    rotation: number;
    scaleX: number;
    scaleY: number;
    x: number;
    y: number;
    opacity: number;
  };
  prompt?: string;      // Frame-specific prompt
}
```

### Animation File Structure

```typescript
interface AnimationFile {
  id: string;
  name: string;
  prompt: string;       // Initial prompt
  timestamp: Date;
  frames: Frame[];      // All animation frames
  fps: number;          // Frames per second (default 30)
  duration: number;     // Total duration in seconds
}
```

### Default Settings

- **FPS**: 30 frames per second
- **Duration**: 2 seconds
- **Total Frames**: 60 (2s × 30fps)
- **Grid Columns**: Auto-fill (minimum 60px per frame)

## 🎬 Advanced Techniques

### Technique 1: Keyframe Animation

```
1. Create base: "spinning logo"
2. Select key frames: 0, 15, 30, 45, 60
3. Apply custom properties to each
4. Interpolation happens automatically
```

### Technique 2: Layered Effects

```
1. Base: Select all → "rotating circle"
2. First half: Select 0-30 → "fade in"
3. Last half: Select 31-60 → "fade out"
4. Accents: Select 15, 45 → "pulse"
```

### Technique 3: Rhythm & Timing

```
1. Create base animation
2. Select beats: Every 10 frames
3. Apply emphasis on beat frames
4. Creates rhythmic animation
```

### Technique 4: Staggered Animation

```
1. Divide into thirds
2. Each third gets different timing
3. Creates cascading effect
4. Professional motion design
```

## 💡 Tips & Best Practices

### Performance Tips
1. **Keep frame count reasonable** (30-120 frames)
2. **Use GPU-accelerated properties** (transform, opacity)
3. **Avoid modifying all frames frequently**
4. **Preview before exporting**

### Design Tips
1. **Start with base animation** before frame edits
2. **Use keyframes** for major changes
3. **Apply subtle variations** to groups
4. **Test at different speeds**

### Workflow Tips
1. **Save frequently** by exporting
2. **Name files descriptively**
3. **Document complex edits**
4. **Use Select All** for global changes

## 🐛 Troubleshooting

### Issue: Selection not working
**Solution**: Click timeline area, ensure not in play mode

### Issue: Modifications not applying
**Solution**: Ensure frames are selected, check prompt is valid

### Issue: Timeline not showing
**Solution**: Generate animation first, toggle timeline button

### Issue: Preview not updating
**Solution**: Click different frame, check playback is paused

## 📦 Export with Frame Edits

All frame modifications are preserved in exports:

### JSON Export
```json
{
  "frames": [
    {
      "index": 0,
      "time": 0,
      "properties": { ... },
      "prompt": "fade in"
    },
    ...
  ]
}
```

### Lottie Export
- All keyframes included
- Custom timing preserved
- Frame-specific properties exported

### MP4 Export
- Renders all frames
- Smooth interpolation
- 60fps recording

## 🚀 Getting Started Checklist

- [ ] Launch advanced studio: `npm run studio:advanced`
- [ ] Create initial animation with prompt
- [ ] Explore timeline at bottom
- [ ] Try selecting single frame
- [ ] Try selecting multiple frames (Shift+Click)
- [ ] Apply modification to selection
- [ ] Use "Select All" for global change
- [ ] Test playback with Play button
- [ ] Export your animation

## 🎉 Summary

The **Studio Advanced** provides professional frame-by-frame editing:

✅ **Visual Timeline** - See every frame  
✅ **Flexible Selection** - Single, multiple, or all  
✅ **Targeted Prompts** - Modify specific frames  
✅ **Real-time Preview** - See changes instantly  
✅ **Playback Controls** - Test your animation  
✅ **Full Export** - All formats supported

**Create complex, professional animations with precise frame control!** 🎬






