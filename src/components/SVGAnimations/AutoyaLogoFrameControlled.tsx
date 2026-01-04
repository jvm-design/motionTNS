/**
 * Autoya Logo Success Animation - Frame Controlled Version
 * For use with FrameViewer - responds to progress prop
 */

import React from 'react';

interface AutoyaLogoFrameControlledProps {
  progress: number; // 0 to 1
  size?: number;
  svgRef?: React.RefObject<SVGSVGElement>;
}

export const AutoyaLogoFrameControlled: React.FC<AutoyaLogoFrameControlledProps> = ({
  progress,
  size = 400,
  svgRef,
}) => {
  const centerX = 29.27;
  const centerY = 30.5;

  // 🍎 APPLE PREMIUM TIMING - Quality Over Speed ⚡
  // Based on Apple's actual success animations (Face ID: ~2s, Apple Pay: ~1.5s)
  //
  // PHILOSOPHY:
  // "Fast enough to feel responsive, slow enough to be SEEN and APPRECIATED"
  // - Every transition is clear, visible, and guidable
  // - Users can FOLLOW the motion (not rushed past it)
  // - Premium feel requires time - rushing destroys quality
  // - Motion GUIDES experience, doesn't blur past it
  //
  // PREMIUM TIMELINE (1500ms total - 2x slower = 2x more premium):
  // 0ms:       User presses shutter → Haptic fires
  // 0-400ms:   Logo RECOGNITION (generous time - "What just happened?")
  // 400-750ms: VISIBLE convergence (users can SEE and FOLLOW the liquid motion)
  // 750-800ms: Beat pause (moment to breathe and appreciate the merge)
  // 800-1150ms: Green transformation (smooth, satisfying, visible transition)
  // 1150-1500ms: Checkmark draws (clear, complete, confident confirmation)
  // 1500ms+:   Hold success (premium quality lingers)
  //
  // FRAME BREAKDOWN (60fps, 90 frames total):
  // Frame 0-24:  Logo recognition (0-400ms)     ← CLEAR logo visibility
  // Frame 24-45: Convergence (400-750ms)        ← FOLLOWABLE liquid motion
  // Frame 45-48: Beat pause (750-800ms)         ← Appreciation moment
  // Frame 48-69: Green transform (800-1150ms)   ← SMOOTH satisfying transition
  // Frame 69-90: Checkmark (1150-1500ms)        ← CLEAR complete confirmation
  // Frame 90+:   Hold success                   ← Premium quality lingers
  //
  // COGNITIVE BALANCE (PREMIUM QUALITY):
  // Logo visible:      400ms (frames 0-24)   ← Generous recognition time
  // Convergence:       350ms (frames 24-45)  ← Visible, followable action
  // Green transform:   350ms (frames 48-69)  ← Smooth, satisfying
  // Checkmark visible: 350ms (frames 69-90)  ← Clear, confident
  //
  // APPLE PRINCIPLES APPLIED:
  // ✅ Clarity: Every stage is VISIBLE and understandable
  // ✅ Deference: Motion GUIDES attention, doesn't rush past it
  // ✅ Continuity: Smooth, FOLLOWABLE transitions users can track
  // ✅ Premium: Quality takes time (1.5s matches Apple Pay success)
  // ✅ Responsive: Still feels fast enough (not sluggish)
  // ✅ Delightful: Users can appreciate the craftsmanship
  //
  // WHY THIS IS BETTER:
  // - 700ms was TOO FAST - users couldn't perceive motion quality
  // - 1500ms allows APPRECIATION of each stage
  // - Motion becomes a GUIDE, not a blur
  // - Users feel IN CONTROL, not rushed
  // - Premium products take their time (Apple principle)
  //
  // Total: 1500ms (premium quality timing)

  // Frame timing calculations (90 frames @ 60fps = 1500ms)
  const convergenceStart = 24/90;    // Frame 24 = 0.400s (visible action begins)
  const convergenceEnd = 45/90;      // Frame 45 = 0.750s (followable motion)
  const greenStart = 48/90;          // Frame 48 = 0.800s (smooth transformation)
  const greenEnd = 69/90;            // Frame 69 = 1.150s (satisfying completion)
  const checkStart = 69/90;          // Frame 69 = 1.150s (confident draw)
  const checkEnd = 90/90;            // Frame 90 = 1.500s (premium complete)

  // Calculate convergence progress (0 to 1)
  const convergenceProgress = progress < convergenceStart ? 0 :
    progress > convergenceEnd ? 1 :
    (progress - convergenceStart) / (convergenceEnd - convergenceStart);

  // Calculate green progress
  const greenProgress = progress < greenStart ? 0 :
    progress > greenEnd ? 1 :
    (progress - greenStart) / (greenEnd - greenStart);

  // Calculate check progress (bounded to checkEnd for precise timing)
  const checkProgress = progress < checkStart ? 0 :
    progress > checkEnd ? 1 :
    (progress - checkStart) / (checkEnd - checkStart);

  // CAMERA-SYNCED SPRING PHYSICS - Fast & confident
  const getShapeTransform = (originalX: number, originalY: number, index: number) => {
    if (convergenceProgress === 0) {
      return { x: 0, y: 0, scale: 1, opacity: 1 };
    }
    
    // Tight stagger for rapid unified convergence
    // Must complete by 300ms to sync with shutter sound end
    const stagger = index * 0.02; // 2% = very tight, fast cohesion
    const adjustedProgress = Math.max(0, Math.min(1, (convergenceProgress - stagger) / (1 - stagger)));
    
    // RESPONSIVE SPRING - Faster than standard for shutter sync
    // Maintains natural feel but accelerated for 250ms convergence
    // Still based on iOS spring but with higher velocity
    const cameraSpring = (t: number) => {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      
      // Fast responsive start, smooth confident settle
      // Minimal overshoot (1.5%) for speed while keeping organic feel
      const base = t * t * (3 - 2 * t); // Smoothstep foundation
      const overshoot = Math.sin(t * Math.PI) * 0.015; // Tight spring
      return Math.min(1, base + overshoot * (1 - t));
    };
    
    const eased = cameraSpring(adjustedProgress);
    
    const deltaX = (centerX - originalX) * eased;
    const deltaY = (centerY - originalY) * eased;
    
    // Rapid scale collapse - must complete by shutter end (300ms)
    // Faster than previous for tight synchronization
    const scale = adjustedProgress < 0.55 ? 1 : 
      1 - ((adjustedProgress - 0.55) / 0.45) * 0.93; // Scale 1.0 → 0.07 (faster)
    
    // Quick fade - clean disappearance
    const opacity = adjustedProgress < 0.75 ? 1 : 
      1 - ((adjustedProgress - 0.75) / 0.25);

    return { x: deltaX, y: deltaY, scale, opacity };
  };

  // Center stays original size - clean and simple
  const centerScale = 1;

  // Green "Photo Saved" signal - appears AFTER shutter sound ends
  // This is the user's confirmation that capture succeeded
  const greenScale = (() => {
    if (greenProgress === 0) return 1;
    // Confident pulse: 1.0 → 1.10 → 1.0
    // Slightly reduced from 12% to 10% for faster timing (150ms total)
    if (greenProgress < 0.35) {
      return 1 + (greenProgress / 0.35) * 0.10; // Quick grow to 1.10x
    } else {
      return 1.10 - ((greenProgress - 0.35) / 0.65) * 0.10; // Smooth settle
    }
  })();
  
  // Quick appearance - "saved" feels immediate after shutter
  const greenOpacity = greenProgress > 0.08 ? 1 : greenProgress * 12.5;

  // Checkmark - Apple's confident draw
  // Fast start (responsive), smooth finish (confident)
  const checkEase = (() => {
    const t = checkProgress;
    // Ease-out quad: Quick decisive stroke
    // Bezier: (0.25, 0.46, 0.45, 0.94)
    return 1 - (1 - t) * (1 - t);
  })();
  
  const checkPathLength = checkEase;
  // Instant visibility - no fade hesitation
  const checkOpacity = checkProgress > 0.03 ? 1 : checkProgress * 33;

  // Filter timing - minimal blur, only at final merge
  // Faster convergence means even less blur duration
  const filterUrl = progress < convergenceStart ? 'none' : 
    convergenceProgress < 0.88 ? 'none' : // Sharp throughout (88% = last 30ms only)
    convergenceProgress < 1 ? 'url(#shutterBlend)' : 
    'none';

  // Shape positions
  const shapes = [
    { x: 17.24, y: 37.80, path: "M17.2428 37.8027C15.7591 37.8027 14.4272 38.4528 13.5164 39.4836C11.9353 41.2731 12.4855 44.2912 10.6796 45.8536C9.05501 47.2591 6.39239 46.85 4.63276 48.0823C3.31296 49.0065 2.45312 50.5173 2.45312 52.2242C2.45312 55.0373 4.78853 57.3178 7.6694 57.3178C9.41782 57.3178 10.9653 56.4778 11.9118 55.1886C13.1585 53.4903 12.8083 50.9201 14.2213 49.3575C15.7749 47.6395 18.6869 48.0651 20.4542 46.5679C21.5304 45.6561 22.2136 44.2946 22.2136 42.7735C22.2136 40.0282 19.9881 37.8027 17.2428 37.8027Z" },
    { x: 5.22, y: 30.50, path: "M10.4326 30.4998C10.4326 33.3129 8.09715 35.5933 5.21628 35.5933C2.33541 35.5933 0 33.3129 0 30.4998C0 27.6867 2.33541 25.4062 5.21628 25.4062C8.09715 25.4062 10.4326 27.6867 10.4326 30.4998Z" },
    { x: 17.24, y: 23.07, path: "M17.2448 23.0736C15.7611 23.0736 14.4292 22.4236 13.5184 21.3927C11.9372 19.6032 12.4875 16.5852 10.6816 15.0228C9.05697 13.6173 6.39435 14.0263 4.63471 12.7941C3.31491 11.8698 2.45508 10.359 2.45508 8.65214C2.45508 5.83905 4.79049 3.55859 7.67136 3.55859C9.41977 3.55859 10.9673 4.39856 11.9137 5.68779C13.1605 7.38603 12.8103 9.95629 14.2233 11.5189C15.7769 13.2369 18.6888 12.8112 20.4561 14.3084C21.5324 15.2203 22.2156 16.5817 22.2156 18.1028C22.2156 20.8481 19.9901 23.0736 17.2448 23.0736Z" },
    { x: 29.27, y: 5.09, path: "M34.4892 5.09354C34.4892 7.90663 32.1538 10.1871 29.2729 10.1871C26.392 10.1871 24.0566 7.90663 24.0566 5.09354C24.0566 2.28046 26.392 0 29.2729 0C32.1538 0 34.4892 2.28046 34.4892 5.09354Z" },
    { x: 41.30, y: 23.07, path: "M41.2989 23.0736C42.7826 23.0736 44.1145 22.4236 45.0253 21.3927C46.6064 19.6032 46.0562 16.5852 47.8621 15.0228C49.4867 13.6173 52.1493 14.0263 53.909 12.7941C55.2288 11.8698 56.0886 10.359 56.0886 8.65214C56.0886 5.83905 53.7532 3.55859 50.8723 3.55859C49.1239 3.55859 47.5764 4.39856 46.63 5.68779C45.3832 7.38603 45.7334 9.95629 44.3204 11.5189C42.7668 13.2369 39.8549 12.8112 38.0876 14.3084C37.0113 15.2203 36.3281 16.5817 36.3281 18.1028C36.3281 20.8481 38.5536 23.0736 41.2989 23.0736Z" },
    { x: 53.33, y: 30.50, path: "M58.5439 30.4998C58.5439 33.3129 56.2085 35.5933 53.3276 35.5933C50.4467 35.5933 48.1113 33.3129 48.1113 30.4998C48.1113 27.6867 50.4467 25.4062 53.3276 25.4062C56.2085 25.4062 58.5439 27.6867 58.5439 30.4998Z" },
    { x: 41.30, y: 37.80, path: "M41.2989 37.8027C42.7826 37.8027 44.1145 38.4528 45.0253 39.4836C46.6064 41.2731 46.0562 44.2912 47.8621 45.8536C49.4867 47.2591 52.1493 46.85 53.909 48.0823C55.2288 49.0065 56.0886 50.5173 56.0886 52.2242C56.0886 55.0373 53.7532 57.3178 50.8723 57.3178C49.1239 57.3178 47.5764 56.4778 46.63 55.1886C45.3832 53.4903 45.7334 50.9201 44.3204 49.3575C42.7668 47.6395 39.8549 48.0651 38.0876 46.5679C37.0113 45.6561 36.3281 44.2946 36.3281 42.7735C36.3281 40.0282 38.5536 37.8027 41.2989 37.8027Z" },
    { x: 29.27, y: 55.91, path: "M34.4892 55.906C34.4892 58.7191 32.1538 60.9996 29.2729 60.9996C26.392 60.9996 24.0566 58.7191 24.0566 55.906C24.0566 53.093 26.392 50.8125 29.2729 50.8125C32.1538 50.8125 34.4892 53.093 34.4892 55.906Z" },
  ];

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 59 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* CAMERA-SYNCED FILTERS - Ultra-fast, ultra-clean */}
      <defs>
        {/* Minimal blend for shutter-speed convergence */}
        <filter id="shutterBlend" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
            result="blend"
          />
          <feComposite in="SourceGraphic" in2="blend" operator="atop" />
        </filter>
        
        {/* Apple-style success green - vibrant, confident */}
        <radialGradient id="greenGradient" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#86EFAC" stopOpacity="1" />
          <stop offset="45%" stopColor="#34D399" stopOpacity="1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="1" />
        </radialGradient>
        
        {/* Crisp glass highlight - Apple's signature shine */}
        <radialGradient id="glassHighlight" cx="32%" cy="32%" r="48%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="70%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Group with liquid filter applied during convergence */}
      <g style={{ filter: filterUrl }}>
        {/* Center dot */}
        <path
          d="M34.4872 30.4998C34.4872 33.3129 32.1518 35.5933 29.271 35.5933C26.3901 35.5933 24.0547 33.3129 24.0547 30.4998C24.0547 27.6867 26.3901 25.4062 29.271 25.4062C32.1518 25.4062 34.4872 27.6867 34.4872 30.4998Z"
          fill="white"
          style={{
            transform: `scale(${centerScale})`,
            transformOrigin: `${centerX}px ${centerY}px`,
            opacity: greenProgress > 0.3 ? 1 - greenProgress : 1,
          }}
        />

        {/* All surrounding shapes/dots */}
        {shapes.map((shape, index) => {
          const transform = getShapeTransform(shape.x, shape.y, index);
          return (
            <g
              key={index}
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: `${shape.x}px ${shape.y}px`,
                opacity: transform.opacity,
              }}
            >
              <path d={shape.path} fill="white" />
            </g>
          );
        })}
      </g>

      {/* Clean - no extra effects, Apple principle: Deferent */}
      
      {/* Unified white circle - brief clarity beat */}
      {progress >= convergenceEnd && progress < greenStart && (
        <circle
          cx={centerX}
          cy={centerY}
          r="5.2"
          fill="white"
          style={{
            opacity: 1,
          }}
        />
      )}

      {/* Green circle - same size as original center dot */}
      {/* Green success circle with premium gradient and glass highlight */}
      {progress >= greenStart && (
        <>
          <circle
            cx={centerX}
            cy={centerY}
            r="5.2"
            fill="url(#greenGradient)"
            style={{
              transform: `scale(${greenScale})`,
              transformOrigin: `${centerX}px ${centerY}px`,
              opacity: greenOpacity,
            }}
          />
          
          {/* Glass highlight for premium depth */}
          <circle
            cx={centerX}
            cy={centerY}
            r="5.2"
            fill="url(#glassHighlight)"
            style={{
              transform: `scale(${greenScale})`,
              transformOrigin: `${centerX}px ${centerY}px`,
              opacity: greenOpacity * 0.85,
            }}
          />
        </>
      )}

      {/* No particles - keep it ultra clean */}

      {/* Checkmark - scaled to fit perfectly inside green circle */}
      <path
        d="M 26.5 30.5 L 28.5 32.8 L 32 28.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: 15,
          strokeDashoffset: 15 - (checkPathLength * 15),
          opacity: checkOpacity,
        }}
      />
    </svg>
  );
};

export default AutoyaLogoFrameControlled;

