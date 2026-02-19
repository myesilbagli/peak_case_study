import { useState, useRef } from 'react';
import { Card } from '../components/Card';
import { BoardQ1 } from '../boards/BoardQ1';

const POWERS = [
  { id: 'firecracker', radius: 1, label: 'Firecracker', sub: 'radius 1 circle (5 cells)' },
  { id: 'bomb', radius: 2, label: 'Bomb', sub: '5×5 square minus corners (21 cells)' },
  { id: 'dynamite', radius: 3, label: 'Dynamite', sub: '7×7 minus 3 per corner (37 cells)' },
  { id: 'tnt', radius: 4, label: 'TNT', sub: '9×9 minus 6 per corner (57 cells)' },
];

export function Q1Panel() {
  const [selectedPower, setSelectedPower] = useState(null);
  const [selectedR, setSelectedR] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  const [explosionKey, setExplosionKey] = useState(null);
  const powerRef = useRef(null);
  const selectedPowerForBoard = selectedPower
    ? { dataset: { power: selectedPower.id, radius: String(selectedPower.radius) } }
    : null;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] mb-1">
        Q1 – Gardenscapes Power-ups
      </h1>
      <p className="text-[var(--muted)] text-sm mb-6">
        Peak Product Case · Gardenscapes power-ups (different blast shape each)
      </p>

      <Card title="Select a power-up, then click a tile">
        <p className="text-[var(--muted)] text-[0.95rem] mb-4">
          <strong className="text-[var(--text-body)]">Firecracker</strong> (r=1): circular blast → 5 cells.{' '}
          <strong className="text-[var(--text-body)]">Bomb</strong> (r=2): (2r+1)×(2r+1) square minus the 4 corners → 21 cells.
          <strong className="text-[var(--text-body)]"> Dynamite</strong> (r=3): 7×7 with 3 cells clipped at each corner → 37 cells. <strong className="text-[var(--text-body)]">TNT</strong> (r=4): 9×9 with 6 cells clipped at each corner (24 removed) → 57 cells. Pick one below, then click any tile.
        </p>
        <div className="flex flex-wrap gap-3 my-4">
          {POWERS.map((p) => (
            <button
              key={p.id}
              ref={selectedPower?.id === p.id ? powerRef : null}
              type="button"
              data-power={p.id}
              data-radius={p.radius}
              onClick={() => {
                setSelectedPower(p);
                setSelectedR(null);
                setSelectedC(null);
              }}
              className={
                'font-sans py-3 px-4 rounded-xl border-2 text-center text-base font-semibold transition-colors ' +
                (selectedPower?.id === p.id
                  ? 'border-[var(--accent-a)] bg-[rgba(26,35,126,0.15)] text-[var(--accent-a)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent-a)] hover:bg-[var(--navy-light)]')
              }
            >
              {p.label}
              <br />
              <small className="font-normal text-xs text-[var(--muted)] mt-1 block">{p.sub}</small>
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--muted)] mt-2">
          {selectedPower
            ? `Selected: ${selectedPower.label}. Click a tile to set the blast center.`
            : 'Select a power-up above, then click a tile on the board.'}
        </p>
        <div className="mt-4">
          <BoardQ1
            selectedPower={selectedPowerForBoard}
            selectedR={selectedR}
            selectedC={selectedC}
            explosionKey={explosionKey}
            onCellClick={(r, c) => {
              if (selectedPower) {
                setSelectedR(r);
                setSelectedC(c);
                setExplosionKey(Date.now());
              }
            }}
          />
        </div>
      </Card>

      <footer className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        Firecracker: circle. Bomb: square minus corners. Dynamite: 3 per corner. TNT: 6 per corner.
      </footer>
    </div>
  );
}
