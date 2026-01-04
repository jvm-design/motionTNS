# Motion Autoya VS Code Extension

A powerful VS Code extension for browsing, previewing, and validating Motion Autoya animations.

## Features

### 🎨 Animation Library Browser
- Browse 569+ animation presets organized by category
- Expandable tree view with animation counts
- Quick search and filtering
- Visual organization by type (fadeIn, scaleIn, slideUp, etc.)

### 👁️ Live Animation Preview
- Preview animations in a beautiful webview panel
- See animation properties and timing
- Replay animations with one click
- Copy animation JSON to clipboard

### ✅ JSON Validation & Autocomplete
- Real-time validation of animation JSON files
- Intelligent error detection and warnings
- Autocomplete for animation properties
- Schema-based validation
- Helpful diagnostics and hints

### ⚡ Quick Actions
- Insert animation code directly into your file
- Copy animation JSON to clipboard
- Refresh library on-demand
- Keyboard shortcuts for common tasks

## Usage

### Browse Animations
1. Click the Motion Autoya icon in the activity bar
2. Expand categories to see available animations
3. Click any animation to preview it

### Preview Animation
- Click on any animation in the tree view
- Or right-click and select "Preview Animation"
- View live animation with all properties

### Insert Animation Code
- Right-click any animation
- Select "Insert Animation Code"
- Code is inserted at cursor position

### Validate JSON
- Open any animation JSON file
- Validation runs automatically
- See errors and warnings inline
- Get suggestions for improvements

## Configuration

```json
{
  "motionAutoya.libraryPath": "animation-presets.json",
  "motionAutoya.autoValidate": true,
  "motionAutoya.previewOnHover": false
}
```

## Commands

- `Motion Autoya: Refresh Animation Library` - Reload animation library
- `Motion Autoya: Search Animations` - Search for specific animations
- `Motion Autoya: Validate JSON` - Manually validate current file
- `Motion Autoya: Preview Animation` - Preview selected animation
- `Motion Autoya: Insert Animation Code` - Insert animation at cursor
- `Motion Autoya: Copy Animation JSON` - Copy to clipboard

## Animation Properties

Supported properties:
- `duration` - Animation duration in milliseconds
- `easing` - Easing function (ease-out, spring, bounce, etc.)
- `delay` - Delay before animation starts
- `spring` - Spring physics configuration
- `opacity`, `scale`, `x`, `y`, `rotate` - Transform properties
- `pathLength`, `pathOffset` - SVG path animations
- And many more!

## Requirements

- VS Code 1.80.0 or higher
- Motion Autoya project with animation-presets.json

## Installation

1. Install from VSIX file
2. Open your Motion Autoya project
3. Click the Motion Autoya icon in the activity bar
4. Start browsing animations!

## Support

For issues or feature requests, please visit the [GitHub repository](https://github.com/yourusername/motion-autoya).

---

Built with ❤️ for Motion Autoya



