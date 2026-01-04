# React Native Animation Guide

Complete guide for using the Motion Autoya animation library in React Native apps with `react-native-reanimated`.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install react-native-reanimated
# or
yarn add react-native-reanimated
```

### 2. Configure Babel

Add to `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // ← Add this
};
```

### 3. Copy Files

Copy these files to your project:
- `animation-library.json` → Your project root
- `src/react-native/AnimationPlayer.tsx` → Your components folder
- `src/react-native/AnimationExamples.tsx` → Your components folder

### 4. Use It!

```tsx
import { AnimationPlayer, FadeIn, ScaleIn } from './AnimationPlayer';

<FadeIn>
  <Text>Animated Text</Text>
</FadeIn>
```

## 📦 Components

### AnimationPlayer (Main Component)

Universal animation player that supports all library presets.

```tsx
<AnimationPlayer
  preset="liquidGlass"      // Use a preset variant
  spring="bouncy"           // Spring configuration
  duration="normal"         // Duration preset
  delay={100}               // Delay in ms
  onComplete={() => {}}     // Callback when done
  style={styles.container}  // Additional styles
>
  <Text>Content</Text>
</AnimationPlayer>
```

**Props:**
- `preset?: VariantPreset` - Use a library preset (fadeIn, scaleIn, liquidGlass, etc.)
- `spring?: SpringPreset` - Spring configuration (default, bouncy, stiff, etc.)
- `duration?: DurationPreset` - Duration for timing animations
- `easing?: EasingPreset` - Easing function
- `custom?: AnimatedStyleValue` - Custom animation values
- `delay?: number` - Delay before animation starts
- `onComplete?: () => void` - Callback when animation completes
- `style?: StyleProp<ViewStyle>` - Additional styles

### Pre-Built Components

#### FadeIn
```tsx
<FadeIn duration="normal" delay={0}>
  <Text>Fades in</Text>
</FadeIn>
```

#### ScaleIn
```tsx
<ScaleIn spring="bouncy" delay={0}>
  <View>
    <Text>Scales in with fade</Text>
  </View>
</ScaleIn>
```

#### SlideUp
```tsx
<SlideUp spring="gentle">
  <View>
    <Text>Slides from bottom</Text>
  </View>
</SlideUp>
```

#### LiquidGlass
```tsx
<LiquidGlass delay={0}>
  <View>
    <Text>Premium entrance effect</Text>
  </View>
</LiquidGlass>
```

## 🎯 Real-World Examples

### 1. Animated Button

```tsx
import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AnimationPlayer } from './AnimationPlayer';

const AnimatedButton = ({ onPress, title }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      activeOpacity={1}
    >
      <AnimationPlayer
        spring="bouncy"
        custom={{
          scale: isPressed ? 0.95 : 1,
          translateY: isPressed ? 0 : -2,
        }}
        style={styles.button}
      >
        <Text>{title}</Text>
      </AnimationPlayer>
    </TouchableOpacity>
  );
};
```

### 2. Modal with Scale Animation

```tsx
import { ScaleIn } from './AnimationPlayer';

const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ScaleIn spring="default">
        <View style={styles.modal}>
          {children}
        </View>
      </ScaleIn>
    </View>
  );
};
```

### 3. Bottom Sheet

```tsx
import { SlideUp } from './AnimationPlayer';

const BottomSheet = ({ visible, children }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <SlideUp spring="gentle">
        <View style={styles.sheet}>
          {children}
        </View>
      </SlideUp>
    </View>
  );
};
```

### 4. Staggered List

```tsx
import { FadeIn } from './AnimationPlayer';

const StaggeredList = ({ items }) => (
  <View>
    {items.map((item, index) => (
      <FadeIn 
        key={index} 
        delay={index * 50}  // 50ms stagger
        duration="normal"
      >
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      </FadeIn>
    ))}
  </View>
);
```

### 5. Toggle Switch

```tsx
import { useSpringAnimation } from './AnimationPlayer';

const ToggleSwitch = ({ value, onToggle }) => {
  const { value: position, animate } = useSpringAnimation(0, 'stiff');

  useEffect(() => {
    animate(value ? 1 : 0);
  }, [value]);

  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={[
        styles.track,
        { backgroundColor: value ? '#34D399' : '#9CA3AF' }
      ]}>
        <AnimationPlayer
          spring="stiff"
          custom={{ translateX: value ? 24 : 0 }}
          style={styles.thumb}
        />
      </View>
    </TouchableOpacity>
  );
};
```

### 6. Notification

```tsx
import { AnimationPlayer } from './AnimationPlayer';

const Notification = ({ message, visible, type = 'info' }) => {
  if (!visible) return null;

  return (
    <AnimationPlayer preset="slideDown" spring="bouncy">
      <View style={[styles.notification, { backgroundColor }]}>
        <Text>{message}</Text>
      </View>
    </AnimationPlayer>
  );
};
```

## 🎨 Custom Animations

### Using Custom Values

```tsx
<AnimationPlayer
  spring="bouncy"
  custom={{
    opacity: 1,
    scale: 1.1,
    translateX: 20,
    translateY: -10,
  }}
