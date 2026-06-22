let mockNative: {
  play: jest.Mock;
  prepare: jest.Mock;
  stop: jest.Mock;
  setEnabled: jest.Mock;
  isSupported: jest.Mock;
  getPatternNames: jest.Mock;
};

jest.mock('../NativeHapticLibrary', () => ({
  __esModule: true,
  default: (mockNative = {
    play: jest.fn(),
    prepare: jest.fn(),
    stop: jest.fn(),
    setEnabled: jest.fn(),
    isSupported: jest.fn(() => true),
    getPatternNames: jest.fn(() => []),
  }),
}));

import { Haptics, Presets, patternNames, patternVisualizations } from '../index';

const generatedAndroidPatterns = require('../../generated/core-haptics.patterns.json') as {
  patterns: Array<{ name: string }>;
  errors: Array<{ name: string; error: string }>;
};

const soundEffectPresets = [
  'bassDrop',
  'breath',
  'buzz',
  'dogBark',
  'flare',
  'glitch',
  'guitarStrum',
  'knock',
  'passingCar',
  'powerDown',
  'sonar',
] as const;

describe('react-native-haptic-library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('plays a named pattern with normalized options', () => {
    Haptics.play('success', { duration: 0.4 });
    expect(mockNative.play).toHaveBeenCalledWith('success', JSON.stringify({ duration: 0.4 }));
  });

  it('normalizes prepare input to an array', () => {
    Haptics.prepare('coinCollectSingle');
    expect(mockNative.prepare).toHaveBeenCalledWith(['coinCollectSingle']);
  });

  it('exports every generated preset as a callable function', () => {
    expect(patternNames.length).toBeGreaterThan(150);
    for (const name of patternNames) {
      expect(typeof Presets[name]).toBe('function');
    }
  });

  it('routes generated presets to the native module', () => {
    Presets.coinCollectSingle({ duration: 0.2 });
    expect(mockNative.play).toHaveBeenCalledWith('coinCollectSingle', JSON.stringify({ duration: 0.2 }));
  });

  it('includes the bell toll preset', () => {
    expect(patternNames).toContain('bellToll');
    Presets.bellToll();
    expect(mockNative.play).toHaveBeenCalledWith('bellToll', JSON.stringify({}));
  });

  it('includes imported sound effect presets', () => {
    for (const name of soundEffectPresets) {
      expect(patternNames).toContain(name);
      expect(typeof Presets[name]).toBe('function');
      expect(patternVisualizations[name]).toBeDefined();
    }
  });

  it('exports visualization data for every preset', () => {
    for (const name of patternNames) {
      expect(patternVisualizations[name]).toBeDefined();
      expect(patternVisualizations[name].durationMillis).toBeGreaterThan(0);
    }
  });

  it('generates Android pattern data for every CoreHaptics preset', () => {
    const basicPatterns = new Set(['selection', 'soft', 'rigid', 'light', 'medium', 'heavy', 'success', 'error', 'warning']);
    const androidPatternNames = new Set(generatedAndroidPatterns.patterns.map((pattern) => pattern.name));

    expect(generatedAndroidPatterns.errors).toEqual([]);
    for (const name of patternNames) {
      if (!basicPatterns.has(name)) {
        expect(androidPatternNames.has(name)).toBe(true);
      }
    }
  });
});
