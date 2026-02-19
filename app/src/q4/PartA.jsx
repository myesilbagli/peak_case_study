import { Card } from '../components/Card';
import { PartADiffChart } from './charts/PartADiffChart';
import { partAPick } from '../data/q4Metrics';

export function PartA() {
  return (
    <Card title="Part A – Maximize DAU on day 15">
      <p className="text-[var(--muted)] text-sm mb-4">DAU difference per day (A - B)</p>
      <PartADiffChart />
      <div
        className={
          'grid grid-cols-1 gap-2 mt-6 p-3 rounded-lg border ' +
          (partAPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Result</div>
        <div className="text-base font-semibold text-[var(--text)]">Pick: <strong>{partAPick}</strong></div>
      </div>
    </Card>
  );
}
