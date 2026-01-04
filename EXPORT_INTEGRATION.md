# 🎬 Export Integration Guide

Complete guide for integrating the export system into Motion Studio projects.

---

## 🚀 Quick Integration (3 Steps)

### Step 1: Import Components

```tsx
import { useRef } from 'react';
import ExportPanel from './components/ExportPanel';
// or import { ExportPanel } from './components';
```

### Step 2: Create Reference

```tsx
function MyComponent() {
  const animationRef = useRef<SVGSVGElement>(null);
  
  // ...rest of your component
}
```

### Step 3: Add Export Panel

```tsx
return (
  <div>
    <svg ref={animationRef}>
      {/* Your animated content */}
    </svg>
    
    <ExportPanel 
      targetElementRef={animationRef}
      animationName="My Animation"
    />
  </div>
);
```

**That's it!** 🎉 Your animation can now be exported to JSON, Lottie, and MP4.

---

## 📦 Installation

The export dependencies are already included in `package.json`:

```bash
npm install
```

New dependencies added:
- `lottie-web@^5.12.2` - Lottie playback
- `lottie-react@^2.4.0` - React Lottie component

---

## 🎯 Integration Patterns

### Pattern 1: With Existing Components

Integrate export into any existing animated component:

```tsx
import { useRef } from 'react';
import { AnimatedLogo } from './components/SVGAnimations';
import ExportPanel from './components/ExportPanel';

export const MyLogoPage = () => {
  const logoRef = useRef<SVGSVGElement>(null);
  
  return (
    <div className="page">
      <header>
        <AnimatedLogo ref={logoRef} size={150} />
      </header>
      
      <footer>
        <ExportPanel 
          targetElementRef={logoRef}
          animationName="Company Logo"
          defaultFilename="logo"
        />
      </footer>
    </div>
  );
};
```

### Pattern 2: Multiple Animations on One Page

Export multiple different animations:

```tsx
import { useRef } from 'react';
import { AnimatedLogo, LoadingSpinner, HeartButton } from './components/SVGAnimations';
import ExportPanel from './components/ExportPanel';

export const MultiExportPage = () => {
  const logoRef = useRef<SVGSVGElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<SVGSVGElement>(null);
  
  return (
    <div className="export-showcase">
      {/* Logo Section */}
      <section>
        <h2>Logo Animation</h2>
        <AnimatedLogo ref={logoRef} size={120} />
        <ExportPanel 
          targetElementRef={logoRef}
          animationName="Logo"
          defaultFilename="logo-animation"
        />
      </section>
      
      {/* Spinner Section */}
      <section>
        <h2>Loading Spinner</h2>
        <LoadingSpinner ref={spinnerRef} size={60} />
        <ExportPanel 
          targetElementRef={spinnerRef}
          animationName="Spinner"
          defaultFilename="spinner"
        />
      </section>
      
      {/* Button Section */}
      <section>
        <h2>Heart Button</h2>
        <HeartButton ref={buttonRef} />
        <ExportPanel 
          targetElementRef={buttonRef}
          animationName="Heart Button"
          defaultFilename="heart"
        />
      </section>
    </div>
  );
};
```

### Pattern 3: Programmatic Export

Export programmatically without the UI:

```tsx
import { useRef } from 'react';
import { exportAnimation, createAnimationData } from './utils/exportUtils';

export const ProgrammaticExport = () => {
  const animRef = useRef<SVGSVGElement>(null);
  
  const handleExport = async (format: 'json' | 'lottie' | 'mp4') => {
    if (!animRef.current) return;
    
    // Define your animation data
    const animationData = createAnimationData(
      'Custom Animation',
      [
        { time: 0, properties: { opacity: 0, scale: 0.8 } },
        { time: 1, properties: { opacity: 1, scale: 1 } },
      ],
      { fps: 60 }
    );
    
    // Export
    await exportAnimation({
      element: animRef.current,
      animationData,
      formats: [format],
      filename: 'custom-export',
    });
    
    console.log(`Exported as ${format}!`);
  };
  
  return (
    <div>
      <svg ref={animRef}>
        {/* Animation content */}
      </svg>
      
      <div className="export-buttons">
        <button onClick={() => handleExport('json')}>Export JSON</button>
        <button onClick={() => handleExport('lottie')}>Export Lottie</button>
        <button onClick={() => handleExport('mp4')}>Export MP4</button>
      </div>
    </div>
  );
};
```

