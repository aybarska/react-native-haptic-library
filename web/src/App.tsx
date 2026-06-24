import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  Github,
  Moon,
  PackageCheck,
  Play,
  Search,
  Square,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { HapticAudioEngine } from './audio/HapticAudioEngine';
import { HapticSignalPreview } from './components/HapticSignalPreview';
import {
  categoryGroups,
  getCategoryVisual,
  patternRows,
  type CategoryGroup,
  type PatternRow,
} from './libraryData';

const installCommand = 'npm install @ayberkmogol/react-native-haptic-library';
type Theme = 'light' | 'dark';

function formatName(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (match) => match.toUpperCase());
}

function CategoryCard({ group, onOpen }: { group: CategoryGroup; onOpen: (name: string) => void }) {
  const visual = getCategoryVisual(group.name);
  const preview = group.patterns
    .slice(0, 3)
    .map((pattern) => pattern.name)
    .join(' / ');

  return (
    <button
      className="category-card"
      data-testid={`category-card-${group.name}`}
      type="button"
      onClick={() => onOpen(group.name)}
    >
      <span className="category-icon" style={{ backgroundColor: visual.color }}>
        {visual.icon}
      </span>
      <span className="category-copy">
        <span className="category-name">{group.label}</span>
        <span className="category-preview">{preview}</span>
      </span>
      <span className="category-count">{group.patterns.length}</span>
    </button>
  );
}

type PatternItemProps = {
  activeKey: number;
  audioSupported: boolean;
  item: PatternRow;
  onPlay: (item: PatternRow) => void;
};

function PatternItem({ activeKey, audioSupported, item, onPlay }: PatternItemProps) {
  return (
    <article className={`pattern-row${activeKey > 0 ? ' is-active' : ''}`} data-testid={`pattern-row-${item.name}`}>
      <div className="pattern-row-main">
        <div className="pattern-title-block">
          <h3>{formatName(item.name)}</h3>
          <p>{item.name}</p>
        </div>
        <button
          className="icon-label-button"
          disabled={!audioSupported}
          type="button"
          onClick={() => onPlay(item)}
          title={audioSupported ? `Play ${item.name}` : 'Web Audio is not available'}
        >
          <Play size={17} strokeWidth={2.4} />
          <span>Play</span>
        </button>
      </div>
      <HapticSignalPreview activeKey={activeKey} visualization={item.visualization} />
    </article>
  );
}

export function App() {
  const audioEngine = useRef(new HapticAudioEngine()).current;
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [lastPlayed, setLastPlayed] = useState('None');
  const [playback, setPlayback] = useState<{ name: string; id: number } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioSupported] = useState(() => HapticAudioEngine.isSupported());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const selectedGroup = useMemo(
    () => categoryGroups.find((group) => group.name === selectedCategory) ?? null,
    [selectedCategory]
  );

  const visiblePatterns = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const patterns = selectedGroup?.patterns ?? [];

    if (!normalized) {
      return patterns;
    }

    return patterns.filter((row) => row.name.toLowerCase().includes(normalized));
  }, [query, selectedGroup]);

  const openCategory = useCallback((name: string) => {
    setQuery('');
    setSelectedCategory(name);
  }, []);

  const closeCategory = useCallback(() => {
    audioEngine.stop();
    setQuery('');
    setSelectedCategory(null);
  }, [audioEngine]);

  const stopPlayback = useCallback(() => {
    audioEngine.stop();
    setPlayback(null);
  }, [audioEngine]);

  const playPattern = useCallback(
    async (item: PatternRow) => {
      if (!soundEnabled || !audioSupported) {
        return;
      }

      setLastPlayed(item.name);
      setPlayback((previous) => ({
        name: item.name,
        id: (previous?.id ?? 0) + 1,
      }));

      try {
        await audioEngine.play(item.name, item.visualization);
      } catch {
        audioEngine.stop();
      }
    },
    [audioEngine, audioSupported, soundEnabled]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((enabled) => {
      if (enabled) {
        audioEngine.stop();
        setPlayback(null);
      }
      return !enabled;
    });
  }, [audioEngine]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <main className="app-shell">
      <section className="top-bar">
        <div className="brand-block">
          <span className="brand-mark">
            <Volume2 size={20} strokeWidth={2.4} />
          </span>
          <div>
            <p className="eyebrow">React Native Haptic Library</p>
            <h1>Presets playground</h1>
          </div>
        </div>
        <div className="top-actions">
          <a
            className="icon-button"
            href="https://github.com/ayberkmogol/react-native-haptic-library"
            rel="noreferrer"
            target="_blank"
            title="Open GitHub repository"
          >
            <Github size={19} />
          </a>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button
            className={`icon-button${soundEnabled ? ' is-on' : ''}`}
            disabled={!audioSupported}
            type="button"
            onClick={toggleSound}
            title={
              audioSupported
                ? soundEnabled
                  ? 'Disable sound previews'
                  : 'Enable sound previews'
                : 'Web Audio is not available'
            }
          >
            {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button className="icon-button" type="button" onClick={stopPlayback} title="Stop playback">
            <Square size={18} />
          </button>
        </div>
      </section>

      <section className="summary-strip" aria-label="Library summary">
        <div className="summary-item">
          <PackageCheck size={19} />
          <span>{patternRows.length} presets</span>
        </div>
        <div className="summary-item">
          <Boxes size={19} />
          <span>{categoryGroups.length} categories</span>
        </div>
        <div className="summary-item">
          <CheckCircle2 size={19} />
          <span>{audioSupported ? 'Audio preview ready' : 'Audio unsupported'}</span>
        </div>
        <code>{installCommand}</code>
      </section>

      {selectedGroup ? (
        <section className="detail-view">
          <div className="detail-panel">
            <div className="detail-heading">
              <button
                className="icon-button"
                type="button"
                onClick={closeCategory}
                title="Back to categories"
              >
                <ArrowLeft size={19} />
              </button>
              <div>
                <p className="eyebrow">Category</p>
                <h2>{selectedGroup.label}</h2>
              </div>
              <span className="detail-count">
                {visiblePatterns.length} / {selectedGroup.patterns.length}
              </span>
            </div>

            <label className="search-box">
              <Search size={18} />
              <input
                autoComplete="off"
                placeholder="Search this category"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="detail-meta">
              <span>Last played: {lastPlayed}</span>
              <span>{soundEnabled && audioSupported ? 'Sound on' : 'Sound off'}</span>
            </div>
          </div>

          <div className="pattern-list">
            {visiblePatterns.length > 0 ? (
              visiblePatterns.map((item) => (
                <PatternItem
                  activeKey={playback?.name === item.name ? playback?.id ?? 0 : 0}
                  audioSupported={audioSupported && soundEnabled}
                  item={item}
                  key={item.name}
                  onPlay={playPattern}
                />
              ))
            ) : (
              <div className="empty-state">No presets match this search.</div>
            )}
          </div>
        </section>
      ) : (
        <section className="category-view">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore</p>
              <h2>Categories</h2>
            </div>
            <span>{categoryGroups.length} groups</span>
          </div>
          <div className="category-grid">
            {categoryGroups.map((group) => (
              <CategoryCard group={group} key={group.name} onOpen={openCategory} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
