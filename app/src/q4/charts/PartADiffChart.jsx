import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { days, dauDiff, dau15_A, dau15_B, partAPick } from '../../data/q4Metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function PartADiffChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const days15 = days.slice(0, 15);
  const finalDiff = dauDiff[dauDiff.length - 1];
  const isPositive = finalDiff >= 0;
  
  const data = {
    labels: days15,
    datasets: [
      {
        label: 'DAU Difference (A - B)',
        data: dauDiff,
        borderColor: isPositive ? colors.navy : colors.red,
        backgroundColor: isPositive ? colors.navyRgba : colors.redRgba,
        fill: true,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw;
            const sign = val >= 0 ? '+' : '';
            return `Difference: ${sign}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })} users`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: colors.gridColor },
        ticks: { color: colors.fontMuted },
        title: { display: true, text: 'Day', color: colors.fontMuted },
      },
      y: {
        grid: { color: colors.gridColor },
        ticks: {
          color: colors.fontMuted,
          callback: (v) => {
            const sign = v >= 0 ? '+' : '';
            return sign + (v >= 1000 ? v / 1000 + 'k' : v);
          },
        },
        title: { display: true, text: 'DAU Difference (A - B)', color: colors.fontMuted },
      },
    },
  };

  const customPlugins = [
    {
      id: 'zeroLine',
      afterDraw(chart) {
        const ctx = chart.ctx;
        const yAxis = chart.scales.y;
        const zeroY = yAxis.getPixelForValue(0);
        if (zeroY < chart.chartArea.top || zeroY > chart.chartArea.bottom) return;
        ctx.save();
        ctx.strokeStyle = colors.fontMuted;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(chart.chartArea.left, zeroY);
        ctx.lineTo(chart.chartArea.right, zeroY);
        ctx.stroke();
        ctx.restore();
      },
    },
    {
      id: 'vline15',
      afterDraw(chart) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const x = xAxis.getPixelForValue(15);
        if (x < chart.chartArea.left || x > chart.chartArea.right) return;
        ctx.save();
        ctx.strokeStyle = colors.day15Rgba;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, chart.chartArea.top);
        ctx.lineTo(x, chart.chartArea.bottom);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = colors.day15;
        ctx.font = '11px DM Sans';
        ctx.fillText('day 15', x + 4, chart.chartArea.top + 12);
      },
    },
  ];

  const sign = finalDiff >= 0 ? '+' : '';
  const diffText = `${partAPick} leads by ${Math.abs(finalDiff).toLocaleString(undefined, { maximumFractionDigits: 0 })} users on day 15`;

  return (
    <div className="relative">
      <div className="h-[220px]">
        <Line data={data} options={options} plugins={customPlugins} />
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-[var(--text)] mb-1">
          {diffText}
        </div>
        <div className="text-xs text-[var(--muted)]">
          Final: {sign}{finalDiff.toLocaleString(undefined, { maximumFractionDigits: 0 })} · A: {dau15_A.toLocaleString(undefined, { maximumFractionDigits: 0 })} · B: {dau15_B.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
}
