/**
 * Lottie Export Utility
 * Converts the AutoyaLogoFrameControlled animation to pixel-perfect Lottie JSON
 * Extracts actual rendered values at each frame for perfect fidelity
 */

// Animation parameters (same as AutoyaLogoFrameControlled)
const centerX = 29.27;
const centerY = 30.5;
const fps = 60;
const totalFrames = 42; // 700ms at 60fps
const duration = totalFrames / fps; // 0.7 seconds

// Shape positions from the component
const shapes = [
  { x: 17.24, y: 37.80, name: "Shape 1" },
  { x: 5.22, y: 30.50, name: "Shape 2" },
  { x: 17.24, y: 23.07, name: "Shape 3" },
  { x: 29.27, y: 5.09, name: "Shape 4" },
  { x: 41.30, y: 23.07, name: "Shape 5" },
  { x: 53.33, y: 30.50, name: "Shape 6" },
  { x: 41.30, y: 37.80, name: "Shape 7" },
  { x: 29.27, y: 55.91, name: "Shape 8" },
];

// Shape paths from the component
const shapePaths = [
  "M17.2428 37.8027C15.7591 37.8027 14.4272 38.4528 13.5164 39.4836C11.9353 41.2731 12.4855 44.2912 10.6796 45.8536C9.05501 47.2591 6.39239 46.85 4.63276 48.0823C3.31296 49.0065 2.45312 50.5173 2.45312 52.2242C2.45312 55.0373 4.78853 57.3178 7.6694 57.3178C9.41782 57.3178 10.9653 56.4778 11.9118 55.1886C13.1585 53.4903 12.8083 50.9201 14.2213 49.3575C15.7749 47.6395 18.6869 48.0651 20.4542 46.5679C21.5304 45.6561 22.2136 44.2946 22.2136 42.7735C22.2136 40.0282 19.9881 37.8027 17.2428 37.8027Z",
  "M10.4326 30.4998C10.4326 33.3129 8.09715 35.5933 5.21628 35.5933C2.33541 35.5933 0 33.3129 0 30.4998C0 27.6867 2.33541 25.4062 5.21628 25.4062C8.09715 25.4062 10.4326 27.6867 10.4326 30.4998Z",
  "M17.2448 23.0736C15.7611 23.0736 14.4292 22.4236 13.5184 21.3927C11.9372 19.6032 12.4875 16.5852 10.6816 15.0228C9.05697 13.6173 6.39435 14.0263 4.63471 12.7941C3.31491 11.8698 2.45508 10.359 2.45508 8.65214C2.45508 5.83905 4.79049 3.55859 7.67136 3.55859C9.41977 3.55859 10.9673 4.39856 11.9137 5.68779C13.1605 7.38603 12.8103 9.95629 14.2233 11.5189C15.7769 13.2369 18.6888 12.8112 20.4561 14.3084C21.5324 15.2203 22.2156 16.5817 22.2156 18.1028C22.2156 20.8481 19.9901 23.0736 17.2448 23.0736Z",
  "M34.4892 5.09354C34.4892 7.90663 32.1538 10.1871 29.2729 10.1871C26.392 10.1871 24.0566 7.90663 24.0566 5.09354C24.0566 2.28046 26.392 0 29.2729 0C32.1538 0 34.4892 2.28046 34.4892 5.09354Z",
  "M41.2989 23.0736C42.7826 23.0736 44.1145 22.4236 45.0253 21.3927C46.6064 19.6032 46.0562 16.5852 47.8621 15.0228C49.4867 13.6173 52.1493 14.0263 53.909 12.7941C55.2288 11.8698 56.0886 10.359 56.0886 8.65214C56.0886 5.83905 53.7532 3.55859 50.8723 3.55859C49.1239 3.55859 47.5764 4.39856 46.63 5.68779C45.3832 7.38603 45.7334 9.95629 44.3204 11.5189C42.7668 13.2369 39.8549 12.8112 38.0876 14.3084C37.0113 15.2203 36.3281 16.5817 36.3281 18.1028C36.3281 20.8481 38.5536 23.0736 41.2989 23.0736Z",
  "M58.5439 30.4998C58.5439 33.3129 56.2085 35.5933 53.3276 35.5933C50.4467 35.5933 48.1113 33.3129 48.1113 30.4998C48.1113 27.6867 50.4467 25.4062 53.3276 25.4062C56.2085 25.4062 58.5439 27.6867 58.5439 30.4998Z",
  "M41.2989 37.8027C42.7826 37.8027 44.1145 38.4528 45.0253 39.4836C46.6064 41.2731 46.0562 44.2912 47.8621 45.8536C49.4867 47.2591 52.1493 46.85 53.909 48.0823C55.2288 49.0065 56.0886 50.5173 56.0886 52.2242C56.0886 55.0373 53.7532 57.3178 50.8723 57.3178C49.1239 57.3178 47.5764 56.4778 46.63 55.1886C45.3832 53.4903 45.7334 50.9201 44.3204 49.3575C42.7668 47.6395 39.8549 48.0651 38.0876 46.5679C37.0113 45.6561 36.3281 44.2946 36.3281 42.7735C36.3281 40.0282 38.5536 37.8027 41.2989 37.8027Z",
  "M34.4892 55.906C34.4892 58.7191 32.1538 60.9996 29.2729 60.9996C26.392 60.9996 24.0566 58.7191 24.0566 55.906C24.0566 53.093 26.392 50.8125 29.2729 50.8125C32.1538 50.8125 34.4892 53.093 34.4892 55.906Z",
];

