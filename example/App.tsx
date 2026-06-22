import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Haptics,
  patternMetadata,
  patternNames,
  patternVisualizations,
  type HapticPatternName,
} from '@ayberkmogol/react-native-haptic-library';
import { HapticSignalPreview } from './src/HapticSignalPreview';

type PatternRow = {
  name: HapticPatternName;
  category: string;
};

type CategoryGroup = {
  name: string;
  label: string;
  patterns: PatternRow[];
};

type CategoryVisual = {
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

function categoryVisual(category: string): CategoryVisual {
  return categoryVisuals[category] ?? { icon: '•', color: '#64748b' };
}

const rows: PatternRow[] = patternNames.map(name => ({
  name,
  category: patternMetadata[name].category,
}));

const categoryGroups: CategoryGroup[] = Array.from(
  rows.reduce((groups, row) => {
    const patterns = groups.get(row.category) ?? [];
    patterns.push(row);
    groups.set(row.category, patterns);
    return groups;
  }, new Map<string, PatternRow[]>())
).map(([name, patterns]) => ({
  name,
  label:
    name === 'Basic Haptics - UIKit Feedback Generators'
      ? 'Basic Haptics'
      : name,
  patterns,
}));

type HeaderProps = {
  enabled: boolean;
  insetsTop: number;
  isDarkMode: boolean;
  onSetEnabled: (enabled: boolean) => void;
};

const AppHeader = memo(function AppHeader({
  enabled,
  insetsTop,
  isDarkMode,
  onSetEnabled,
}: HeaderProps) {
  return (
    <View
      style={[
        styles.header,
        { paddingTop: insetsTop + 12 },
        isDarkMode && styles.headerDark,
      ]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>
        Haptic Library Example
      </Text>
      <Text style={[styles.subtitle, isDarkMode && styles.mutedDark]}>
        {patternNames.length} patterns in {categoryGroups.length} categories
      </Text>
      <View style={styles.headerControls}>
        <View style={styles.toggleRow}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Enabled</Text>
          <Switch value={enabled} onValueChange={onSetEnabled} />
        </View>
        <Pressable onPress={Haptics.stop} style={styles.stopButton}>
          <Text style={styles.stopButtonText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
});

type CategoryItemProps = {
  group: CategoryGroup;
  isDarkMode: boolean;
  onOpen: (name: string) => void;
};

const CategoryItem = memo(function CategoryItem({
  group,
  isDarkMode,
  onOpen,
}: CategoryItemProps) {
  const preview = group.patterns
    .slice(0, 3)
    .map(pattern => pattern.name)
    .join(' / ');
  const visual = categoryVisual(group.name);

  return (
    <Pressable
      onPress={() => onOpen(group.name)}
      testID={`category-card-${group.name}`}
      style={[styles.categoryCard, isDarkMode && styles.categoryCardDark]}>
      <View style={[styles.categoryIcon, { backgroundColor: visual.color }]}>
        <Text style={styles.categoryIconText}>{visual.icon}</Text>
      </View>
      <View style={styles.categoryBody}>
        <View style={styles.categoryTopLine}>
          <Text
            numberOfLines={1}
            style={[styles.categoryTitle, isDarkMode && styles.textDark]}>
            {group.label}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={[styles.categoryPreview, isDarkMode && styles.mutedDark]}>
          {preview}
        </Text>
      </View>
      <View style={styles.categoryActionColumn}>
        <View style={[styles.categoryCountPill, isDarkMode && styles.categoryCountPillDark]}>
          <Text style={[styles.categoryCount, isDarkMode && styles.mutedDark]}>
            {group.patterns.length}
          </Text>
        </View>
        <View style={[styles.chevronCircle, isDarkMode && styles.chevronCircleDark]}>
          <Text style={styles.chevron}>&gt;</Text>
        </View>
      </View>
    </Pressable>
  );
});

type PatternItemProps = {
  activeKey: number;
  isDarkMode: boolean;
  item: PatternRow;
  onPlay: (name: HapticPatternName) => void;
};

const PatternItem = memo(function PatternItem({
  activeKey,
  isDarkMode,
  item,
  onPlay,
}: PatternItemProps) {
  const isActive = activeKey > 0;

  return (
    <Pressable
      onPress={() => onPlay(item.name)}
      testID={`pattern-row-${item.name}`}
      style={[
        styles.row,
        isDarkMode && styles.rowDark,
        isActive && styles.rowActive,
        isActive && isDarkMode && styles.rowActiveDark,
      ]}>
      <View style={styles.rowText}>
        <View style={styles.rowTopLine}>
          <View style={styles.rowTitleBlock}>
            <Text
              numberOfLines={1}
              style={[styles.patternName, isDarkMode && styles.textDark]}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.patternCategory, isDarkMode && styles.mutedDark]}>
              {item.category}
            </Text>
          </View>
          <View style={[styles.playButton, isActive && styles.playButtonActive]}>
            <Text style={[styles.playText, isActive && styles.playTextActive]}>
              Play
            </Text>
          </View>
        </View>
        {isActive ? (
          <HapticSignalPreview
            activeKey={activeKey}
            isDarkMode={isDarkMode}
            visualization={patternVisualizations[item.name]}
          />
        ) : null}
      </View>
    </Pressable>
  );
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const [enabled, setEnabledState] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastPlayed, setLastPlayed] = useState<string>('None');
  const [playback, setPlayback] = useState<{ name: HapticPatternName; id: number } | null>(null);

  const selectedGroup = useMemo(
    () => categoryGroups.find(group => group.name === selectedCategory) ?? null,
    [selectedCategory]
  );

  const visiblePatterns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const patterns = selectedGroup?.patterns ?? [];

    if (normalizedQuery.length === 0) {
      return patterns;
    }

    return patterns.filter(row => row.name.toLowerCase().includes(normalizedQuery));
  }, [query, selectedGroup]);

  const setEnabled = useCallback((nextEnabled: boolean) => {
    setEnabledState(nextEnabled);
    Haptics.setEnabled(nextEnabled);
  }, []);

  const openCategory = useCallback((name: string) => {
    setQuery('');
    setSelectedCategory(name);
  }, []);

  const closeCategory = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
  }, []);

  const prepareCategory = useCallback(() => {
    if (!selectedGroup) {
      return;
    }

    Haptics.prepare(selectedGroup.patterns.map(row => row.name));
  }, [selectedGroup]);

  const play = useCallback((name: HapticPatternName) => {
    Haptics.play(name);
    setLastPlayed(name);
    setPlayback(previous => ({
      name,
      id: (previous?.id ?? 0) + 1,
    }));
  }, []);

  const header = (
    <AppHeader
      enabled={enabled}
      insetsTop={insets.top}
      isDarkMode={isDarkMode}
      onSetEnabled={setEnabled}
    />
  );

  if (selectedGroup) {
    return (
      <View style={[styles.screen, isDarkMode && styles.screenDark]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <FlatList
          data={visiblePatterns}
          keyExtractor={item => item.name}
          contentContainerStyle={[
            styles.detailList,
            { paddingBottom: Math.max(insets.bottom, 20) + 24 },
          ]}
          initialNumToRender={6}
          keyboardShouldPersistTaps="handled"
          maxToRenderPerBatch={5}
          removeClippedSubviews
          updateCellsBatchingPeriod={40}
          windowSize={7}
          ListHeaderComponent={
            <>
              {header}

              <View style={[styles.detailPanel, isDarkMode && styles.panelDark]}>
                <View style={styles.detailTopBar}>
                  <Pressable
                    accessibilityLabel="Back to categories"
                    onPress={closeCategory}
                    style={[styles.iconButton, isDarkMode && styles.iconButtonDark]}>
                    <Text style={[styles.iconButtonText, isDarkMode && styles.textDark]}>
                      &lt;
                    </Text>
                  </Pressable>
                  <View style={styles.detailTitleBlock}>
                    <Text
                      numberOfLines={1}
                      style={[styles.detailTitle, isDarkMode && styles.textDark]}>
                      {selectedGroup.label}
                    </Text>
                    <Text style={[styles.detailSubtitle, isDarkMode && styles.mutedDark]}>
                      {visiblePatterns.length} / {selectedGroup.patterns.length} patterns
                    </Text>
                  </View>
                </View>

                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={setQuery}
                  placeholder="Search this category"
                  placeholderTextColor={isDarkMode ? '#8e99a8' : '#667085'}
                  style={[styles.search, isDarkMode && styles.searchDark]}
                  value={query}
                />

                <View style={styles.detailActions}>
                  <Pressable
                    onPress={prepareCategory}
                    testID="prepare-category"
                    style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Prepare category</Text>
                  </Pressable>
                  <Text
                    numberOfLines={1}
                    style={[styles.lastPlayed, isDarkMode && styles.mutedDark]}>
                    Last played: {lastPlayed}
                  </Text>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <PatternItem
              activeKey={playback?.name === item.name ? playback.id : 0}
              isDarkMode={isDarkMode}
              item={item}
              onPlay={play}
            />
          )}
        />
      </View>
    );
  }

  return (
    <View style={[styles.screen, isDarkMode && styles.screenDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {header}

      <FlatList
        data={categoryGroups}
        keyExtractor={item => item.name}
        contentContainerStyle={[
          styles.categoryGrid,
          { paddingBottom: Math.max(insets.bottom, 20) + 24 },
        ]}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
              Categories
            </Text>
            <Text style={[styles.sectionMeta, isDarkMode && styles.mutedDark]}>
              {categoryGroups.length} groups
            </Text>
          </View>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        removeClippedSubviews
        renderItem={({ item }) => (
          <CategoryItem group={item} isDarkMode={isDarkMode} onOpen={openCategory} />
        )}
        windowSize={9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  screenDark: {
    backgroundColor: '#111418',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#d0d5dd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  headerDark: {
    backgroundColor: '#1b2027',
    borderBottomColor: '#303846',
  },
  title: {
    color: '#111827',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: '#667085',
    fontSize: 14,
    marginTop: 4,
  },
  headerControls: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  toggleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginRight: 'auto',
  },
  label: {
    color: '#344054',
    fontSize: 14,
    fontWeight: '700',
  },
  stopButton: {
    alignItems: 'center',
    backgroundColor: '#e4edf2',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    minWidth: 72,
    paddingHorizontal: 12,
  },
  stopButtonText: {
    color: '#155e75',
    fontSize: 14,
    fontWeight: '800',
  },
  categoryGrid: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#101828',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionMeta: {
    color: '#667085',
    fontSize: 13,
    fontWeight: '700',
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e4e7ec',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
    minHeight: 76,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryCardDark: {
    backgroundColor: '#1b2027',
    borderColor: '#303846',
  },
  categoryIcon: {
    alignItems: 'center',
    borderRadius: 7,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  categoryIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
  },
  categoryBody: {
    flex: 1,
    minWidth: 0,
  },
  categoryTopLine: {
    justifyContent: 'center',
    minHeight: 22,
  },
  categoryTitle: {
    color: '#101828',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
  },
  categoryActionColumn: {
    alignItems: 'center',
    flexShrink: 0,
    gap: 7,
    justifyContent: 'center',
    width: 42,
  },
  categoryCountPill: {
    alignItems: 'center',
    backgroundColor: '#eef6f9',
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    minWidth: 38,
    paddingHorizontal: 8,
  },
  categoryCountPillDark: {
    backgroundColor: '#25313b',
  },
  categoryCount: {
    color: '#155e75',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 15,
  },
  categoryPreview: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 6,
  },
  chevronCircle: {
    alignItems: 'center',
    backgroundColor: '#f1f7fa',
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    width: 38,
  },
  chevronCircleDark: {
    backgroundColor: '#25313b',
  },
  chevron: {
    color: '#1f7a8c',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 18,
  },
  detailPanel: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#d0d5dd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  panelDark: {
    backgroundColor: '#1b2027',
    borderBottomColor: '#303846',
  },
  detailTopBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  iconButton: {
    alignItems: 'center',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  iconButtonDark: {
    borderColor: '#475467',
  },
  iconButtonText: {
    color: '#344054',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 26,
  },
  detailTitleBlock: {
    flex: 1,
  },
  detailTitle: {
    color: '#101828',
    fontSize: 21,
    fontWeight: '800',
  },
  detailSubtitle: {
    color: '#667085',
    fontSize: 13,
    marginTop: 3,
  },
  search: {
    backgroundColor: '#eef2f6',
    borderRadius: 8,
    color: '#101828',
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  searchDark: {
    backgroundColor: '#252c35',
    color: '#eef2f6',
  },
  detailActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#e4edf2',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  secondaryButtonText: {
    color: '#155e75',
    fontSize: 13,
    fontWeight: '800',
  },
  lastPlayed: {
    color: '#667085',
    flex: 1,
    fontSize: 13,
  },
  detailList: {
    paddingBottom: 32,
  },
  row: {
    backgroundColor: '#ffffff',
    borderColor: '#e4e7ec',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    marginHorizontal: 12,
    marginTop: 8,
    minHeight: 74,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowActive: {
    borderColor: '#b6dbe7',
  },
  rowActiveDark: {
    borderColor: '#3b7385',
  },
  rowDark: {
    backgroundColor: '#1b2027',
    borderColor: '#303846',
  },
  rowText: {
    flex: 1,
  },
  rowTopLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  rowTitleBlock: {
    flex: 1,
  },
  patternName: {
    color: '#101828',
    fontSize: 16,
    fontWeight: '700',
  },
  patternCategory: {
    color: '#667085',
    fontSize: 13,
    marginTop: 3,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: '#eef6f9',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    minWidth: 66,
    paddingHorizontal: 14,
  },
  playButtonActive: {
    backgroundColor: '#1f7a8c',
  },
  playText: {
    color: '#1f7a8c',
    fontSize: 14,
    fontWeight: '800',
  },
  playTextActive: {
    color: '#ffffff',
  },
  textDark: {
    color: '#f2f4f7',
  },
  mutedDark: {
    color: '#a8b3c1',
  },
});

export default App;
