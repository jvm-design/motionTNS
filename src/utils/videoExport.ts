/**
 * Animated SVG Recording Utilities
 * Records SVG animations frame-by-frame to create actual video
 */

/**
 * Record an animated SVG by stepping through progress values
 */
export const recordAnimatedSVG = async (
  svgElement: SVGSVGElement,
  updateProgress: (progress: number) => void,
  options: {
    fps?: number;
    duration?: number; // in seconds
    width?: number;
    height?: number;
    videoBitsPerSecond?: number;
  } = {}
): Promise<Blob> => {
  const {
    fps = 60,
    duration = 3,
    width = 1920,
    height = 1080,
    videoBitsPerSecond = 8000000,
  } = options;

  // Create canvas for rendering
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Create stream and recorder
  const stream = canvas.captureStream(fps);
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm;codecs=vp8';

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond,
  });

  const chunks: Blob[] = [];

  const recordingPromise = new Promise<Blob>((resolve, reject) => {
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
  });

  // Start recording
  mediaRecorder.start();

  // Render frames
  const totalFrames = Math.floor(fps * duration);
  const frameInterval = 1000 / fps; // ms per frame

  for (let frame = 0; frame <= totalFrames; frame++) {
    const progress = frame / totalFrames;
    
    // Update the animation progress
    updateProgress(progress);
    
    // Wait for React to render
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 10)); // Give extra time for render
    
    // Render SVG to canvas
    await renderSVGFrameToCanvas(svgElement, canvas, ctx);
    
    // Wait for frame interval
    if (frame < totalFrames) {
      await new Promise(resolve => setTimeout(resolve, Math.max(0, frameInterval - 10)));
    }
  }

  // Stop recording
  mediaRecorder.stop();

  return recordingPromise;
};

/**
 * Render a single SVG frame to canvas
 */
const renderSVGFrameToCanvas = async (
  svgElement: SVGSVGElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Promise<void> => {
  // Clear canvas
  ctx.fillStyle = '#1a1a1a'; // Dark background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get SVG data
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  // Load and draw image
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Center the SVG in the canvas
      const svgWidth = svgElement.width.baseVal.value || 400;
      const svgHeight = svgElement.height.baseVal.value || 400;
      const x = (canvas.width - svgWidth) / 2;
      const y = (canvas.height - svgHeight) / 2;
      
      ctx.drawImage(img, x, y, svgWidth, svgHeight);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG frame'));
    };
    img.src = url;
  });
};

/**
 * Download video blob
 */
export const downloadVideo = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.webm') ? filename : `${filename}.webm`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};






