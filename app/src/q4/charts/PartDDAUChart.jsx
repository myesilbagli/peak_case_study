import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../theme/ThemeProvider';
import { getChartColors } from '../../theme/tokens';
import { daysPartD, dauA_Spreadsheet, dauB_Spreadsheet } from '../../data/q4SpreadsheetData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function PartDDAUChart() {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const data = {
    labels: daysPartD,
    datasets: [
      { label: 'Variant A', data: dauA_Spreadsheet, borderColor: colors.navy, backgroundColor: colors.navyRgba, fill: true, tension: 0.2, pointRadius: 0 },
      { label: 'Variant B', data: dauB_Spreadsheet, borderColor: colors.red, backgroundColor: colors.redRgba, fill: true, tension: 0.2, pointRadius: 0 },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.fontColor } },
      tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + Math.round(ctx.raw).toLocaleString() } },
    },
    scales: {
      x: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted }, title: { display: true, text: 'Day', color: colors.fontMuted } },
      y: { grid: { color: colors.gridColor }, ticks: { color: colors.fontMuted, callback: (v) => (v >= 1000 ? v / 1000 + 'k' : v) } },
    },
  };
  const customPlugins = [
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
        ctx.fillText('day 15 (new source)', x + 4, chart.chartArea.top + 12);
      },
    },
  ];
  return (
    <div className="h-[220px]">
      <Line data={data} options={options} plugins={customPlugins} />
    </div>
  );
}
