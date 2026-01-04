# Export Packages Reference

## Overview

This document lists all packages/dependencies that enable the JSON motion export feature in Motion Autoya.

## Primary Package for JSON Export

### JSZip (v3.10.1)
**Purpose**: Creates ZIP files containing multiple export formats (SVG + JSON + README)

```json
{
  "dependencies": {
    "jszip": "^3.10.1"
  }
}
```

**What it does**:
- Bundles SVG file, Motion JSON, and README into a single ZIP download
- Provides browser-compatible ZIP file generation
- No server-side processing required

**Usage in code** (`src/components/SimpleExportButton.tsx`):
```typescript
import JSZip from 'jszip';

const zip = new JSZip();
zip.file(`${defaultFilename}.svg`, svgString);
zip.file(`${defaultFilename}-motion.json`, jsonString);
zip.file('README.md', readme);

const zipBlob = await zip.generateAsync({ type: 'blob' });
// Download the ZIP
```

## Related Packages (Already Installed)

### For Future Export Enhancements

#### 1. Lottie Export
```json
{
  "dependencies": {
    "lottie-web": "^5.12.2",
    "lottie-react": "^2.4.0"
  }
}
```

**Purpose**: Export animations to Lottie JSON format for mobile apps
- Already have utilities in `src/utils/lottieExport.ts`
- Can convert motion data to Lottie format
- Used by iOS/Android apps for animations

#### 2. Video Export
```json
{
  "dependencies": {
    "@ffmpeg/ffmpeg": "^0.12.15",
    "@ffmpeg/util": "^0.12.2"
  }
}
```

**Purpose**: Convert animations to video formats (MP4, WebM)
- Utilities available in `src/utils/videoExport.ts`
- Browser-based video encoding
- Transparent background support

#### 3. Animation Libraries
```json
{
  "dependencies": {
    "framer-motion": "^11.0.3",
    "gsap": "^3.12.5",
    "@react-spring/web": "^9.7.3"
  }
}
```

**Purpose**: Animation frameworks used in the app
- Extract animation data from these libraries
- Convert to portable JSON format
- Cross-platform motion specifications

## How The Export Works

### 1. Click Export Button
User clicks "💾 Export SVG" button

### 2. Capture Current State
```typescript
// Get SVG element
const element = targetElementRef.current;
const svgString = new XMLSerializer().serializeToString(element);
```

### 3. Generate Motion JSON
```typescript
// Create comprehensive motion specification
const motionJSON = {
  animation: { duration, fps, totalFrames },
  timing: { /* phase timing */ },
  phases: [ /* animation phases */ ],
  elements: { /* visual elements */ },
  synchronization: { /* sync points */ }
};
```

### 4. Bundle Everything
```typescript
// JSZip packages everything
const zip = new JSZip();
zip.file(`${filename}.svg`, svgString);
zip.file(`${filename}-motion.json`, JSON.stringify(motionJSON));
zip.file('README.md', documentationText);
```

### 5. Download ZIP
```typescript
const zipBlob = await zip.generateAsync({ type: 'blob' });
const url = URL.createObjectURL(zipBlob);
// Trigger download
```

## Installation

All packages are already installed! If you need to reinstall:

```bash
npm install jszip
```

Or install all dependencies:

```bash
npm install
```

## Package Sizes

| Package | Size | Purpose |
|---------|------|---------|
| jszip | ~25KB gzipped | ZIP file creation |
| lottie-web | ~140KB gzipped | Lottie playback |
| lottie-react | ~3KB | React wrapper |
| @ffmpeg/ffmpeg | ~30MB (WebAssembly) | Video encoding |
| framer-motion | ~60KB gzipped | Animation library |
| gsap | ~80KB gzipped | Animation library |

## Browser Compatibility

### JSZip
- ✅ Chrome 20+
- ✅ Firefox 13+
- ✅ Safari 6+
- ✅ Edge 12+
- ✅ All modern mobile browsers

### Download API (used for file download)
- ✅ All modern browsers support `<a>` download attribute
- ✅ Blob URLs supported everywhere
- ✅ No server required

## No Additional Packages Needed

The JSON export feature **requires only 1 package**:
- ✅ **jszip** - Already installed

Everything else is built-in:
- `XMLSerializer` - Browser native API
- `Blob` - Browser native API  
- `URL.createObjectURL()` - Browser native API
- `JSON.stringify()` - JavaScript standard library

## Source Files

### Export Button Implementation
```
src/components/SimpleExportButton.tsx
```
Contains:
- Export button UI
- Motion JSON generation
- ZIP file creation
- Download trigger

### Export Utilities
```
src/utils/exportUtils.ts        - General export functions
src/utils/lottieExport.ts       - Lottie conversion
src/utils/svgToLottieExport.ts  - SVG to Lottie
src/utils/videoExport.ts        - Video export
src/utils/frameByFrameExport.ts - Frame export
```

## Testing the Export

1. **Start the dev server**:
```bash
npm run dev
```

2. **Open the Frame Viewer**:
Navigate to the app (usually http://localhost:5173/frame-viewer.html)

3. **Click Export**:
Click the "💾 Export SVG" button

4. **Check the ZIP**:
You should receive: `autoya-success-animation-export.zip`

5. **Extract and verify**:
- `autoya-success-animation.svg` - Vector file
- `autoya-success-animation-motion.json` - Motion specification
- `README.md` - Documentation

## TypeScript Types

The export uses standard TypeScript types, no additional `@types` packages needed:

```typescript
interface MotionJSON {
  name: string;
  version: string;
  animation: {
    duration: number;
    fps: number;
    totalFrames: number;
  };
  timing: Record<string, { start: number; end: number }>;
  phases: Array<{
    name: string;
    startFrame: number;
    endFrame: number;
    duration: number;
    easing: string;
  }>;
  // ... etc
}
```

## Summary

### What You Need
✅ **jszip** - For bundling exports into ZIP files

### What's Already There
✅ Browser APIs (XMLSerializer, Blob, URL)
✅ JavaScript standard library (JSON.stringify)
✅ TypeScript types

### What's Optional
⚪ lottie-web - For Lottie export format
⚪ @ffmpeg/ffmpeg - For video export format
⚪ Other animation libraries - For data extraction

---

**Result**: The JSON motion export feature is ready to use with just the dependencies already installed in your project!





