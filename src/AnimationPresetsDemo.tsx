import React from 'react';
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
 * Animation Presets - Live Examples
 * 
 * This file demonstrates all animation presets in action.
 * Use this as a reference for implementing animations in your project.
 */

// Example 1: Basic Fade with Spring
export const FadeExample = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springs.default}
      className="example-box"
    >
      Fade with Default Spring
    </motion.div>
  );
};

// Example 2: Scale In with Gentle Spring (Modal)
export const ModalExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Modal</button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            {...variants.blurIn}
            transition={{ duration: durations.fast }}
            className="modal-backdrop"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <motion.div
            {...variants.scaleIn}
            transition={springs.gentle}
            className="modal"
          >
            <h2>Modal Content</h2>
            <p>This modal uses the scaleIn variant with gentle spring</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </motion.div>
        </>
      )}
    </div>
  );
};

// Example 3: Liquid Glass Effect (Premium Entrance)
export const LiquidGlassExample = () => {
  return (
    <motion.div
      {...variants.liquidGlass}
      className="premium-card"
    >
      <h3>Premium Content</h3>
      <p>Liquid glass effect with bouncy spring</p>
    </motion.div>
  );
};

// Example 4: Button with Hover States
export const ButtonExample = () => {
  return (
    <div className="button-grid">
      <motion.button
        {...interactionStates.buttonHover}
        className="primary-button"
      >
        Bouncy Button
      </motion.button>
      
      <motion.button
        {...interactionStates.subtleHover}
        className="secondary-button"
      >
        Subtle Button
      </motion.button>
      
      <motion.button
        {...interactionStates.iconHover}
        className="icon-button"
      >
        🎨
      </motion.button>
    </div>
  );
};

// Example 5: Card with Hover Effect
export const CardExample = () => {
  return (
    <motion.div
      {...interactionStates.cardHover}
      className="card"
    >
      <h3>Interactive Card</h3>
      <p>Hover to see the lift effect</p>
    </motion.div>
  );
};

// Example 6: Staggered List Animation
export const StaggeredListExample = () => {
  const items = [
    'First Item',
    'Second Item',
    'Third Item',
    'Fourth Item',
    'Fifth Item',
  ];
  
  const container = {
    animate: {
      transition: stagger.normal,
    },
  };
  
  return (
    <motion.ul
      variants={container}
      initial="initial"
      animate="animate"
      className="list"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          {...variants.fadeIn}
          transition={springs.stiff}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

// Example 7: Slide Animations (Notifications, Drawers)
export const SlideExamples = () => {
  const [showNotification, setShowNotification] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
  
  return (
    <div>
      <div className="controls">
        <button onClick={() => setShowNotification(!showNotification)}>
          Toggle Notification
        </button>
        <button onClick={() => setShowDrawer(!showDrawer)}>
          Toggle Drawer
        </button>
        <button onClick={() => setShowSidebar(!showSidebar)}>
          Toggle Sidebar
        </button>
      </div>
      
      {/* Notification (slide from top) */}
      {showNotification && (
        <motion.div
          {...variants.slideDown}
          transition={springs.stiff}
          className="notification"
        >
          Notification from top
        </motion.div>
      )}
      
      {/* Drawer (slide from bottom) */}
      {showDrawer && (
        <motion.div
          {...variants.slideUp}
          transition={springs.gentle}
          className="drawer"
        >
          Drawer from bottom
        </motion.div>
      )}
      
      {/* Sidebar (slide from right) */}
      {showSidebar && (
        <motion.div
          {...variants.slideLeft}
          transition={springs.default}
          className="sidebar"
        >
          Sidebar from right
        </motion.div>
      )}
    </div>
  );
};

// Example 8: SVG Path Drawing
export const SVGDrawExample = () => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setIsDrawing(!isDrawing)}>
        {isDrawing ? 'Reset' : 'Draw'}
      </button>
      
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Circle path */}
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
        
        {/* Checkmark */}
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

// Example 9: Camera Success Animation (Fast - 700ms)
export const CameraSuccessFast = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const { recognition, convergence, beat, green, checkmark } = cameraSuccessTimeline;
  
  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), cameraSuccessTimeline.meta.duration);
  };
  
  return (
    <div>
      <button onClick={handleAnimate} disabled={isAnimating}>
        Trigger Camera Success (700ms)
      </button>
      
      <svg width="160" height="160" viewBox="0 0 59 61">
        {/* Center circle that transforms */}
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
        
        {/* Checkmark */}
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
      
      <div className="timeline">
        <div style={{ width: `${(recognition.duration / 700) * 100}%` }}>
          Recognition ({recognition.duration}ms)
        </div>
        <div style={{ width: `${(convergence.duration / 700) * 100}%` }}>
          Convergence ({convergence.duration}ms)
        </div>
        <div style={{ width: `${(beat.duration / 700) * 100}%` }}>
          Beat ({beat.duration}ms)
        </div>
        <div style={{ width: `${(green.duration / 700) * 100}%` }}>
          Green ({green.duration}ms)
        </div>
        <div style={{ width: `${(checkmark.duration / 700) * 100}%` }}>
          Checkmark ({checkmark.duration}ms)
        </div>
      </div>
    </div>
  );
};

