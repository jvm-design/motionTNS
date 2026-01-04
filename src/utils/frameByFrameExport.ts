/**
 * Export Animation Frame-by-Frame
 * Creates a JSON file with ALL frames that devs can replay
 */

export interface AnimationFrameData {
  frame: number;
  time: number;
  progress: number;
  svg: string;
}

export interface FrameByFrameExport {
  name: string;
  type: 'frame-by-frame-animation';
  version: '1.0.0';
  fps: number;
  duration: number;
  totalFrames: number;
  dimensions: {
    width: number;
    height: number;
  };
  frames: AnimationFrameData[];
  usage: {
    description: string;
    example: string;
  };
  exportedAt: string;
}

/**
 * Capture all frames of the animation
 */
export const captureAllFrames = async (
  svgElement: SVGSVGElement,
  setFrame: (frame: number) => void,
  totalFrames: number,
  fps: number,
  duration: number
): Promise<FrameByFrameExport> => {
  const frames: AnimationFrameData[] = [];
  const serializer = new XMLSerializer();
  
  for (let frame = 0; frame <= totalFrames; frame++) {
    // Set the frame
    setFrame(frame);
    
    // Wait for React to render
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Capture SVG at this frame
    const svgString = serializer.serializeToString(svgElement);
    const progress = frame / totalFrames;
    const time = progress * duration;
    
    frames.push({
      frame,
      time,
      progress,
      svg: svgString
    });
  }
  
  const width = svgElement.width.baseVal.value || 400;
  const height = svgElement.height.baseVal.value || 400;
  
  return {
    name: 'Autoya Logo Success',
    type: 'frame-by-frame-animation',
    version: '1.0.0',
    fps,
    duration,
    totalFrames,
    dimensions: { width, height },
    frames,
    usage: {
      description: 'Play frames sequentially at specified FPS to recreate animation',
      example: `
// React example:
import animationData from './autoya-animation.json';

function AnimatedLogo() {
  const [frameIndex, setFrameIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % animationData.totalFrames);
    }, 1000 / animationData.fps);
    return () => clearInterval(interval);
  }, []);
  
  const currentFrame = animationData.frames[frameIndex];
  
  return (
    <div dangerouslySetInnerHTML={{ __html: currentFrame.svg }} />
  );
}
      `
    },
    exportedAt: new Date().toISOString()
  };
};

/**
 * Download frame-by-frame JSON
 */
export const downloadFrameByFrameJSON = (data: FrameByFrameExport, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2);
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


