import { Card } from '../components/Card';
import { dau15_A, dau15_B, partAPick } from '../data/q4Metrics';

export function PartA() {
  return (
    <Card title="Part A – Maximize DAU on day 15">
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">What are we even asking?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          We want to know: on day 15, which variant has more people opening the app that day? That number is called DAU.
        </p>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Where does day-15 DAU come from?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          We add 10,000 new installs every day. DAU on day 15 = 10,000 times [R(0) + R(1) + ... + R(14)]. We include same-day installs (R(0)=100%) plus returning users.
        </p>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Mathematical Solution</h3>
        <p className="text-sm text-[var(--muted)]">We use an exponential retention model R(x) = exp(a + b*x). Pick the variant with higher DAU(15).</p>
      </div>
      <div
        className={
          'grid grid-cols-1 gap-3 mb-4 p-3 rounded-lg border ' +
          (partAPick === 'A' ? 'border-[var(--accent-a)] bg-[var(--navy-light)]' : 'border-[var(--accent-b)] bg-[var(--red-light)]')
        }
      >
        <div className="text-xs uppercase tracking-wider text-[var(--muted)]">DAU on day 15</div>
        <div className="font-mono text-base font-semibold">
          A: {dau15_A.toLocaleString(undefined, { maximumFractionDigits: 0 })} · B: {dau15_B.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">Pick: <strong className="text-[var(--text-body)]">{partAPick}</strong></div>
      </div>
      <div className="bg-[var(--surface-soft)] rounded-lg p-4 my-4 border-l-4 border-[var(--accent-a)]">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-2">Why does A win?</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">
          Variant B has higher retention at the start but drops faster. Variant A holds on to people longer. By day 15, A has higher total DAU.
        </p>
        <p className="text-sm font-semibold text-[var(--highlight)] mt-3">Answer: Pick {partAPick}. See General Analysis for the DAU-over-time chart.</p>
      </div>
    </Card>
  );
}
