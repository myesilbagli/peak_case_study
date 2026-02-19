import { useTheme } from '../theme/ThemeProvider';

export function Header() {
  const { theme, setTheme } = useTheme();

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
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={
            'font-sans text-xs font-medium py-1.5 px-2.5 rounded-md border transition-colors ' +
            (theme === 'light'
              ? 'border-[var(--accent-a)] bg-[var(--navy-light)] text-[var(--accent-a)]'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)]')
          }
          aria-label="Light mode"
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={
            'font-sans text-xs font-medium py-1.5 px-2.5 rounded-md border transition-colors ' +
            (theme === 'dark'
              ? 'border-[var(--accent-a)] bg-[var(--navy-light)] text-[var(--accent-a)]'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)]')
          }
          aria-label="Dark mode"
        >
          Dark
        </button>
      </div>
    </div>
  );
}
