import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const STROKE = '#ffffff';

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const easeOutQuart = Easing.bezier(0.16, 1, 0.3, 1);
  const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);

  const circleDraw = interpolate(frame, [15, 80], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOutCubic,
  });

  const markDraw = interpolate(frame, [45, 105], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOutCubic,
  });

  const fadeIn = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutQuart,
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeInOutCubic,
    },
  );

  const introScale = spring({
    frame: frame - 10,
    fps,
    from: 0.92,
    to: 1,
    config: { damping: 18, mass: 0.6, stiffness: 90 },
  });

  const breath =
    1 + Math.sin(Math.max(0, frame - 110) / 22) * 0.012;

  const scale = introScale * breath;
  const opacity = fadeIn * fadeOut;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        <svg width={640} height={640} viewBox="0 0 200 200">
          <defs>
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#softGlow)">
            <circle
              cx={100}
              cy={100}
              r={70}
              fill="none"
              stroke={STROKE}
              strokeWidth={3.2}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={circleDraw}
              transform="rotate(-90 100 100)"
            />

            <path
              d="M 62 78 L 82 132 L 100 96 L 118 132 L 138 78"
              fill="none"
              stroke={STROKE}
              strokeWidth={3.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={markDraw}
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
