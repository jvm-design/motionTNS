/**
 * SVG to Lottie Export - Captures ACTUAL rendered animation
 * Samples the real DOM at each frame and converts to Lottie JSON
 */

interface CapturedElement {
  id: string;
  type: string;
  frames: Array<{
    frame: number;
    opacity: number;
    transform: {
      translateX: number;
      translateY: number;
      scaleX: number;
      scaleY: number;
      rotation: number;
    };
    style: any;
  }>;
}

/**
 * Extract transform values from computed style
 */
const parseTransform = (element: SVGElement): any => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  
  const defaults = {
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0
  };
  
  if (!transform || transform === 'none') return defaults;
  
  // Parse matrix(a, b, c, d, e, f)
  const match = transform.match(/matrix\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(parseFloat);
    return {
      translateX: values[4] || 0,
      translateY: values[5] || 0,
      scaleX: values[0] || 1,
      scaleY: values[3] || 1,
      rotation: Math.atan2(values[1], values[0]) * (180 / Math.PI) || 0
    };
  }
  
  return defaults;
};

/**
 * Capture actual rendered animation and convert to Lottie
 */
export const captureAndConvertToLottie = async (
  svgElement: SVGSVGElement,
  setFrame: (frame: number) => void,
  totalFrames: number,
  fps: number,
  duration: number,
  name: string = "Motion Studio Animation"
): Promise<any> => {
  
  console.log('🎬 Starting capture of', totalFrames, 'frames...');
  
  // Get all animating elements (we'll track them across frames)
  const elements = new Map<string, CapturedElement>();
  
  // Capture each frame
  for (let frame = 0; frame <= totalFrames; frame++) {
    // Set the frame
    setFrame(frame);
    
    // Wait for React to render
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Find all animated elements (paths, circles, groups)
    const animatedElements = svgElement.querySelectorAll('path, circle, ellipse, g[style*="transform"]');
    
    animatedElements.forEach((el, index) => {
      const element = el as SVGElement;
      const id = element.getAttribute('id') || `element-${index}`;
      
      // Get or create element tracking
      if (!elements.has(id)) {
        elements.set(id, {
          id,
          type: element.tagName.toLowerCase(),
          frames: []
        });
      }
      
      const tracked = elements.get(id)!;
      
      // Extract current state
      const style = window.getComputedStyle(element);
      const opacity = parseFloat(style.opacity || '1');
      const transform = parseTransform(element);
      
      tracked.frames.push({
        frame,
        opacity,
        transform,
        style: {
          fill: style.fill,
          stroke: style.stroke,
          strokeWidth: style.strokeWidth,
        }
      });
    });
    
    if (frame % 10 === 0) {
      console.log(`📸 Captured frame ${frame}/${totalFrames}`);
    }
  }
  
  console.log('✅ Capture complete! Converting to Lottie...');
  console.log(`📊 Found ${elements.size} animated elements`);
  
  // Convert captured data to Lottie format
  const layers: any[] = [];
  let layerIndex = 1;
  
  elements.forEach((capturedEl) => {
    // Only include elements that actually animate
    const hasAnimation = capturedEl.frames.some((f, i) => {
      if (i === 0) return false;
      const prev = capturedEl.frames[i - 1];
      return (
        f.opacity !== prev.opacity ||
        f.transform.translateX !== prev.transform.translateX ||
        f.transform.translateY !== prev.transform.translateY ||
        f.transform.scaleX !== prev.transform.scaleX ||
        f.transform.scaleY !== prev.transform.scaleY
      );
    });
    
    if (!hasAnimation) {
      console.log(`⏭️  Skipping ${capturedEl.id} (no animation)`);
      return;
    }
    
    console.log(`✨ Adding layer: ${capturedEl.id}`);
    
    // Build opacity keyframes
    const opacityKeyframes = capturedEl.frames.map(f => ({
      t: f.frame,
      s: [f.opacity * 100],
      h: f.frame < totalFrames ? 1 : 0
    }));
    
    // Build position keyframes
    const positionKeyframes = capturedEl.frames.map(f => ({
      t: f.frame,
      s: [f.transform.translateX, f.transform.translateY, 0],
      h: f.frame < totalFrames ? 1 : 0
    }));
    
    // Build scale keyframes
    const scaleKeyframes = capturedEl.frames.map(f => ({
      t: f.frame,
      s: [f.transform.scaleX * 100, f.transform.scaleY * 100, 100],
      h: f.frame < totalFrames ? 1 : 0
    }));
    
    // Create Lottie layer
    layers.push({
      ddd: 0,
      ind: layerIndex++,
      ty: 4, // Shape layer
      nm: capturedEl.id,
      sr: 1,
      ks: {
        o: { a: 1, k: opacityKeyframes },
        r: { a: 0, k: 0 },
        p: { a: 1, k: positionKeyframes },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: scaleKeyframes }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [10, 10] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse"
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 1, 1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform"
            }
          ],
          nm: capturedEl.id,
          bm: 0
        }
      ],
      ip: 0,
      op: totalFrames,
      st: 0,
      bm: 0
    });
  });
  
  const width = svgElement.width.baseVal.value || 400;
  const height = svgElement.height.baseVal.value || 400;
  
  // Build complete Lottie JSON
  const lottieJSON = {
    v: "5.9.0",
    fr: fps,
    ip: 0,
    op: totalFrames,
    w: width,
    h: height,
    nm: name,
    ddd: 0,
    assets: [],
    layers,
    markers: [],
    metadata: {
      generator: "Motion Studio - DOM Capture Export",
      description: "Captured from actual rendered animation",
      captureMethod: "DOM sampling at " + fps + "fps",
      totalFrames,
      duration: duration + "s",
      transparentBackground: true
    }
  };
  
  console.log('✅ Lottie JSON generated with', layers.length, 'layers');
  
  return lottieJSON;
};

/**
 * Download captured Lottie JSON
 */
export const downloadCapturedLottie = async (
  svgElement: SVGSVGElement,
  setFrame: (frame: number) => void,
  totalFrames: number,
  fps: number,
  duration: number,
  filename: string = 'captured-animation.json',
  name?: string
): Promise<void> => {
  console.log('🎬 Starting DOM capture to Lottie export...');
  
  const lottieData = await captureAndConvertToLottie(
    svgElement,
    setFrame,
    totalFrames,
    fps,
    duration,
    name
  );
  
  const jsonString = JSON.stringify(lottieData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('✅ Download complete!');
};





