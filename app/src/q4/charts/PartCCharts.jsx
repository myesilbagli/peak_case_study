import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { getPartCChartData } from '../../data/q4Metrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function PartCArpdauChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const { days15to25, arpdauC } = getPartCChartData();
  const data = {
    labels: days15to25,
    datasets: [{
      label: 'ARPDAU ($)',
      data: arpdauC,
      borderColor: colors.red,
      backgroundColor: colors.redRgba,
      fill: true,
      tension: 0,
      pointRadius: 3,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: colors.fontColor } } },
    scales: {
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => '$' + v.toFixed(2) }, min: 0.45, max: 0.75 },
    },
  };
  return (
    <div className="h-[200px]">
      <Line data={data} options={options} />
    </div>
  );
}

export function PartCRevenueChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const { days15to25, dailyRevA_C, dailyRevB_C } = getPartCChartData();
  const data = {
    labels: days15to25,
    datasets: [
      { label: 'Variant A', data: dailyRevA_C, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 2 },
      { label: 'Variant B', data: dailyRevB_C, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 2 },
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
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => '$' + (v / 1000).toFixed(0) + 'k' } },
    },
  };
  return (
    <div className="h-[200px]">
      <Line data={data} options={options} />
    </div>
  );
}

export function PartCCumulativeChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const { days15to25, cumRevA_PartC_15_25, cumRevB_PartC_15_25 } = getPartCChartData();
  const data = {
    labels: days15to25,
    datasets: [
      { label: 'Variant A', data: cumRevA_PartC_15_25, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 2 },
      { label: 'Variant B', data: cumRevB_PartC_15_25, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 2 },
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
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => '$' + (v / 1000).toFixed(0) + 'k' } },
    },
  };
  return (
    <div className="h-[220px]">
      <Line data={data} options={options} />
    </div>
  );
}
