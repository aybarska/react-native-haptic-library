import Native from './NativeHapticLibrary';
import Presets from './presets';
import { normalizeOptions, patternMetadata, patternNames } from './patterns';
import type { HapticLibrary, HapticOptions } from './types';

export const Haptics: HapticLibrary = {
  play(name: string, options?: HapticOptions) {
    Native.RNHapticLibrary_play(name, normalizeOptions(options));
  },
  prepare(names: string | string[]) {
    Native.RNHapticLibrary_prepare(Array.isArray(names) ? names : [names]);
  },
  stop() {
    Native.RNHapticLibrary_stop();
  },
  setEnabled(enabled: boolean) {
    Native.RNHapticLibrary_setEnabled(enabled);
  },
  isSupported() {
    return Native.RNHapticLibrary_isSupported();
  },
};

export { Presets, patternMetadata, patternNames };
export type { HapticLibrary, HapticOptions } from './types';
export type { HapticPatternName } from './patterns';
export default Haptics;
