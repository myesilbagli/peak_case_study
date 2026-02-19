const TABS = [
  { id: 'q1', label: 'Q1 – Gardenscapes' },
  { id: 'q2', label: 'Q2 – 7×7 Combo' },
  { id: 'q4', label: 'Q4 – A/B Metrics' },
];

export function MainTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 px-6 pt-4 pb-0 max-w-[900px] mx-auto border-b border-[var(--border)]">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onTabChange(id)}
          className={
            'font-sans text-base font-semibold py-2.5 px-5 rounded-lg border transition-colors ' +
            (activeTab === id
              ? 'text-[var(--accent-a)] bg-[var(--navy-light)] border-[var(--accent-a)]'
              : 'text-[var(--muted)] border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-soft)]')
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