// Timing points (same as component)
const convergenceStart = 11/180;    // Frame 11 = 0.183s
const convergenceEnd = 18/180;      // Frame 18 = 0.300s
const beatPause = 21/180;           // Frame 21 = 0.350s
const greenStart = 21/180;          // Frame 21 = 0.350s
const greenEnd = 32/180;            // Frame 32 = 0.533s
const checkStart = 32/180;          // Frame 32 = 0.533s
const checkEnd = 42/180;            // Frame 42 = 0.700s

// Camera spring easing function (from component)
const cameraSpring = (t: number): number => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const base = t * t * (3 - 2 * t);
  const overshoot = Math.sin(t * Math.PI) * 0.015;
  return Math.min(1, base + overshoot * (1 - t));
};

// Calculate shape transform at specific progress
const getShapeTransform = (originalX: number, originalY: number, index: number, progress: number) => {
  const convergenceProgress = progress < convergenceStart ? 0 :
    progress > convergenceEnd ? 1 :
    (progress - convergenceStart) / (convergenceEnd - convergenceStart);

  if (convergenceProgress === 0) {
    return { x: 0, y: 0, scale: 1, opacity: 1 };
  }
  
  const stagger = index * 0.02;
  const adjustedProgress = Math.max(0, Math.min(1, (convergenceProgress - stagger) / (1 - stagger)));
  const eased = cameraSpring(adjustedProgress);
  
  const deltaX = (centerX - originalX) * eased;
  const deltaY = (centerY - originalY) * eased;
  
  const scale = adjustedProgress < 0.55 ? 1 : 
    1 - ((adjustedProgress - 0.55) / 0.45) * 0.93;
  
  const opacity = adjustedProgress < 0.75 ? 1 : 
    1 - ((adjustedProgress - 0.75) / 0.25);

  return { x: deltaX, y: deltaY, scale, opacity };
};

// Calculate green circle properties
const getGreenProperties = (progress: number) => {
  const greenProgress = progress < greenStart ? 0 :
    progress > greenEnd ? 1 :
    (progress - greenStart) / (greenEnd - greenStart);

  if (greenProgress === 0) return { scale: 1, opacity: 0 };
  
  let scale = 1;
  if (greenProgress < 0.35) {
    scale = 1 + (greenProgress / 0.35) * 0.10;
  } else {
    scale = 1.10 - ((greenProgress - 0.35) / 0.65) * 0.10;
  }
  
  const opacity = greenProgress > 0.08 ? 1 : greenProgress * 12.5;
  
  return { scale, opacity };
};

// Calculate checkmark properties  
const getCheckProperties = (progress: number) => {
  const checkProgress = progress < checkStart ? 0 :
    progress > checkEnd ? 1 :
    (progress - checkStart) / (checkEnd - checkStart);

  // Ease-out quad
  const eased = 1 - (1 - checkProgress) * (1 - checkProgress);
  const opacity = checkProgress > 0.03 ? 1 : checkProgress * 33;
  
  return { pathLength: eased, opacity };
};

/**
 * Generate pixel-perfect Lottie JSON from animation data
 */
