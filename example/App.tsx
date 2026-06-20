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
import { SafeAreaView } from 'react-native-safe-area-context';
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

const rows: PatternRow[] = patternNames.map(name => ({
  name,
  category: patternMetadata[name].category,
}));

const categories = ['All', ...Array.from(new Set(rows.map(row => row.category)))];

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [enabled, setEnabledState] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [lastPlayed, setLastPlayed] = useState<string>('None');

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter(row => {
      const matchesCategory = category === 'All' || row.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        row.name.toLowerCase().includes(normalizedQuery) ||
        row.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const setEnabled = (nextEnabled: boolean) => {
    setEnabledState(nextEnabled);
    Haptics.setEnabled(nextEnabled);
  };

  const play = (name: HapticPatternName) => {
    Haptics.play(name);
    setLastPlayed(name);
  };

  return (
    <SafeAreaView style={[styles.screen, isDarkMode && styles.screenDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.textDark]}>
          Haptic Library Example
        </Text>
        <Text style={[styles.subtitle, isDarkMode && styles.mutedDark]}>
          {filteredRows.length} / {patternNames.length} patterns
        </Text>
      </View>

      <View style={[styles.panel, isDarkMode && styles.panelDark]}>
        <TextInput
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={setQuery}
          placeholder="Search pattern or category"
          placeholderTextColor={isDarkMode ? '#8e99a8' : '#667085'}
          style={[styles.search, isDarkMode && styles.searchDark]}
          value={query}
        />

        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const selected = item === category;
            return (
              <Pressable
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryButton,
                  selected && styles.categoryButtonSelected,
                  isDarkMode && styles.categoryButtonDark,
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                    isDarkMode && styles.textDark,
                  ]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />

        <View style={styles.toolbar}>
          <View style={styles.toggleRow}>
            <Text style={[styles.label, isDarkMode && styles.textDark]}>Enabled</Text>
            <Switch value={enabled} onValueChange={setEnabled} />
          </View>
          <Pressable
            onPress={() => Haptics.prepare(patternNames as unknown as string[])}
            style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Prepare all</Text>
          </Pressable>
          <Pressable onPress={Haptics.stop} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Stop</Text>
          </Pressable>
        </View>

        <Text style={[styles.lastPlayed, isDarkMode && styles.mutedDark]}>
          Last played: {lastPlayed}
        </Text>
      </View>

      <FlatList
        data={filteredRows}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => play(item.name)}
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
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
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
  panel: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#d0d5dd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d0d5dd',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  panelDark: {
    backgroundColor: '#1b2027',
    borderBottomColor: '#303846',
    borderTopColor: '#303846',
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
  categoryList: {
    gap: 8,
    paddingVertical: 12,
  },
  categoryButton: {
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  categoryButtonDark: {
    borderColor: '#475467',
  },
  categoryButtonSelected: {
    backgroundColor: '#1f7a8c',
    borderColor: '#1f7a8c',
  },
  categoryText: {
    color: '#344054',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  toolbar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  toggleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginRight: 'auto',
  },
  label: {
    color: '#344054',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e4edf2',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  secondaryButtonText: {
    color: '#155e75',
    fontSize: 13,
    fontWeight: '700',
  },
  lastPlayed: {
    color: '#667085',
    fontSize: 13,
    marginTop: 10,
  },
  list: {
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
