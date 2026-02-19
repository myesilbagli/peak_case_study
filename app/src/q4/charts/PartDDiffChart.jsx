import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import {
  daysPartD,
  revDiffPartD,
  cumRevenueA_Spreadsheet,
  cumRevenueB_Spreadsheet,
  partDPick_Spreadsheet,
} from '../../data/q4SpreadsheetData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function PartDDiffChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const finalDiff = revDiffPartD[revDiffPartD.length - 1];
  const isPositive = finalDiff >= 0;

  const data = {
    labels: daysPartD,
    datasets: [
      {
        label: 'Cum. revenue difference (A - B)',
        data: revDiffPartD,
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
            return `Difference: ${sign}$${Math.round(val).toLocaleString()}`;
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
            return sign + '$' + (Math.abs(v) >= 1000 ? Math.abs(v) / 1000 + 'k' : Math.abs(v));
          },
        },
        title: { display: true, text: 'Cum. revenue difference (A - B)', color: colors.fontMuted },
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

  const rev28_A = cumRevenueA_Spreadsheet[27];
  const rev28_B = cumRevenueB_Spreadsheet[27];
  const sign = finalDiff >= 0 ? '+' : '';
  const diffText = `${partDPick_Spreadsheet} leads by $${Math.abs(Math.round(finalDiff)).toLocaleString()} on day 28`;

  return (
    <div className="relative">
      <div className="h-[220px]">
        <Line data={data} options={options} plugins={customPlugins} />
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-[var(--text)] mb-1">{diffText}</div>
        <div className="text-xs text-[var(--muted)]">
          Final: {sign}${Math.abs(Math.round(finalDiff)).toLocaleString()} · A: ${(rev28_A / 1000).toFixed(0)}k · B: ${(rev28_B / 1000).toFixed(0)}k
        </div>
      </div>
    </div>
  );
}
