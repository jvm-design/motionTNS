# 🎬 Export Examples

Real-world examples of exporting Motion Studio animations to JSON, Lottie, and MP4.

---

## Table of Contents

1. [Simple Button Animation](#1-simple-button-animation)
2. [Logo Reveal](#2-logo-reveal)
3. [Loading Spinner](#3-loading-spinner)
4. [Progress Bar](#4-progress-bar)
5. [Data Chart Animation](#5-data-chart-animation)
6. [Complex Multi-Stage Animation](#6-complex-multi-stage-animation)
7. [Morphing Shape](#7-morphing-shape)
8. [Background Effect](#8-background-effect)

---

## 1. Simple Button Animation

### Export a like button with heart animation

```tsx
import { useRef, useState } from 'react';
import { HeartButton } from './components/SVGAnimations';
import ExportPanel from './components/ExportPanel';
import { createAnimationData } from './utils/exportUtils';

export const HeartButtonExporter = () => {
  const buttonRef = useRef<SVGSVGElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Define animation keyframes
  const animationData = createAnimationData(
    'Heart Button Animation',
    [
      { 
        time: 0, 
        properties: { 
          scale: 1, 
          opacity: 1,
          rotation: 0 
        } 
      },
      { 
        time: 0.15, 
        properties: { 
          scale: 1.3, 
          opacity: 1,
          rotation: 10 
        } 
      },
      { 
        time: 0.3, 
        properties: { 
          scale: 1, 
          opacity: 1,
          rotation: 0 
        } 
      },
    ],
    { 
      fps: 60,
      width: 200,
      height: 200,
      description: 'Heart button like animation with scale and rotation'
    }
  );

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Heart Button Export</h2>
      <div ref={buttonRef}>
        <HeartButton 
          isActive={isLiked} 
          onClick={() => setIsLiked(!isLiked)} 
        />
      </div>
      <ExportPanel 
        targetElementRef={buttonRef}
        animationName="heart-button"
        defaultFilename="heart-animation"
      />
    </div>
  );
};
```

**Expected Output:**
- JSON: Heart button keyframes with scale/rotation data
- Lottie: Playable heart animation for web/mobile
- MP4: 60fps video of the heart animation

---

## 2. Logo Reveal

### Export a logo with path drawing animation

```tsx
import { useRef } from 'react';
import { AnimatedLogo } from './components/SVGAnimations';
import { exportAnimation, createAnimationData } from './utils/exportUtils';

export const LogoRevealExporter = () => {
  const logoRef = useRef<SVGSVGElement>(null);

  const handleExport = async () => {
    if (!logoRef.current) return;

    const animationData = createAnimationData(
      'Logo Reveal',
      [
        { 
          time: 0, 
          properties: { 
            strokeDashoffset: 1000,
            opacity: 0,
            scale: 0.8
          } 
        },
        { 
          time: 1, 
          properties: { 
            strokeDashoffset: 500,
            opacity: 0.5,
            scale: 0.9
          } 
        },
        { 
          time: 2, 
          properties: { 
            strokeDashoffset: 0,
            opacity: 1,
            scale: 1
          } 
        },
      ],
      { 
        fps: 60,
        width: 400,
        height: 400,
        description: 'Logo reveal with path drawing animation'
      }
    );

    await exportAnimation({
      element: logoRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: 'logo-reveal',
      recordingOptions: {
        fps: 60,
        duration: 2000,
        width: 1920,
        height: 1080,
      },
    });

    alert('Logo exported successfully!');
  };

  return (
    <div>
      <AnimatedLogo ref={logoRef} size={200} />
      <button onClick={handleExport}>Export Logo Animation</button>
    </div>
  );
};
```

---

## 3. Loading Spinner

### Export a continuous loading animation

```tsx
import { useRef } from 'react';
import { LoadingSpinner } from './components/SVGAnimations';
import { createAnimationData, downloadJSON, downloadLottie } from './utils/exportUtils';

export const SpinnerExporter = () => {
  const spinnerRef = useRef<SVGSVGElement>(null);

  const exportSpinner = () => {
    // Create continuous rotation animation
    const keyframes = [];
    const duration = 2; // 2 second loop
    const steps = 60; // 60 keyframes

    for (let i = 0; i <= steps; i++) {
      const time = (i / steps) * duration;
      const rotation = (i / steps) * 360;
      
      keyframes.push({
        time,
        properties: {
          rotation,
          opacity: 0.8 + Math.sin((i / steps) * Math.PI * 2) * 0.2,
        },
      });
    }

    const animationData = createAnimationData(
      'Loading Spinner',
      keyframes,
      { 
        fps: 60,
        width: 100,
        height: 100,
        description: 'Continuous loading spinner animation'
      }
    );

    // Export both JSON and Lottie
    downloadJSON(animationData, 'spinner.json');
    downloadLottie(animationData, 'spinner-lottie.json');
  };

  return (
    <div>
      <LoadingSpinner ref={spinnerRef} size={60} />
      <button onClick={exportSpinner}>Export Spinner</button>
    </div>
  );
};
```

---

## 4. Progress Bar

### Export progress animation from 0% to 100%

```tsx
import { useRef, useState, useEffect } from 'react';
import { LinearProgress } from './components/SVGAnimations';
import ExportPanel from './components/ExportPanel';
import { createAnimationData } from './utils/exportUtils';

export const ProgressExporter = () => {
  const progressRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Create smooth progress animation
  const animationData = createAnimationData(
    'Progress Bar',
    [
      { time: 0, properties: { progress: 0, opacity: 0.6 } },
      { time: 1, properties: { progress: 25, opacity: 0.8 } },
      { time: 2, properties: { progress: 50, opacity: 1 } },
      { time: 3, properties: { progress: 75, opacity: 0.8 } },
      { time: 4, properties: { progress: 100, opacity: 1 } },
    ],
    { 
      fps: 60,
      width: 400,
      height: 50,
      description: 'Progress bar from 0% to 100%'
    }
  );

  return (
    <div style={{ padding: '40px' }}>
      <h3>Progress: {progress}%</h3>
      <div ref={progressRef}>
        <LinearProgress progress={progress} width={400} />
      </div>
      <ExportPanel 
        targetElementRef={progressRef}
        animationName="progress-bar"
        defaultFilename="progress"
      />
    </div>
  );
};
```

---

## 5. Data Chart Animation

### Export animated bar chart

```tsx
import { useRef } from 'react';
import { AnimatedBarChart } from './components/SVGAnimations';
import { exportAnimation, createAnimationData } from './utils/exportUtils';

export const ChartExporter = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const chartData = [45, 78, 62, 90, 55];

  const handleExport = async () => {
    if (!chartRef.current) return;

    // Create staggered bar animation
    const keyframes = [];
    const duration = 2;
    const barCount = chartData.length;

    // Initial state - all bars at 0 height
    keyframes.push({
      time: 0,
      properties: chartData.reduce((acc, _, i) => ({
        ...acc,
        [`bar${i}Height`]: 0,
        [`bar${i}Opacity`]: 0,
      }), {}),
    });

    // Animate each bar with stagger
    chartData.forEach((value, i) => {
      const startTime = (i / barCount) * duration * 0.5;
      const endTime = startTime + duration * 0.3;
      
      keyframes.push({
        time: endTime,
        properties: {
          [`bar${i}Height`]: value,
          [`bar${i}Opacity`]: 1,
        },
      });
    });

    const animationData = createAnimationData(
      'Bar Chart Animation',
      keyframes,
      { 
        fps: 60,
        width: 500,
        height: 300,
        description: 'Staggered bar chart animation'
      }
    );

    await exportAnimation({
      element: chartRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: 'bar-chart',
      recordingOptions: { fps: 60, duration: 2500 },
    });
  };

  return (
    <div>
      <AnimatedBarChart 
        ref={chartRef}
        data={chartData}
        width={500}
        height={300}
      />
      <button onClick={handleExport}>Export Chart</button>
    </div>
  );
};
```

---

## 6. Complex Multi-Stage Animation

### Export animation with multiple stages (fade in, move, rotate, fade out)

```tsx
import { createAnimationData, exportAnimation } from './utils/exportUtils';

export const ComplexAnimationExporter = () => {
  const complexRef = useRef<SVGSVGElement>(null);

  const handleExport = async () => {
    if (!complexRef.current) return;

    const animationData = createAnimationData(
      'Complex Multi-Stage Animation',
      [
        // Stage 1: Fade In
        { 
          time: 0, 
          properties: { 
            x: 960, y: 540, 
            opacity: 0, 
            scale: 0.5, 
            rotation: 0 
          } 
        },
        { 
          time: 0.5, 
          properties: { 
            x: 960, y: 540, 
            opacity: 1, 
            scale: 1, 
            rotation: 0 
          } 
        },
        
        // Stage 2: Move and Rotate
        { 
          time: 1.5, 
          properties: { 
            x: 1200, y: 400, 
            opacity: 1, 
            scale: 1.2, 
            rotation: 180 
          } 
        },
        
        // Stage 3: Complete Rotation
        { 
          time: 2.5, 
          properties: { 
            x: 960, y: 300, 
            opacity: 1, 
            scale: 1, 
            rotation: 360 
          } 
        },
        
        // Stage 4: Bounce
        { 
          time: 3, 
          properties: { 
            x: 960, y: 540, 
            opacity: 1, 
            scale: 1.1, 
            rotation: 360 
          } 
        },
        
        // Stage 5: Settle
        { 
          time: 3.3, 
          properties: { 
            x: 960, y: 540, 
            opacity: 1, 
            scale: 1, 
            rotation: 360 
          } 
        },
        
        // Stage 6: Fade Out
        { 
          time: 4, 
          properties: { 
            x: 960, y: 540, 
            opacity: 0, 
            scale: 0.8, 
            rotation: 360 
          } 
        },
      ],
      { 
        fps: 60,
        width: 1920,
        height: 1080,
        description: 'Complex 6-stage animation: fade in, move, rotate, bounce, settle, fade out'
      }
    );

    await exportAnimation({
      element: complexRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: 'complex-animation',
      recordingOptions: {
        fps: 60,
        duration: 4000,
        width: 1920,
        height: 1080,
        videoBitsPerSecond: 12000000, // High quality
      },
    });

    alert('Complex animation exported!');
  };

  return (
    <div>
      <svg ref={complexRef} width="400" height="300" viewBox="0 0 1920 1080">
        {/* Your complex animated element */}
        <circle cx="960" cy="540" r="50" fill="#667eea" />
      </svg>
      <button onClick={handleExport}>Export Complex Animation</button>
    </div>
  );
};
```

---

## 7. Morphing Shape

### Export shape morphing animation

```tsx
import { useRef } from 'react';
import { BlobMorph } from './components/SVGAnimations';
import { createAnimationData, exportAnimation } from './utils/exportUtils';

export const MorphingShapeExporter = () => {
  const morphRef = useRef<SVGSVGElement>(null);

  const handleExport = async () => {
    if (!morphRef.current) return;

    // Define multiple shape states
    const shapes = [
      'M100,100 L200,100 L200,200 L100,200 Z', // Square
      'M150,100 L200,150 L150,200 L100,150 Z', // Diamond
      'M150,100 A50,50 0 1,1 150,200 A50,50 0 1,1 150,100', // Circle
      'M100,150 Q100,100 150,100 Q200,100 200,150 Q200,200 150,200 Q100,200 100,150', // Rounded square
    ];

    const keyframes = [];
    const duration = 4;
    const stateCount = shapes.length;

    shapes.forEach((shape, i) => {
      keyframes.push({
        time: (i / stateCount) * duration,
        properties: {
          pathData: shape,
          opacity: 0.8 + Math.sin((i / stateCount) * Math.PI) * 0.2,
          scale: 1 + Math.sin((i / stateCount) * Math.PI * 2) * 0.1,
        },
      });
    });

    const animationData = createAnimationData(
      'Morphing Shape',
      keyframes,
      { 
        fps: 60,
        width: 300,
        height: 300,
        description: 'Shape morphing between square, diamond, circle, and rounded square'
      }
    );

    await exportAnimation({
      element: morphRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: 'morphing-shape',
      recordingOptions: { fps: 60, duration: 4000 },
    });
  };

  return (
    <div>
      <BlobMorph ref={morphRef} />
      <button onClick={handleExport}>Export Morph Animation</button>
    </div>
  );
};
```

---

## 8. Background Effect

### Export floating orbs background animation

```tsx
import { useRef } from 'react';
import { FloatingOrbs } from './components/SVGAnimations';
import { createAnimationData, exportAnimation } from './utils/exportUtils';

export const BackgroundEffectExporter = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!bgRef.current) return;

    const orbCount = 5;
    const duration = 10; // 10 second loop

    // Create keyframes for multiple floating orbs
    const keyframes = [];
    
    for (let t = 0; t <= duration; t += 0.1) {
      const properties: Record<string, number> = { time: t };
      
      // Animate each orb independently
      for (let i = 0; i < orbCount; i++) {
        const offset = (i / orbCount) * Math.PI * 2;
        const speed = 1 + i * 0.2;
        
        properties[`orb${i}X`] = 960 + Math.sin(t * speed + offset) * 300;
        properties[`orb${i}Y`] = 540 + Math.cos(t * speed + offset) * 200;
        properties[`orb${i}Opacity`] = 0.3 + Math.sin(t * speed) * 0.2;
        properties[`orb${i}Scale`] = 1 + Math.sin(t * speed + Math.PI) * 0.3;
      }
      
      keyframes.push({ time: t, properties });
    }

    const animationData = createAnimationData(
      'Floating Orbs Background',
      keyframes,
      { 
        fps: 60,
        width: 1920,
        height: 1080,
        description: 'Ambient floating orbs background effect with 5 independent orbs'
      }
    );

    await exportAnimation({
      element: bgRef.current,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: 'floating-orbs-bg',
      recordingOptions: {
        fps: 60,
        duration: 10000,
        width: 1920,
        height: 1080,
      },
    });
  };

  return (
    <div>
      <div ref={bgRef} style={{ width: '100vw', height: '100vh' }}>
        <FloatingOrbs count={5} />
      </div>
      <button onClick={handleExport}>Export Background</button>
    </div>
  );
};
```

---

## 🎯 Tips for Best Results

### 1. Timing
- Use consistent FPS (60fps recommended)
- Ensure duration matches animation length
- Add easing in keyframe properties for smooth transitions

### 2. Keyframes
- More keyframes = smoother animation (but larger file size)
- Space keyframes evenly for consistent motion
- Use fewer keyframes for simple animations

### 3. Properties
- Always include time property
- Use standard properties: x, y, opacity, scale, rotation
- Custom properties work but may not translate to Lottie

### 4. File Size
- JSON: Very small, ideal for all scenarios
- Lottie: Small to medium, depends on complexity
- MP4: Large, adjust bitrate/resolution as needed

### 5. Browser Recording
- Ensure element is visible during recording
- Wait for all assets to load
- Use Chrome for best MediaRecorder support

---

## 🔄 Batch Export Script

Export multiple animations at once:

```tsx
import { exportAnimation, createAnimationData } from './utils/exportUtils';

export const batchExport = async (animations: Array<{
  element: HTMLElement | SVGElement;
  name: string;
  keyframes: any[];
}>) => {
  
  for (const { element, name, keyframes } of animations) {
    console.log(`Exporting: ${name}...`);
    
    const animationData = createAnimationData(name, keyframes, { fps: 60 });
    
    await exportAnimation({
      element,
      animationData,
      formats: ['json', 'lottie', 'mp4'],
      filename: name.toLowerCase().replace(/\s+/g, '-'),
    });
    
    console.log(`✅ ${name} exported successfully`);
  }
  
  console.log('🎉 All animations exported!');
};

// Usage
const elements = [
  { element: logoRef.current, name: 'Logo', keyframes: logoKeyframes },
  { element: spinnerRef.current, name: 'Spinner', keyframes: spinnerKeyframes },
  { element: chartRef.current, name: 'Chart', keyframes: chartKeyframes },
];

batchExport(elements);
```

---

## 📚 More Resources

- [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) - Complete export documentation
- [EXPORT_QUICK_REFERENCE.md](./EXPORT_QUICK_REFERENCE.md) - Quick reference
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Component usage guide

---

**Happy Exporting! 🎬✨**