### Pattern 4: With Custom Hooks

Create a reusable export hook:

```tsx
import { useRef, useCallback } from 'react';
import { exportAnimation, createAnimationData, AnimationKeyframe } from './utils/exportUtils';

export const useAnimationExport = (animationName: string, keyframes: AnimationKeyframe[]) => {
  const elementRef = useRef<SVGSVGElement>(null);
  
  const exportAs = useCallback(async (format: 'json' | 'lottie' | 'mp4') => {
    if (!elementRef.current) {
      throw new Error('Element reference not found');
    }
    
    const animationData = createAnimationData(animationName, keyframes, { fps: 60 });
    
    await exportAnimation({
      element: elementRef.current,
      animationData,
      formats: [format],
      filename: animationName.toLowerCase().replace(/\s+/g, '-'),
    });
    
    return true;
  }, [animationName, keyframes]);
  
  const exportAll = useCallback(async () => {
    if (!elementRef.current) return;
    
    const animationData = createAnimationData(animationName, keyframes, { fps: 60 });
    
    await exportAnimation({
      element: elementRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: animationName.toLowerCase().replace(/\s+/g, '-'),
    });
    
    return true;
  }, [animationName, keyframes]);
  
  return {
    elementRef,
    exportAs,
    exportAll,
  };
};

// Usage
export const MyAnimatedComponent = () => {
  const keyframes = [
    { time: 0, properties: { opacity: 0 } },
    { time: 1, properties: { opacity: 1 } },
  ];
  
  const { elementRef, exportAs, exportAll } = useAnimationExport('My Animation', keyframes);
  
  return (
    <div>
      <svg ref={elementRef}>
        {/* Content */}
      </svg>
      <button onClick={() => exportAs('json')}>JSON</button>
      <button onClick={() => exportAs('lottie')}>Lottie</button>
      <button onClick={() => exportAs('mp4')}>MP4</button>
      <button onClick={exportAll}>Export All</button>
    </div>
  );
};
```

---

## 🎨 Styling the Export Panel

### Custom Theme

Customize the export panel appearance:

```tsx
<ExportPanel 
  targetElementRef={ref}
  animationName="My Animation"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '30px',
    // ...your custom styles
  }}
/>
```

### Inline in Toolbar

Integrate into existing UI:

```tsx
<div className="animation-toolbar">
  <button onClick={handlePlay}>Play</button>
  <button onClick={handlePause}>Pause</button>
  <button onClick={handleReset}>Reset</button>
  
  {/* Compact export button */}
  <button onClick={handleShowExportPanel}>Export</button>
  
  {showExportPanel && (
    <ExportPanel 
      targetElementRef={animRef}
      animationName="My Animation"
    />
  )}
</div>
```

---

## 🔧 Advanced Customization

### Custom Animation Data from Framer Motion

Extract animation data from Framer Motion variants:

```tsx
import { extractFramerMotionData } from './utils/exportUtils';

const variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -20 },
};

const animationData = extractFramerMotionData(variants, 0.4, 60);
// Now use animationData with export functions
```

### Custom Recording Settings

Fine-tune video recording:

```tsx
<ExportPanel 
  targetElementRef={ref}
  animationName="High Quality Animation"
  recordingOptions={{
    fps: 60,
    duration: 5000,
    width: 3840,  // 4K
    height: 2160,
    videoBitsPerSecond: 20000000,  // 20 Mbps
  }}
/>
```

### Export with Callbacks

Track export progress:

