const TABS = [
  { id: 'part-a', label: 'Part A' },
  { id: 'part-b', label: 'Part B' },
  { id: 'part-c', label: 'Part C' },
  { id: 'part-d', label: 'Part D' },
];

export function Q4Tabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-1 mb-6 py-1 border-b border-[var(--border)]">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onTabChange(id)}
          className={
            'font-sans text-sm font-medium py-2 px-4 rounded-lg border transition-colors ' +
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
