/**
 * Motion Projects Library
 * All available motion projects in the library
 */

import { MotionProject } from '../types/motionProject';
import { AutoyaLogoFrameControlled } from '../components/SVGAnimations/AutoyaLogoFrameControlled';

export const motionProjects: MotionProject[] = [
  {
    id: 'autoya-validation',
    name: 'Autoya Validation',
    description: 'Premium validation animation with liquid convergence and success checkmark',
    createdAt: '2025-12-30',
    updatedAt: '2025-12-30',
    fps: 60,
    duration: 1.5,
    component: AutoyaLogoFrameControlled,
    category: 'validation',
  },
];

export const getProjectById = (id: string): MotionProject | undefined => {
  return motionProjects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: MotionProject['category']): MotionProject[] => {
  return motionProjects.filter(project => project.category === category);
};





