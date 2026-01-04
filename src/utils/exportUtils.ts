/**
 * Export Utilities for Motion Autoya
 * Supports exporting animations to JSON, Lottie, and MP4 (60fps)
 * Multiple formats are automatically zipped together
 */

import JSZip from 'jszip';

// Types for animation data export
export interface AnimationKeyframe {
  time: number;
  properties: {
    [key: string]: number | string;
  };
}

export interface AnimationData {
  name: string;
  duration: number;
  fps: number;
  keyframes: AnimationKeyframe[];
  metadata?: {
    width?: number;
    height?: number;
    description?: string;
  };
}

/**
 * Export animation data as JSON
 */
export const exportToJSON = (animationData: AnimationData): string => {
  return JSON.stringify(animationData, null, 2);
};

/**
 * Download JSON file
 */
export const downloadJSON = (animationData: AnimationData, filename: string = 'animation.json'): void => {
  const jsonString = exportToJSON(animationData);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Convert animation data to Lottie-compatible format
 * This is a simplified converter - for complex animations, use Bodymovin plugin
 */
export const convertToLottie = (animationData: AnimationData): object => {
  const { name, duration, fps, keyframes, metadata } = animationData;
  
  // Lottie basic structure
  const lottieData = {
    v: "5.9.0", // Lottie version
    fr: fps,
    ip: 0,
    op: duration * fps,
    w: metadata?.width || 1920,
    h: metadata?.height || 1080,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4, // Shape layer
        nm: name,
        sr: 1,
        ks: {
          o: {
            a: 1, // animated
            k: keyframes.map((kf, index) => ({
              i: { x: [0.667], y: [1] },
              o: { x: [0.333], y: [0] },
              t: kf.time * fps,
              s: [kf.properties.opacity !== undefined ? kf.properties.opacity * 100 : 100],
            })),
          },
          r: {
            a: 1,
            k: keyframes.map((kf) => ({
              i: { x: [0.667], y: [1] },
              o: { x: [0.333], y: [0] },
              t: kf.time * fps,
              s: [kf.properties.rotation || 0],
            })),
          },
          p: {
            a: 1,
            k: keyframes.map((kf) => ({
              i: { x: 0.667, y: 1 },
              o: { x: 0.333, y: 0 },
              t: kf.time * fps,
              s: [
                kf.properties.x !== undefined ? kf.properties.x : metadata?.width ? metadata.width / 2 : 960,
                kf.properties.y !== undefined ? kf.properties.y : metadata?.height ? metadata.height / 2 : 540,
                0,
              ],
            })),
          },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: keyframes.map((kf) => ({
              i: { x: [0.667, 0.667], y: [1, 1] },
              o: { x: [0.333, 0.333], y: [0, 0] },
              t: kf.time * fps,
              s: [
                (kf.properties.scaleX !== undefined ? kf.properties.scaleX : 1) * 100,
                (kf.properties.scaleY !== undefined ? kf.properties.scaleY : 1) * 100,
                100,
              ],
            })),
          },
        },
        ao: 0,
        ip: 0,
        op: duration * fps,
        st: 0,
        bm: 0,
      },
    ],
    markers: [],
  };

  return lottieData;
};

/**
 * Download Lottie JSON file
 */
export const downloadLottie = (animationData: AnimationData, filename: string = 'animation.json'): void => {
  const lottieData = convertToLottie(animationData);
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
};

/**
 * Record animation as MP4 at 60fps using MediaRecorder API
 */
export interface RecordingOptions {
  fps?: number;
  duration?: number;
  width?: number;
  height?: number;
  videoBitsPerSecond?: number;
}

export const recordAnimationToMP4 = async (
  elementOrCanvas: HTMLElement | HTMLCanvasElement,
  options: RecordingOptions = {}
): Promise<Blob> => {
  const {
    fps = 60,
    duration = 3000, // 3 seconds default
    width = 1920,
    height = 1080,
    videoBitsPerSecond = 8000000, // 8 Mbps
  } = options;

  // Create a canvas if element is provided
  let canvas: HTMLCanvasElement;
  if (elementOrCanvas instanceof HTMLCanvasElement) {
    canvas = elementOrCanvas;
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  // Get canvas stream
  const stream = canvas.captureStream(fps);

  // Check for MediaRecorder support
  if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
    console.warn('VP9 codec not supported, falling back to VP8');
    if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
      throw new Error('WebM video recording not supported in this browser');
    }
  }

  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm;codecs=vp8';

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond,
  });

  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(blob);
    };

    mediaRecorder.onerror = (event) => {
      reject(new Error('MediaRecorder error: ' + event));
    };

    mediaRecorder.start();

    // Stop recording after specified duration
    setTimeout(() => {
      mediaRecorder.stop();
    }, duration);
  });
};

