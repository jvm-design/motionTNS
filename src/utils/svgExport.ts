/**
 * Export SVG Animation Data
 * Extracts actual SVG content and animation data
 */

export interface SVGExportData {
  name: string;
  svg: string;
  duration: number;
  fps: number;
  frames: number;
  width: number;
  height: number;
}

/**
 * Extract SVG data for export
 */
export const extractSVGData = (
  svgElement: SVGSVGElement,
  name: string,
  fps: number,
  duration: number
): SVGExportData => {
  // Clone the SVG to get clean markup
  const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Get SVG dimensions
  const width = svgElement.width.baseVal.value || 400;
  const height = svgElement.height.baseVal.value || 400;
  
  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgClone);
  
  return {
    name,
    svg: svgString,
    duration,
    fps,
    frames: Math.floor(fps * duration),
    width,
    height,
  };
};

/**
 * Create JSON export with SVG
 */
export const createSVGJSON = (svgData: SVGExportData): string => {
  const data = {
    name: svgData.name,
    type: 'svg-animation',
    version: '1.0.0',
    fps: svgData.fps,
    duration: svgData.duration,
    frames: svgData.frames,
    dimensions: {
      width: svgData.width,
      height: svgData.height,
    },
    svg: svgData.svg,
    exportedAt: new Date().toISOString(),
    description: 'Autoya Logo Success Animation - Frame-by-frame SVG animation',
  };
  
  return JSON.stringify(data, null, 2);
};

/**
 * Download SVG JSON
 */
export const downloadSVGJSON = (svgData: SVGExportData, filename: string): void => {
  const jsonString = createSVGJSON(svgData);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


