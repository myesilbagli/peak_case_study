import { Card } from '../components/Card';
import { RevenueChart } from './charts/RevenueChart';
import { PartBDiffChart } from './charts/PartBDiffChart';
import { partBPick } from '../data/q4Metrics';

export function PartB() {
  return (
    <Card title="Part B – Maximize cumulative revenue by end of day 15">
      <div className="bg-[var(--surface-soft)] rounded-lg p-3 mb-4 border-l-4 border-[var(--accent-b)] text-sm">
        <p className="text-[var(--muted)]">
          <strong className="text-[var(--text-body)]">Revenue(day) = DAU(day) × $0.50</strong>. Cumulative = sum from day 1 through day 15. Decision at day 15.
        </p>
      </div>
      <p className="text-[var(--muted)] text-sm mb-2">Cumulative revenue over time</p>
      <RevenueChart />
      <p className="text-[var(--muted)] text-sm mt-4 mb-4">Cumulative revenue difference per day (A - B)</p>
      <PartBDiffChart />
      <div
        className={
          'grid grid-cols-1 gap-2 mt-6 p-3 rounded-lg border ' +
          (partBPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Result</div>
        <div className="text-base font-semibold text-[var(--text)]">Pick: <strong>{partBPick}</strong></div>
      </div>
    </Card>
  );
}
