export type HapticOptions = Record<string, string | number | boolean | undefined>;

export type HapticPatternMetadata = {
  category: string;
  options: Record<string, string | number | boolean>;
};

export type HapticLibrary = {
  play: (name: string, options?: HapticOptions) => void;
  prepare: (names: string | string[]) => void;
  stop: () => void;
  setEnabled: (enabled: boolean) => void;
  isSupported: () => boolean;
};
