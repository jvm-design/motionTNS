/**
 * Record WebM with transparent background (alpha channel)
 */

/**
 * Record animated SVG with transparent background
 */
export const recordTransparentWebM = async (
  svgElement: SVGSVGElement,
  updateProgress: (progress: number) => void,
  options: {
    fps?: number;
    duration?: number;
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

  // Create canvas with transparent background
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: true })!;

  // Create stream with VP9 and alpha support
  const stream = canvas.captureStream(fps);
  
  // Use VP9 with alpha channel for transparency
  const mimeType = 'video/webm;codecs=vp9';
  
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    throw new Error('VP9 codec with alpha not supported in this browser');
  }

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

  // Render frames with transparent background
  const totalFrames = Math.floor(fps * duration);
  const frameInterval = 1000 / fps;

  for (let frame = 0; frame <= totalFrames; frame++) {
    const progress = frame / totalFrames;
    
    // Update animation
    updateProgress(progress);
    
    // Wait for render
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Render SVG to canvas
    await renderSVGFrameToCanvas(svgElement, canvas, ctx, true);
    
    if (frame < totalFrames) {
      await new Promise(resolve => setTimeout(resolve, Math.max(0, frameInterval - 10)));
    }
  }

  // Stop recording
  mediaRecorder.stop();

  return recordingPromise;
};

/**
 * Render SVG frame with transparent background
 */
const renderSVGFrameToCanvas = async (
  svgElement: SVGSVGElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  transparent: boolean = false
): Promise<void> => {
  // Clear with transparency or dark background
  if (transparent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Get SVG data
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  // Load and draw
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
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
 * Download WebM with transparency
 */
export const downloadTransparentWebM = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.webm') ? filename : `${filename}.webm`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};






