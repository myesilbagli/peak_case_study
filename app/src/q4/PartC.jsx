import { Card } from '../components/Card';
import { PartCDiffChart } from './charts/PartCDiffChart';
import { PartCArpdauChart, PartCRevenueChart, PartCCumulativeChart } from './charts/PartCCharts';
import { partCPick } from '../data/q4Metrics';

export function PartC() {
  return (
    <Card title="Part C – ARPDAU jump to $0.70, then drop back to $0.50">
      <p className="text-[var(--muted)] text-sm mb-4">Cumulative revenue difference per day (A - B)</p>
      <PartCDiffChart />
      <div className="mt-6 mb-4">
        <p className="text-[var(--muted)] text-xs mb-3">ARPDAU schedule and revenue breakdown (days 15-25)</p>
        <div className="grid grid-cols-1 gap-4">
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
      </div>
      <div
        className={
          'grid grid-cols-1 gap-2 mt-6 p-3 rounded-lg border ' +
          (partCPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Result</div>
        <div className="text-base font-semibold text-[var(--text)]">Pick: <strong>{partCPick}</strong></div>
      </div>
    </Card>
  );
}
