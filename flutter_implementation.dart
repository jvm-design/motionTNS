import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:flutter_svg/flutter_svg.dart';

/// Autoya Success Animation - PREMIUM APPLE TIMING
///
/// 🍎 Quality Over Speed - Based on Apple's actual animations:
/// - Face ID success: ~2s
/// - Apple Pay success: ~1.5s  ← We match this
/// - App install checkmark: ~1.2s
///
/// PHILOSOPHY: "Fast enough to feel responsive, slow enough to be SEEN"
///
/// PREMIUM TIMELINE (1500ms total):
/// - 0-400ms: Logo recognition (generous visibility - "What happened?")
/// - 400-750ms: VISIBLE convergence (users can SEE and FOLLOW motion)
/// - 750-800ms: Beat pause (moment to appreciate)
/// - 800-1150ms: Green transformation (smooth, satisfying)
/// - 1150-1500ms: Checkmark confirmation (clear, confident)
///
/// Premium balance: All stages are VISIBLE and FOLLOWABLE (not rushed)
///
/// SIZING:
/// - Optimized for centered camera overlay (not full-screen)
/// - Default: 160px - Perfect for camera confirmation without blocking view
/// - Animation scales proportionally (maintains aspect ratio)
/// - Original SVG is 59x61, scaled to fit `size` x `size`
/// - Recommended sizes:
///   - 120-180px → Camera overlay (visible but not intrusive) ⭐
///   - 200-300px → Larger emphasis
///   - 80-100px → Minimal notification
class AutoyaSuccessAnimation extends StatefulWidget {
  /// Width and height of the animation (square container)
  /// The SVG will scale proportionally to fit this size
  /// Default: 160 (optimized for camera overlay)
  final double size;

  /// Callback fired when animation completes (at 700ms)
  final VoidCallback? onComplete;

  const AutoyaSuccessAnimation({
    Key? key,
    this.size = 160, // Optimized for camera overlay
    this.onComplete,
  }) : super(key: key);

  @override
  State<AutoyaSuccessAnimation> createState() => _AutoyaSuccessAnimationState();
}

class _AutoyaSuccessAnimationState extends State<AutoyaSuccessAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  // Center point
  static const double centerX = 29.27;
  static const double centerY = 30.5;

  // Timing (synced with camera shutter)
  static const int totalDuration = 1500; // milliseconds - PREMIUM APPLE TIMING
  static const int syncPoint = 300; // When shutter sound ends

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: totalDuration),
    );

    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed && widget.onComplete != null) {
        widget.onComplete!();
      }
    });

    // Auto-start animation
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  /// Camera spring easing for convergence
  double _cameraSpring(double t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    // Smoothstep + micro overshoot
    final double base = t * t * (3 - 2 * t);
    final double overshoot = math.sin(t * math.pi) * 0.015;
    return math.min(1, base + overshoot * (1 - t));
  }

  /// Calculate convergence progress (frames 24-45 = 400-750ms)
  /// PREMIUM: Visible, followable motion (not rushed)
  double _getConvergenceProgress(double progress) {
    const double start = 24 / 90; // Frame 24 (after generous logo time)
    const double end = 45 / 90; // Frame 45 (visible completion)

    if (progress < start) return 0;
    if (progress > end) return 1;
    return (progress - start) / (end - start);
  }

  /// Calculate green progress (frames 48-69 = 800-1150ms)
  /// PREMIUM: Smooth, satisfying transformation
  double _getGreenProgress(double progress) {
    const double start = 48 / 90;
    const double end = 69 / 90;

    if (progress < start) return 0;
    if (progress > end) return 1;
    return (progress - start) / (end - start);
  }

  /// Calculate checkmark progress (frames 69-90 = 1150-1500ms)
  /// PREMIUM: Clear, confident confirmation
  double _getCheckProgress(double progress) {
    const double start = 69 / 90;

    if (progress < start) return 0;
    return (progress - start) / (1 - start);
  }

  /// Get shape transform for convergence animation
  Map<String, double> _getShapeTransform(
    double originalX,
    double originalY,
    int index,
    double convergenceProgress,
  ) {
    if (convergenceProgress == 0) {
      return {'x': 0, 'y': 0, 'scale': 1, 'opacity': 1};
    }

    // Stagger (2% per shape)
    final double stagger = index * 0.02;
    final double adjustedProgress =
        ((convergenceProgress - stagger) / (1 - stagger)).clamp(0.0, 1.0);

    final double eased = _cameraSpring(adjustedProgress);

    final double deltaX = (centerX - originalX) * eased;
    final double deltaY = (centerY - originalY) * eased;

    // Scale collapse
    final double scale = adjustedProgress < 0.55
        ? 1.0
        : 1.0 - ((adjustedProgress - 0.55) / 0.45) * 0.93;

    // Opacity fade
    final double opacity = adjustedProgress < 0.75
        ? 1.0
        : 1.0 - ((adjustedProgress - 0.75) / 0.25);

    return {'x': deltaX, 'y': deltaY, 'scale': scale, 'opacity': opacity};
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        final double progress = _animation.value;
        final double convergenceProgress = _getConvergenceProgress(progress);
        final double greenProgress = _getGreenProgress(progress);
        final double checkProgress = _getCheckProgress(progress);

        // Green scale pulse (1.0 → 1.10 → 1.0)
        final double greenScale = greenProgress == 0
            ? 1.0
            : greenProgress < 0.35
            ? 1.0 + (greenProgress / 0.35) * 0.10
            : 1.10 - ((greenProgress - 0.35) / 0.65) * 0.10;

        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: AutoyaPainter(
              progress: progress,
              convergenceProgress: convergenceProgress,
              greenProgress: greenProgress,
              greenScale: greenScale,
              checkProgress: checkProgress,
              getShapeTransform: _getShapeTransform,
            ),
          ),
        );
      },
    );
  }
}

