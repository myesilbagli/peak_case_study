export function getChartColors(theme) {
  if (theme === 'dark') {
    return {
      gridColor: 'rgba(136,136,160,0.25)',
      fontColor: '#e8e8ec',
      fontMuted: '#8888a0',
      navy: '#7986cb',
      red: '#e57373',
      navyRgba: 'rgba(121,134,203,0.2)',
      redRgba: 'rgba(229,115,115,0.2)',
      day15: '#e57373',
      day15Rgba: 'rgba(229,115,115,0.7)',
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
