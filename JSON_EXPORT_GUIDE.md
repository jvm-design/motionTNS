# JSON Motion Export Guide

## Overview

The Motion Autoya export system now includes comprehensive **JSON motion specification** export. When you click the "💾 Export SVG" button, you'll receive a ZIP file containing:

1. **SVG file** - The visual graphics
2. **Motion JSON file** - Complete animation specification
3. **README** - Quick reference guide

## What's Included in the Motion JSON

The motion JSON file is a complete specification of your animation that can be used to recreate the exact same motion timing on any platform (iOS, Android, Web, Flutter, Unity, etc.)

### JSON Structure

```json
{
  "name": "Animation Name",
  "version": "1.0.0",
  "generatedBy": "Motion Autoya",
  "exportDate": "ISO timestamp",
  
  "animation": {
    "duration": 1.5,
    "fps": 60,
    "totalFrames": 90,
    "loop": false,
    "autoplay": false
  },
  
  "timing": {
    "logoRecognition": { "start": 0, "end": 0.400 },
    "convergence": { "start": 0.400, "end": 0.750 },
    "beatPause": { "start": 0.750, "end": 0.800 },
    "greenTransform": { "start": 0.800, "end": 1.150 },
    "checkmark": { "start": 1.150, "end": 1.500 }
  },
  
  "frames": {
    "logoRecognition": { "start": 0, "end": 24 },
    "convergence": { "start": 24, "end": 45 },
    "beatPause": { "start": 45, "end": 48 },
    "greenTransform": { "start": 48, "end": 69 },
    "checkmark": { "start": 69, "end": 90 }
  },
  
  "principles": {
    "appleMotion": true,
    "clarity": "Every stage is visible and understandable",
    "deference": "Motion guides attention smoothly",
    "continuity": "Smooth, followable transitions",
    "premium": "Quality timing matches Apple Pay success (1.5s)",
    "responsive": "Fast enough to feel responsive",
    "delightful": "Users can appreciate the craftsmanship"
  },
  
  "phases": [
    {
      "name": "Logo Recognition",
      "startFrame": 0,
      "endFrame": 24,
      "duration": 0.400,
      "description": "Initial logo visibility",
      "easing": "linear"
    },
    {
      "name": "Convergence",
      "startFrame": 24,
      "endFrame": 45,
      "duration": 0.350,
      "description": "Liquid motion - shapes converge",
      "easing": "camera-spring",
      "easingParams": {
        "type": "spring",
        "overshoot": 0.015,
        "stagger": 0.02
      }
    }
    // ... more phases
  ],
  
  "elements": {
    "logo": {
      "type": "group",
      "count": 9,
      "centerPoint": { "x": 29.27, "y": 30.5 }
    },
    "successCircle": {
      "type": "circle",
      "radius": 5.2,
      "fill": "radial-gradient",
      "gradient": { /* gradient stops */ }
    },
    "checkmark": {
      "type": "path",
      "stroke": "white",
      "strokeWidth": 1.8,
      "pathData": "M 26.5 30.5 L 28.5 32.8 L 32 28.5"
    }
  },
  
  "synchronization": {
    "enabled": true,
    "syncPoint": {
      "frame": 18,
      "time": 0.300,
      "description": "Synced with camera shutter sound"
    },
    "hapticFeedback": {
      "trigger": "onStart",
      "time": 0
    }
  }
}
```

## Dependencies Already Included

The following packages are already installed and used for export:

### Core Export Library
- **`jszip`** (v3.10.1) - Creates ZIP files containing multiple export formats
  - Used to bundle SVG, JSON, and README into a single download

### Already Available (for future enhancements)
- **`lottie-web`** (v5.12.2) - For Lottie JSON format export
- **`@ffmpeg/ffmpeg`** (v0.12.15) - For video format export (MP4, WebM)

## How to Use

### 1. Export the Animation

```tsx
// Click the "💾 Export SVG" button in the Frame Viewer
// You'll get a ZIP file named: `autoya-success-animation-export.zip`
```

### 2. Extract the ZIP

The ZIP contains:
- `autoya-success-animation.svg` - Vector graphics
- `autoya-success-animation-motion.json` - Motion specification
- `README.md` - Quick reference

### 3. Use the Motion JSON

#### iOS (Swift/SwiftUI)

```swift
// Read the JSON
guard let url = Bundle.main.url(forResource: "autoya-success-animation-motion", withExtension: "json"),
      let data = try? Data(contentsOf: url),
      let motion = try? JSONDecoder().decode(MotionSpec.self, from: data) else {
    return
}

// Use timing
let duration = motion.animation.duration
let convergenceStart = motion.timing.convergence.start
let convergenceEnd = motion.timing.convergence.end

withAnimation(.spring(response: 0.35, dampingFraction: 0.85)) {
    // Your animation
}
```

#### Android (Kotlin)

```kotlin
// Parse JSON
val jsonString = context.assets.open("autoya-success-animation-motion.json")
    .bufferedReader().use { it.readText() }
val motion = Gson().fromJson(jsonString, MotionSpec::class.java)

// Use timing
val duration = motion.animation.duration * 1000 // Convert to ms
val convergenceStart = motion.timing.convergence.start * 1000

ValueAnimator.ofFloat(0f, 1f).apply {
    this.duration = duration.toLong()
    interpolator = DecelerateInterpolator()
    start()
}
```

#### Flutter

