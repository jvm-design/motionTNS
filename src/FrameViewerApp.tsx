/**
 * Frame Viewer App - Motion Projects Library
 * View and manage all motion animations
 */

import { useRef } from 'react';
import { FrameViewer, useFrameContext } from './components/FrameViewer';
import SimpleExportButton from './components/SimpleExportButton';

function FrameViewerApp() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  return (
    <FrameViewer 
      svgRef={svgRef}
      exportButton={
        <SimpleExportButton
          targetElementRef={svgRef}
          animationName="Autoya Logo Success Animation"
          defaultFilename="autoya-success-animation"
          fps={60}
          duration={1.5}
          totalFrames={90}
        />
      }
    />
  );
}

export default FrameViewerApp;

