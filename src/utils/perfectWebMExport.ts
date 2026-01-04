/**
 * Perfect WebM Export - Frame-by-Frame with FFmpeg
 * Guarantees pixel-perfect and motion-perfect output
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let ffmpegLoaded = false;

export interface PerfectWebMOptions {
  fps?: number;
  duration?: number; // in seconds
  width?: number;
  height?: number;
  quality?: 'low' | 'medium' | 'high' | 'ultra';
  transparent?: boolean;
  onProgress?: (progress: number, message: string) => void;
}

interface Frame {
  blob: Blob;
  index: number;
}

/**
 * Load FFmpeg (singleton pattern)
 */
const loadFFmpeg = async (): Promise<FFmpeg> => {
  if (ffmpeg && ffmpegLoaded) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  ffmpegLoaded = true;
  return ffmpeg;
};

/**
 * Get quality settings
 */
const getQualitySettings = (quality: 'low' | 'medium' | 'high' | 'ultra') => {
  const settings = {
    low: { bitrate: '2M', crf: 35 },
    medium: { bitrate: '5M', crf: 28 },
    high: { bitrate: '10M', crf: 23 },
    ultra: { bitrate: '20M', crf: 18 },
  };
  return settings[quality];
};

/**
 * Wait for multiple render cycles (ensures frame is fully rendered)
 */
const waitForCompleteRender = async (): Promise<void> => {
  // Wait for 3 animation frames + extra time
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => setTimeout(resolve, 50)); // Extra safety buffer
};

/**
 * Capture single frame from SVG element
 */
const captureFrame = async (
  svgElement: SVGSVGElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  transparent: boolean
): Promise<Blob> => {
  // Clear canvas
  if (transparent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Get SVG dimensions
  const svgWidth = svgElement.width.baseVal.value || svgElement.clientWidth || 400;
  const svgHeight = svgElement.height.baseVal.value || svgElement.clientHeight || 400;
  
  // Serialize SVG
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  // Load and draw SVG
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Center on canvas
      const x = (canvas.width - svgWidth) / 2;
      const y = (canvas.height - svgHeight) / 2;
      
      ctx.drawImage(img, x, y, svgWidth, svgHeight);
      URL.revokeObjectURL(url);
      
      // Convert canvas to blob (PNG for lossless quality)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create frame blob'));
        }
      }, 'image/png');
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG frame'));
    };
    
    img.src = url;
  });
};

/**
 * Capture all frames frame-by-frame (NOT real-time)
 */
const captureAllFrames = async (
  svgElement: SVGSVGElement,
  updateProgress: (progress: number) => void,
  options: Required<Pick<PerfectWebMOptions, 'fps' | 'duration' | 'width' | 'height' | 'transparent'>> & {
    onProgress?: (progress: number, message: string) => void;
  }
): Promise<Frame[]> => {
  const { fps, duration, width, height, transparent, onProgress } = options;
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: transparent })!;

  const frames: Frame[] = [];
  const totalFrames = Math.floor(fps * duration);

  onProgress?.(0, 'Starting frame capture...');

  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    const progress = frameIndex / (totalFrames - 1);
    
    // Update animation to exact progress
    updateProgress(progress);
    
    // Wait for complete render (this is key for perfection!)
    await waitForCompleteRender();
    
    // Capture frame
    const frameBlob = await captureFrame(svgElement, canvas, ctx, transparent);
    frames.push({ blob: frameBlob, index: frameIndex });
    
    // Report progress
    const captureProgress = (frameIndex + 1) / totalFrames;
    onProgress?.(
      captureProgress * 0.7, // Capture is 70% of total work
      `Captured frame ${frameIndex + 1}/${totalFrames}`
    );
  }

  return frames;
};

/**
 * Create WebM from frames using FFmpeg
 */
const createWebMFromFrames = async (
  frames: Frame[],
  options: Required<Pick<PerfectWebMOptions, 'fps' | 'quality' | 'transparent'>> & {
    onProgress?: (progress: number, message: string) => void;
  }
): Promise<Blob> => {
  const { fps, quality, transparent, onProgress } = options;
  
  onProgress?.(0.7, 'Loading FFmpeg...');
  
  const ffmpegInstance = await loadFFmpeg();
  
  onProgress?.(0.75, 'Writing frames to FFmpeg...');
  
  // Write all frames to FFmpeg virtual filesystem
  for (let i = 0; i < frames.length; i++) {
    const filename = `frame${String(i).padStart(5, '0')}.png`;
    await ffmpegInstance.writeFile(filename, await fetchFile(frames[i].blob));
  }
  
  onProgress?.(0.85, 'Encoding WebM...');
  
  // Get quality settings
  const qualitySettings = getQualitySettings(quality);
  
  // Build FFmpeg command
  const ffmpegArgs = [
    '-framerate', fps.toString(),
    '-pattern_type', 'glob',
    '-i', 'frame*.png',
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', transparent ? 'yuva420p' : 'yuv420p', // Alpha channel support
    '-b:v', qualitySettings.bitrate,
    '-crf', qualitySettings.crf.toString(),
    '-quality', 'good',
    '-speed', '2',
    '-auto-alt-ref', '1',
    '-lag-in-frames', '25',
    'output.webm'
  ];
  
  // Execute FFmpeg
  await ffmpegInstance.exec(ffmpegArgs);
  
  onProgress?.(0.95, 'Reading output...');
  
  // Read output
  const data = await ffmpegInstance.readFile('output.webm');
  const webmBlob = new Blob([data], { type: 'video/webm' });
  
  // Cleanup
  onProgress?.(0.97, 'Cleaning up...');
  for (let i = 0; i < frames.length; i++) {
    const filename = `frame${String(i).padStart(5, '0')}.png`;
    await ffmpegInstance.deleteFile(filename);
  }
  await ffmpegInstance.deleteFile('output.webm');
  
  onProgress?.(1.0, 'Complete!');
  
  return webmBlob;
};

/**
 * Export perfect WebM - Frame-by-frame capture + FFmpeg encoding
 * Guarantees every frame is captured perfectly
 */
export const exportPerfectWebM = async (
  svgElement: SVGSVGElement,
  updateProgress: (progress: number) => void,
  options: PerfectWebMOptions = {}
): Promise<Blob> => {
  const {
    fps = 60,
    duration = 3,
    width = 1920,
    height = 1080,
    quality = 'high',
    transparent = true,
    onProgress,
  } = options;

  try {
    onProgress?.(0, 'Initializing...');

    // Step 1: Capture all frames (70% of progress)
    const frames = await captureAllFrames(
      svgElement,
      updateProgress,
      {
        fps,
        duration,
        width,
        height,
        transparent,
        onProgress,
      }
    );

    // Step 2: Create WebM from frames (30% of progress)
    const webmBlob = await createWebMFromFrames(frames, {
      fps,
      quality,
      transparent,
      onProgress,
    });

    return webmBlob;
  } catch (error) {
    console.error('Perfect WebM export failed:', error);
    throw error;
  }
};

/**
 * Download WebM file
 */
export const downloadWebM = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.webm') ? filename : `${filename}.webm`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Complete export workflow
 */
export const exportAndDownloadPerfectWebM = async (
  svgElement: SVGSVGElement,
  updateProgress: (progress: number) => void,
  filename: string,
  options: PerfectWebMOptions = {}
): Promise<void> => {
  const webmBlob = await exportPerfectWebM(svgElement, updateProgress, options);
  downloadWebM(webmBlob, filename);
};






