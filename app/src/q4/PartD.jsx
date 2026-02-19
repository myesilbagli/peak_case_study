import { Card } from '../components/Card';
import { rev28_A_d, rev28_B_d, partDPick } from '../data/q4Metrics';

export function PartD() {
  return (
    <Card title="Part D – New install source from day 15 (3k new + 7k old)">
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">What's different here?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
          We still have <strong className="text-[var(--text-body)]">10,000 installs per day</strong>.
          But from day 15 on, those 10k are split:
        </p>
        <ul className="list-disc pl-5 text-sm text-[var(--muted)] space-y-1 mb-2">
          <li>
            <strong className="text-[var(--text-body)]">7,000</strong> from the same source as before
            (same retention curves we've been using).
          </li>
          <li>
            <strong className="text-[var(--text-body)]">3,000</strong> from a{' '}
            <strong className="text-[var(--text-body)]">new</strong> marketing source (e.g. a new ad
            channel).
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          The new source has <strong className="text-[var(--text-body)]">different retention</strong>{' '}
          for A vs B. For the 3k new users, A keeps them a bit longer than B (the math is given in
          the case). ARPDAU is still $0.50. The question: which variant has{' '}
          <strong className="text-[var(--text-body)]">more total revenue from day 1 through day 28</strong>?
        </p>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">How we calculate it</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
          For each day we compute DAU the same way, but:
        </p>
        <ul className="list-disc pl-5 text-sm text-[var(--muted)] space-y-1 mb-2">
          <li>
            Users who installed <strong className="text-[var(--text-body)]">before day 15</strong> →
            still 10k per day with the original retention.
          </li>
          <li>
            Users who installed <strong className="text-[var(--text-body)]">on day 15 or later</strong>{' '}
            → 7k follow the old retention curve, 3k follow the new-source retention curve (different
            for A and B).
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          Then we multiply each day's DAU by $0.50 and add everything up through day 28.
        </p>
      </div>
      <div
        className={
          'grid grid-cols-1 gap-3 mb-4 p-3 rounded-lg border ' +
          (partDPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
          Cum. revenue day 1–28
        </div>
        <div className="font-mono text-base font-semibold">
          A: ${(rev28_A_d / 1000).toFixed(0)}k · B: ${(rev28_B_d / 1000).toFixed(0)}k
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">
          Pick: <strong className="text-[var(--text-body)]">{partDPick}</strong>
        </div>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Why does A win?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
          For the <strong className="text-[var(--text-body)]">3,000 new-source users each day</strong>, variant A's
          retention drops more slowly than B's. So those 3k users contribute more DAU (and thus more
          revenue) over time for A. The 7k old-source users behave as before; the difference comes
          from how long we keep the 3k new users. A keeps them longer → more revenue by day 28.
        </p>
        <p className="text-sm font-semibold text-[var(--highlight)] mt-3">
          Answer: Pick <strong>A</strong>.
        </p>
      </div>
    </Card>
  );
}
