import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  springs,
  durations,
  easings,
  variants,
  interactionStates,
  stagger,
  svgDraw,
  cameraSuccessTimeline,
  premiumSuccessTimeline,
  colors,
} from './utils/animationPresets';

/**
 * 🎨 MOTION AUTOYA - COMPLETE ANIMATION LIBRARY PREVIEW
 * 
 * This is your showcase file for CodeSandbox!
 * Import this component to see ALL animations in action.
 * 
 * USAGE IN CODESANDBOX:
 * 1. Upload this entire project to CodeSandbox
 * 2. Make sure package.json includes: react, react-dom, framer-motion
 * 3. Import and render: <MotionAutoyaPreview />
 */

const MotionAutoyaPreview: React.FC = () => {
  return (
    <div style={styles.container}>
      <Header />
      
      <section style={styles.section}>
        <SectionTitle>🌊 Liquid Glass Effects</SectionTitle>
        <LiquidGlassDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🎯 Interactive Buttons</SectionTitle>
        <ButtonsDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🎴 Interactive Cards</SectionTitle>
        <CardsDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>📱 Modal & Overlays</SectionTitle>
        <ModalDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🎬 Slide Animations</SectionTitle>
        <SlideDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>📝 Staggered Lists</SectionTitle>
        <StaggeredListDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>✨ Fade Animations</SectionTitle>
        <FadeDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🎨 SVG Path Drawing</SectionTitle>
        <SVGDrawDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>📸 Camera Success Animation (700ms)</SectionTitle>
        <CameraSuccessFast />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>💎 Premium Success Animation (1500ms)</SectionTitle>
        <CameraSuccessPremium />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>⚡ Spring Comparison</SectionTitle>
        <SpringComparison />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>📊 Expand/Collapse</SectionTitle>
        <ExpandCollapseDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🔄 Scale Animations</SectionTitle>
        <ScaleDemo />
      </section>
      
      <section style={styles.section}>
        <SectionTitle>🌀 Rotation Animations</SectionTitle>
        <RotateDemo />
      </section>
      
      <Footer />
    </div>
  );
};

// ============================================================================
// HEADER
// ============================================================================

const Header: React.FC = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={springs.gentle}
    style={styles.header}
  >
    <h1 style={styles.title}>🎨 Motion Autoya</h1>
    <p style={styles.subtitle}>
      Premium Animation Library with Apple's Motion Principles
    </p>
    <div style={styles.badges}>
      <Badge>React 18.3</Badge>
      <Badge>Framer Motion 11.0</Badge>
      <Badge>TypeScript 5.4</Badge>
      <Badge>60fps</Badge>
    </div>
  </motion.header>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    style={styles.badge}
  >
    {children}
  </motion.span>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={springs.stiff}
    style={styles.sectionTitle}
  >
    {children}
  </motion.h2>
);

// ============================================================================
// LIQUID GLASS DEMO
// ============================================================================

const LiquidGlassDemo: React.FC = () => {
  return (
    <div style={styles.grid}>
      <motion.div
        {...variants.liquidGlass}
        style={styles.glassCard}
      >
        <h3>Liquid Glass</h3>
        <p>Bouncy entrance with blur & opacity</p>
      </motion.div>
      
      <motion.div
        {...variants.blurIn}
        transition={{ duration: durations.normal }}
        style={styles.glassCard}
      >
        <h3>Blur In</h3>
        <p>Smooth backdrop blur fade</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={springs.gentle}
        style={styles.glassCard}
      >
        <h3>Crystal Glass</h3>
        <p>Clear with edge highlights</p>
      </motion.div>
    </div>
  );
};

// ============================================================================
// BUTTONS DEMO
// ============================================================================

const ButtonsDemo: React.FC = () => {
  return (
    <div style={styles.buttonGrid}>
      <motion.button
        {...interactionStates.buttonHover}
        style={{ ...styles.button, ...styles.primaryButton }}
      >
        Bouncy Button
      </motion.button>
      
      <motion.button
        {...interactionStates.subtleHover}
        style={{ ...styles.button, ...styles.secondaryButton }}
      >
        Subtle Button
      </motion.button>
      
      <motion.button
        {...interactionStates.iconHover}
        style={{ ...styles.button, ...styles.iconButton }}
      >
        ⭐
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
        whileTap={{ scale: 0.95 }}
        transition={springs.stiff}
        style={{ ...styles.button, ...styles.accentButton }}
      >
        Custom Spring
      </motion.button>
    </div>
  );
};

// ============================================================================
// CARDS DEMO
// ============================================================================

