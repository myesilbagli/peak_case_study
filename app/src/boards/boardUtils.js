// Q1: Gardenscapes power-ups — different shape per radius.
// Firecracker r=1: circle (5). Bomb r=2: square minus corners (21). Dynamite r=3: 7×7 minus 3 per corner (37). TNT r=4: 9×9 minus 6 per corner (57).
const N = 9;

function distEuclidean(r0, c0, r1, c1) {
  return Math.sqrt((r1 - r0) ** 2 + (c1 - c0) ** 2);
}

export function getCircleSet(centerR, centerC, radius) {
  const set = new Set();
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (distEuclidean(centerR, centerC, i, j) <= radius) set.add(i * N + j);
    }
  }
  return set;
}

export function countCircle(centerR, centerC, radius) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (distEuclidean(centerR, centerC, i, j) <= radius) count++;
    }
  }
  return count;
}

// Bomb: (2r+1)×(2r+1) square minus the 4 corner cells.
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

// Dynamite: (2r+1)×(2r+1) square minus 3 cells at each corner (12 removed). 7×7→37.
function getCornerTriplesRemoved(centerR, centerC, radius) {
  const removed = new Set();
  const rLo = centerR - radius;
  const rHi = centerR + radius;
  const cLo = centerC - radius;
  const cHi = centerC + radius;
  for (const [r, c] of [[rLo, cLo], [rLo + 1, cLo], [rLo, cLo + 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rLo, cHi], [rLo + 1, cHi], [rLo, cHi - 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rHi, cLo], [rHi - 1, cLo], [rHi, cLo + 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rHi, cHi], [rHi - 1, cHi], [rHi, cHi - 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  return removed;
}

export function getSquareMinusCornerTriplesSet(centerR, centerC, radius) {
  const set = new Set();
  const removed = getCornerTriplesRemoved(centerR, centerC, radius);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const dr = Math.abs(i - centerR);
      const dc = Math.abs(j - centerC);
      if (dr <= radius && dc <= radius && !removed.has(i * N + j)) set.add(i * N + j);
    }
  }
  return set;
}

export function countSquareMinusCornerTriples(centerR, centerC, radius) {
  return getSquareMinusCornerTriplesSet(centerR, centerC, radius).size;
}

// TNT: 9×9 square minus 6 cells at each corner (24 removed) → 57.
function getCornerSixRemoved(centerR, centerC) {
  const removed = new Set();
  const rLo = centerR - 4;
  const rHi = centerR + 4;
  const cLo = centerC - 4;
  const cHi = centerC + 4;
  // 6 cells per corner: corner + two along each edge + one inside. Top-left: (rLo,cLo), (rLo+1,cLo), (rLo+2,cLo), (rLo,cLo+1), (rLo,cLo+2), (rLo+1,cLo+1)
  for (const [r, c] of [[rLo, cLo], [rLo + 1, cLo], [rLo + 2, cLo], [rLo, cLo + 1], [rLo, cLo + 2], [rLo + 1, cLo + 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rLo, cHi], [rLo + 1, cHi], [rLo + 2, cHi], [rLo, cHi - 1], [rLo, cHi - 2], [rLo + 1, cHi - 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rHi, cLo], [rHi - 1, cLo], [rHi - 2, cLo], [rHi, cLo + 1], [rHi, cLo + 2], [rHi - 1, cLo + 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  for (const [r, c] of [[rHi, cHi], [rHi - 1, cHi], [rHi - 2, cHi], [rHi, cHi - 1], [rHi, cHi - 2], [rHi - 1, cHi - 1]]) {
    if (r >= 0 && r < N && c >= 0 && c < N) removed.add(r * N + c);
  }
  return removed;
}

export function getSquareMinusCornerSixSet(centerR, centerC) {
  const set = new Set();
  const removed = getCornerSixRemoved(centerR, centerC);
  const radius = 4;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const dr = Math.abs(i - centerR);
      const dc = Math.abs(j - centerC);
      if (dr <= radius && dc <= radius && !removed.has(i * N + j)) set.add(i * N + j);
    }
  }
  return set;
}

export function countSquareMinusCornerSix(centerR, centerC) {
  return getSquareMinusCornerSixSet(centerR, centerC).size;
}

// Single entry for Q1: pick shape by radius.
export function getQ1AffectedSet(centerR, centerC, radius) {
  if (radius === 1) return getCircleSet(centerR, centerC, radius);
  if (radius === 2) return getSquareMinusCornersSet(centerR, centerC, radius);
  if (radius === 3) return getSquareMinusCornerTriplesSet(centerR, centerC, radius);
  if (radius === 4) return getSquareMinusCornerSixSet(centerR, centerC);
  return new Set();
}

export function countQ1Affected(centerR, centerC, radius) {
  if (radius === 1) return countCircle(centerR, centerC, radius);
  if (radius === 2) return countSquareMinusCorners(centerR, centerC, radius);
  if (radius === 3) return countSquareMinusCornerTriples(centerR, centerC, radius);
  if (radius === 4) return countSquareMinusCornerSix(centerR, centerC);
  return 0;
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
