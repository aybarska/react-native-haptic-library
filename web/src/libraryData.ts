import { patternNames, patternMetadata, type HapticPatternName } from '@library/patterns';
import { patternVisualizations } from '@library/pattern-visualizations';
import type { HapticVisualization } from '@library/types';

export type PatternRow = {
  name: HapticPatternName;
  category: string;
  visualization: HapticVisualization;
};

export type CategoryGroup = {
  name: string;
  label: string;
  patterns: PatternRow[];
};

export type CategoryVisual = {
  icon: CategoryIconName;
  color: string;
};

export type CategoryIconName =
  | 'tap'
  | 'gamepad'
  | 'graduation'
  | 'cursor'
  | 'spark'
  | 'wave'
  | 'leaf'
  | 'checklist'
  | 'wallet'
  | 'heart'
  | 'flame'
  | 'star'
  | 'pen';

const categoryVisuals: Record<string, CategoryVisual> = {
  'Basic Haptics - UIKit Feedback Generators': { icon: 'tap', color: '#4d918d' },
  Gaming: { icon: 'gamepad', color: '#8f6376' },
  Educational: { icon: 'graduation', color: '#4f7f8f' },
  'UI Interaction': { icon: 'cursor', color: '#6f8f64' },
  'Special Effect': { icon: 'spark', color: '#b6685d' },
  'Sound Effects': { icon: 'wave', color: '#c8874f' },
  Wellness: { icon: 'leaf', color: '#7e9b68' },
  Productivity: { icon: 'checklist', color: '#6f7480' },
  Finance: { icon: 'wallet', color: '#6e8f70' },
  Emotional: { icon: 'heart', color: '#aa606e' },
  'Intense Gamification': { icon: 'flame', color: '#b8574f' },
  'Ratings & Feedback': { icon: 'star', color: '#c19a4b' },
  'Tools & Writing': { icon: 'pen', color: '#6877a7' },
};

export function getCategoryVisual(category: string): CategoryVisual {
  return categoryVisuals[category] ?? { icon: 'tap', color: '#64748b' };
}

export function getCategoryLabel(category: string) {
  return category === 'Basic Haptics - UIKit Feedback Generators' ? 'Basic Haptics' : category;
}

export const patternRows: PatternRow[] = patternNames.map((name) => ({
  name,
  category: patternMetadata[name].category,
  visualization: patternVisualizations[name],
}));

export const categoryGroups: CategoryGroup[] = Array.from(
  patternRows.reduce((groups, row) => {
    const patterns = groups.get(row.category) ?? [];
    patterns.push(row);
    groups.set(row.category, patterns);
    return groups;
  }, new Map<string, PatternRow[]>())
).map(([name, patterns]) => ({
  name,
  label: getCategoryLabel(name),
  patterns,
}));
