import { Card } from '../components/Card';
import { RetentionChart } from './charts/RetentionChart';
import { DAUChart } from './charts/DAUChart';
import { RevenueChart } from './charts/RevenueChart';
import { CohortTable } from './CohortTable';
import { R_A, R_B } from '../data/q4Metrics';

export function GeneralAnalysis() {
  return (
    <>
      <Card title="Retention (%) by day">
        <p className="text-[var(--muted)] text-sm mb-2">
          Variant A has lower day-1 retention but flatter decay. Variant B starts higher but drops
          faster.
        </p>
        <RetentionChart />
      </Card>
      <Card title="DAU over time">
        <p className="text-[var(--muted)] text-sm mb-2">
          Daily active users = 10,000 × [R(0) + R(1) + ... + R(day-1)] where R(0) = 100% (same-day
          installs). DAU includes all users active that day, including new installs. Day 15 is the
          Part A decision point.
        </p>
        <DAUChart />
      </Card>
      <Card title="Cumulative revenue over time">
        <p className="text-[var(--muted)] text-sm mb-2">
          ARPDAU = $0.50. Part B asks which variant has higher cumulative revenue by end of day 15.
        </p>
        <RevenueChart />
      </Card>
      <Card title="Cohort tables – DAU contribution by install day">
        <p className="text-[var(--muted)] text-sm mb-2">
          <strong className="text-[var(--text-body)]">Important:</strong> DAU includes same-day new
          installs. R(0) = 100% (users who install that day are active that day by definition).
        </p>
        <p className="text-[var(--muted)] text-sm mb-4">
          Each row is a cohort (install day). Each column is a calendar day. Cell = that cohort's
          contribution to DAU on that day (10,000 × retention). Column 15 highlighted for Part A.
        </p>
        <div className="grid grid-cols-1 gap-6 mt-2">
          <CohortTable R={R_A} variant="A" />
          <CohortTable R={R_B} variant="B" />
        </div>
      </Card>
    </>
  );
}
