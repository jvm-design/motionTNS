# 🎬 Export Quick Reference

## 📦 One-Line Setup

```tsx
import ExportPanel from './components/ExportPanel';
<ExportPanel targetElementRef={myRef} animationName="My Animation" />
```

---

## 🚀 Export Formats

| Format | Output | Use Case | File Size |
|--------|--------|----------|-----------|
| **JSON** | `.json` | Data storage, versioning | Small |
| **Lottie** | `.json` | Mobile apps, web players | Small |
| **MP4** | `.webm/.mp4` | Video, social media | Large |

---

## 💻 Code Examples

### Basic Export Panel

```tsx
import { useRef } from 'react';
import ExportPanel from './components/ExportPanel';

function App() {
  const animationRef = useRef<SVGSVGElement>(null);
  
  return (
    <>
      <svg ref={animationRef}>
        {/* Your animation */}
      </svg>
      <ExportPanel targetElementRef={animationRef} />
    </>
  );
}
```

### With Callbacks

```tsx
<ExportPanel
  targetElementRef={svgRef}
  animationName="Logo Animation"
  defaultFilename="logo"
  onExportStart={() => console.log('Starting...')}
  onExportComplete={(format) => console.log(`${format} done!`)}
  onExportError={(error) => console.error(error)}
/>
```

### Manual Export - JSON

```tsx
import { downloadJSON, createAnimationData } from './utils/exportUtils';

const data = createAnimationData('My Anim', [
  { time: 0, properties: { opacity: 0 } },
  { time: 2, properties: { opacity: 1 } }
], { fps: 60 });

downloadJSON(data, 'animation.json');
```

### Manual Export - Lottie

```tsx
import { downloadLottie, createAnimationData } from './utils/exportUtils';

const data = createAnimationData('My Anim', keyframes, { fps: 60 });
downloadLottie(data, 'animation-lottie.json');
```

### Manual Export - MP4

```tsx
import { recordAnimationToMP4, downloadMP4 } from './utils/exportUtils';

const canvas = document.querySelector('canvas');
const blob = await recordAnimationToMP4(canvas, {
  fps: 60,
  duration: 3000,
  width: 1920,
  height: 1080
});
downloadMP4(blob, 'animation.webm');
```

### Complete Workflow

```tsx
import { exportAnimation, createAnimationData } from './utils/exportUtils';

const element = document.querySelector('svg');
const animationData = createAnimationData('My Anim', keyframes, { fps: 60 });

await exportAnimation({
  element,
  animationData,
  formats: ['json', 'lottie', 'mp4'],
  filename: 'my-export',
  recordingOptions: { fps: 60, duration: 3000 }
});
```

---

## 🎯 Animation Data Structure

```typescript
const animationData = {
  name: 'My Animation',
  duration: 3,      // seconds
  fps: 60,
  keyframes: [
    {
      time: 0,      // seconds
      properties: {
        x: 0,
        y: 0,
        opacity: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    },
    {
      time: 1.5,
      properties: {
        x: 100,
        y: 50,
        opacity: 1,
        rotation: 180
      }
    }
  ],
  metadata: {
    width: 1920,
    height: 1080,
    description: 'My animation description'
  }
};
```

---

## 🔧 Common Keyframe Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | number | Horizontal position |
| `y` | number | Vertical position |
| `scaleX` | number | Horizontal scale (1 = 100%) |
| `scaleY` | number | Vertical scale (1 = 100%) |
| `rotation` | number | Rotation in degrees |
| `opacity` | number | Opacity (0-1) |

---

## ⚙️ Recording Options

```typescript
{
  fps: 60,                    // 24, 30, 60
  duration: 3000,             // milliseconds
  width: 1920,                // pixels
  height: 1080,               // pixels
  videoBitsPerSecond: 8000000 // 8 Mbps
}
```

### Quality Presets

```typescript
// Low (quick preview)
{ fps: 30, width: 1280, height: 720, videoBitsPerSecond: 2000000 }

// Medium (balanced)
{ fps: 60, width: 1920, height: 1080, videoBitsPerSecond: 8000000 }

// High (production)
{ fps: 60, width: 3840, height: 2160, videoBitsPerSecond: 20000000 }
```

---

## 📱 Using Lottie Exports

### Web (React)

```tsx
import Lottie from 'lottie-react';
import animation from './animation-lottie.json';

function App() {
  return <Lottie animationData={animation} loop={true} />;
}
```

### Web (Vanilla JS)

```html
<div id="lottie"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation-lottie.json'
  });
</script>
```

### iOS (Swift)

```swift
import Lottie

let animationView = LottieAnimationView(name: "animation-lottie")
animationView.loopMode = .loop
animationView.play()
```

### Android (Kotlin)

```kotlin
val animationView = findViewById<LottieAnimationView>(R.id.animation_view)
animationView.setAnimation("animation-lottie.json")
animationView.loop(true)
animationView.playAnimation()
```

---

## 🔄 Format Conversion

### WebM to MP4

```bash
ffmpeg -i animation.webm animation.mp4
```

### High Quality MP4

```bash
ffmpeg -i animation.webm -c:v libx264 -crf 18 -preset slow animation.mp4
```

### GIF from MP4

```bash
ffmpeg -i animation.mp4 -vf "fps=30,scale=800:-1" animation.gif
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MP4 not recording | Check `MediaRecorder` browser support |
| Lottie not playing | Validate JSON structure |
| File too large | Reduce FPS, resolution, or bitrate |
| Animation looks different | Wait for all assets to load |

---

## 🌐 Browser Support

| Browser | JSON | Lottie | MP4 |
|---------|------|--------|-----|
| Chrome | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ | ⚠️ |
| Edge | ✅ | ✅ | ✅ |

⚠️ Safari has limited MediaRecorder support

---

## 📚 Full Documentation

See [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) for complete documentation.

---

## 🎉 Quick Start

1. **Import**: `import ExportPanel from './components/ExportPanel'`
2. **Create ref**: `const ref = useRef<SVGSVGElement>(null)`
3. **Add panel**: `<ExportPanel targetElementRef={ref} />`
4. **Export**: Click export button and select formats

That's it! 🚀






