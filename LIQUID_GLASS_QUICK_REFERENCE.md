# Liquid Glass Quick Reference

Quick guide to using the Liquid Glass components in Motion Studio.

## Import Components

```tsx
import {
  // Cards
  GlassCard,
  ThinGlassCard,
  FrostedGlassCard,
  CrystalGlassCard,
  TintedGlassCard,
  LiquidGlassCard,
  
  // SVG Components
  GlassOrb,
  GlassButton,
  GlassPanel,
  GlassLogoBadge,
  GlassWave,
  
  // Modals
  GlassModal,
  FrostedModal,
  CrystalModal,
  TintedModal,
  
  // Textures
  GlassTextureSet,
  GrainTexture,
  FrostPattern,
} from '@/components/LiquidGlass';
```

## Glass Card Variants

```tsx
// Thin Glass (8px blur, 70% opacity)
<ThinGlassCard>
  <h3>Ultra Light</h3>
</ThinGlassCard>

// Regular Glass (16px blur, 50% opacity)
<GlassCard>
  <h3>Standard</h3>
</GlassCard>

// Frosted Glass (32px blur, 30% opacity)
<FrostedGlassCard>
  <h3>Heavy Blur</h3>
</FrostedGlassCard>

// Crystal Glass (12px blur, 80% opacity, refraction)
<CrystalGlassCard>
  <h3>Clear & Sharp</h3>
</CrystalGlassCard>

// Tinted Glass (20px blur, gradient tint)
<TintedGlassCard>
  <h3>Color Wash</h3>
</TintedGlassCard>

// Liquid Glass (20px blur, flowing animation)
<LiquidGlassCard>
  <h3>Animated</h3>
</LiquidGlassCard>
```

## Glass Card Props

```tsx
interface GlassCardProps {
  children: ReactNode;
  variant?: 'thin' | 'regular' | 'thick' | 'frosted' | 'crystal' | 'tinted' | 'liquid';
  className?: string;
  animated?: boolean;     // Entry animation (default: true)
  hover?: boolean;        // Hover effects (default: true)
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
}

// Example with all props
<GlassCard 
  variant="crystal"
  animated={true}
  hover={true}
  onClick={() => console.log('clicked')}
  width={300}
  height={200}
  className="custom-class"
>
  Content here
</GlassCard>
```

## Glass Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<GlassModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="medium"           // 'small' | 'medium' | 'large'
  variant="frosted"       // 'frosted' | 'crystal' | 'tinted'
>
  <p>Modal content goes here</p>
</GlassModal>

// Or use preset variants
<FrostedModal isOpen={isOpen} onClose={handleClose}>
  Content
</FrostedModal>
```

## Glass SVG Components

### Glass Orb
```tsx
<GlassOrb 
  size={200}
  variant="crystal"  // 'frosted' | 'crystal' | 'liquid' | 'iridescent'
  animate={true}
/>
```

### Glass Button
```tsx
<GlassButton 
  text="Click Me"
  onClick={() => alert('Clicked!')}
  width={200}
  height={60}
/>
```

### Glass Logo Badge
```tsx
<GlassLogoBadge 
  icon="M"      // Any single character
  size={100}
/>
```

### Glass Panel
```tsx
<GlassPanel width={500} height={300}>
  {/* SVG content */}
  <text x="250" y="150" textAnchor="middle" fill="white">
    Content
  </text>
</GlassPanel>
```

### Glass Wave
```tsx
<GlassWave 
  width={600}
  height={200}
/>
```

## Glass Textures

Add to your SVG defs:

```tsx
<svg>
  <GlassTextureSet />  {/* All textures at once */}
  
  {/* Or individual textures */}
  <defs>
    <GrainTexture id="grain" opacity={0.03} scale={1} />
    <FrostPattern id="frost" complexity={4} />
    <BubblePattern id="bubbles" size={100} density={0.05} />
    <ShimmerFilter id="shimmer" color="#ffffff" />
    <IridescentGradient id="rainbow" animated={true} />
  </defs>
  
  {/* Use in elements */}
  <rect fill="white" filter="url(#grain)" />
  <circle fill="url(#bubbles)" />
</svg>
```

## CSS Classes

Direct CSS usage (without React):

```css
/* Basic glass card */
.my-glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Frosted variant */
.glass-frosted {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(32px) saturate(150%);
  -webkit-backdrop-filter: blur(32px) saturate(150%);
}

