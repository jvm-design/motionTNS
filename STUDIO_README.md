# 🎨 Motion Studio Studio

A minimalistic black-themed platform for creating and managing SVG animations with prompt-based modifications.

## ✨ Features

- **🖤 Minimalistic Black Design**: Clean, distraction-free interface
- **💬 Prompt-Based Creation**: Describe your animation in natural language
- **👁️ Live Preview**: See your animations in real-time
- **📜 History Tracking**: Access all previously generated animations
- **📦 Multi-Format Export**: Download in JSON, Lottie, or MP4/WebM

## 🚀 Quick Start

### Run the Studio

```bash
npm run studio
```

This will start the development server and open the studio at `http://localhost:5173/studio.html`

### Create Your First Animation

1. Type a description in the prompt input (e.g., "spinning logo", "pulsing circle")
2. Press Enter or click "Generate"
3. Watch your animation come to life in the preview area
4. Export in your desired format

## 🎯 Prompt Examples

Try these prompts to get started:

- **"spinning logo"** - Creates a rotating gradient square
- **"pulsing heart"** - Makes a beating circular shape
- **"bouncing ball"** - Generates a bouncing animation
- **"fading text"** - Creates a fade in/out effect

## 📦 Export Formats

### JSON Format
- Raw animation keyframe data
- Perfect for version control
- Small file size
- Use for data storage and manipulation

### Lottie Format
- Industry-standard animation format
- Works with Lottie players (web, iOS, Android)
- Small file size
- Widely supported

### MP4 Format
- Browser-recorded video (WebM)
- 60fps high quality
- Great for social media and presentations
- Convert to MP4 using FFmpeg if needed

## 🎨 Interface Overview

### Top Bar
- **History Toggle**: Show/hide the history sidebar
- **Current File Name**: Name of the selected animation
- **Export Buttons**: Quick access to JSON, Lottie, and MP4 exports

### History Sidebar (Left)
- View all generated animations
- Click to preview any animation
- Delete unwanted files with ×
- Shows timestamp and original prompt

### Preview Area (Center)
- Live animation preview
- Dark background for better visibility
- Shows currently selected animation

### Prompt Input (Bottom)
- Type your animation description
- Press Enter to generate
- Get instant feedback while creating

## 🔧 Advanced Usage

### Customizing Animations

The studio generates animations based on simple pattern matching:

```typescript
// Current patterns supported:
"spin" or "rotate" → Rotating animation
"pulse" or "beat" → Scaling/pulsing effect
"bounce" → Bouncing motion
Default → Fade in/out
```

### Extending the Studio

To add new animation patterns, edit `/src/components/Studio.tsx`:

```tsx
const generateAnimationFromPrompt = (prompt: string) => {
  if (prompt.includes('your-keyword')) {
    return (
      <motion.div
        animate={{ /* your animation */ }}
        transition={{ /* your config */ }}
      />
    );
  }
};
```

## 🎬 Export Workflow

1. **Create Animation**: Use prompt to generate
2. **Preview**: Check the animation in real-time
3. **Select Format**: Choose JSON, Lottie, or MP4
4. **Download**: Files automatically download to your system
5. **History**: Access anytime from the sidebar

## 📱 Using Exported Animations

### Web (React)
```tsx
import Lottie from 'lottie-react';
import animation from './animation-lottie.json';

<Lottie animationData={animation} loop={true} />
```

### Web (Vanilla JS)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.getElementById('animation'),
    path: 'animation-lottie.json',
    renderer: 'svg',
    loop: true,
    autoplay: true
  });
</script>
```

### iOS (Swift)
```swift
import Lottie
let animationView = LottieAnimationView(name: "animation-lottie")
animationView.play()
```

### Android (Kotlin)
```kotlin
val animationView = findViewById<LottieAnimationView>(R.id.animation)
animationView.setAnimation("animation-lottie.json")
animationView.playAnimation()
```

## 🎨 Design Philosophy

The studio follows a minimalistic black theme inspired by professional creative tools:

- **Black Background**: Reduces eye strain and highlights content
- **Minimal UI**: Only essential controls visible
- **Fast Workflow**: Keyboard shortcuts and instant feedback
- **Clean Typography**: Easy to read, professional appearance

## ⌨️ Keyboard Shortcuts

- **Enter**: Generate animation from prompt
- **Click Animation**: Select from history
- **ESC**: (Future) Clear prompt

## 🔄 Format Conversion

### Convert WebM to MP4
```bash
ffmpeg -i animation.webm animation.mp4
```

### High Quality MP4
```bash
ffmpeg -i animation.webm -c:v libx264 -crf 18 -preset slow animation.mp4
```

### Create GIF
```bash
ffmpeg -i animation.mp4 -vf "fps=30,scale=800:-1" animation.gif
```

## 🐛 Troubleshooting

### Animation not appearing
- Check browser console for errors
- Ensure prompt contains supported keywords
- Refresh the page and try again

### Export not working
- Check browser supports MediaRecorder API
- Safari has limited support for MP4 export
- Try JSON or Lottie export as alternative

### History not saving
- History is stored in component state (session only)
- Refresh will clear history
- Export important animations before closing

## 🚧 Roadmap

- [ ] AI-powered prompt understanding
- [ ] More animation patterns
- [ ] Custom animation editor
- [ ] Cloud storage for history
- [ ] Team collaboration features
- [ ] Animation templates library
- [ ] Advanced export settings
- [ ] Real-time collaboration

## 📚 Related Documentation

- [Export Guide](./EXPORT_GUIDE.md) - Detailed export documentation
- [Export Quick Reference](./EXPORT_QUICK_REFERENCE.md) - Quick reference
- [Usage Guide](./USAGE_GUIDE.md) - Component usage guide
- [README](./README.md) - Main project documentation

## 💡 Tips

1. **Start Simple**: Begin with basic prompts like "spin" or "pulse"
2. **Iterate Quickly**: Generate multiple versions to find the perfect animation
3. **Use History**: Keep track of variations you like
4. **Export Early**: Save important animations as you go
5. **Experiment**: Try combining keywords for unique results

## 🌟 Example Workflow

```
1. Type: "spinning logo"
2. Generate
3. Preview → Looks good!
4. Export → Lottie
5. Type: "pulsing circle"
6. Generate
7. Compare with first animation in history
8. Export best version → JSON + MP4
9. Done!
```

## 🎉 Get Started

```bash
# Install dependencies
npm install

# Run the studio
npm run studio

# Start creating!
```

Visit `http://localhost:5173/studio.html` and start creating beautiful animations! 🚀






