import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { retentionNewA, retentionNewB } from '../../data/q4Metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const daysNewSource = [];
for (let i = 1; i <= 28; i++) daysNewSource.push(i);

export function NewSourceRetentionChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const data = {
    labels: daysNewSource,
    datasets: [
      { label: 'Variant A (new source)', data: retentionNewA, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 1 },
      { label: 'Variant B (new source)', data: retentionNewB, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 1 },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.fontColor } },
      tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + ctx.raw + '%' } },
    },
    scales: {
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted }, title: { display: true, text: 'Day (age)', color: colors.fontMuted } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => v + '%' }, min: 0, max: 55 },
    },
  };
  return (
    <div className="h-[220px]">
      <Line data={data} options={options} />
    </div>
  );
}
