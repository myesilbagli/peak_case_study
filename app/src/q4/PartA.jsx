import { Card } from '../components/Card';
import { RetentionChart } from './charts/RetentionChart';
import { DAUChart } from './charts/DAUChart';
import { PartADiffChart } from './charts/PartADiffChart';
import { CohortTable } from './CohortTable';
import { partAPick, R_A, R_B } from '../data/q4Metrics';

export function PartA() {
  return (
    <>
      <Card title="Part A – Maximize DAU on day 15">
        <div className="bg-[var(--surface-soft)] rounded-lg p-3 mb-4 border-l-4 border-[var(--accent-a)] text-sm">
          <h4 className="font-semibold text-[var(--text)] mb-1">Formulas</h4>
          <p className="text-[var(--muted)] mb-1">
            <strong className="text-[var(--text-body)]">R(x) = exp(a + b·x)</strong> (x = days since install).{' '}
            <strong className="text-[var(--text-body)]">DAU(day) = 10,000 × [R(0) + R(1) + … + R(day−1)]</strong>. Day 15 is the decision point.
          </p>
        </div>
        <p className="text-[var(--muted)] text-sm mb-2">Retention (%) by day</p>
        <RetentionChart />
        <p className="text-[var(--muted)] text-sm mt-4 mb-2">DAU over time</p>
        <DAUChart />
        <p className="text-[var(--muted)] text-sm mt-4 mb-4">DAU difference per day (A - B)</p>
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
        <div className="mt-6">
          <p className="text-[var(--muted)] text-sm mb-2">Cohort tables – DAU contribution by install day (column 15 = day 15)</p>
          <div className="grid grid-cols-1 gap-6 mt-2">
            <CohortTable R={R_A} variant="A" />
            <CohortTable R={R_B} variant="B" />
          </div>
        </div>
      </Card>
    </>
  );
}