class AutoyaPainter extends CustomPainter {
  final double progress;
  final double convergenceProgress;
  final double greenProgress;
  final double greenScale;
  final double checkProgress;
  final Function getShapeTransform;

  AutoyaPainter({
    required this.progress,
    required this.convergenceProgress,
    required this.greenProgress,
    required this.greenScale,
    required this.checkProgress,
    required this.getShapeTransform,
  });

  static const double centerX = 29.27;
  static const double centerY = 30.5;
  static const double radius = 5.2;

  // Shape original positions
  static const List<Map<String, double>> shapePositions = [
    {'x': 17.24, 'y': 37.80}, // Bottom-left custom
    {'x': 5.22, 'y': 30.5}, // Left circle
    {'x': 17.24, 'y': 23.07}, // Top-left custom
    {'x': 29.27, 'y': 5.09}, // Top circle
    {'x': 41.30, 'y': 23.07}, // Top-right custom
    {'x': 53.33, 'y': 30.5}, // Right circle
    {'x': 41.30, 'y': 37.80}, // Bottom-right custom
    {'x': 29.27, 'y': 55.91}, // Bottom circle
  ];

  @override
  void paint(Canvas canvas, Size size) {
    final double scale = size.width / 59;
    canvas.scale(scale);

    final Paint whitePaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;

    // Draw converging shapes (frames 0-18)
    if (convergenceProgress < 1) {
      for (int i = 0; i < shapePositions.length; i++) {
        final pos = shapePositions[i];
        final transform =
            getShapeTransform(pos['x']!, pos['y']!, i, convergenceProgress)
                as Map<String, double>;

        final double x = pos['x']! + transform['x']!;
        final double y = pos['y']! + transform['y']!;
        final double shapeScale = transform['scale']!;
        final double opacity = transform['opacity']!;

        if (opacity > 0) {
          whitePaint.color = Colors.white.withOpacity(opacity);

          canvas.save();
          canvas.translate(x, y);
          canvas.scale(shapeScale);

          // Draw circle (simplified - you'd draw full SVG paths here)
          canvas.drawCircle(Offset.zero, radius, whitePaint);

          canvas.restore();
        }
      }
    }

    // Draw center circle (always visible until green takes over)
    if (greenProgress < 0.3) {
      canvas.drawCircle(const Offset(centerX, centerY), radius, whitePaint);
    }

    // Draw green success circle (frames 21-30)
    if (greenProgress > 0) {
      final Paint greenPaint = Paint()
        ..shader =
            RadialGradient(
              colors: const [
                Color(0xFF86EFAC), // #86EFAC
                Color(0xFF34D399), // #34D399
                Color(0xFF059669), // #059669
              ],
              stops: const [0.0, 0.45, 1.0],
            ).createShader(
              Rect.fromCircle(
                center: const Offset(centerX, centerY),
                radius: radius * greenScale,
              ),
            )
        ..style = PaintingStyle.fill;

      canvas.save();
      canvas.scale(greenScale, greenScale);
      canvas.translate(centerX * (1 - greenScale), centerY * (1 - greenScale));
      canvas.drawCircle(
        const Offset(centerX, centerY),
        radius,
        greenPaint..color = greenPaint.color.withOpacity(greenProgress),
      );
      canvas.restore();
    }

    // Draw checkmark (frames 30-42)
    if (checkProgress > 0) {
      final Paint checkPaint = Paint()
        ..color = Colors.white
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.8
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;

      final Path checkPath = Path()
        ..moveTo(26.5, 30.5)
        ..lineTo(28.5, 32.8)
        ..lineTo(32, 28.5);

      final PathMetric pathMetric = checkPath.computeMetrics().first;
      final Path extractPath = pathMetric.extractPath(
        0,
        pathMetric.length * checkProgress,
      );

      canvas.drawPath(extractPath, checkPaint);
    }
  }

  @override
  bool shouldRepaint(AutoyaPainter oldDelegate) => true;
}

// ============================================
// USAGE EXAMPLE
// ============================================

class CameraScreen extends StatefulWidget {
  const CameraScreen({Key? key}) : super(key: key);

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  bool _showSuccess = false;

  void _takePicture() async {
    // 1. Play camera shutter sound (300ms duration)
    // playShutterSound(); // Your audio implementation

    // 2. Trigger haptic feedback
    HapticFeedback.mediumImpact();

    // 3. Show animation overlay (centered on camera)
    setState(() => _showSuccess = true);

    // 4. Actually take the picture
    // final image = await camera.takePicture();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Camera preview (full screen)
          Container(
            color: Colors.black,
            // CameraPreview(controller),
          ),

          // Centered success animation overlay
          if (_showSuccess)
            Center(
              child: AutoyaSuccessAnimation(
                size: 160, // Default: perfect for camera overlay
                onComplete: () {
                  setState(() => _showSuccess = false);
                  // Ready for next photo
                },
              ),
            ),

          // Camera controls
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                // Gallery button
                IconButton(
                  icon: const Icon(Icons.photo_library, color: Colors.white),
                  iconSize: 40,
                  onPressed: () {},
                ),

                // Shutter button (centered)
                GestureDetector(
                  onTap: _takePicture,
                  child: Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 4),
                    ),
                    child: Container(
                      margin: const EdgeInsets.all(6),
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),

                // Flip camera button
                IconButton(
                  icon: const Icon(Icons.flip_camera_ios, color: Colors.white),
                  iconSize: 40,
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
