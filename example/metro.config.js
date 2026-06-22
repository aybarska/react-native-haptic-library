const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const root = path.resolve(__dirname, '..');

const config = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    extraNodeModules: {
      '@ayberkmogol/react-native-haptic-library': root,
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
