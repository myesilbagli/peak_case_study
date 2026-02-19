export function getChartColors(theme) {
  if (theme === 'dark') {
    return {
      gridColor: 'rgba(136,136,160,0.25)',
      fontColor: '#e8e8ec',
      fontMuted: '#8888a0',
      navy: '#5c6bc0',
      red: '#ff5252',
      navyRgba: 'rgba(92,107,192,0.25)',
      redRgba: 'rgba(255,82,82,0.2)',
      day15: '#ff5252',
      day15Rgba: 'rgba(255,82,82,0.7)',
    };
  }
  return {
    gridColor: 'rgba(26,35,126,0.15)',
    fontColor: '#1A237E',
    fontMuted: '#5c6b7a',
    navy: '#1A237E',
    red: '#B71C1C',
    navyRgba: 'rgba(26,35,126,0.12)',
    redRgba: 'rgba(183,28,28,0.12)',
    day15: '#B71C1C',
    day15Rgba: 'rgba(183,28,28,0.6)',
  };
}
