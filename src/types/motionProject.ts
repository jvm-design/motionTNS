/**
 * Motion Project Types
 * Each motion project is an independent animation that can be loaded and viewed
 */

export interface MotionProject {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  fps: number;
  duration: number; // in seconds
  component: React.ComponentType<any>;
  category?: 'validation' | 'success' | 'loading' | 'transition' | 'other';
}

export interface ProjectLibraryState {
  projects: MotionProject[];
  currentProjectId: string | null;
}