```tsx
const [exportStatus, setExportStatus] = useState('');

<ExportPanel 
  targetElementRef={ref}
  animationName="Tracked Animation"
  onExportStart={() => {
    setExportStatus('Exporting...');
    // Show loading indicator
  }}
  onExportComplete={(format) => {
    setExportStatus(`${format} exported successfully!`);
    // Show success message
    // Track analytics
    analytics.track('animation_exported', { format });
  }}
  onExportError={(error) => {
    setExportStatus(`Export failed: ${error}`);
    // Show error message
    // Log to error service
    errorLogger.log(error);
  }}
/>
```

---

## 🌐 Cross-Platform Usage

### Web (React)

```tsx
import ExportPanel from './components/ExportPanel';
<ExportPanel targetElementRef={ref} animationName="Web Animation" />
```

### React Native (Lottie Export)

```tsx
// 1. Export as Lottie in web app
// 2. Use exported JSON in React Native:

import LottieView from 'lottie-react-native';
import animationData from './exported-animation.json';

export const RNAnimation = () => (
  <LottieView
    source={animationData}
    autoPlay
    loop
    style={{ width: 200, height: 200 }}
  />
);
```

### iOS (Swift)

```swift
import Lottie

let animationView = LottieAnimationView(name: "exported-animation")
animationView.contentMode = .scaleAspectFit
animationView.loopMode = .loop
animationView.animationSpeed = 1.0
view.addSubview(animationView)
animationView.play()
```

### Android (Kotlin)

```kotlin
val animationView = findViewById<LottieAnimationView>(R.id.animation_view)
animationView.setAnimation("exported-animation.json")
animationView.repeatCount = LottieDrawable.INFINITE
animationView.playAnimation()
```

---

## 📊 Performance Considerations

### 1. Element Visibility

Ensure element is visible during export:

```tsx
<div style={{ 
  position: isExporting ? 'fixed' : 'relative',
  opacity: isExporting ? 0 : 1,  // Hidden from user but still rendered
  pointerEvents: isExporting ? 'none' : 'auto',
}}>
  <svg ref={animRef}>
    {/* Animation */}
  </svg>
</div>
```

### 2. Memory Management

Clean up after large exports:

```tsx
const handleExport = async () => {
  try {
    await exportAnimation({...});
  } finally {
    // Cleanup
    if (canvas) canvas.remove();
    URL.revokeObjectURL(tempUrl);
  }
};
```

### 3. Batch Export Optimization

Export multiple formats efficiently:

```tsx
// Good: Single export call with multiple formats
await exportAnimation({
  element,
  animationData,
  formats: ['json', 'lottie', 'mp4'],  // All at once
  filename: 'animation',
});

// Avoid: Separate exports (slower)
await exportAnimation({ formats: ['json'] });
await exportAnimation({ formats: ['lottie'] });
await exportAnimation({ formats: ['mp4'] });
```

---

## 🧪 Testing

### Unit Test Export Functions

```tsx
import { createAnimationData, exportToJSON } from './utils/exportUtils';

describe('Export Utils', () => {
  it('creates animation data correctly', () => {
    const data = createAnimationData('Test', [
      { time: 0, properties: { opacity: 0 } },
      { time: 1, properties: { opacity: 1 } },
    ], { fps: 60 });
    
    expect(data.name).toBe('Test');
    expect(data.fps).toBe(60);
    expect(data.keyframes).toHaveLength(2);
  });
  
  it('exports to JSON correctly', () => {
    const data = createAnimationData('Test', [], { fps: 60 });
    const json = exportToJSON(data);
    
    expect(typeof json).toBe('string');
    expect(JSON.parse(json)).toHaveProperty('name', 'Test');
  });
});
```

### Integration Test Export Panel

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import ExportPanel from './components/ExportPanel';