const CardsDemo: React.FC = () => {
  return (
    <div style={styles.grid}>
      {['Card 1', 'Card 2', 'Card 3'].map((title, index) => (
        <motion.div
          key={index}
          {...interactionStates.cardHover}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.default, delay: index * 0.1 }}
          style={styles.card}
        >
          <div style={styles.cardImage}>
            {index + 1}
          </div>
          <h3>{title}</h3>
          <p>Hover to see lift effect with shadow</p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// MODAL DEMO
// ============================================================================

const ModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setIsOpen(true)} style={styles.triggerButton}>
        Open Modal
      </button>
      
      {isOpen && (
        <>
          <motion.div
            {...variants.blurIn}
            transition={{ duration: durations.fast }}
            style={styles.backdrop}
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            {...variants.scaleIn}
            transition={springs.gentle}
            style={styles.modal}
          >
            <h2>Modal Title</h2>
            <p>This modal uses scaleIn variant with gentle spring.</p>
            <p>Click outside or the button below to close.</p>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              Close Modal
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// SLIDE DEMO
// ============================================================================

const SlideDemo: React.FC = () => {
  const [direction, setDirection] = useState<'none' | 'down' | 'up' | 'left' | 'right'>('none');
  
  return (
    <div style={styles.demoBox}>
      <div style={styles.controlGrid}>
        <button onClick={() => setDirection('down')} style={styles.controlButton}>
          Slide Down
        </button>
        <button onClick={() => setDirection('up')} style={styles.controlButton}>
          Slide Up
        </button>
        <button onClick={() => setDirection('left')} style={styles.controlButton}>
          Slide Left
        </button>
        <button onClick={() => setDirection('right')} style={styles.controlButton}>
          Slide Right
        </button>
        <button onClick={() => setDirection('none')} style={styles.controlButton}>
          Reset
        </button>
      </div>
      
      <div style={styles.slideContainer}>
        {direction === 'down' && (
          <motion.div
            {...variants.slideDown}
            transition={springs.stiff}
            style={styles.slideBox}
          >
            Sliding from top
          </motion.div>
        )}
        
        {direction === 'up' && (
          <motion.div
            {...variants.slideUp}
            transition={springs.gentle}
            style={styles.slideBox}
          >
            Sliding from bottom
          </motion.div>
        )}
        
        {direction === 'left' && (
          <motion.div
            {...variants.slideLeft}
            transition={springs.default}
            style={styles.slideBox}
          >
            Sliding from right
          </motion.div>
        )}
        
        {direction === 'right' && (
          <motion.div
            {...variants.slideRight}
            transition={springs.bouncy}
            style={styles.slideBox}
          >
            Sliding from left
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// STAGGERED LIST DEMO
// ============================================================================

const StaggeredListDemo: React.FC = () => {
  const [key, setKey] = useState(0);
  const items = ['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item'];
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setKey(k => k + 1)} style={styles.triggerButton}>
        Replay Animation
      </button>
      
      <motion.ul
        key={key}
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: stagger.normal,
          },
        }}
        style={styles.list}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            {...variants.fadeIn}
            transition={springs.stiff}
            style={styles.listItem}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

// ============================================================================
// FADE DEMO
// ============================================================================

const FadeDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setVisible(!visible)} style={styles.triggerButton}>
        Toggle Fade
      </button>
      
      {visible && (
        <motion.div
          {...variants.fadeIn}
          transition={springs.default}
          style={styles.fadeBox}
        >
          I fade in smoothly with default spring
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// SVG DRAW DEMO
// ============================================================================

const SVGDrawDemo: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setIsDrawing(!isDrawing)} style={styles.triggerButton}>
        {isDrawing ? 'Reset' : 'Draw'}
      </button>
      
      <svg width="200" height="200" viewBox="0 0 200 200" style={styles.svg}>
        <motion.circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="#34D399"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isDrawing ? 1 : 0 }}
          transition={svgDraw.normal}
        />
        
        <motion.path
          d="M 80 100 L 95 115 L 120 85"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isDrawing ? 1 : 0 }}
          transition={{
            ...svgDraw.checkmark,
            delay: svgDraw.normal.duration,
          }}
        />
      </svg>
    </div>
  );
};

// ============================================================================
// CAMERA SUCCESS FAST
// ============================================================================

