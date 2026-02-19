import { Card } from '../components/Card';
import { rev15_A, rev15_B, partBPick } from '../data/q4Metrics';

export function PartB() {
  return (
    <Card title="Part B – Maximize cumulative revenue by end of day 15">
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">What are we asking?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          By the end of day 15, which variant has made more total revenue? We care who made more cash in days 1-15 combined.
        </p>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">How do we get revenue?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Each day: Revenue = DAU that day x $0.50 (ARPDAU). Cumulative revenue by day 15 = sum of day 1 through day 15 revenue.
        </p>
      </div>
      <div
        className={
          'grid grid-cols-1 gap-3 mb-4 p-3 rounded-lg border ' +
          (partBPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Cum. revenue by day 15</div>
        <div className="font-mono text-base font-semibold">
          A: ${(rev15_A / 1000).toFixed(0)}k · B: ${(rev15_B / 1000).toFixed(0)}k
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">Pick: <strong className="text-[var(--text-body)]">{partBPick}</strong></div>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Why does B win here?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
          B has stronger retention in the first days, so in the first two weeks B has higher DAU almost every day. More people playing = more revenue. We only count revenue through day 15, so B wins.
        </p>
        <p className="text-sm font-semibold text-[var(--highlight)] mt-3">Answer: Pick B. See General Analysis for the cumulative revenue chart.</p>
      </div>
    </Card>
  );
}
