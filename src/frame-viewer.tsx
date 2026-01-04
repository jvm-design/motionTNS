/**
 * Frame Viewer - Entry Point
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import FrameViewerApp from './FrameViewerApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FrameViewerApp />
  </React.StrictMode>,
);


