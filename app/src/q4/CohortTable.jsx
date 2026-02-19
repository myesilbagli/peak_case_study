import { buildCohortTableData } from '../data/q4Metrics';

export function CohortTable({ R, variant }) {
  const isA = variant === 'A';
  const { headers, rows, sumRow } = buildCohortTableData(R, 15);

  return (
    <div>
      <caption
        className="text-left py-2 font-semibold block"
        style={{ color: isA ? 'var(--accent-a)' : 'var(--accent-b)' }}
      >
        Variant {variant}
      </caption>
      <div className="overflow-x-auto border border-[var(--border)] rounded-lg bg-[var(--surface-soft)]">
        <table className="w-full border-collapse text-xs font-mono">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={
                    'py-1.5 px-1 text-right bg-[var(--surface)] text-[var(--muted)] border-b border-[var(--border)] sticky top-0 z-10 ' +
                    (i === 0 ? 'text-left min-w-[4rem] sticky left-0 z-20' : '') +
                    (h === 15 ? ' bg-[rgba(183,28,28,0.15)]' : '')
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-[rgba(26,35,126,0.04)] dark:hover:bg-white/5">
                <td className="py-1 px-1 text-left font-medium text-[var(--muted)] sticky left-0 bg-[var(--surface-soft)] z-10 border-b border-[var(--border)]">
                  {row.cohort}
                </td>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={
                      'py-1 px-1 text-right border-b border-[var(--border)] text-[var(--text-body)] ' +
                      (cell.empty ? 'text-[var(--border)]' : '') +
                      (cell.isDay15 ? ' font-semibold bg-[var(--red-light)]' : '')
                    }
                  >
                    {cell.val}
                  </td>
                ))}
              </tr>
            ))}
            <tr
              className={
                isA
                  ? 'bg-[var(--navy-light)] border-t-2 border-[var(--accent-a)]'
                  : 'bg-[var(--red-light)] border-t-2 border-[var(--accent-b)]'
              }
            >
              <td
                className={
                  'py-1 px-1 text-left font-bold sticky left-0 z-10 border-b border-[var(--border)] ' +
                  (isA ? 'bg-[var(--navy-light)]' : 'bg-[var(--red-light)]')
                }
              >
                Sum (Day 15)
              </td>
              {sumRow.cells.map((val, ci) => (
                <td
                  key={ci}
                  className={
                    'py-1 px-1 text-right border-b border-[var(--border)] ' +
                    (val
                      ? 'font-bold ' +
                        (isA
                          ? 'bg-[rgba(26,35,126,0.2)] text-[var(--accent-a)]'
                          : 'bg-[rgba(183,28,28,0.2)] text-[var(--accent-b)]')
                      : '')
                  }
                >
                  {val ?? ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
