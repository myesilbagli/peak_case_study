import { getAffectedSet7x7, cellsAffected7x7, exactExpected7x7, BOARD_SIZE } from './boardUtils';

export function BoardQ2({ selectedR, selectedC, explosionKey, onCellClick }) {
  const hasSelection = selectedR != null && selectedC != null;
  const affected = hasSelection ? getAffectedSet7x7(selectedR, selectedC) : new Set();
  const count = hasSelection ? cellsAffected7x7(selectedR, selectedC) : 0;
  const expected = exactExpected7x7();

  const cells = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const idx = i * BOARD_SIZE + j;
      const isCombo = hasSelection && i === selectedR && j === selectedC;
      const isAffected = hasSelection && affected.has(idx);
      const distance = hasSelection && isAffected && !isCombo
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
              ? 'bg-[var(--navy)] text-white font-bold shadow-[0_0_0_2px_rgba(26,35,126,0.5)] dark:shadow-[0_0_0_2px_rgba(121,134,203,0.6)]'
              : isAffected
                ? 'bg-[var(--red)] text-white/95 hover:bg-[#8B0000] dark:hover:bg-[#ef5350]'
                : 'bg-[var(--border)] text-[var(--muted)] hover:bg-[#b8bcc4] hover:text-[var(--text-body)] dark:hover:bg-[#3a3a45] dark:hover:text-[var(--text)]') +
            (explosionKey != null && isCombo ? ' animate-explosion-center' : '') +
            (explosionKey != null && isAffected && !isCombo ? ' animate-explosion-cell' : '')
          }
          style={
            explosionKey != null && isAffected && !isCombo
              ? { animationDelay: `${explosionDelay}s` }
              : undefined
          }
          onClick={() => onCellClick(i, j)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCellClick(i, j)}
          title={`Row ${i}, Col ${j}. Click to set as combo center.`}
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
      <p className="mt-4 text-lg font-semibold text-[var(--text)]">
        {hasSelection ? (
          <>
            <span className="font-mono text-[var(--highlight)]">{count}</span> tile
            {count !== 1 ? 's' : ''} will explode{' '}
            <span className="font-normal text-sm text-[var(--muted)]">
              (combo at row {selectedR}, col {selectedC})
            </span>
          </>
        ) : (
          'Click a tile to see how many tiles explode.'
        )}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Expected tiles cleared (if combo is random): {expected.toFixed(2)} per combo.
      </p>
    </div>
  );
}