/**
 * Download MP4 video
 */
export const downloadMP4 = (blob: Blob, filename: string = 'animation.mp4'): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace('.mp4', '.webm'); // Browser records as WebM
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Render SVG to Canvas for recording
 */
export const renderSVGToCanvas = async (
  svgElement: SVGElement,
  canvas: HTMLCanvasElement
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Get SVG dimensions
  const bbox = svgElement.getBoundingClientRect();
  canvas.width = bbox.width || 800;
  canvas.height = bbox.height || 600;

  // Serialize SVG
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svg);

  // Load SVG as image
  const img = new Image();
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };
    img.src = url;
  });
};

/**
 * Complete export workflow for an animated SVG component
 */
export interface ExportWorkflowOptions {
  element: HTMLElement | SVGElement;
  animationData: AnimationData;
  formats: ('json' | 'lottie' | 'mp4')[];
  filename?: string;
  recordingOptions?: RecordingOptions;
}

export const exportAnimation = async (options: ExportWorkflowOptions): Promise<void> => {
  const { element, animationData, formats, filename = 'animation', recordingOptions } = options;

  // If multiple formats selected, create ZIP
  if (formats.length > 1) {
    await exportAsZip(options);
    return;
  }

  // Single format - download directly
  const results: { format: string; success: boolean; error?: string }[] = [];

  for (const format of formats) {
    try {
      switch (format) {
        case 'json':
          downloadJSON(animationData, `${filename}.json`);
          results.push({ format: 'JSON', success: true });
          break;

        case 'lottie':
          downloadLottie(animationData, `${filename}_lottie.json`);
          results.push({ format: 'Lottie', success: true });
          break;

        case 'mp4':
          if (element instanceof SVGElement) {
            const canvas = document.createElement('canvas');
            await renderSVGToCanvas(element, canvas);
            const blob = await recordAnimationToMP4(canvas, recordingOptions);
            downloadMP4(blob, `${filename}.webm`);
            results.push({ format: 'MP4 (WebM)', success: true });
          } else {
            throw new Error('MP4 export requires an SVG element');
          }
          break;
      }
    } catch (error) {
      results.push({
        format,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Log results
  console.log('Export Results:', results);
  return Promise.resolve();
};

/**
 * Export multiple formats as a ZIP file
 */
export const exportAsZip = async (options: ExportWorkflowOptions): Promise<void> => {
  const { element, animationData, formats, filename = 'animation', recordingOptions } = options;

  const zip = new JSZip();
  const results: { format: string; success: boolean; error?: string }[] = [];

  for (const format of formats) {
    try {
      switch (format) {
        case 'json': {
          const jsonString = exportToJSON(animationData);
          zip.file(`${filename}.json`, jsonString);
          results.push({ format: 'JSON', success: true });
          break;
        }

        case 'lottie': {
          const lottieData = convertToLottie(animationData);
          const lottieString = JSON.stringify(lottieData, null, 2);
          zip.file(`${filename}_lottie.json`, lottieString);
          results.push({ format: 'Lottie', success: true });
          break;
        }

        case 'mp4': {
          if (element instanceof SVGElement) {
            const canvas = document.createElement('canvas');
            await renderSVGToCanvas(element, canvas);
            const blob = await recordAnimationToMP4(canvas, recordingOptions);
            zip.file(`${filename}.webm`, blob);
            results.push({ format: 'MP4 (WebM)', success: true });
          } else {
            throw new Error('MP4 export requires an SVG element');
          }
          break;
        }
      }
    } catch (error) {
      results.push({
        format,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Generate ZIP and download
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Log results
  console.log('Export Results (ZIP):', results);
  return Promise.resolve();
};

/**
 * Extract animation data from Framer Motion variants
 */
export const extractFramerMotionData = (
  variants: any,
  duration: number = 2,
  fps: number = 60
): AnimationData => {
  const keyframes: AnimationKeyframe[] = [];

  // Extract initial and animate states
  if (variants.initial && variants.animate) {
    keyframes.push({
      time: 0,
      properties: { ...variants.initial },
    });

    keyframes.push({
      time: duration,
      properties: { ...variants.animate },
    });
  }

  return {
    name: 'Framer Motion Animation',
    duration,
    fps,
    keyframes,
  };
};

/**
 * Helper to create animation data manually
 */
export const createAnimationData = (
  name: string,
  keyframes: AnimationKeyframe[],
  options: { fps?: number; width?: number; height?: number; description?: string } = {}
): AnimationData => {
  const duration = keyframes.length > 0 ? keyframes[keyframes.length - 1].time : 0;

  return {
    name,
    duration,
    fps: options.fps || 60,
    keyframes,
    metadata: {
      width: options.width,
      height: options.height,
      description: options.description,
    },
  };
};

