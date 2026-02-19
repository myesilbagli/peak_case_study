# Peak Product Case – React App

React version of the Peak product case study (Q1 Gardenscapes, Q2 7×7 Combo, Q4 A/B Metrics).

## Stack

- Vite + React
- Tailwind CSS (theme: navy/red, light grey background, dark mode)
- Chart.js + react-chartjs-2 for Q4 charts

## Run

```bash
npm install
npm run dev
```

## Build (e.g. for GitHub Pages)

```bash
npm run build
```

Output is in `dist/`. For GitHub Pages at `https://<user>.github.io/peak_case_study/`, the build uses `base: '/peak_case_study/'` (see `vite.config.js`).

## Math

All Q4 and board math is ported from the original `index.html` and matches `q4_ab_metrics.py`. Do not change expressions in `src/data/q4Metrics.js` or `src/boards/boardUtils.js`.
