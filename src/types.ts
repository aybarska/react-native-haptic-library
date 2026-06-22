export type HapticOptions = Record<string, string | number | boolean | undefined>;

export type HapticPatternMetadata = {
  category: string;
  options: Record<string, string | number | boolean>;
};

export type HapticEnvelopePoint = {
  time: number;
  value: number;
};

export type HapticImpactPoint = {
  time: number;
  amplitude: number;
  frequency: number;
};

export type HapticVisualization = {
  durationMillis: number;
  envelope: {
    amplitude: readonly HapticEnvelopePoint[];
    frequency: readonly HapticEnvelopePoint[];
  };
  impacts: readonly HapticImpactPoint[];
};

export type HapticLibrary = {
  play: (name: string, options?: HapticOptions) => void;
  prepare: (names: string | string[]) => void;
  stop: () => void;
  setEnabled: (enabled: boolean) => void;
  isSupported: () => boolean;
};
