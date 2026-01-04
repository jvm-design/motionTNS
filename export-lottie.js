#!/usr/bin/env node

/**
 * LOTTIE JSON EXPORT - For Lottie players/previewers
 * This creates a REAL Lottie JSON that will display in Lottie preview tools
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lottie JSON format - compatible with lottie-web, iOS lottie, Android lottie
const lottieAnimation = {
  "v": "5.9.0",
  "fr": 60,
  "ip": 0,
  "op": 90,
  "w": 400,
  "h": 400,
  "nm": "Autoya Logo Success Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Center White Circle",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [100] },
            { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 48, "s": [100] },
            { "t": 69, "s": [0] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [200, 200, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [36, 36] },
              "p": { "a": 0, "k": [0, 0] }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 1, 1, 1] },
              "o": { "a": 0, "k": 100 }
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Center Circle"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Green Success Circle",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "t": 0, "s": [0] },
            { "t": 48, "s": [0] },
            { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 52, "s": [100] },
            { "t": 90, "s": [100] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [200, 200, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            { "t": 48, "s": [100, 100, 100] },
            { "i": { "x": [0.667], "y": [1] }, "o": { "x": [0.333], "y": [0] }, "t": 52, "s": [110, 110, 100] },
            { "i": { "x": [0.667], "y": [1] }, "o": { "x": [0.333], "y": [0] }, "t": 61, "s": [110, 110, 100] },
            { "t": 69, "s": [100, 100, 100] }
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [36, 36] },
              "p": { "a": 0, "k": [0, 0] }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.203, 0.827, 0.6, 1] },
              "o": { "a": 0, "k": 100 }
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Green Circle"
        }
      ],
      "ip": 48,
      "op": 90,
      "st": 0,
      "bm": 0
    },
    {
      "ddd": 0,
      "ind": 3,
      "ty": 4,
      "nm": "Checkmark",
      "sr": 1,
      "ks": {
        "o": {
          "a": 1,
          "k": [
            { "t": 0, "s": [0] },
            { "t": 69, "s": [0] },
            { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 71, "s": [100] },
            { "t": 90, "s": [100] }
          ]
        },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [200, 200, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0, 0], [0, 0], [0, 0]],
                  "o": [[0, 0], [0, 0], [0, 0]],
                  "v": [[-19, 0], [-13, 15], [19, -16]],
                  "c": false
                }
              }
            },
            {
              "ty": "tm",
              "s": { "a": 0, "k": 0 },
              "e": {
                "a": 1,
                "k": [
                  { "t": 69, "s": [0], "h": 1 },
                  { "i": { "x": [0.25], "y": [1] }, "o": { "x": [0.45], "y": [0] }, "t": 69, "s": [0] },
                  { "t": 90, "s": [100] }
                ]
              },
              "o": { "a": 0, "k": 0 },
              "m": 1
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [1, 1, 1, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 6 },
              "lc": 2,
              "lj": 2
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ],
          "nm": "Checkmark Path"
        }
      ],
      "ip": 69,
      "op": 90,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
};

// Export as Lottie JSON
const outputFile = path.join(__dirname, 'autoya-success-animation.json');

try {
  fs.writeFileSync(outputFile, JSON.stringify(lottieAnimation, null, 2), 'utf8');
  console.log('\n✅ LOTTIE JSON CREATED!\n');
  console.log('📁 File: ' + outputFile);
  console.log('📦 Size: ' + (JSON.stringify(lottieAnimation).length / 1024).toFixed(1) + 'KB\n');
  console.log('🎬 THIS FILE WILL WORK IN:');
  console.log('   ✓ LottieFiles.com (drag & drop)');
  console.log('   ✓ lottie-web player');
  console.log('   ✓ iOS Lottie library');
  console.log('   ✓ Android Lottie library');
  console.log('   ✓ Any Lottie preview tool\n');
  console.log('🌐 Test it now:');
  console.log('   1. Go to https://lottiefiles.com/preview');
  console.log('   2. Drag this file: ' + outputFile);
  console.log('   3. See the animation!\n');
  console.log('🎉 DONE!\n');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}





