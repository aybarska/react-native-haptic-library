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
  icon: string;
  color: string;
};

const categoryVisuals: Record<string, CategoryVisual> = {
  'Basic Haptics - UIKit Feedback Generators': { icon: '•', color: '#1f7a8c' },
  Gaming: { icon: '◆', color: '#7c3aed' },
  Educational: { icon: '✓', color: '#2563eb' },
  'UI Interaction': { icon: '⌁', color: '#0891b2' },
  'Special Effect': { icon: '✦', color: '#db2777' },
  'Sound Effects': { icon: '≋', color: '#ea580c' },
  Wellness: { icon: '○', color: '#16a34a' },
  Productivity: { icon: '▣', color: '#475569' },
  Finance: { icon: '$', color: '#15803d' },
  Emotional: { icon: '♥', color: '#e11d48' },
  'Intense Gamification': { icon: '!', color: '#dc2626' },
  'Ratings & Feedback': { icon: '★', color: '#ca8a04' },
  'Tools & Writing': { icon: '✎', color: '#4f46e5' },
};

export function getCategoryVisual(category: string): CategoryVisual {
  return categoryVisuals[category] ?? { icon: '•', color: '#64748b' };
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
