/**
 * 🎨 Motion Autoya - CodeSandbox Entry Point
 * 
 * This is the main App component for CodeSandbox.
 * It loads the complete animation preview showcase.
 * 
 * SETUP IN CODESANDBOX:
 * 1. Create React TypeScript sandbox
 * 2. Replace App.tsx with this file
 * 3. Copy CODESANDBOX_PREVIEW.tsx to src/
 * 4. Copy src/utils/animationPresets.ts
 * 5. Install: npm install framer-motion
 * 6. Done! ✨
 */

import MotionAutoyaPreview from './CODESANDBOX_PREVIEW';
import './App.css'; // Optional: if you have custom styles

function App() {
  return (
    <div className="App">
      <MotionAutoyaPreview />
    </div>
  );
}

export default App;

