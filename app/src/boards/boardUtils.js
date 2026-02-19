// Q1: Square minus corners (Gardenscapes). Ported from index.html.
const N = 9;

export function getSquareMinusCornersSet(centerR, centerC, radius) {
  const set = new Set();
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const dr = Math.abs(i - centerR);
      const dc = Math.abs(j - centerC);
      const inSquare = dr <= radius && dc <= radius;
      const isCorner = dr === radius && dc === radius;
      if (inSquare && !isCorner) set.add(i * N + j);
    }
  }
  return set;
}

export function countSquareMinusCorners(centerR, centerC, radius) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const dr = Math.abs(i - centerR);
      const dc = Math.abs(j - centerC);
      if (dr <= radius && dc <= radius && !(dr === radius && dc === radius)) count++;
    }
  }
  return count;
}

// Q2: 7×7 blast. Ported from index.html.
const RADIUS = 3;

export function cellsAffected7x7(r, c) {
  const rLo = Math.max(0, r - RADIUS);
  const rHi = Math.min(N - 1, r + RADIUS);
  const cLo = Math.max(0, c - RADIUS);
  const cHi = Math.min(N - 1, c + RADIUS);
  return (rHi - rLo + 1) * (cHi - cLo + 1);
}

export function getAffectedSet7x7(comboR, comboC) {
  const set = new Set();
  const rLo = Math.max(0, comboR - RADIUS);
  const rHi = Math.min(N - 1, comboR + RADIUS);
  const cLo = Math.max(0, comboC - RADIUS);
  const cHi = Math.min(N - 1, comboC + RADIUS);
  for (let i = rLo; i <= rHi; i++) {
    for (let j = cLo; j <= cHi; j++) set.add(i * N + j);
  }
  return set;
}

export function exactExpected7x7() {
  let total = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) total += cellsAffected7x7(i, j);
  }
  return total / (N * N);
}

export const BOARD_SIZE = N;