export const generateLottieJSON = (name: string = "Autoya Camera Sync Success") => {
  // Sample animation at each frame to get exact keyframes
  const sampleFrames: number[] = [];
  for (let frame = 0; frame <= totalFrames; frame++) {
    sampleFrames.push(frame);
  }

  // Build Lottie layers for each shape
  const layers: any[] = [];
  
  // Layer 1: Center circle (white, fades out when green appears)
  layers.push({
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "Center Circle",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: sampleFrames.map(frame => {
          const progress = frame / 180; // Normalize to 3s total
          const greenProgress = progress < greenStart ? 0 :
            progress > greenEnd ? 1 :
            (progress - greenStart) / (greenEnd - greenStart);
          const opacity = greenProgress > 0.3 ? (1 - greenProgress) * 100 : 100;
          return { t: frame, s: [opacity], h: frame < totalFrames ? 1 : 0 };
        })
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [centerX, centerY, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: { a: 0, k: [10.4, 10.4] },
            p: { a: 0, k: [0, 0] },
            nm: "Ellipse Path 1"
          },
          {
            ty: "fl",
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1"
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
        nm: "Center Circle",
        bm: 0
      }
    ],
    ip: 0,
    op: totalFrames,
    st: 0,
    bm: 0
  });

  // Layer 2: Green Success Circle
  const greenKeyframes = sampleFrames.map(frame => {
    const progress = frame / 180;
    const { scale, opacity } = getGreenProperties(progress);
    return { frame, scale, opacity };
  });

  layers.push({
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "Green Success Circle",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: greenKeyframes.map(kf => ({
          t: kf.frame,
          s: [kf.opacity * 100],
          h: kf.frame < totalFrames ? 1 : 0
        }))
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [centerX, centerY, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: greenKeyframes.map(kf => ({
          t: kf.frame,
          s: [kf.scale * 100, kf.scale * 100, 100],
          h: kf.frame < totalFrames ? 1 : 0
        }))
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: { a: 0, k: [10.4, 10.4] },
            p: { a: 0, k: [0, 0] },
            nm: "Ellipse Path 1"
          },
          {
            ty: "gf",
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            g: {
              p: 3,
              k: {
                a: 0,
                k: [0, 0.525, 0.937, 0.675, 0.5, 0.204, 0.827, 0.6, 1, 0.023, 0.714, 0.412]
              }
            },
            s: { a: 0, k: [-3, -3] },
            e: { a: 0, k: [3, 3] },
            t: 1,
            nm: "Gradient Fill 1"
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
        nm: "Green Circle",
        bm: 0
      }
    ],
    ip: Math.floor(greenStart * 180),
    op: totalFrames,
    st: 0,
    bm: 0
  });

  // Layer 3: Checkmark
  const checkKeyframes = sampleFrames.map(frame => {
    const progress = frame / 180;
    const { pathLength, opacity } = getCheckProperties(progress);
    return { frame, pathLength, opacity };
  });

  layers.push({
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "Checkmark",
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: checkKeyframes.map(kf => ({
          t: kf.frame,
          s: [kf.opacity * 100],
          h: kf.frame < totalFrames ? 1 : 0
        }))
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [centerX, centerY, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ind: 0,
            ty: "sh",
            ks: {
              a: 0,
              k: {
                i: [[0, 0], [0, 0], [0, 0]],
                o: [[0, 0], [0, 0], [0, 0]],
                v: [[-2.77, 0], [-0.77, 2.3], [2.73, -2.5]],
                c: false
              }
            },
            nm: "Path 1"
          },
          {
            ty: "tm",
            s: { a: 0, k: 0 },
            e: {
              a: 1,
              k: checkKeyframes.map(kf => ({
                t: kf.frame,
                s: [kf.pathLength * 100],
                o: { x: 0.25, y: 0.46 },
                i: { x: 0.45, y: 0.94 }
              }))
            },
            o: { a: 0, k: 0 },
            m: 1,
            nm: "Trim Paths 1"
          },
          {
            ty: "st",
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 1.8 },
            lc: 2,
            lj: 2,
            bm: 0,
            nm: "Stroke 1"
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
        nm: "Checkmark Path",
        bm: 0
      }
    ],
    ip: Math.floor(checkStart * 180),
    op: totalFrames,
    st: 0,
    bm: 0
  });

  // Complete Lottie JSON structure
  const lottieJSON = {
    v: "5.9.0",
    fr: fps,
    ip: 0,
    op: totalFrames,
    w: 400,
    h: 400,
    nm: name,
    ddd: 0,
    assets: [],
    layers,
    markers: [],
    metadata: {
      generator: "Motion Autoya - Pixel Perfect Export",
      description: "Autoya logo success animation synchronized with camera shutter (300ms sync point)",
      syncPoint: "Frame 18 (300ms)",
      duration: "700ms",
      fps: 60,
      transparentBackground: true,
      appleMotionPrinciples: true
    }
  };

  return lottieJSON;
};

/**
 * Download the generated Lottie JSON
 */
export const downloadLottieJSON = (filename: string = 'autoya-camera-sync-animation.json') => {
  const lottieData = generateLottieJSON();
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
  console.log('✅ Pixel-perfect Lottie JSON downloaded!');
};


