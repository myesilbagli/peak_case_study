import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { days, cumRevA, cumRevB } from '../../data/q4Metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function RevenueChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const data = {
    labels: days,
    datasets: [
      { label: 'Variant A', data: cumRevA, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 0 },
      { label: 'Variant B', data: cumRevB, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 0 },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.fontColor } },
      tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': $' + Math.round(ctx.raw).toLocaleString() } },
    },
    scales: {
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, maxTicksLimit: 14 } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => '$' + (v / 1000) + 'k' } },
    },
  };
  return (
    <div className="h-[260px] mt-2">
      <Line data={data} options={options} plugins={[{
        id: 'vline15rev',
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
      }]} />
    </div>
  );
}
