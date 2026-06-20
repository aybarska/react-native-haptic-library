import Native from './NativeHapticLibrary';
import Presets from './presets';
import { normalizeOptions, patternMetadata, patternNames } from './patterns';
import type { HapticLibrary, HapticOptions } from './types';

export const Haptics: HapticLibrary = {
  play(name: string, options?: HapticOptions) {
    Native.play(name, normalizeOptions(options));
  },
  prepare(names: string | string[]) {
    Native.prepare(Array.isArray(names) ? names : [names]);
  },
  stop() {
    Native.stop();
  },
  setEnabled(enabled: boolean) {
    Native.setEnabled(enabled);
  },
  isSupported() {
    return Native.isSupported();
  },
};

export { Presets, patternMetadata, patternNames };
export type { HapticLibrary, HapticOptions } from './types';
export type { HapticPatternName } from './patterns';
export default Haptics;
