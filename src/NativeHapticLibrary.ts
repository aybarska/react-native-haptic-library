import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  RNHapticLibrary_play(name: string, optionsJson: string): void;
  RNHapticLibrary_prepare(names: string[]): void;
  RNHapticLibrary_stop(): void;
  RNHapticLibrary_setEnabled(enabled: boolean): void;
  RNHapticLibrary_isSupported(): boolean;
  RNHapticLibrary_getPatternNames(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNHapticLibrary');
