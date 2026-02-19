import { getQ1AffectedSet, countQ1Affected, BOARD_SIZE } from './boardUtils';

export function BoardQ1({ selectedPower, selectedR, selectedC, explosionKey, onCellClick }) {
  const radius = selectedPower ? parseInt(selectedPower.dataset?.radius ?? 0, 10) : 0;
  const hasCenter = selectedR != null && selectedC != null && selectedPower;
  const affected = hasCenter ? getQ1AffectedSet(selectedR, selectedC, radius) : new Set();
  const count = hasCenter ? countQ1Affected(selectedR, selectedC, radius) : 0;

  const cells = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const idx = i * BOARD_SIZE + j;
      const isCombo = hasCenter && i === selectedR && j === selectedC;
      const isAffected = hasCenter && affected.has(idx);
      const distance = hasCenter && isAffected && !isCombo
        ? Math.max(Math.abs(i - selectedR), Math.abs(j - selectedC))
        : 0;
      const explosionDelay = distance * 0.025;
      cells.push(
        <div
          key={idx}
          role="button"
          tabIndex={0}
          className={
            'w-9 h-9 flex items-center justify-center rounded-md text-[0.7rem] font-mono cursor-pointer select-none transition-colors ' +
            (isCombo
              ? 'bg-[var(--navy)] text-white font-bold shadow-[0_0_0_2px_rgba(26,35,126,0.5)] dark:shadow-[0_0_0_3px_rgba(92,107,192,0.85)]'
              : isAffected
                ? 'bg-[var(--red)] text-white/95 hover:bg-[#8B0000] dark:hover:bg-[#ff6e6e]'
                : 'bg-[var(--border)] text-[var(--muted)] hover:bg-[#b8bcc4] hover:text-[var(--text-body)] dark:hover:bg-[#3a3a45] dark:hover:text-[var(--text)]') +
            (explosionKey != null && isCombo ? ' animate-explosion-center-q1' : '') +
            (explosionKey != null && isAffected && !isCombo ? ' animate-explosion-cell-q1' : '')
          }
          style={
            explosionKey != null && isAffected && !isCombo
              ? { animationDelay: `${explosionDelay}s` }
              : undefined
          }
          onClick={() => onCellClick(i, j)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCellClick(i, j)}
          title={`Row ${i}, Col ${j}`}
        />
      );
    }
  }

  return (
    <div className="mt-2">
      <div
        key={explosionKey ?? 'no-explosion'}
        className="inline-grid gap-0.5 font-mono text-[0.7rem]"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 2.25rem)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 2.25rem)`,
        }}
      >
        {cells}
      </div>
      {hasCenter && (
        <p className="mt-4 text-lg font-semibold text-[var(--text)]">
          <span className="font-mono text-[var(--highlight)]">{count}</span> tile
          {count !== 1 ? 's' : ''} explode (square − corners, radius {radius})
        </p>
      )}
    </div>
  );
}
