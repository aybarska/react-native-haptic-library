/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock(
  'react-native-haptic-library',
  () => {
    const patternNames = ['success', 'coinCollectSingle', 'explosionMassive'];
    const patternMetadata = {
      success: { category: 'Basic', options: {} },
      coinCollectSingle: { category: 'Gaming', options: { duration: 0.15 } },
      explosionMassive: { category: 'Gaming', options: { duration: 1.8 } },
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
    };
  },
  { virtual: true }
);

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
