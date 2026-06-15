# react-native-haptic-library

A React Native haptic feedback library with a typed preset API, native iOS playback, and Android vibration mappings.

## Installation

```sh
npm install react-native-haptic-library
cd ios && pod install
```

React Native autolinking loads the iOS pod and Android Gradle library automatically. Android consumers must allow the merged `android.permission.VIBRATE` permission, which this library declares in its manifest.

## Quick Start

```ts
import { Haptics, Presets } from 'react-native-haptic-library';

Presets.success();
Presets.coinCollectSingle({ duration: 0.15 });
Haptics.play('explosionMassive', { duration: 1.8 });

Haptics.prepare(['success', 'coinCollectSingle']);
Haptics.setEnabled(true);
Haptics.stop();
```

## API

- `Haptics.play(name, options?)` plays any generated preset by name.
- `Haptics.prepare(name | name[])` preloads native resources where supported.
- `Haptics.stop()` stops active haptics and releases prepared state.
- `Haptics.setEnabled(enabled)` toggles playback.
- `Haptics.isSupported()` reports whether native haptic playback is available.
- `Presets.<patternName>(options?)` exposes generated functions for every bundled haptic preset.

## Preset Categories

- Basic Haptics - UIKit Feedback Generators
- Gaming
- Educational
- UI Interaction
- Special Effect
- Wellness
- Productivity
- Finance
- Emotional
- Intense Gamification
- Ratings & Feedback
- Tools & Writing

Use `patternNames` and `patternMetadata` to inspect the generated catalog at runtime.

## Platform Notes

### iOS

The iOS implementation routes preset names to native UIKit feedback generators and CoreHaptics patterns on iOS 13+.

### Android

Android does not expose CoreHaptics, so presets are mapped to best-effort `VibrationEffect` patterns. The engine prefers predefined system effects for basic feedback, primitive composition on Android 11+ when possible, amplitude waveforms on Android 8+, and timing waveforms as a final fallback. Device hardware variance means Android output will feel similar in intent rather than identical to iOS.
