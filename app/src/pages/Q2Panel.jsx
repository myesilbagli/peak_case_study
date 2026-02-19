import { useState } from 'react';
import { Card } from '../components/Card';
import { BoardQ2 } from '../boards/BoardQ2';

export function Q2Panel() {
  const [selectedR, setSelectedR] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  const [explosionKey, setExplosionKey] = useState(null);

  return (
    <div className="max-w-[720px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] mb-1">
        Q2 – 7×7 Combo on 9×9 Board
      </h1>
      <p className="text-[var(--muted)] text-sm mb-6">
        Peak Product Case · Click any tile to see the blast
      </p>

      <Card title="Interactive board">
        <p className="text-[var(--muted)] text-[0.95rem] mb-4">
          The combo affects a <strong className="text-[var(--text-body)]">7×7</strong> area centered
          on the chosen tile. Click any tile below — that tile is the combo center. The board will
          show which tiles explode (purple) and how many are cleared. Near the borders, fewer than
          49 tiles explode.
        </p>
        <BoardQ2
          selectedR={selectedR}
          selectedC={selectedC}
          explosionKey={explosionKey}
          onCellClick={(r, c) => {
            setSelectedR(r);
            setSelectedC(c);
            setExplosionKey(Date.now());
          }}
        />
      </Card>

      <Card title="Q-2 Expected tiles affected by Bomb&Bomb">
        <p className="text-[var(--muted)] text-[0.95rem] mb-2">
          <strong className="text-[var(--text-body)]">Method:</strong> Tiles affected = (columns
          covered) × (rows covered). Compute the <strong className="text-[var(--text-body)]">average
          columns covered</strong> (1D), same for rows. Then:{' '}
          <strong className="text-[var(--text-body)]">Expected tiles = AvgCols × AvgRows</strong>.
        </p>
        <p className="text-[var(--muted)] text-[0.95rem] mb-2">
          <strong className="text-[var(--text-body)]">On a 9-wide board (7×7 blast):</strong>
        </p>
        <ul className="list-disc pl-6 my-2 text-[var(--muted)] text-[0.95rem] space-y-1">
          <li>
            Center at 1 or 9 → 4 columns <span className="text-[var(--text)]">(2 positions)</span>
          </li>
          <li>
            Center at 2 or 8 → 5 columns <span className="text-[var(--text)]">(2 positions)</span>
          </li>
          <li>
            Center at 3 or 7 → 6 columns <span className="text-[var(--text)]">(2 positions)</span>
          </li>
          <li>
            Center at 4, 5, or 6 → 7 columns{' '}
            <span className="text-[var(--text)]">(3 positions)</span>
          </li>
        </ul>
        <p className="text-[var(--muted)] text-[0.95rem] mb-1">
          <strong className="text-[var(--text-body)]">AvgCols</strong> = (4×2 + 5×2 + 6×2 + 7×3) ÷ 9
          = <strong className="text-[var(--text)]">5.67</strong>
        </p>
        <p className="text-[var(--muted)] text-[0.95rem] mb-1">
          <strong className="text-[var(--text-body)]">AvgRows</strong> = same ={' '}
          <strong className="text-[var(--text)]">5.67</strong>
        </p>
        <p className="text-[var(--muted)] text-[0.95rem] mb-2">
          <strong className="text-[var(--text-body)]">Expected tiles</strong> = 5.67 × 5.67 ={' '}
          <strong className="text-[var(--text)]">32.11</strong>
        </p>
        <p className="text-[var(--muted)] text-[0.95rem]">
          So if the combo appears at a random tile each time, on average{' '}
          <strong className="text-[var(--text-body)]">32.11 tiles</strong> are cleared per combo.
        </p>
      </Card>

      <footer className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        7×7 blast (center ±3 in each direction), clipped to the 9×9 board.
      </footer>
    </div>
  );
}
