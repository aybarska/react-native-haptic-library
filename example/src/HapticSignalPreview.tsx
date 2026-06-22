import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { HapticVisualization } from 'react-native-haptic-library';

const WIDTH = 176;
const HEIGHT = 54;
const SAMPLE_COUNT = 30;

type Props = {
  activeKey: number;
  isDarkMode: boolean;
  visualization?: HapticVisualization;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function valueAt(points: readonly { time: number; value: number }[], time: number) {
  if (points.length === 0) {
    return 0;
  }

  if (time <= points[0]!.time) {
    return clamp01(points[0]!.value);
  }

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]!;
    const next = points[index]!;
    if (time <= next.time) {
      const progress = (time - previous.time) / Math.max(1, next.time - previous.time);
      return clamp01(previous.value + (next.value - previous.value) * progress);
    }
  }

  return clamp01(points[points.length - 1]!.value);
}

export function HapticSignalPreview({ activeKey, isDarkMode, visualization }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const duration = Math.max(30, visualization?.durationMillis ?? 120);

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);

    if (activeKey === 0) {
      return;
    }

    Animated.timing(progress, {
      duration,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [activeKey, duration, progress]);

  const samples = useMemo(() => {
    const amplitude = visualization?.envelope.amplitude ?? [];
    return Array.from({ length: SAMPLE_COUNT }, (_, index) => {
      const time = (index / (SAMPLE_COUNT - 1)) * duration;
      return valueAt(amplitude, time);
    });
  }, [duration, visualization]);

  const impulseBars = useMemo(
    () =>
      (visualization?.impacts ?? []).map(point => ({
        key: `${point.time}-${point.frequency}-${point.amplitude}`,
        left: Math.min(WIDTH - 5, Math.max(0, (point.time / duration) * WIDTH)),
        height: 10 + clamp01(point.amplitude) * 30,
        top: 6 + (1 - clamp01(point.amplitude)) * 12,
        opacity: 0.55 + clamp01(point.frequency) * 0.45,
      })),
    [duration, visualization]
  );

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, WIDTH],
  });

  return (
    <View
      accessibilityLabel="Haptic signal preview"
      style={[styles.container, isDarkMode && styles.containerDark]}>
      {[0, 1, 2, 3].map(index => (
        <View
          key={index}
          style={[
            styles.gridLine,
            isDarkMode && styles.gridLineDark,
            { left: (index / 3) * WIDTH },
          ]}
        />
      ))}

      <View style={styles.sampleRow}>
        {samples.map((sample, index) => (
          <View
            key={index}
            style={[
              styles.sample,
              isDarkMode && styles.sampleDark,
              {
                height: 3 + sample * 18,
                opacity: sample > 0 ? 0.45 + sample * 0.45 : 0.12,
              },
            ]}
          />
        ))}
      </View>

      {impulseBars.map(bar => (
        <View
          key={bar.key}
          style={[
            styles.impulse,
            isDarkMode && styles.impulseDark,
            {
              height: bar.height,
              left: bar.left,
              opacity: bar.opacity,
              top: bar.top,
            },
          ]}
        />
      ))}

      {activeKey > 0 ? (
        <Animated.View
          style={[
            styles.playhead,
            isDarkMode && styles.playheadDark,
            { transform: [{ translateX }] },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fbff',
    borderColor: '#d8edf7',
    borderRadius: 8,
    borderWidth: 1,
    height: HEIGHT,
    marginTop: 10,
    overflow: 'hidden',
    width: WIDTH,
  },
  containerDark: {
    backgroundColor: '#17212b',
    borderColor: '#2d4150',
  },
  gridLine: {
    backgroundColor: '#d8edf7',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: StyleSheet.hairlineWidth,
  },
  gridLineDark: {
    backgroundColor: '#2d4150',
  },
  sampleRow: {
    alignItems: 'flex-end',
    bottom: 6,
    flexDirection: 'row',
    gap: 2,
    left: 8,
    position: 'absolute',
    right: 8,
  },
  sample: {
    backgroundColor: '#3aa7c7',
    borderRadius: 2,
    flex: 1,
    minHeight: 3,
  },
  sampleDark: {
    backgroundColor: '#66c7df',
  },
  impulse: {
    backgroundColor: '#1f7a8c',
    borderRadius: 3,
    position: 'absolute',
    width: 5,
  },
  impulseDark: {
    backgroundColor: '#7ed6e6',
  },
  playhead: {
    backgroundColor: '#ff6b57',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: 2,
  },
  playheadDark: {
    backgroundColor: '#ff8b74',
  },
});
