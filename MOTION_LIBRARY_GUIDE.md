# Motion Library System 📚

## Overview

The Motion Library is a project management system that allows you to organize and switch between different motion animations. Each motion project is an independent file with its own settings and animation.

## Features

### ✨ Library Side Sheet
- Beautiful slide-in side panel from the right edge
- Shows all available motion projects
- Click any project to load it instantly
- Displays project metadata (category, duration, FPS)
- Smooth animations and transitions

### 🎯 Quick Access
- **Library Button**: Located at the top-right corner of the header
- **Gradient Design**: Purple gradient button with 📚 icon
- **Current Project Badge**: Shows active project name in the header

### 🎨 Project Categories
- **Validation**: Form validation, success states
- **Success**: Completion animations, confirmations
- **Loading**: Loading states, progress indicators
- **Transition**: Page transitions, state changes
- **Other**: Miscellaneous animations

## How to Use

### Viewing the Library
1. Click the **"📚 Library"** button in the top-right corner
2. The side sheet will slide in from the right
3. Browse all available motion projects
4. Click on any project to load it
5. Close by clicking the X button or the backdrop

### Current Project
- The active project is shown with a blue dot indicator
- Project name appears in a badge next to "FRAME VIEWER"
- Animation automatically uses project's FPS and duration settings

## Adding New Projects

### Step 1: Create Your Animation Component
Create a new animation component in `src/components/SVGAnimations/`:

```typescript
// MyNewAnimation.tsx
import React from 'react';

interface MyNewAnimationProps {
  progress: number; // 0 to 1
  size?: number;
}

export const MyNewAnimation: React.FC<MyNewAnimationProps> = ({
  progress,
  size = 400,
}) => {
  // Your animation logic here
  return (
    <svg width={size} height={size}>
      {/* Your SVG content */}
    </svg>
  );
};
```

### Step 2: Register in Motion Projects
Add your project to `src/data/motionProjects.ts`:

```typescript
import { MyNewAnimation } from '../components/SVGAnimations/MyNewAnimation';

export const motionProjects: MotionProject[] = [
  // ... existing projects
  {
    id: 'my-new-animation',
    name: 'My New Animation',
    description: 'Description of what this animation does',
    createdAt: '2025-12-30',
    updatedAt: '2025-12-30',
    fps: 60,
    duration: 2.0,
    component: MyNewAnimation,
    category: 'transition',
  },
];
```

### Step 3: View Your Animation
1. Refresh the app
2. Click the Library button
3. Your new project will appear in the list
4. Click it to view and edit

## Project Structure

```
src/
├── types/
│   └── motionProject.ts          # TypeScript types
├── data/
│   └── motionProjects.ts         # Project registry
├── components/
│   ├── FrameViewer.tsx           # Main viewer with library integration
│   ├── ProjectLibrary.tsx        # Side sheet component
│   └── SVGAnimations/
│       └── [Your animations]     # Animation components
```

## Project Properties

```typescript
interface MotionProject {
  id: string;                      // Unique identifier
  name: string;                    // Display name
  description: string;             // Short description
  thumbnail?: string;              // Optional thumbnail URL
  createdAt: string;               // Creation date
  updatedAt: string;               // Last update date
  fps: number;                     // Frames per second
  duration: number;                // Duration in seconds
  component: React.ComponentType;  // Animation component
  category?: string;               // Project category
}
```

## Current Projects

### 1. Autoya Validation
- **Category**: Validation
- **Duration**: 1.5 seconds @ 60fps
- **Description**: Premium validation animation with liquid convergence and success checkmark
- **Component**: `AutoyaLogoFrameControlled`

## Tips

### Best Practices
1. **Keep animations focused**: Each project should do one thing well
2. **Use meaningful names**: Clear, descriptive project names
3. **Document your animations**: Add helpful descriptions
4. **Optimize performance**: Test with different FPS settings
5. **Categorize properly**: Use categories to organize your library

### Performance
- The library loads all project metadata instantly
- Only the active project's component is rendered
- Switching projects is instant with no lag
- Frame viewer automatically adjusts to project settings

### Workflow
1. **Create** new animation components
2. **Register** them in the motion projects file
3. **View** them in the Frame Viewer
4. **Export** using the export button
5. **Share** with your team

## Future Enhancements

Planned features:
- [ ] Project thumbnails/previews
- [ ] Search and filter projects
- [ ] Duplicate/clone projects
- [ ] Project templates
- [ ] Export project library
- [ ] Import projects from files
- [ ] Project favorites/starring
- [ ] Recent projects section

## Keyboard Shortcuts

Coming soon:
- `Cmd/Ctrl + L` - Toggle library
- `Cmd/Ctrl + N` - New project
- `Cmd/Ctrl + E` - Export current project
- `Arrow Keys` - Navigate projects

---

**Built with ❤️ using React, TypeScript, and Framer Motion**





