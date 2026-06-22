import React, { useMemo, useState } from 'react';
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
  type HapticPatternName,
} from 'react-native-haptic-library';

type PatternRow = {
  name: HapticPatternName;
  category: string;
};

type CategoryGroup = {
  name: string;
  label: string;
  patterns: PatternRow[];
};

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

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const [enabled, setEnabledState] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastPlayed, setLastPlayed] = useState<string>('None');

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

  const setEnabled = (nextEnabled: boolean) => {
    setEnabledState(nextEnabled);
    Haptics.setEnabled(nextEnabled);
  };

  const openCategory = (name: string) => {
    setQuery('');
    setSelectedCategory(name);
  };

  const closeCategory = () => {
    setQuery('');
    setSelectedCategory(null);
  };

  const prepareCategory = () => {
    if (!selectedGroup) {
      return;
    }

    Haptics.prepare(selectedGroup.patterns.map(row => row.name));
  };

  const play = (name: HapticPatternName) => {
    Haptics.play(name);
    setLastPlayed(name);
  };

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 12 },
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
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>
        <Pressable onPress={Haptics.stop} style={styles.stopButton}>
          <Text style={styles.stopButtonText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );

  if (selectedGroup) {
    return (
      <View style={[styles.screen, isDarkMode && styles.screenDark]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {renderHeader()}

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

        <FlatList
          data={visiblePatterns}
          keyExtractor={item => item.name}
          contentContainerStyle={[
            styles.patternList,
            { paddingBottom: Math.max(insets.bottom, 20) + 24 },
          ]}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => play(item.name)}
              testID={`pattern-row-${item.name}`}
              style={[styles.row, isDarkMode && styles.rowDark]}>
              <View style={styles.rowText}>
                <Text style={[styles.patternName, isDarkMode && styles.textDark]}>
                  {item.name}
                </Text>
                <Text style={[styles.patternCategory, isDarkMode && styles.mutedDark]}>
                  {item.category}
                </Text>
              </View>
              <Text style={styles.playText}>Play</Text>
            </Pressable>
          )}
        />
      </View>
    );
  }

  return (
    <View style={[styles.screen, isDarkMode && styles.screenDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderHeader()}

      <FlatList
        data={categoryGroups}
        keyExtractor={item => item.name}
        numColumns={2}
        columnWrapperStyle={styles.categoryRow}
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
        renderItem={({ item }) => {
          const preview = item.patterns
            .slice(0, 3)
            .map(pattern => pattern.name)
            .join(' / ');

          return (
            <Pressable
              onPress={() => openCategory(item.name)}
              testID={`category-card-${item.name}`}
              style={[styles.categoryCard, isDarkMode && styles.categoryCardDark]}>
              <Text
                numberOfLines={2}
                style={[styles.categoryTitle, isDarkMode && styles.textDark]}>
                {item.label}
              </Text>
              <Text style={[styles.categoryCount, isDarkMode && styles.mutedDark]}>
                {item.patterns.length} patterns
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.categoryPreview, isDarkMode && styles.mutedDark]}>
                {preview}
              </Text>
              <View style={styles.categoryFooter}>
                <Text style={styles.openText}>Open</Text>
                <Text style={styles.chevron}>&gt;</Text>
              </View>
            </Pressable>
          );
        }}
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
    padding: 14,
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
  categoryRow: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e4e7ec',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginBottom: 12,
    minHeight: 150,
    padding: 14,
  },
  categoryCardDark: {
    backgroundColor: '#1b2027',
    borderColor: '#303846',
  },
  categoryTitle: {
    color: '#101828',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  categoryCount: {
    color: '#667085',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  categoryPreview: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 10,
  },
  categoryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
    paddingTop: 12,
  },
  openText: {
    color: '#1f7a8c',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6,
  },
  chevron: {
    color: '#1f7a8c',
    fontSize: 18,
    fontWeight: '900',
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
  patternList: {
    padding: 12,
    paddingBottom: 32,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e4e7ec',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 8,
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rowDark: {
    backgroundColor: '#1b2027',
    borderColor: '#303846',
  },
  rowText: {
    flex: 1,
    paddingRight: 12,
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
  playText: {
    color: '#1f7a8c',
    fontSize: 14,
    fontWeight: '800',
  },
  textDark: {
    color: '#f2f4f7',
  },
  mutedDark: {
    color: '#a8b3c1',
  },
});

export default App;
