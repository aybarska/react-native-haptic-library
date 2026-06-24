import type { CSSProperties } from 'react';
import type { HapticVisualization, HapticEnvelopePoint } from '@library/types';

const sampleCount = 48;

type Props = {
  activeKey: number;
  visualization: HapticVisualization;
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

function valueAt(points: readonly HapticEnvelopePoint[], time: number) {
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

export function HapticSignalPreview({ activeKey, visualization }: Props) {
  const duration = Math.max(30, visualization.durationMillis);
  const samples = Array.from({ length: sampleCount }, (_, index) => {
    const time = (index / (sampleCount - 1)) * duration;
    const value = valueAt(visualization.envelope.amplitude, time);
    return {
      value,
      color: colorFor(value),
    };
  });
  const playheadStyle =
    activeKey > 0
      ? ({
          animationDuration: `${duration}ms`,
        } satisfies CSSProperties)
      : undefined;

  return (
    <div className="signal-preview" aria-label="Haptic signal preview">
      <div className="signal-grid" />
      <div className="signal-samples">
        {samples.map((sample, index) => (
          <span
            className="signal-sample"
            key={index}
            style={{
              backgroundColor: sample.value > 0 ? sample.color : 'var(--signal-idle)',
              height: `${4 + sample.value * 104}px`,
              opacity: sample.value > 0 ? 0.58 + sample.value * 0.38 : 0.22,
            }}
          />
        ))}
      </div>
      {visualization.impacts.map((point) => (
        <span
          className="signal-impulse"
          key={`${point.time}-${point.frequency}-${point.amplitude}`}
          style={{
            backgroundColor: colorFor(point.amplitude),
            height: `${22 + clamp01(point.amplitude) * 100}px`,
            left: `${Math.min(98, Math.max(0, (point.time / duration) * 100))}%`,
            opacity: 0.82 + clamp01(point.frequency) * 0.18,
            top: `${18 + (1 - clamp01(point.amplitude)) * 48}px`,
          }}
        />
      ))}
      <div className="signal-axis" />
      {activeKey > 0 ? <div className="signal-playhead" key={activeKey} style={playheadStyle} /> : null}
    </div>
  );
}
