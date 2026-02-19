import { useState } from 'react';
import { Q4Tabs } from '../q4/Q4Tabs';
import { PartA } from '../q4/PartA';
import { PartB } from '../q4/PartB';
import { PartC } from '../q4/PartC';
import { PartD } from '../q4/PartD';

export function Q4Panel() {
  const [activeTab, setActiveTab] = useState('part-a');

  return (
    <div className="max-w-[900px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] mb-1">
        Q4 – A/B Test Visualization
      </h1>
      <p className="text-[var(--muted)] text-sm mb-6">
        Peak Product Case · 10,000 installs/day · DAU, retention, revenue
      </p>

      <Q4Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'part-a' && <PartA />}
      {activeTab === 'part-b' && <PartB />}
      {activeTab === 'part-c' && <PartC />}
      {activeTab === 'part-d' && <PartD />}

      <footer className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        Same logic as q4_ab_metrics.py. Retention fit: R(x) = (a·ln(x)+b)/100 from (day 1, day 28) points.
      </footer>
    </div>
  );
}