const CameraSuccessFast: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { recognition, convergence, beat, green, checkmark } = cameraSuccessTimeline;
  
  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), cameraSuccessTimeline.meta.duration);
  };
  
  return (
    <div style={styles.demoBox}>
      <button onClick={handleAnimate} disabled={isAnimating} style={styles.triggerButton}>
        Trigger (700ms)
      </button>
      
      <svg width="160" height="160" viewBox="0 0 59 61" style={styles.svg}>
        <motion.circle
          cx="29.27"
          cy="30.5"
          r="5.2"
          initial={{ fill: '#FFFFFF' }}
          animate={isAnimating ? {
            fill: colors.success.solid,
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: green.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration) / 1000,
          }}
        />
        
        <motion.path
          d="M 26.5 30.5 L 28.5 32.8 L 32 28.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: checkmark.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration + green.duration) / 1000,
            ease: easings.easeOutQuad,
          }}
        />
      </svg>
      
      <div style={styles.timeline}>
        <TimelineBar width={(recognition.duration / 700) * 100} label={`Recognition (${recognition.duration}ms)`} color="#667eea" />
        <TimelineBar width={(convergence.duration / 700) * 100} label={`Convergence (${convergence.duration}ms)`} color="#764ba2" />
        <TimelineBar width={(beat.duration / 700) * 100} label={`Beat (${beat.duration}ms)`} color="#f093fb" />
        <TimelineBar width={(green.duration / 700) * 100} label={`Green (${green.duration}ms)`} color="#34D399" />
        <TimelineBar width={(checkmark.duration / 700) * 100} label={`Check (${checkmark.duration}ms)`} color="#10B981" />
      </div>
    </div>
  );
};

// ============================================================================
// CAMERA SUCCESS PREMIUM
// ============================================================================

const CameraSuccessPremium: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { recognition, convergence, beat, green, checkmark } = premiumSuccessTimeline;
  
  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), premiumSuccessTimeline.meta.duration);
  };
  
  return (
    <div style={styles.demoBox}>
      <button onClick={handleAnimate} disabled={isAnimating} style={styles.triggerButton}>
        Trigger (1500ms)
      </button>
      
      <svg width="160" height="160" viewBox="0 0 59 61" style={styles.svg}>
        <motion.circle
          cx="29.27"
          cy="30.5"
          r="5.2"
          initial={{ fill: '#FFFFFF' }}
          animate={isAnimating ? {
            fill: colors.success.solid,
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: green.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration) / 1000,
          }}
        />
        
        <motion.path
          d="M 26.5 30.5 L 28.5 32.8 L 32 28.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: checkmark.duration / 1000,
            delay: (recognition.duration + convergence.duration + beat.duration + green.duration) / 1000,
            ease: easings.easeOutQuad,
          }}
        />
      </svg>
      
      <div style={styles.timeline}>
        <TimelineBar width={(recognition.duration / 1500) * 100} label={`Recognition (${recognition.duration}ms)`} color="#667eea" />
        <TimelineBar width={(convergence.duration / 1500) * 100} label={`Convergence (${convergence.duration}ms)`} color="#764ba2" />
        <TimelineBar width={(beat.duration / 1500) * 100} label={`Beat (${beat.duration}ms)`} color="#f093fb" />
        <TimelineBar width={(green.duration / 1500) * 100} label={`Green (${green.duration}ms)`} color="#34D399" />
        <TimelineBar width={(checkmark.duration / 1500) * 100} label={`Check (${checkmark.duration}ms)`} color="#10B981" />
      </div>
    </div>
  );
};

