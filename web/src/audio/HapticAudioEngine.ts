import type { HapticVisualization, HapticEnvelopePoint } from '@library/types';

type WebAudioHost = typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
  OfflineAudioContext?: typeof OfflineAudioContext;
};

type RenderedPreview = {
  buffer: AudioBuffer;
  durationMillis: number;
};

type AudioHit = {
  startMillis: number;
  durationMillis: number;
  amplitude: number;
  frequency: number;
};

const DEFAULT_SAMPLE_RATE = 44_100;
const TAIL_MILLIS = 70;
const CONTINUOUS_SLICE_MILLIS = 34;
const MIN_HIT_MILLIS = 18;
const MAX_HIT_MILLIS = 76;
const MASTER_VOLUME = 0.72;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function sampleCurve(points: readonly HapticEnvelopePoint[], time: number) {
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
      return clamp01(lerp(previous.value, next.value, progress));
    }
  }

  return clamp01(points[points.length - 1]!.value);
}

function toFrequencyHertz(value: number) {
  return lerp(95, 310, clamp01(value));
}

function toHitDurationMillis(amplitude: number, frequency: number) {
  const weighted = clamp01(amplitude * 0.7 + frequency * 0.3);
  return lerp(MIN_HIT_MILLIS, MAX_HIT_MILLIS, weighted);
}

function createDiscreteHits(visualization: HapticVisualization): AudioHit[] {
  return visualization.impacts.map((point) => ({
    startMillis: point.time,
    durationMillis: toHitDurationMillis(point.amplitude, point.frequency),
    amplitude: clamp01(point.amplitude),
    frequency: clamp01(point.frequency),
  }));
}

function createContinuousHits(visualization: HapticVisualization): AudioHit[] {
  const amplitudePoints = visualization.envelope.amplitude;
  const frequencyPoints = visualization.envelope.frequency;

  if (amplitudePoints.length === 0) {
    return [];
  }

  const hits: AudioHit[] = [];
  for (let cursor = 0; cursor < visualization.durationMillis; cursor += CONTINUOUS_SLICE_MILLIS) {
    const amplitude = sampleCurve(amplitudePoints, cursor);
    if (amplitude <= 0.03) {
      continue;
    }

    const frequency = frequencyPoints.length > 0 ? sampleCurve(frequencyPoints, cursor) : 0.5;
    const densityGap = lerp(28, 7, frequency);
    const durationMillis = Math.min(
      CONTINUOUS_SLICE_MILLIS - densityGap,
      toHitDurationMillis(amplitude, frequency)
    );

    if (durationMillis > 6) {
      hits.push({
        startMillis: cursor,
        durationMillis,
        amplitude,
        frequency,
      });
    }
  }

  return hits;
}

function collectHits(visualization: HapticVisualization) {
  return [...createDiscreteHits(visualization), ...createContinuousHits(visualization)].sort(
    (left, right) => left.startMillis - right.startMillis
  );
}

export class HapticAudioEngine {
  private context: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private readonly cache = new Map<string, RenderedPreview>();

  public static isSupported() {
    const audioHost = globalThis as WebAudioHost;
    return Boolean(
      typeof globalThis !== 'undefined' &&
        (audioHost.AudioContext || audioHost.webkitAudioContext) &&
        audioHost.OfflineAudioContext
    );
  }

  public stop() {
    if (!this.currentSource) {
      return false;
    }

    this.currentSource.stop();
    this.currentSource.disconnect();
    this.currentSource = null;
    return true;
  }

  public async play(name: string, visualization: HapticVisualization) {
    if (!HapticAudioEngine.isSupported()) {
      return false;
    }

    const rendered = await this.getRenderedPreview(name, visualization);
    if (!rendered) {
      return false;
    }

    const context = await this.ensureContext();
    this.stop();

    const source = context.createBufferSource();
    source.buffer = rendered.buffer;
    source.connect(context.destination);
    source.onended = () => {
      if (this.currentSource === source) {
        this.currentSource = null;
      }
    };
    source.start();
    this.currentSource = source;

    return true;
  }

  private async ensureContext() {
    if (this.context) {
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }
      return this.context;
    }

    const audioHost = globalThis as WebAudioHost;
    const AudioContextConstructor = audioHost.AudioContext ?? audioHost.webkitAudioContext;
    if (!AudioContextConstructor) {
      throw new Error('Web Audio is not available.');
    }

    this.context = new AudioContextConstructor();
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }

    return this.context;
  }

  private async getRenderedPreview(name: string, visualization: HapticVisualization) {
    const cached = this.cache.get(name);
    if (cached) {
      return cached;
    }

    const rendered = await this.renderPreview(visualization);
    if (rendered) {
      this.cache.set(name, rendered);
    }

    return rendered;
  }

  private async renderPreview(visualization: HapticVisualization): Promise<RenderedPreview | null> {
    const audioHost = globalThis as WebAudioHost;
    const OfflineAudioContextConstructor = audioHost.OfflineAudioContext;
    if (!OfflineAudioContextConstructor) {
      return null;
    }

    const hits = collectHits(visualization);
    if (hits.length === 0) {
      return null;
    }

    const liveSampleRate = this.context?.sampleRate ?? DEFAULT_SAMPLE_RATE;
    const durationMillis = visualization.durationMillis + TAIL_MILLIS;
    const frameCount = Math.max(1, Math.ceil((durationMillis / 1000) * liveSampleRate));
    const offline = new OfflineAudioContextConstructor(1, frameCount, liveSampleRate);

    const master = offline.createGain();
    master.gain.value = MASTER_VOLUME;
    master.connect(offline.destination);

    const bodyFilter = offline.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(860, 0);
    bodyFilter.Q.setValueAtTime(1.05, 0);
    bodyFilter.connect(master);

    for (const hit of hits) {
      this.renderHit(offline, bodyFilter, hit);
    }

    return {
      buffer: await offline.startRendering(),
      durationMillis,
    };
  }

  private renderHit(context: OfflineAudioContext, target: AudioNode, hit: AudioHit) {
    const startTime = hit.startMillis / 1000;
    const endTime = (hit.startMillis + hit.durationMillis) / 1000;
    const baseFrequency = toFrequencyHertz(hit.frequency);
    const gain = context.createGain();
    const attack = Math.min(0.004, Math.max(0.001, hit.durationMillis / 5000));
    const release = Math.min(0.036, Math.max(0.006, hit.durationMillis / 1800));
    const peak = lerp(0.1, 0.62, hit.amplitude);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peak, startTime + attack);
    gain.gain.setValueAtTime(peak, Math.max(startTime + attack, endTime - release));
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);
    gain.connect(target);

    const partials = [
      { ratio: 1, volume: 1 },
      { ratio: 1.58, volume: 0.32 },
      { ratio: 0.48, volume: 0.38 },
    ];

    for (const partial of partials) {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(baseFrequency * partial.ratio * 1.8, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        baseFrequency * partial.ratio,
        Math.min(endTime, startTime + 0.035)
      );

      const partialGain = context.createGain();
      partialGain.gain.value = partial.volume;
      oscillator.connect(partialGain);
      partialGain.connect(gain);
      oscillator.start(startTime);
      oscillator.stop(endTime);
    }
  }
}
