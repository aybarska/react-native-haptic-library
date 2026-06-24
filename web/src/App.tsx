import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  Code2,
  Copy,
  Github,
  Layers3,
  Moon,
  PackageCheck,
  Play,
  Search,
  Square,
  Sun,
  Waves,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { HapticAudioEngine } from './audio/HapticAudioEngine';
import { CategoryIcon } from './components/CategoryIcon';
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
type Page = 'home' | 'install';
const heroPatternName = 'bonusPoints';
const featuredPatternNames = ['success', 'lightningStrikeChain', 'fireBurst', 'paymentSuccess'];

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
        <CategoryIcon name={visual.icon} />
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

function resolvePage(): Page {
  return window.location.hash === '#/install' ? 'install' : 'home';
}

function DocsPage() {
  return (
    <section className="docs-page">
      <div className="docs-hero">
        <p className="eyebrow">Package README</p>
        <h2>@ayberkmogol/react-native-haptic-library</h2>
        <p>
          A React Native haptic feedback library with a typed preset API, native iOS playback,
          Android vibration mappings, and a browser playground for auditioning tactile signals.
        </p>
      </div>

      <div className="docs-grid">
        <article className="docs-card docs-card-wide">
          <h3>Installation</h3>
          <pre className="docs-code"><code>{`${installCommand}
cd ios && pod install`}</code></pre>
          <p>
            React Native autolinking loads the iOS pod and Android Gradle library automatically.
            Android consumers should allow the merged vibration permission declared by the package.
          </p>
        </article>

        <article className="docs-card docs-card-wide">
          <h3>Quick Start</h3>
          <pre className="docs-code"><code>{`import { Haptics, Presets } from '@ayberkmogol/react-native-haptic-library';

Presets.success();
Presets.coinCollectSingle({ duration: 0.15 });
Haptics.play('explosionMassive', { duration: 1.8 });

Haptics.prepare(['success', 'coinCollectSingle']);
Haptics.setEnabled(true);
Haptics.stop();`}</code></pre>
        </article>

        <article className="docs-card">
          <h3>API</h3>
          <ul className="docs-list">
            <li><code>Haptics.play(name, options?)</code></li>
            <li><code>Haptics.prepare(name | name[])</code></li>
            <li><code>Haptics.stop()</code></li>
            <li><code>Haptics.setEnabled(enabled)</code></li>
            <li><code>Haptics.isSupported()</code></li>
            <li><code>Presets.&lt;patternName&gt;(options?)</code></li>
          </ul>
        </article>

        <article className="docs-card">
          <h3>Platform Notes</h3>
          <p>
            iOS routes preset names to UIKit feedback generators and CoreHaptics patterns on iOS
            13+. Android uses vibration equivalents with predefined effects, primitive composition,
            amplitude waveforms, and timing waveform fallbacks depending on OS support.
          </p>
        </article>

        <article className="docs-card docs-card-wide">
          <h3>Haptic Categories</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Count</th>
                  <th>Example presets</th>
                </tr>
              </thead>
              <tbody>
                {categoryGroups.map((group) => (
                  <tr key={group.name}>
                    <td>{group.label}</td>
                    <td>{group.patterns.length}</td>
                    <td>
                      {group.patterns
                        .slice(0, 6)
                        .map((pattern) => pattern.name)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="docs-card docs-card-wide">
          <h3>Example App</h3>
          <pre className="docs-code"><code>{`npm install
npm --prefix example install

npm run example:start
npm run example:android
# or
npm run example:ios`}</code></pre>
          <p>
            The example app starts with haptic categories. Open a category to search, prepare, and
            play the presets on a real device.
          </p>
        </article>

        <article className="docs-card docs-card-wide">
          <h3>Credits</h3>
          <p>
            Many of the bundled haptic preset ideas and CoreHaptics pattern definitions were
            adapted from{' '}
            <a href="https://github.com/SwiftfulThinking/SwiftfulHaptics" rel="noreferrer" target="_blank">
              SwiftfulHaptics
            </a>{' '}
            by SwiftfulThinking, which is available under the MIT license.
          </p>
        </article>
      </div>
    </section>
  );
}

export function App() {
  const audioEngine = useRef(new HapticAudioEngine()).current;
  const [theme, setTheme] = useState<Theme>('dark');
  const [page, setPage] = useState<Page>(() => resolvePage());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [lastPlayed, setLastPlayed] = useState('None');
  const [playback, setPlayback] = useState<{ name: string; id: number } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioSupported] = useState(() => HapticAudioEngine.isSupported());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const syncPage = () => {
      setPage(resolvePage());
      setSelectedCategory(null);
      setQuery('');
    };

    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const selectedGroup = useMemo(
    () => categoryGroups.find((group) => group.name === selectedCategory) ?? null,
    [selectedCategory]
  );
  const featuredPatterns = useMemo(
    () => patternRows.filter((row) => featuredPatternNames.includes(row.name)),
    []
  );
  const heroPattern = patternRows.find((row) => row.name === heroPatternName) ?? patternRows[0];

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
      <nav className="top-bar" aria-label="Primary navigation">
        <div className="brand-block">
          <span className="brand-mark">
            <Waves size={20} strokeWidth={2.4} />
          </span>
          <div>
            <p className="eyebrow">React Native Haptic Library</p>
            <h1>HapticLab</h1>
          </div>
        </div>
        <div className="top-actions">
          <a className="nav-link" href={page === 'install' ? '#/' : '#playground'}>
            Playground
          </a>
          <a className="nav-link" href="#/install">
            Install
          </a>
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
      </nav>

      {page === 'home' ? (
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span>Native haptics</span>
            <span>Typed presets</span>
            <span>Browser audio previews</span>
          </div>
          <h2>
            Experience true <span className="hero-highlight">native haptics.</span> Ready-to-use
            presets with flawless fallbacks for older devices.
          </h2>
          <p>
            A React Native haptic feedback library with {patternRows.length} named presets,
            native iOS/CoreHaptics playback, Android vibration mappings, and a web playground
            that turns each tactile pattern into an audible signal.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#playground">
              <Play size={18} />
              Explore presets
            </a>
            <a
              className="secondary-action"
              href="https://github.com/ayberkmogol/react-native-haptic-library"
              rel="noreferrer"
              target="_blank"
            >
              <Github size={18} />
              View GitHub
            </a>
          </div>
        </div>

        <aside className="hero-console" aria-label="Interactive haptic preview">
          <div className="console-header">
            <span className="console-dot" />
            <span className="console-dot" />
            <span className="console-dot" />
            <code>haptic-preview.ts</code>
          </div>
          <div className="console-command">
            <Code2 size={18} />
            <code>{installCommand}</code>
            <button
              className="copy-button"
              type="button"
              onClick={() => void navigator.clipboard?.writeText(installCommand)}
              title="Copy install command"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="console-preview-card">
            <div>
              <span className="preview-label">Featured signal</span>
              <strong>{formatName(heroPattern.name)}</strong>
            </div>
            <button
              className="icon-label-button"
              disabled={!audioSupported || !soundEnabled}
              type="button"
              onClick={() => playPattern(heroPattern)}
            >
              <Play size={17} strokeWidth={2.4} />
              <span>Audition</span>
            </button>
          </div>
          <HapticSignalPreview
            activeKey={playback?.name === heroPattern.name ? playback?.id ?? 0 : 1}
            visualization={heroPattern.visualization}
          />
        </aside>
      </section>
      ) : null}

      {page === 'install' ? <DocsPage /> : null}

      {page === 'home' ? (
      <>
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
        <div className="summary-item">
          <Layers3 size={19} />
          <span>iOS + Android native playback</span>
        </div>
      </section>

      {selectedGroup ? (
        <section className="detail-view" id="playground">
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
        <section className="category-view" id="playground">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Preset catalog</p>
              <h2>Pick a tactile intent</h2>
            </div>
            <span>{categoryGroups.length} groups</span>
          </div>
          <div className="featured-strip" aria-label="Featured presets">
            {featuredPatterns.map((pattern) => (
              <button
                className="featured-chip"
                disabled={!audioSupported || !soundEnabled}
                key={pattern.name}
                type="button"
                onClick={() => playPattern(pattern)}
              >
                <Play size={15} />
                {formatName(pattern.name)}
              </button>
            ))}
          </div>
          <div className="category-grid">
            {categoryGroups.map((group) => (
              <CategoryCard group={group} key={group.name} onOpen={openCategory} />
            ))}
          </div>
        </section>
      )}
      </>
      ) : null}
    </main>
  );
}