describe('ExportPanel', () => {
  it('renders export panel', () => {
    const ref = { current: document.createElement('svg') };
    render(<ExportPanel targetElementRef={ref} animationName="Test" />);
    
    expect(screen.getByText(/Export Animation/i)).toBeInTheDocument();
  });
  
  it('handles export button click', async () => {
    const ref = { current: document.createElement('svg') };
    const onExportComplete = jest.fn();
    
    render(
      <ExportPanel 
        targetElementRef={ref} 
        onExportComplete={onExportComplete}
      />
    );
    
    fireEvent.click(screen.getByText(/Export Animation/i));
    
    // Wait for export to complete
    await waitFor(() => {
      expect(onExportComplete).toHaveBeenCalled();
    });
  });
});
```

---

## 🐛 Troubleshooting

### Issue: "No target element found"

**Solution:**
```tsx
// Ensure ref is attached before rendering ExportPanel
const [isReady, setIsReady] = useState(false);

useEffect(() => {
  if (animRef.current) {
    setIsReady(true);
  }
}, []);

return (
  <>
    <svg ref={animRef}>{/* ... */}</svg>
    {isReady && <ExportPanel targetElementRef={animRef} />}
  </>
);
```

### Issue: MP4 export not working in Safari

**Solution:**
```tsx
// Check browser support before showing MP4 option
const supportsMP4 = typeof MediaRecorder !== 'undefined' && 
  MediaRecorder.isTypeSupported('video/webm');

{supportsMP4 && <button onClick={handleMP4Export}>Export MP4</button>}
```

### Issue: Exported Lottie doesn't match animation

**Solution:**
Use more detailed keyframes for complex animations:

```tsx
// Instead of 2 keyframes
[
  { time: 0, properties: { x: 0 } },
  { time: 2, properties: { x: 100 } },
]

// Use more intermediate keyframes
[
  { time: 0, properties: { x: 0 } },
  { time: 0.5, properties: { x: 25 } },
  { time: 1, properties: { x: 50 } },
  { time: 1.5, properties: { x: 75 } },
  { time: 2, properties: { x: 100 } },
]
```

---

## 📚 Complete Example App

Full working example with all features:

```tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExportPanel from './components/ExportPanel';

export const CompleteExportExample = () => {
  const animationRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [exportStatus, setExportStatus] = useState('');

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <h1>Animation Export Demo</h1>
      
      {/* Status */}
      {exportStatus && (
        <div style={{ padding: '12px', background: '#e0f7fa', borderRadius: '8px', marginBottom: '20px' }}>
          {exportStatus}
        </div>
      )}
      
      {/* Animation Preview */}
      <div style={{ 
        background: '#f5f5f5', 
        borderRadius: '16px', 
        padding: '40px', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px'
      }}>
        <svg ref={animationRef} width="200" height="200" viewBox="0 0 200 200">
          <motion.circle
            cx="100"
            cy="100"
            r="50"
            fill="#667eea"
            animate={isAnimating ? {
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>
      
      {/* Controls */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={() => window.location.reload()}>
          🔄 Reset
        </button>
      </div>
      
      {/* Export Panel */}
      <ExportPanel
        targetElementRef={animationRef}
        animationName="Circle Animation"
        defaultFilename="circle-animation"
        onExportStart={() => setExportStatus('⏳ Exporting...')}
        onExportComplete={(format) => setExportStatus(`✅ ${format} exported successfully!`)}
        onExportError={(error) => setExportStatus(`❌ Export failed: ${error}`)}
      />
      
      {/* Info */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3>Export Formats:</h3>
        <ul>
          <li><strong>JSON</strong>: Animation keyframe data</li>
          <li><strong>Lottie</strong>: For web and mobile apps</li>
          <li><strong>MP4</strong>: Video at 60fps (exports as WebM)</li>
        </ul>
      </div>
    </div>
  );
};
```

---

## 🎉 Summary

You've successfully integrated the export system! Your animations can now be:

✅ Exported to JSON for data storage  
✅ Converted to Lottie for cross-platform use  
✅ Recorded as MP4 video at 60fps  
✅ Integrated with a beautiful UI  
✅ Customized to fit your workflow  

---

**Need more help?**
- [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) - Complete documentation
- [EXPORT_QUICK_REFERENCE.md](./EXPORT_QUICK_REFERENCE.md) - Quick reference
- [EXPORT_EXAMPLES.md](./EXPORT_EXAMPLES.md) - Real-world examples

Happy exporting! 🚀✨