const TimelineBar: React.FC<{ width: number; label: string; color: string }> = ({ width, label, color }) => (
  <div
    style={{
      width: `${width}%`,
      background: color,
      color: 'white',
      padding: '8px',
      fontSize: '11px',
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

// ============================================================================
// SPRING COMPARISON
// ============================================================================

const SpringComparison: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  
  const springTypes = [
    { name: 'Stiff', spring: springs.stiff, desc: 'Quick & responsive' },
    { name: 'Default', spring: springs.default, desc: 'Balanced & natural' },
    { name: 'Bouncy', spring: springs.bouncy, desc: 'Playful & energetic' },
    { name: 'Gentle', spring: springs.gentle, desc: 'Smooth & calm' },
    { name: 'Wobbly', spring: springs.wobbly, desc: 'Exaggerated bounce' },
    { name: 'Camera', spring: springs.cameraSpring, desc: 'Camera sync' },
  ];
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setTrigger(t => t + 1)} style={styles.triggerButton}>
        Animate All Springs
      </button>
      
      <div style={styles.springGrid}>
        {springTypes.map(({ name, spring, desc }) => (
          <div key={name} style={styles.springDemo}>
            <h4>{name}</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>{desc}</p>
            <p style={{ fontSize: '11px', color: '#999' }}>
              stiffness: {spring.stiffness} | damping: {spring.damping}
            </p>
            
            <div style={styles.springTrack}>
              <motion.div
                key={`${name}-${trigger}`}
                initial={{ x: 0 }}
                animate={{ x: 200 }}
                transition={spring}
                style={styles.springBox}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// EXPAND/COLLAPSE DEMO
// ============================================================================

const ExpandCollapseDemo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setIsExpanded(!isExpanded)} style={styles.triggerButton}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      
      {isExpanded && (
        <motion.div
          {...variants.expand}
          transition={springs.default}
          style={styles.expandableContent}
        >
          <p>This content expands and collapses smoothly</p>
          <p>Using the expand variant with default spring</p>
          <p>Perfect for accordions, dropdowns, and details sections</p>
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// SCALE DEMO
// ============================================================================

const ScaleDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setVisible(!visible)} style={styles.triggerButton}>
        Toggle Scale
      </button>
      
      {visible && (
        <motion.div
          {...variants.scaleIn}
          transition={springs.bouncy}
          style={styles.scaleBox}
        >
          Scale In with Bouncy Spring
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// ROTATE DEMO
// ============================================================================

const RotateDemo: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  
  return (
    <div style={styles.demoBox}>
      <button onClick={() => setRotation(r => r + 180)} style={styles.triggerButton}>
        Rotate 180°
      </button>
      
      <motion.div
        animate={{ rotate: rotation }}
        transition={springs.default}
        style={styles.rotateBox}
      >
        ⭐
      </motion.div>
    </div>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer: React.FC = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    style={styles.footer}
  >
    <p>Built with ❤️ using Apple's Motion Principles</p>
    <p style={{ fontSize: '14px', marginTop: '8px' }}>
      All animations respect <code>prefers-reduced-motion</code> | 60fps GPU-accelerated
    </p>
  </motion.footer>
);

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
  } as React.CSSProperties,
  
  header: {
    textAlign: 'center' as const,
    marginBottom: '60px',
  } as React.CSSProperties,
  
  title: {
    fontSize: '48px',
    fontWeight: 700,
    margin: '0 0 12px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } as React.CSSProperties,
  
  subtitle: {
    fontSize: '20px',
    color: '#666',
    margin: '0 0 24px 0',
  } as React.CSSProperties,
  
  badges: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  
  badge: {
    display: 'inline-block',
    padding: '6px 12px',
    background: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  
  section: {
    marginBottom: '60px',
  } as React.CSSProperties,
  
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#333',
  } as React.CSSProperties,
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,
  
  glassCard: {
    padding: '32px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  } as React.CSSProperties,
  
  buttonGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '16px',
  } as React.CSSProperties,
  
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,
  
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  } as React.CSSProperties,
  
  secondaryButton: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
  } as React.CSSProperties,
  
  iconButton: {
    background: '#FFD700',
    fontSize: '24px',
    padding: '12px 16px',
  } as React.CSSProperties,
  
  accentButton: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  } as React.CSSProperties,
  
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  } as React.CSSProperties,
  
  cardImage: {
    width: '100%',
    height: '160px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 700,
    color: 'white',
  } as React.CSSProperties,
  
  demoBox: {
    background: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  
  triggerButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: '#667eea',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '24px',
  } as React.CSSProperties,
  
  backdrop: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
  } as React.CSSProperties,
  
  modal: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '90%',
    zIndex: 1000,
  } as React.CSSProperties,
  
  closeButton: {
    marginTop: '16px',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    background: '#f5f5f5',
    cursor: 'pointer',
  } as React.CSSProperties,
  
  controlGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginBottom: '24px',
  } as React.CSSProperties,
  
  controlButton: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    background: '#667eea',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  } as React.CSSProperties,
  
  slideContainer: {
    position: 'relative' as const,
    height: '200px',
    background: '#f5f5f5',
    borderRadius: '8px',
    overflow: 'hidden',
  } as React.CSSProperties,
  
  slideBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600,
  } as React.CSSProperties,
  
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  } as React.CSSProperties,
  
  listItem: {
    padding: '16px',
    marginBottom: '8px',
    background: '#f5f5f5',
    borderRadius: '8px',
  } as React.CSSProperties,
  
  fadeBox: {
    padding: '32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
    textAlign: 'center' as const,
    fontWeight: 600,
  } as React.CSSProperties,
  
  svg: {
    display: 'block',
    margin: '24px auto',
  } as React.CSSProperties,
  
  timeline: {
    display: 'flex',
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '24px',
  } as React.CSSProperties,
  
  springGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,
  
  springDemo: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
  } as React.CSSProperties,
  
  springTrack: {
    position: 'relative' as const,
    height: '40px',
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
  } as React.CSSProperties,
  
  springBox: {
    position: 'absolute' as const,
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
  } as React.CSSProperties,
  
  expandableContent: {
    padding: '24px',
    background: '#f5f5f5',
    borderRadius: '8px',
    marginTop: '16px',
  } as React.CSSProperties,
  
  scaleBox: {
    padding: '32px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    borderRadius: '12px',
    textAlign: 'center' as const,
    fontWeight: 600,
  } as React.CSSProperties,
  
  rotateBox: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    borderRadius: '12px',
    margin: '24px auto',
  } as React.CSSProperties,
  
  footer: {
    textAlign: 'center' as const,
    marginTop: '80px',
    padding: '40px 0',
    borderTop: '2px solid #e0e0e0',
    color: '#666',
  } as React.CSSProperties,
};

export default MotionAutoyaPreview;

