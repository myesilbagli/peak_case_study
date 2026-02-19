import { Card } from '../components/Card';
import { PartBDiffChart } from './charts/PartBDiffChart';
import { partBPick } from '../data/q4Metrics';

export function PartB() {
  return (
    <Card title="Part B – Maximize cumulative revenue by end of day 15">
      <p className="text-[var(--muted)] text-sm mb-4">Cumulative revenue difference per day (A - B)</p>
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
