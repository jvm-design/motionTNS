/**
 * Project Library - Side Sheet
 * Displays all motion projects in a beautiful side sheet
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionProject } from '../types/motionProject';

interface ProjectLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  projects: MotionProject[];
  currentProjectId: string | null;
  onSelectProject: (projectId: string) => void;
}

export const ProjectLibrary: React.FC<ProjectLibraryProps> = ({
  isOpen,
  onClose,
  projects,
  currentProjectId,
  onSelectProject,
}) => {
  const categoryColors: Record<string, string> = {
    validation: '#10b981',
    success: '#22c55e',
    loading: '#3b82f6',
    transition: '#8b5cf6',
    other: '#6b7280',
  };

  const categoryLabels: Record<string, string> = {
    validation: 'Validation',
    success: 'Success',
    loading: 'Loading',
    transition: 'Transition',
    other: 'Other',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
            }}
          />

          {/* Side Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '420px',
              maxWidth: '90vw',
              background: '#0a0a0a',
              borderLeft: '1px solid #1a1a1a',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 4,
                }}>
                  Motion Library
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: 13,
                  color: '#666',
                }}>
                  {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#999',
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#666';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.color = '#999';
                }}
              >
                ×
              </button>
            </div>

            {/* Projects List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
            }}>
              {projects.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#666',
                  fontSize: 14,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
                  <div>No projects yet</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Create your first motion project
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {projects.map((project) => {
                    const isActive = project.id === currentProjectId;
                    const categoryColor = categoryColors[project.category || 'other'];

                    return (
                      <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelectProject(project.id);
                          onClose();
                        }}
                        style={{
                          background: isActive ? '#1a1a1a' : '#0f0f0f',
                          border: `1px solid ${isActive ? '#667eea' : '#1a1a1a'}`,
                          borderRadius: 8,
                          padding: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {/* Project Header */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}>
                          <div style={{ flex: 1 }}>
                            <h3 style={{
                              margin: 0,
                              fontSize: 15,
                              fontWeight: 600,
                              color: '#fff',
                              marginBottom: 4,
                            }}>
                              {project.name}
                            </h3>
                            <p style={{
                              margin: 0,
                              fontSize: 12,
                              color: '#999',
                              lineHeight: 1.4,
                            }}>
                              {project.description}
                            </p>
                          </div>

                          {isActive && (
                            <div style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#667eea',
                              marginLeft: 8,
                              marginTop: 4,
                              flexShrink: 0,
                            }} />
                          )}
                        </div>

                        {/* Project Meta */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid #1a1a1a',
                        }}>
                          {/* Category Badge */}
                          {project.category && (
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 10px',
                              background: `${categoryColor}15`,
                              border: `1px solid ${categoryColor}30`,
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 500,
                              color: categoryColor,
                            }}>
                              <div style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: categoryColor,
                              }} />
                              {categoryLabels[project.category] || project.category}
                            </div>
                          )}

                          {/* Duration */}
                          <div style={{
                            fontSize: 11,
                            color: '#666',
                            fontFamily: 'Monaco, monospace',
                          }}>
                            {project.duration}s @ {project.fps}fps
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #1a1a1a',
              background: '#000',
            }}>
              <button
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  opacity: 0.9,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                + New Project
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectLibrary;





