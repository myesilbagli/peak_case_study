export function Card({ title, children, className = '' }) {
  return (
    <div
      className={
        'rounded-xl border p-5 mb-5 bg-[var(--surface)] border-[var(--border)] shadow-[0_1px_3px_rgba(26,35,126,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] ' +
        className
      }
    >
      {title && (
        <h2 className="text-[0.85rem] font-semibold uppercase tracking-widest text-[var(--text)] mb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