```dart
// Load JSON
final jsonString = await rootBundle.loadString('assets/autoya-success-animation-motion.json');
final motion = MotionSpec.fromJson(jsonDecode(jsonString));

// Use timing
final duration = Duration(milliseconds: (motion.animation.duration * 1000).toInt());
final convergenceStart = motion.timing.convergence.start;

// Create animation
AnimationController(
  duration: duration,
  vsync: this,
)..forward();
```

#### Web (JavaScript/TypeScript)

```typescript
// Load JSON
const response = await fetch('/animations/autoya-success-animation-motion.json');
const motion = await response.json();

// Use timing with GSAP
gsap.timeline()
  .to('.logo', {
    duration: motion.timing.convergence.end - motion.timing.convergence.start,
    x: motion.elements.logo.centerPoint.x,
    y: motion.elements.logo.centerPoint.y,
    ease: 'power2.out'
  })
  .to('.checkmark', {
    duration: motion.timing.checkmark.end - motion.timing.checkmark.start,
    strokeDashoffset: 0,
    ease: 'power2.out'
  });
```

## Key Features of the Export

### 1. Complete Timing Information
- Frame-accurate timing breakpoints
- Duration in both seconds and frames
- FPS specifications

### 2. Easing Functions
- Named easing curves (linear, ease-out, ease-in-out)
- Custom spring physics parameters
- Bezier curve definitions

### 3. Visual Element Specs
- Element types and properties
- Colors, gradients, and strokes
- Positioning and dimensions

### 4. Motion Principles
- Apple Motion Principles applied
- Rationale for each timing decision
- Premium motion guidelines

### 5. Synchronization Points
- Camera shutter sync points
- Haptic feedback timing
- Audio cue integration points

## Advanced Usage

### Custom Animation Phases

You can extract individual phases and use them separately:

```typescript
const phases = motion.phases;

// Just the convergence phase
const convergence = phases.find(p => p.name === "Convergence");
if (convergence) {
  animate(element, {
    duration: convergence.duration,
    easing: convergence.easing,
    // Apply convergence animation
  });
}
```

### Recreate Spring Physics

The JSON includes exact spring parameters:

```typescript
const convergencePhase = motion.phases.find(p => p.name === "Convergence");
const springParams = convergencePhase.easingParams;

// CSS
element.style.transition = `transform ${convergencePhase.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

// Or with a physics library
spring({
  overshoot: springParams.overshoot,
  stagger: springParams.stagger,
});
```

### Scale Timing

Need a faster or slower version? Scale the timing:

```typescript
function scaleAnimation(motion, scale) {
  return {
    ...motion,
    animation: {
      ...motion.animation,
      duration: motion.animation.duration * scale
    },
    timing: Object.fromEntries(
      Object.entries(motion.timing).map(([key, value]) => [
        key,
        { start: value.start * scale, end: value.end * scale }
      ])
    )
  };
}

// Make it 2x faster
const fastMotion = scaleAnimation(motion, 0.5);
```

## Integration Examples

### React with Framer Motion

```tsx
import { motion } from 'framer-motion';
import motionSpec from './autoya-success-animation-motion.json';

export function LogoAnimation() {
  const convergence = motionSpec.phases.find(p => p.name === "Convergence");
  
  return (
    <motion.div
      animate={{
        x: motionSpec.elements.logo.centerPoint.x,
        y: motionSpec.elements.logo.centerPoint.y,
      }}
      transition={{
        duration: convergence.duration,
        ease: "easeOut"
      }}
    />
  );
}
```

### GSAP Timeline

```javascript
import gsap from 'gsap';
import motionSpec from './autoya-success-animation-motion.json';

const timeline = gsap.timeline();

motionSpec.phases.forEach(phase => {
  timeline.to('.element', {
    duration: phase.duration,
    // Apply phase-specific animations
  }, phase.startFrame / motionSpec.animation.fps);
});
```

### Lottie Conversion

The export utilities also include Lottie conversion (already have `lottie-web` installed):

```typescript
import { convertToLottie } from './utils/exportUtils';

// Convert motion data to Lottie format
const lottieData = convertToLottie(motionSpec);
```

## Package Dependencies

All necessary dependencies are already in your `package.json`:

```json
{
  "dependencies": {
    "jszip": "^3.10.1",           // ✅ Used for ZIP export
    "lottie-web": "^5.12.2",      // ✅ Available for Lottie export
    "lottie-react": "^2.4.0",     // ✅ React Lottie player
    "framer-motion": "^11.0.3",   // ✅ Used in animations
    "gsap": "^3.12.5",            // ✅ Alternative animation library
    "@ffmpeg/ffmpeg": "^0.12.15"  // ✅ Available for video export
  }
}
```

## Troubleshooting

### Export button not working?
- Check that `svgRef` is properly attached to the SVG element
- Verify the element is rendered before clicking export

### JSON missing data?
- The JSON is generated based on the current animation state
- Ensure animation parameters are passed to `SimpleExportButton`

### Need different export format?
- Check the `src/utils/` folder for other export utilities:
  - `lottieExport.ts` - Lottie JSON export
  - `videoExport.ts` - Video export
  - `exportUtils.ts` - General export utilities

## Next Steps

1. **Export your animation** - Click the export button
2. **Inspect the JSON** - Open the motion JSON file
3. **Integrate into your platform** - Use the timing specs
4. **Test synchronization** - Verify timing matches expectations
5. **Share with your team** - The JSON is self-documenting

## Support

For more information:
- Check `src/components/SimpleExportButton.tsx` for export logic
- See `src/utils/exportUtils.ts` for additional export formats
- Review `src/components/SVGAnimations/AutoyaLogoFrameControlled.tsx` for the animation source

---

**Generated by Motion Autoya** - Premium motion design system with Apple's motion principles





