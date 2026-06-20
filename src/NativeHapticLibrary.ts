import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  play(name: string, optionsJson: string): void;
  prepare(names: string[]): void;
  stop(): void;
  setEnabled(enabled: boolean): void;
  isSupported(): boolean;
  getPatternNames(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNHapticLibrary');
