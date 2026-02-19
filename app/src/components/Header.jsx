import { useTheme } from '../theme/ThemeProvider';

export function Header() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="fixed top-0 right-0 py-3 px-5 text-center z-[100] bg-gradient-to-l from-[var(--bg)] to-transparent">
      <img
        src={`${import.meta.env.BASE_URL}peak header.png`}
        alt="Peak"
        className="block max-h-9 w-auto mx-auto mb-3 object-contain"
      />
      <span className="font-semibold text-[var(--text)] text-sm block">
        Muhyiddin <span className="header-name-accent">Yesilbagli</span>
      </span>
      <span className="text-xs text-[var(--muted)] block mt-1.5">February 2026</span>
      <div className="mt-2.5 flex items-center justify-center gap-2">
        <span
          className={`font-sans text-xs font-medium transition-colors ${isLight ? 'text-[var(--accent-a)]' : 'text-[var(--muted)]'}`}
        >
          Light
        </span>
        <button
          type="button"
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          className="theme-toggle-track relative w-12 h-6 rounded-full bg-[var(--navy-light)] border border-[var(--border)] cursor-pointer transition-colors hover:border-[var(--accent-a)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-a)] focus-visible:ring-offset-2"
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-pressed={!isLight}
        >
          <span
            className="theme-toggle-thumb absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-out"
            style={{ transform: isLight ? 'translateX(0)' : 'translateX(1.5rem)' }}
          />
        </button>
        <span
          className={`font-sans text-xs font-medium transition-colors ${!isLight ? 'text-[var(--accent-a)]' : 'text-[var(--muted)]'}`}
        >
          Dark
        </span>
      </div>
    </div>
  );
}
