import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { HapticVisualization } from 'react-native-haptic-library';

const WIDTH = 286;
const HEIGHT = 152;
const SAMPLE_COUNT = 44;
const VERTICAL_GRID_LINES = Array.from({ length: 11 }, (_, index) => index);
const HORIZONTAL_GRID_LINES = Array.from({ length: 6 }, (_, index) => index);

type Props = {
  activeKey: number;
  isDarkMode: boolean;
  visualization?: HapticVisualization;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function colorFor(value: number) {
  if (value >= 0.78) {
    return '#df4d3f';
  }
  if (value >= 0.48) {
    return '#f0a126';
  }
  return '#86b83f';
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

function HapticSignalPreviewComponent({ activeKey, isDarkMode, visualization }: Props) {
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
      const value = valueAt(amplitude, time);
      return {
        value,
        color: colorFor(value),
      };
    });
  }, [duration, visualization]);

  const impulseBars = useMemo(
    () =>
      (visualization?.impacts ?? []).map(point => ({
        key: `${point.time}-${point.frequency}-${point.amplitude}`,
        left: Math.min(WIDTH - 5, Math.max(0, (point.time / duration) * WIDTH)),
        color: colorFor(point.amplitude),
        height: 22 + clamp01(point.amplitude) * 100,
        top: 18 + (1 - clamp01(point.amplitude)) * 48,
        opacity: 0.82 + clamp01(point.frequency) * 0.18,
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
      {VERTICAL_GRID_LINES.map(index => (
        <View
          key={index}
          style={[
            styles.verticalGridLine,
            isDarkMode && styles.gridLineDark,
            { left: (index / 10) * WIDTH },
          ]}
        />
      ))}

      {HORIZONTAL_GRID_LINES.map(index => (
        <View
          key={index}
          style={[
            styles.horizontalGridLine,
            isDarkMode && styles.gridLineDark,
            { top: (index / 5) * HEIGHT },
          ]}
        />
      ))}

      <View style={styles.sampleRow}>
        {samples.map((sample, index) => (
          <View
            key={index}
            style={[
              styles.sample,
              {
                backgroundColor: sample.value > 0 ? sample.color : isDarkMode ? '#2d4150' : '#d8edf7',
                height: 4 + sample.value * 104,
                opacity: sample.value > 0 ? 0.58 + sample.value * 0.38 : 0.2,
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
            {
              backgroundColor: bar.color,
              height: bar.height,
              left: bar.left,
              opacity: bar.opacity,
              top: bar.top,
            },
          ]}
        />
      ))}

      <View style={styles.axisLine} />

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

export const HapticSignalPreview = React.memo(HapticSignalPreviewComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fbff',
    borderColor: '#d8edf7',
    borderRadius: 8,
    borderWidth: 1,
    height: HEIGHT,
    marginTop: 12,
    overflow: 'hidden',
    width: WIDTH,
  },
  containerDark: {
    backgroundColor: '#17212b',
    borderColor: '#2d4150',
  },
  verticalGridLine: {
    backgroundColor: '#d8edf7',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: StyleSheet.hairlineWidth,
  },
  horizontalGridLine: {
    backgroundColor: '#d8edf7',
    height: StyleSheet.hairlineWidth,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  gridLineDark: {
    backgroundColor: '#2d4150',
  },
  sampleRow: {
    alignItems: 'flex-end',
    bottom: 0,
    flexDirection: 'row',
    gap: 1,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  sample: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flex: 1,
    minHeight: 4,
  },
  impulse: {
    borderRadius: 5,
    position: 'absolute',
    width: 18,
  },
  axisLine: {
    backgroundColor: '#df4d3f',
    bottom: 0,
    height: 4,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  playhead: {
    backgroundColor: '#1f2937',
    bottom: 0,
    position: 'absolute',
    top: 0,
    width: 3,
  },
  playheadDark: {
    backgroundColor: '#f8fafc',
  },
});