// Example 10: Camera Success Animation (Premium - 1500ms)
export const CameraSuccessPremium = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const { recognition, convergence, beat, green, checkmark } = premiumSuccessTimeline;
  
  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), premiumSuccessTimeline.meta.duration);
  };
  
  return (
    <div>
      <button onClick={handleAnimate} disabled={isAnimating}>
        Trigger Premium Success (1500ms)
      </button>
      
      <svg width="160" height="160" viewBox="0 0 59 61">
        {/* Center circle that transforms */}
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
        
        {/* Checkmark */}
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
      
      <div className="timeline">
        <div style={{ width: `${(recognition.duration / 1500) * 100}%` }}>
          Recognition ({recognition.duration}ms)
        </div>
        <div style={{ width: `${(convergence.duration / 1500) * 100}%` }}>
          Convergence ({convergence.duration}ms)
        </div>
        <div style={{ width: `${(beat.duration / 1500) * 100}%` }}>
          Beat ({beat.duration}ms)
        </div>
        <div style={{ width: `${(green.duration / 1500) * 100}%` }}>
          Green ({green.duration}ms)
        </div>
        <div style={{ width: `${(checkmark.duration / 1500) * 100}%` }}>
          Checkmark ({checkmark.duration}ms)
        </div>
      </div>
    </div>
  );
};

// Example 11: Comparison of All Springs
export const SpringComparisonExample = () => {
  const [trigger, setTrigger] = React.useState(0);
  
  const springTypes = [
    { name: 'Stiff', spring: springs.stiff },
    { name: 'Default', spring: springs.default },
    { name: 'Bouncy', spring: springs.bouncy },
    { name: 'Gentle', spring: springs.gentle },
    { name: 'Wobbly', spring: springs.wobbly },
    { name: 'Camera', spring: springs.cameraSpring },
  ];
  
  return (
    <div>
      <button onClick={() => setTrigger(t => t + 1)}>
        Animate All Springs
      </button>
      
      <div className="spring-grid">
        {springTypes.map(({ name, spring }) => (
          <div key={name} className="spring-demo">
            <h4>{name}</h4>
            <p>stiffness: {spring.stiffness}</p>
            <p>damping: {spring.damping}</p>
            
            <motion.div
              key={trigger}
              initial={{ x: 0 }}
              animate={{ x: 200 }}
              transition={spring}
              className="spring-box"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 12: Expand/Collapse with Animation
export const ExpandCollapseExample = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      
      {isExpanded && (
        <motion.div
          {...variants.expand}
          transition={springs.default}
          className="expandable-content"
        >
          <p>This content expands and collapses smoothly</p>
          <p>Using the expand variant with default spring</p>
        </motion.div>
      )}
    </div>
  );
};

// Main Demo Component
export const AnimationPresetsDemo = () => {
  return (
    <div className="animation-presets-demo">
      <h1>Animation Presets - Live Examples</h1>
      
      <section>
        <h2>Basic Animations</h2>
        <FadeExample />
        <LiquidGlassExample />
      </section>
      
      <section>
        <h2>Interactive Elements</h2>
        <ButtonExample />
        <CardExample />
      </section>
      
      <section>
        <h2>Modal & Overlays</h2>
        <ModalExample />
      </section>
      
      <section>
        <h2>Slide Animations</h2>
        <SlideExamples />
      </section>
      
      <section>
        <h2>List Animations</h2>
        <StaggeredListExample />
      </section>
      
      <section>
        <h2>SVG Drawing</h2>
        <SVGDrawExample />
      </section>
      
      <section>
        <h2>Camera Success - Fast (700ms)</h2>
        <CameraSuccessFast />
      </section>
      
      <section>
        <h2>Camera Success - Premium (1500ms)</h2>
        <CameraSuccessPremium />
      </section>
      
      <section>
        <h2>Spring Comparison</h2>
        <SpringComparisonExample />
      </section>
      
      <section>
        <h2>Expand/Collapse</h2>
        <ExpandCollapseExample />
      </section>
    </div>
  );
};

export default AnimationPresetsDemo;



