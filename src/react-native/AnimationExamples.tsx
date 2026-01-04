/**
 * React Native Animation Examples
 * 
 * Complete examples showing how to use the AnimationPlayer
 * with the animation library in React Native apps.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  AnimationPlayer,
  FadeIn,
  ScaleIn,
  SlideUp,
  LiquidGlass,
  useSpringAnimation,
  useTimingAnimation,
} from './AnimationPlayer';

const { width } = Dimensions.get('window');

// ============================================================================
// EXAMPLE 1: Button with Spring Animation
// ============================================================================

export const AnimatedButton: React.FC<{
  onPress: () => void;
  title: string;
}> = ({ onPress, title }) => {
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
        <Text style={styles.buttonText}>{title}</Text>
      </AnimationPlayer>
    </TouchableOpacity>
  );
};

// ============================================================================
// EXAMPLE 2: Modal with Scale Animation
// ============================================================================

export const AnimatedModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <TouchableOpacity 
        style={StyleSheet.absoluteFill} 
        onPress={onClose}
        activeOpacity={1}
      />
      <ScaleIn spring="default" style={styles.modalContent}>
        {children}
      </ScaleIn>
    </View>
  );
};

// ============================================================================
// EXAMPLE 3: Bottom Sheet with Slide Animation
// ============================================================================

export const BottomSheet: React.FC<{
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <View style={styles.sheetOverlay}>
      <TouchableOpacity 
        style={StyleSheet.absoluteFill} 
        onPress={onClose}
        activeOpacity={1}
      />
      <SlideUp spring="gentle" style={styles.sheetContent}>
        {children}
      </SlideUp>
    </View>
  );
};

// ============================================================================
// EXAMPLE 4: Notification with Slide Down
// ============================================================================

export const Notification: React.FC<{
  message: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info';
}> = ({ message, visible, type = 'info' }) => {
  if (!visible) return null;

  const backgroundColor = {
    success: '#34D399',
    error: '#EF4444',
    info: '#3B82F6',
  }[type];

  return (
    <AnimationPlayer preset="slideDown" spring="bouncy" style={styles.notificationContainer}>
      <View style={[styles.notification, { backgroundColor }]}>
        <Text style={styles.notificationText}>{message}</Text>
      </View>
    </AnimationPlayer>
  );
};

// ============================================================================
// EXAMPLE 5: Card with Hover Effect (using touch)
// ============================================================================

export const AnimatedCard: React.FC<{
  title: string;
  description: string;
  onPress: () => void;
}> = ({ title, description, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      activeOpacity={1}
    >
      <AnimationPlayer
        spring="default"
        custom={{
          scale: isPressed ? 1.02 : 1,
          translateY: isPressed ? -8 : 0,
        }}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </AnimationPlayer>
    </TouchableOpacity>
  );
};

// ============================================================================
// EXAMPLE 6: Staggered List Animation
// ============================================================================

export const StaggeredList: React.FC<{
  items: string[];
}> = ({ items }) => {
  return (
    <View>
      {items.map((item, index) => (
        <FadeIn
          key={index}
          duration="normal"
          delay={index * 50} // 50ms stagger (similar to stagger.normal)
          style={styles.listItem}
        >
          <Text style={styles.listItemText}>{item}</Text>
        </FadeIn>
      ))}
    </View>
  );
};

// ============================================================================
// EXAMPLE 7: Liquid Glass Hero Section
// ============================================================================

export const HeroSection: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  return (
    <LiquidGlass style={styles.hero}>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroSubtitle}>{subtitle}</Text>
    </LiquidGlass>
  );
};

// ============================================================================
// EXAMPLE 8: Custom Hook - Toggle Animation
// ============================================================================

export const ToggleSwitch: React.FC<{
  value: boolean;
  onToggle: () => void;
}> = ({ value, onToggle }) => {
  const { value: position, animate } = useSpringAnimation(0, 'stiff');

  React.useEffect(() => {
    animate(value ? 1 : 0);
  }, [value]);

  return (
    <TouchableOpacity onPress={onToggle} style={styles.toggleContainer}>
      <View style={[
        styles.toggleTrack,
        { backgroundColor: value ? '#34D399' : '#9CA3AF' }
      ]}>
        <AnimationPlayer
          spring="stiff"
          custom={{ translateX: value ? 24 : 0 }}
          style={styles.toggleThumb}
        />
      </View>
    </TouchableOpacity>
  );
};

// ============================================================================
// EXAMPLE 9: Success Animation (Camera Success Timeline)
// ============================================================================

export const SuccessAnimation: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'recognition' | 'convergence' | 'green' | 'checkmark'>('idle');

  const startAnimation = () => {
    // Use camera success timeline from library
    setPhase('recognition');
    
    setTimeout(() => setPhase('convergence'), 183);
    setTimeout(() => setPhase('green'), 300);
    setTimeout(() => setPhase('checkmark'), 533);
    setTimeout(() => {
      onComplete?.();
      setPhase('idle');
    }, 700);
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.successContainer}>
      {phase === 'idle' && (
        <FadeIn>
          <View style={styles.successCircle} />
        </FadeIn>
      )}
      
      {phase === 'convergence' && (
        <ScaleIn spring="cameraSpring">
          <View style={styles.successCircle} />
        </ScaleIn>
      )}
      
      {phase === 'green' && (
        <AnimationPlayer
          spring="bouncy"
          custom={{ scale: 1.1 }}
        >
          <View style={[styles.successCircle, styles.successGreen]} />
        </AnimationPlayer>
      )}
      
      {phase === 'checkmark' && (
        <View style={[styles.successCircle, styles.successGreen]}>
          <ScaleIn spring="stiff" delay={0}>
            <Text style={styles.checkmark}>✓</Text>
          </ScaleIn>
        </View>
      )}
    </View>
  );
};

// ============================================================================
// EXAMPLE 10: Full Demo App
// ============================================================================

export const AnimationDemoApp: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

  const listItems = [
    'Animation 1',
    'Animation 2',
    'Animation 3',
    'Animation 4',
    'Animation 5',
  ];

  return (
    <ScrollView style={styles.container}>
      <HeroSection
        title="Animation Library"
        subtitle="React Native Examples"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <AnimatedButton
          title="Show Modal"
          onPress={() => setShowModal(true)}
        />
        <AnimatedButton
          title="Show Bottom Sheet"
          onPress={() => setShowSheet(true)}
        />
        <AnimatedButton
          title="Show Notification"
          onPress={() => setShowNotification(true)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggle</Text>
        <ToggleSwitch
          value={toggleValue}
          onToggle={() => setToggleValue(!toggleValue)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cards</Text>
        <AnimatedCard
          title="Card 1"
          description="Tap to see animation"
          onPress={() => console.log('Card 1 pressed')}
        />
        <AnimatedCard
          title="Card 2"
          description="Tap to see animation"
          onPress={() => console.log('Card 2 pressed')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Staggered List</Text>
        <StaggeredList items={listItems} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Animation</Text>
        <SuccessAnimation onComplete={() => console.log('Success!')} />
      </View>

      {/* Modal */}
      <AnimatedModal visible={showModal} onClose={() => setShowModal(false)}>
        <Text style={styles.modalTitle}>Modal Title</Text>
        <Text style={styles.modalText}>This is a modal with scale animation.</Text>
        <AnimatedButton
          title="Close"
          onPress={() => setShowModal(false)}
        />
      </AnimatedModal>

      {/* Bottom Sheet */}
      <BottomSheet visible={showSheet} onClose={() => setShowSheet(false)}>
        <Text style={styles.modalTitle}>Bottom Sheet</Text>
        <Text style={styles.modalText}>This slides up from the bottom.</Text>
        <AnimatedButton
          title="Close"
          onPress={() => setShowSheet(false)}
        />
      </BottomSheet>

      {/* Notification */}
      <Notification
        message="Success! Animation complete."
        visible={showNotification}
        type="success"
      />
    </ScrollView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: width * 0.85,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1F2937',
  },
  modalText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  notificationContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1F2937',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  hero: {
    backgroundColor: 'white',
    padding: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1F2937',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
  },
  toggleContainer: {
    alignSelf: 'flex-start',
  },
  toggleTrack: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 4,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  successContainer: {
    alignItems: 'center',
    padding: 40,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successGreen: {
    backgroundColor: '#34D399',
    borderColor: '#34D399',
  },
  checkmark: {
    fontSize: 40,
    color: 'white',
    fontWeight: '700',
  },
});



