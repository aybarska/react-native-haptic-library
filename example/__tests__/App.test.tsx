/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.useFakeTimers();

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

afterEach(() => {
  ReactTestRenderer.act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.clearAllMocks();
});

jest.mock(
  '@ayberkmogol/react-native-haptic-library',
  () => {
    const patternNames = ['success', 'coinCollectSingle', 'explosionMassive'];
    const patternMetadata = {
      success: { category: 'Basic', options: {} },
      coinCollectSingle: { category: 'Gaming', options: { duration: 0.15 } },
      explosionMassive: { category: 'Gaming', options: { duration: 1.8 } },
    };
    const visualization = {
      durationMillis: 160,
      envelope: { amplitude: [], frequency: [] },
      impacts: [{ time: 0, amplitude: 0.7, frequency: 0.8 }],
    };

    return {
      Haptics: {
        play: jest.fn(),
        prepare: jest.fn(),
        stop: jest.fn(),
        setEnabled: jest.fn(),
        isSupported: jest.fn(() => true),
      },
      patternNames,
      patternMetadata,
      patternVisualizations: {
        success: visualization,
        coinCollectSingle: visualization,
        explosionMassive: visualization,
      },
    };
  },
  { virtual: true }
);

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('opens a category before showing its patterns', async () => {
  const { Haptics } = require('@ayberkmogol/react-native-haptic-library');
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  expect(renderer!.root.findByProps({ testID: 'category-card-Gaming' })).toBeTruthy();
  expect(() =>
    renderer!.root.findByProps({ testID: 'pattern-row-coinCollectSingle' })
  ).toThrow();

  await ReactTestRenderer.act(() => {
    renderer!.root
      .findByProps({ testID: 'category-card-Gaming' })
      .props.onPress();
  });

  const patternRow = renderer!.root.findByProps({
    testID: 'pattern-row-coinCollectSingle',
  });

  await ReactTestRenderer.act(() => {
    renderer!.root.findByProps({ testID: 'prepare-category' }).props.onPress();
  });

  await ReactTestRenderer.act(() => {
    patternRow.props.onPress();
  });

  expect(Haptics.prepare).toHaveBeenCalledWith([
    'coinCollectSingle',
    'explosionMassive',
  ]);
  expect(Haptics.play).toHaveBeenCalledWith('coinCollectSingle');
});