/* Crystal variant */
.glass-crystal {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px) saturate(200%) brightness(110%);
  -webkit-backdrop-filter: blur(12px) saturate(200%) brightness(110%);
}
```

## Glass Hierarchy

Use different variants to create visual hierarchy:

```tsx
<div className="page">
  {/* Background layer */}
  <ThinGlassCard>Background content</ThinGlassCard>
  
  {/* Mid layer */}
  <GlassCard>Mid-level content</GlassCard>
  
  {/* Foreground layer */}
  <FrostedGlassCard>Important content</FrostedGlassCard>
  
  {/* Overlay */}
  <GlassModal isOpen={true}>
    Critical information
  </GlassModal>
</div>
```

## Animation Examples

### Entry Animation
```tsx
<GlassCard animated={true}>
  Animates in on mount
</GlassCard>
```

### Hover Enhancement
```tsx
<GlassCard hover={true}>
  Blur increases on hover
</GlassCard>
```

### Custom Animation
```tsx
import { motion } from 'framer-motion';

<motion.div
  className="glass-regular"
  whileHover={{
    backdropFilter: "blur(24px) saturate(200%)",
  }}
  transition={{ duration: 0.3 }}
>
  Custom hover effect
</motion.div>
```

## Performance Tips

```tsx
// ✅ Good - Animate backdrop-filter
<motion.div
  animate={{ backdropFilter: "blur(20px)" }}
/>

// ✅ Good - Use will-change before animation
<motion.div
  whileHover={{ 
    backdropFilter: "blur(24px)",
    willChange: "backdrop-filter"
  }}
/>

// ❌ Avoid - Too many glass layers
<GlassCard>
  <GlassCard>
    <GlassCard>
      {/* Max 3-4 layers */}
    </GlassCard>
  </GlassCard>
</GlassCard>

// ❌ Avoid - Extreme blur values
backdrop-filter: blur(100px); // Too much!
```

## Accessibility

```tsx
// Ensure sufficient contrast
<GlassCard>
  <h2 style={{ 
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)' // Better readability
  }}>
    Title
  </h2>
</GlassCard>

// Provide fallback for browsers without backdrop-filter
<div className="glass-card" style={{
  background: 'rgba(255,255,255,0.85)' // Fallback
}}>
  Content
</div>
```

## Dark Mode Support

Glass components automatically adapt to dark mode:

```tsx
// Light mode: white tint
// Dark mode: black tint

<GlassCard>
  Content adapts automatically
</GlassCard>
```

Override if needed:

```tsx
<GlassCard 
  style={{
    background: isDark 
      ? 'rgba(0,0,0,0.4)' 
      : 'rgba(255,255,255,0.1)'
  }}
>
  Custom dark mode
</GlassCard>
```

## Common Patterns

### Navigation Bar
```tsx
<ThinGlassCard 
  width="100%"
  height={80}
  style={{ position: 'sticky', top: 0 }}
>
  <nav>Navigation items</nav>
</ThinGlassCard>
```

### Hero Card
```tsx
<FrostedGlassCard 
  width={600}
  height={400}
  animated={true}
>
  <h1>Hero Title</h1>
  <p>Description</p>
</FrostedGlassCard>
```

### Floating Panel
```tsx
<CrystalGlassCard
  hover={true}
  style={{ 
    position: 'fixed',
    bottom: 20,
    right: 20 
  }}
>
  <button>Action</button>
</CrystalGlassCard>
```

### Info Card Grid
```tsx
<div className="grid">
  {items.map(item => (
    <GlassCard key={item.id} hover={true}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </GlassCard>
  ))}
</div>
```

## Browser Support

```jsx
// Feature detection
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)');

{supportsBackdropFilter ? (
  <GlassCard>Glass effect</GlassCard>
) : (
  <div className="solid-fallback">Solid fallback</div>
)}
```

## Troubleshooting

### Glass effect not visible
- Ensure there's content behind the glass element
- Check backdrop-filter support in browser
- Verify the background isn't solid

### Performance issues
- Reduce number of glass layers (max 3-4)
- Lower blur values
- Disable animations on low-end devices
- Use `will-change` sparingly

### Text readability poor
- Add text-shadow: `text-shadow: 0 2px 4px rgba(0,0,0,0.4)`
- Increase background opacity
- Use heavier font weight
- Add a semi-opaque background behind text

---

For complete design principles, see [LIQUID_GLASS_PRINCIPLES.md](./LIQUID_GLASS_PRINCIPLES.md)






