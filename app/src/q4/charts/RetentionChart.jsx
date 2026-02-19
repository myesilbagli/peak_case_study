import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { days, retentionA, retentionB } from '../../data/q4Metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function RetentionChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const data = {
    labels: days,
    datasets: [
      { label: 'Variant A', data: retentionA, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 0 },
      { label: 'Variant B', data: retentionB, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 0 },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: colors.fontColor } } },
    scales: {
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, maxTicksLimit: 14 } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted }, min: 30, max: 50 },
    },
  };
  return (
    <div className="h-[260px] mt-2">
      <Line data={data} options={options} />
    </div>
  );
}
