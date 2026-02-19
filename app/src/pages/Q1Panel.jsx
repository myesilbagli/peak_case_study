import { useState, useRef } from 'react';
import { Card } from '../components/Card';
import { BoardQ1 } from '../boards/BoardQ1';

const POWERS = [
  { id: 'firecracker', radius: 1, label: 'Firecracker', sub: '1×1 radius (5 cells max)' },
  { id: 'bomb', radius: 2, label: 'Bomb', sub: '2×2 radius (21 cells max)' },
  { id: 'dynamite', radius: 3, label: 'Dynamite', sub: '3×3 radius (45 cells max)' },
  { id: 'tnt', radius: 4, label: 'TNT', sub: '4×4 radius (77 cells max)' },
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
        Peak Product Case · Square minus corners (Gardenscapes blast shape)
      </p>

      <Card title="Select a power-up, then click a tile">
        <p className="text-[var(--muted)] text-[0.95rem] mb-4">
          Gardenscapes uses <strong className="text-[var(--text-body)]">square minus corners</strong>:
          the blast is the (2r+1)×(2r+1) square centered on the tile, with the{' '}
          <strong className="text-[var(--text-body)]">four corner cells removed</strong>. So radius 1
          → 3×3−4 = 5 cells; radius 2 → 5×5−4 = 21; radius 3 → 7×7−4 = 45; radius 4 → 9×9−4 = 77.
          Pick one below, then click any tile.
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
        Blast = (2r+1)×(2r+1) square minus the 4 corners. Firecracker 1, Bomb 2, Dynamite 3, TNT 4.
      </footer>
    </div>
  );
}