>
  <View>Custom animation</View>
</AnimationPlayer>
```

### Using Hooks

#### useSpringAnimation

```tsx
import { useSpringAnimation } from './AnimationPlayer';

const MyComponent = () => {
  const { value, animate } = useSpringAnimation(0, 'bouncy');

  const handlePress = () => {
    animate(1, () => {
      console.log('Animation complete!');
    });
  };

  // Use value in animated styles...
};
```

#### useTimingAnimation

```tsx
import { useTimingAnimation } from './AnimationPlayer';

const MyComponent = () => {
  const { value, animate } = useTimingAnimation(0, 'normal', 'default');

  const handlePress = () => {
    animate(1);
  };

  // Use value in animated styles...
};
```

## 📚 Available Presets

### Spring Presets
- `default` - Balanced (380/30/0.8)
- `bouncy` - Playful (300/20/0.8)
- `stiff` - Quick (500/35/0.5)
- `gentle` - Smooth (200/30/1.0)
- `wobbly` - Fun (250/15/1.0)
- `cameraSpring` - Camera (340/28/0.7)

### Variant Presets
- `fadeIn` - Opacity fade
- `scaleIn` - Scale + fade
- `liquidGlass` - Scale + blur (premium)
- `slideUp` - Slide from bottom
- `slideDown` - Slide from top
- `slideLeft` - Slide from right
- `slideRight` - Slide from left
- `expand` - Vertical expand
- `blurIn` - Blur fade (backdrop)

### Duration Presets
- `instant` - 100ms
- `quick` - 200ms
- `fast` - 300ms
- `normal` - 400ms
- `slow` - 600ms
- `slower` - 800ms
- `camera` - 700ms
- `premium` - 1500ms

### Easing Presets
- `default` - Apple standard
- `decelerate` - Ease out
- `accelerate` - Ease in
- `sharp` - Sharp movement
- `emphasis` - Emphasized
- `easeOutQuad` - SVG drawing

## ⚡ Performance Tips

### DO Use (Fast)
```tsx
// ✅ Transform properties
<AnimationPlayer custom={{ scale: 1.1, translateX: 20 }} />

// ✅ Opacity
<AnimationPlayer custom={{ opacity: 0.8 }} />
```

### AVOID (Slow)
```tsx
// ❌ Layout properties
<AnimationPlayer custom={{ width: 100, height: 200 }} />

// ❌ Use transform instead
<AnimationPlayer custom={{ scale: 1.2 }} /> // ✅
```

### Best Practices

1. **Use `useNativeDriver` (handled automatically)**
   - All transforms and opacity use native driver

2. **Avoid animating layout properties**
   - Use `transform` instead of `width`/`height`
   - Use `scale` instead of resizing

3. **Minimize re-renders**
   - Use `React.memo` for animated components
   - Keep animation logic outside render

4. **Test on real devices**
   - Simulator performance != real device
   - Test on low-end devices too

## ♿ Accessibility

### Respect Reduced Motion

```tsx
import { AccessibilityInfo } from 'react-native';

const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
}, []);

// Use in animations
<AnimationPlayer
  spring={reduceMotion ? undefined : 'bouncy'}
  duration={reduceMotion ? 'instant' : 'normal'}
>
  <View>Content</View>
</AnimationPlayer>
```

## 🐛 Troubleshooting

### Animation Not Working

1. **Check Reanimated setup**
   ```bash
   # Rebuild after adding babel plugin
   npx react-native start --reset-cache
   ```

2. **Check import path**
   ```tsx
   // Correct
   import { AnimationPlayer } from './AnimationPlayer';
   
   // Wrong - missing animation-library.json
   import animationLibrary from './animation-library.json';
   ```

3. **Check babel.config.js**
   ```javascript
   plugins: ['react-native-reanimated/plugin'] // Must be last!
   ```

### Performance Issues

1. **Reduce concurrent animations**
2. **Use `useNativeDriver` (automatic in our components)**
3. **Minimize re-renders with `React.memo`**
4. **Test on real devices**

### TypeScript Errors

```tsx
// If you get type errors, add type assertion
<AnimationPlayer
  preset="fadeIn"  // TypeScript knows all valid presets
  spring="bouncy"  // TypeScript knows all valid springs
>
```

## 📖 Complete Example App

See `src/react-native/AnimationExamples.tsx` for a full demo app with:
- Animated buttons
- Modals
- Bottom sheets
- Notifications
- Cards
- Toggle switches
- Staggered lists
- Success animations

## 🔗 Related Resources

- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Animation Library Guide](ANIMATION_LIBRARY_GUIDE.md)
- [Apple Motion Principles](APPLE_MOTION_PRINCIPLES.md)

---

**Questions?** Check the full examples in `src/react-native/AnimationExamples.tsx`!



