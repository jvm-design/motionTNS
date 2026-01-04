/**
 * Simple Export Button - Works reliably with JSON motion export
 */

import { useState } from 'react';
import JSZip from 'jszip';

interface SimpleExportButtonProps {
  targetElementRef?: React.RefObject<HTMLElement | SVGElement>;
  animationName?: string;
  defaultFilename?: string;
  // Optional: pass animation parameters for JSON export
  fps?: number;
  duration?: number;
  currentFrame?: number;
  totalFrames?: number;
}

export const SimpleExportButton: React.FC<SimpleExportButtonProps> = ({
  targetElementRef,
  animationName = 'Animation',
  defaultFilename = 'animation',
  fps = 60,
  duration = 1.5,
  currentFrame = 0,
  totalFrames = 90,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Generate motion animation JSON with complete specifications
   */
  const generateMotionJSON = () => {
    // Animation timing specifications (matching AutoyaLogoFrameControlled)
    const convergenceStart = 24/90;    // Frame 24 = 0.400s
    const convergenceEnd = 45/90;      // Frame 45 = 0.750s
    const greenStart = 48/90;          // Frame 48 = 0.800s
    const greenEnd = 69/90;            // Frame 69 = 1.150s
    const checkStart = 69/90;          // Frame 69 = 1.150s
    const checkEnd = 90/90;            // Frame 90 = 1.500s

    const motionJSON = {
      // Metadata
      name: animationName,
      version: "1.0.0",
      generatedBy: "Motion Autoya",
      exportDate: new Date().toISOString(),
      
      // Animation settings
      animation: {
        duration: duration,
        fps: fps,
        totalFrames: totalFrames,
        loop: false,
        autoplay: false,
      },

      // Timing breakpoints (in seconds)
      timing: {
        logoRecognition: { start: 0, end: 0.400 },
        convergence: { start: 0.400, end: 0.750 },
        beatPause: { start: 0.750, end: 0.800 },
        greenTransform: { start: 0.800, end: 1.150 },
        checkmark: { start: 1.150, end: 1.500 },
      },

      // Frame breakpoints
      frames: {
        logoRecognition: { start: 0, end: 24 },
        convergence: { start: 24, end: 45 },
        beatPause: { start: 45, end: 48 },
        greenTransform: { start: 48, end: 69 },
        checkmark: { start: 69, end: 90 },
      },

      // Motion principles applied
      principles: {
        appleMotion: true,
        clarity: "Every stage is visible and understandable",
        deference: "Motion guides attention smoothly",
        continuity: "Smooth, followable transitions",
        premium: "Quality timing matches Apple Pay success (1.5s)",
        responsive: "Fast enough to feel responsive",
        delightful: "Users can appreciate the craftsmanship",
      },

      // Animation phases with easing functions
      phases: [
        {
          name: "Logo Recognition",
          startFrame: 0,
          endFrame: 24,
          duration: 0.400,
          description: "Initial logo visibility - generous recognition time",
          easing: "linear",
        },
        {
          name: "Convergence",
          startFrame: 24,
          endFrame: 45,
          duration: 0.350,
          description: "Liquid motion - shapes converge to center",
          easing: "camera-spring",
          easingParams: {
            type: "spring",
            overshoot: 0.015,
            stagger: 0.02,
          },
        },
        {
          name: "Beat Pause",
          startFrame: 45,
          endFrame: 48,
          duration: 0.050,
          description: "Appreciation moment",
          easing: "linear",
        },
        {
          name: "Green Transform",
          startFrame: 48,
          endFrame: 69,
          duration: 0.350,
          description: "Success color transformation with pulse",
          easing: "ease-out",
          transform: {
            scale: {
              keyframes: [
                { progress: 0, value: 1.0 },
                { progress: 0.35, value: 1.10 },
                { progress: 1.0, value: 1.0 },
              ],
            },
          },
        },
        {
          name: "Checkmark Draw",
          startFrame: 69,
          endFrame: 90,
          duration: 0.350,
          description: "Confident checkmark stroke",
          easing: "ease-out-quad",
          easingParams: {
            bezier: [0.25, 0.46, 0.45, 0.94],
          },
        },
      ],

      // Visual elements
      elements: {
        logo: {
          type: "group",
          count: 9,
          description: "8 surrounding shapes + 1 center dot",
          centerPoint: { x: 29.27, y: 30.5 },
        },
        successCircle: {
          type: "circle",
          radius: 5.2,
          fill: "radial-gradient",
          gradient: {
            stops: [
              { offset: 0, color: "#86EFAC", opacity: 1 },
              { offset: 0.45, color: "#34D399", opacity: 1 },
              { offset: 1, color: "#059669", opacity: 1 },
            ],
          },
        },
        checkmark: {
          type: "path",
          stroke: "white",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          pathData: "M 26.5 30.5 L 28.5 32.8 L 32 28.5",
        },
      },

      // Camera shutter synchronization
      synchronization: {
        enabled: true,
        syncPoint: {
          frame: 18,
          time: 0.300,
          description: "Synced with camera shutter sound end",
        },
        hapticFeedback: {
          trigger: "onStart",
          time: 0,
        },
      },

      // Export formats supported
      exportFormats: {
        svg: true,
        json: true,
        lottie: true,
        mp4: true,
        webm: true,
      },

      // Implementation notes
      implementation: {
        platform: "web",
        libraries: ["react", "framer-motion", "gsap"],
        transparentBackground: true,
        viewport: {
          width: 59,
          height: 61,
        },
      },
    };

    return motionJSON;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (!targetElementRef?.current) {
        alert('No element to export');
        return;
      }

      const element = targetElementRef.current;
      
      // Get the SVG as a string
      const svgString = new XMLSerializer().serializeToString(element);
      
      // Generate motion JSON
      const motionJSON = generateMotionJSON();
      const jsonString = JSON.stringify(motionJSON, null, 2);
      
      // Create a ZIP file with both SVG and JSON
      const zip = new JSZip();
      zip.file(`${defaultFilename}.svg`, svgString);
      zip.file(`${defaultFilename}-motion.json`, jsonString);
      
      // Add a README
      const readme = `# ${animationName} Export

## Contents
- ${defaultFilename}.svg - Vector graphics file
- ${defaultFilename}-motion.json - Complete motion specification

## Motion Specification
This JSON file contains:
- Animation timing (${duration}s @ ${fps}fps)
- Frame breakpoints for each animation phase
- Easing functions and spring physics
- Apple Motion Principles applied
- Synchronization points
- Visual element specifications

## Usage
Import the motion.json file into your animation tool or use it to recreate 
the exact same motion timing in any platform (iOS, Android, Web, Flutter, etc.)

Generated by Motion Autoya
${new Date().toISOString()}
`;
      zip.file('README.md', readme);
      
      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${defaultFilename}-export.zip`;
      link.click();
      URL.revokeObjectURL(url);
      
      console.log('✅ Export complete!');
      console.log('📦 Package includes:');
      console.log('   - SVG file');
      console.log('   - Motion JSON specification');
      console.log('   - README');
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed: ' + error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      style={{
        background: isExporting ? '#333' : '#667eea',
        border: 'none',
        color: '#fff',
        padding: '8px 20px',
        borderRadius: 6,
        cursor: isExporting ? 'not-allowed' : 'pointer',
        fontSize: 12,
        fontWeight: 500,
        opacity: isExporting ? 0.5 : 1,
      }}
    >
      {isExporting ? '⏳ Exporting...' : '💾 Export SVG'}
    </button>
  );
};

export default SimpleExportButton;

