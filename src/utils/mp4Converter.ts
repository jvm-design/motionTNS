/**
 * WebM to MP4 Converter using FFmpeg.wasm
 * Converts recorded WebM videos to MP4 in the browser
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let ffmpegLoaded = false;

/**
 * Load FFmpeg.wasm (only once)
 */
export const loadFFmpeg = async (): Promise<FFmpeg> => {
  if (ffmpeg && ffmpegLoaded) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  ffmpegLoaded = true;
  return ffmpeg;
};

/**
 * Convert WebM blob to MP4 blob
 */
export const convertWebMToMP4 = async (
  webmBlob: Blob,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const ffmpegInstance = await loadFFmpeg();

  // Write WebM file to FFmpeg virtual filesystem
  const inputFileName = 'input.webm';
  const outputFileName = 'output.mp4';
  
  await ffmpegInstance.writeFile(inputFileName, await fetchFile(webmBlob));

  // Convert WebM to MP4 with H.264 codec
  await ffmpegInstance.exec([
    '-i', inputFileName,
    '-c:v', 'libx264',      // H.264 video codec
    '-preset', 'fast',       // Encoding speed
    '-crf', '22',            // Quality (lower = better, 18-28 is good range)
    '-movflags', '+faststart', // Enable streaming
    outputFileName
  ]);

  // Read the output MP4 file
  const data = await ffmpegInstance.readFile(outputFileName);
  const mp4Blob = new Blob([data], { type: 'video/mp4' });

  // Clean up
  await ffmpegInstance.deleteFile(inputFileName);
  await ffmpegInstance.deleteFile(outputFileName);

  return mp4Blob;
};

/**
 * Download MP4 file
 */
export const downloadMP4File = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.mp4') ? filename : `${filename}.mp4`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Record and convert to MP4 in one go
 */
export const recordAndConvertToMP4 = async (
  webmBlob: Blob,
  filename: string,
  onProgress?: (message: string) => void
): Promise<void> => {
  try {
    onProgress?.('Loading FFmpeg...');
    await loadFFmpeg();
    
    onProgress?.('Converting WebM to MP4...');
    const mp4Blob = await convertWebMToMP4(webmBlob);
    
    onProgress?.('Downloading MP4...');
    downloadMP4File(mp4Blob, filename);
    
    onProgress?.('Done!');
  } catch (error) {
    console.error('MP4 conversion failed:', error);
    throw new Error('Failed to convert to MP4: ' + (error as Error).message);
  }
};






