/**
 * Frame Viewer - Pure Visualization
 * Edit code in Cursor IDE, see frames here
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectLibrary } from './ProjectLibrary';
import { motionProjects } from '../data/motionProjects';
import { MotionProject } from '../types/motionProject';

interface FrameViewerProps {
  fps?: number;
  duration?: number;
  children?: React.ReactNode;
  exportButton?: React.ReactNode;
  svgRef?: React.RefObject<SVGSVGElement>;
}

// Create context to pass frame info to children
interface FrameContextValue {
  currentFrame: number;
  totalFrames: number;
  progress: number;
  time: number;
  isPlaying: boolean;
  setCurrentFrame?: (frame: number) => void;
  fps?: number;
  duration?: number;
}

const FrameContext = React.createContext<FrameContextValue>({
  currentFrame: 0,
  totalFrames: 60,
  progress: 0,
  time: 0,
  isPlaying: false,
});

export const useFrameContext = () => React.useContext(FrameContext);

export const FrameViewer: React.FC<FrameViewerProps> = ({
  fps: initialFps = 30,
  duration: initialDuration = 2,
  children,
  exportButton,
  svgRef,
}) => {
  // Project library state
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<MotionProject | null>(
    motionProjects.length > 0 ? motionProjects[0] : null
  );

  // Use project settings if available, otherwise use props
  const fps = currentProject?.fps || initialFps;
  const duration = currentProject?.duration || initialDuration;

  const totalFrames = Math.floor(fps * duration);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFrames, setSelectedFrames] = useState<Set<number>>(new Set([0]));
  const playIntervalRef = useRef<number | null>(null);

  const progress = currentFrame / (totalFrames - 1);
  const time = progress * duration;

  // Handle project selection
  const handleSelectProject = (projectId: string) => {
    const project = motionProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      setCurrentFrame(0);
      setIsPlaying(false);
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }
  };

  // Playback
  const handlePlayPause = () => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % totalFrames);
      }, 1000 / fps);
    }
  };

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  // Frame selection
  const handleFrameClick = (index: number, isShiftKey: boolean) => {
    if (isShiftKey) {
      const newSelection = new Set(selectedFrames);
      if (newSelection.has(index)) {
        newSelection.delete(index);
      } else {
        newSelection.add(index);
      }
      setSelectedFrames(newSelection);
    } else {
      setSelectedFrames(new Set([index]));
    }
    setCurrentFrame(index);
  };

  const handleSelectAll = () => {
    if (selectedFrames.size === totalFrames) {
      setSelectedFrames(new Set([currentFrame]));
    } else {
      setSelectedFrames(new Set(Array.from({ length: totalFrames }, (_, i) => i)));
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000000',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Top Bar */}
      <div style={{
        height: 60,
        borderBottom: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.8 }}>
            FRAME VIEWER
          </div>
          {currentProject && (
            <div style={{
              fontSize: 12,
              color: '#666',
              padding: '4px 12px',
              background: '#1a1a1a',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#667eea',
              }} />
              {currentProject.name}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={handlePlayPause}
            style={{
              background: isPlaying ? '#333' : 'transparent',
              border: '1px solid #333',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          {exportButton}

          <button
            onClick={() => setIsLibraryOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: 14 }}>📚</span>
            Library
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Pass frame info to children via context */}
        <FrameContext.Provider value={{ 
          currentFrame, 
          totalFrames, 
          progress, 
          time, 
          isPlaying,
          setCurrentFrame,
          fps,
          duration,
        }}>
          {currentProject ? (
            <currentProject.component
              progress={progress}
              size={400}
              svgRef={svgRef}
            />
          ) : children ? (
            children
          ) : (
            <div style={{
              textAlign: 'center',
              opacity: 0.3,
              fontSize: 14,
            }}>
              No component provided.<br />
              <span style={{ fontSize: 12 }}>
                Import FrameViewer in your component and pass it as children.
              </span>
            </div>
          )}
        </FrameContext.Provider>

        {/* Frame Info Overlay */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '12px 16px',
          borderRadius: 8,
          fontSize: 11,
          fontFamily: 'Monaco, monospace',
          border: '1px solid #333',
        }}>
          <div style={{ marginBottom: 6, opacity: 0.6 }}>CURRENT FRAME</div>
          <div><strong>Frame:</strong> {currentFrame}</div>
          <div><strong>Time:</strong> {time.toFixed(3)}s</div>
          <div><strong>Progress:</strong> {progress.toFixed(3)}</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
        padding: 16,
        maxHeight: 200,
        overflowY: 'auto',
      }}>
        {/* Timeline Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, opacity: 0.6 }}>
              ALL FRAMES
            </h3>
            <button
              onClick={handleSelectAll}
              style={{
                background: selectedFrames.size === totalFrames ? '#333' : 'transparent',
                border: '1px solid #333',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              {selectedFrames.size === totalFrames ? '✓ All Selected' : 'Select All'}
            </button>
            <div style={{ fontSize: 10, opacity: 0.4 }}>
              {selectedFrames.size} selected
            </div>
          </div>
        </div>

        {/* Frame Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))',
          gap: 6,
        }}>
          {Array.from({ length: totalFrames }, (_, index) => (
            <motion.div
              key={index}
              onClick={(e) => handleFrameClick(index, e.shiftKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: selectedFrames.has(index) ? '#333' : '#151515',
                border: `2px solid ${currentFrame === index ? '#667eea' : '#1a1a1a'}`,
                borderRadius: 4,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontFamily: 'Monaco, monospace',
                position: 'relative',
              }}
            >
              {index}
              {currentFrame === index && (
                <div style={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  width: 8,
                  height: 8,
                  background: '#667eea',
                  borderRadius: '50%',
                }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Help Text */}
        <div style={{
          marginTop: 12,
          padding: 12,
          background: '#000',
          borderRadius: 6,
          fontSize: 11,
          opacity: 0.5,
          border: '1px solid #1a1a1a',
        }}>
          <strong>💡 Tip:</strong> Click frames to see that moment • Shift+Click for multiple • Edit code in Cursor IDE
        </div>
      </div>

      {/* Project Library Side Sheet */}
      <ProjectLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        projects={motionProjects}
        currentProjectId={currentProject?.id || null}
        onSelectProject={handleSelectProject}
      />
    </div>
  );
};

export default FrameViewer;

