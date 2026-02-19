import { Card } from '../components/Card';
import { PartCArpdauChart, PartCRevenueChart, PartCCumulativeChart } from './charts/PartCCharts';
import { rev25_A_c, rev25_B_c, partCPick } from '../data/q4Metrics';

export function PartC() {
  return (
    <>
      <Card title="Part C – ARPDAU jump to $0.70, then drop back to $0.50">
        <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-2">What is different?</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            From day 16 we earn $0.70 per active user; then ARPDAU drops by $0.02 each day to $0.52 by day 25. Day 26 onward: $0.50. Which variant has more total revenue from day 1 through day 25?
          </p>
        </div>
      </Card>
      <Card title="Part C – ARPDAU and revenue (your values)">
        <p className="text-[var(--muted)] text-sm mb-2">
          Top: ARPDAU day 15 to 25. Middle: Daily revenue. Bottom: Cumulative revenue (day 15-25 window).
        </p>
        <div className="grid grid-cols-1 gap-4 mt-2">
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">ARPDAU ($) — day 15 to 25</p>
            <PartCArpdauChart />
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Daily revenue ($) — day 15 to 25</p>
            <PartCRevenueChart />
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Cumulative revenue ($) — day 15 to 25</p>
            <PartCCumulativeChart />
          </div>
        </div>
        <div
          className={
            'grid grid-cols-1 gap-3 my-4 p-3 rounded-lg border ' +
            (partCPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
          }
        >
          <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Cum. revenue day 1-25</div>
          <div className="font-mono text-base font-semibold">
            A: ${(rev25_A_c / 1000).toFixed(0)}k · B: ${(rev25_B_c / 1000).toFixed(0)}k
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">Pick: <strong className="text-[var(--text-body)]">{partCPick}</strong></div>
        </div>
        <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Why does A win?</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
            The extra $0.70 is earned on every active user on those days. A has more DAU in day 15-25, so A gets a bigger revenue bump. Total revenue day 1-25 is higher for A.
          </p>
          <p className="text-sm font-semibold text-[var(--highlight)] mt-3">Answer: Pick A.</p>
        </div>
      </Card>
    </>
  );
}
