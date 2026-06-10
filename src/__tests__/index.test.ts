let mockNative: {
  RNHapticLibrary_play: jest.Mock;
  RNHapticLibrary_prepare: jest.Mock;
  RNHapticLibrary_stop: jest.Mock;
  RNHapticLibrary_setEnabled: jest.Mock;
  RNHapticLibrary_isSupported: jest.Mock;
  RNHapticLibrary_getPatternNames: jest.Mock;
};

jest.mock('../NativeHapticLibrary', () => ({
  __esModule: true,
  default: (mockNative = {
    RNHapticLibrary_play: jest.fn(),
    RNHapticLibrary_prepare: jest.fn(),
    RNHapticLibrary_stop: jest.fn(),
    RNHapticLibrary_setEnabled: jest.fn(),
    RNHapticLibrary_isSupported: jest.fn(() => true),
    RNHapticLibrary_getPatternNames: jest.fn(() => []),
  }),
}));

import { Haptics, Presets, patternNames } from '../index';

describe('react-native-haptic-library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('plays a named pattern with normalized options', () => {
    Haptics.play('success', { duration: 0.4 });
    expect(mockNative.RNHapticLibrary_play).toHaveBeenCalledWith('success', JSON.stringify({ duration: 0.4 }));
  });

  it('normalizes prepare input to an array', () => {
    Haptics.prepare('coinCollectSingle');
    expect(mockNative.RNHapticLibrary_prepare).toHaveBeenCalledWith(['coinCollectSingle']);
  });

  it('exports every generated preset as a callable function', () => {
    expect(patternNames.length).toBeGreaterThan(150);
    for (const name of patternNames) {
      expect(typeof Presets[name]).toBe('function');
    }
  });

  it('routes generated presets to the native module', () => {
    Presets.coinCollectSingle({ duration: 0.2 });
    expect(mockNative.RNHapticLibrary_play).toHaveBeenCalledWith('coinCollectSingle', JSON.stringify({ duration: 0.2 }));
  });
});
