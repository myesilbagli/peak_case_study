// Ported from index.html (lines ~910–1045). Do not change expressions or constants.

export const INSTALLS = 10000;
export const ARPDAU = 0.50;

const A_COEFF_A = -0.9109272487;
const A_COEFF_B = -0.003770870565;
const B_COEFF_A = -0.8383393092;
const B_COEFF_B = -0.01238991841;

const RETENTION_A = { 0: 1.0 };
const RETENTION_B = { 0: 1.0 };
for (let age = 1; age <= 28; age++) {
  RETENTION_A[age] = Math.exp(A_COEFF_A + A_COEFF_B * age);
  RETENTION_B[age] = Math.exp(B_COEFF_A + B_COEFF_B * age);
}

export function R_A(x) {
  if (x === 0) return 1.0;
  if (RETENTION_A[x] !== undefined) return RETENTION_A[x];
  return Math.exp(A_COEFF_A + A_COEFF_B * x);
}

export function R_B(x) {
  if (x === 0) return 1.0;
  if (RETENTION_B[x] !== undefined) return RETENTION_B[x];
  return Math.exp(B_COEFF_A + B_COEFF_B * x);
}

export function dau(day, R) {
  let sum = 1.0;
  for (let k = 1; k < day; k++) sum += R(k);
  return INSTALLS * sum;
}

export function cumRevenue(throughDay, R) {
  let total = 0;
  for (let d = 1; d <= throughDay; d++) total += dau(d, R) * ARPDAU;
  return total;
}

const ARPDAU_PART_C = {
  1: 0.5, 2: 0.5, 3: 0.5, 4: 0.5, 5: 0.5, 6: 0.5, 7: 0.5, 8: 0.5, 9: 0.5, 10: 0.5,
  11: 0.5, 12: 0.5, 13: 0.5, 14: 0.5, 15: 0.5,
  16: 0.7, 17: 0.68, 18: 0.66, 19: 0.64, 20: 0.62, 21: 0.6, 22: 0.58, 23: 0.56, 24: 0.54, 25: 0.52,
};

export function arpdauPartC(day) {
  if (day >= 1 && day <= 25 && ARPDAU_PART_C[day] !== undefined) return ARPDAU_PART_C[day];
  return 0.5;
}

export const DAILY_REV_A = [
  5000, 7003.19, 8998.84, 10986.97, 12967.63, 14940.83, 16906.6, 18864.97, 20815.98, 22759.64,
  24695.98, 26625.04, 28546.83, 30461.4, 32368.75, 47976.5, 49180.26, 50223.17, 51106.13, 51830.01,
  52395.7, 52804.07, 53056.0, 53152.35, 53093.99, 52881.77, 54704.74, 56520.85,
];

export function cumRevenuePartC(throughDay, R) {
  if (R === R_A && throughDay >= 1 && throughDay <= 28) {
    let sum = 0;
    for (let d = 0; d < throughDay && d < DAILY_REV_A.length; d++) sum += DAILY_REV_A[d];
    return sum;
  }
  let total = 0;
  for (let d = 1; d <= throughDay; d++) total += dau(d, R) * arpdauPartC(d);
  return total;
}

export const R_A_new = (x) => (x >= 1 ? (-2.1 * Math.log(x) + 48) / 100 : 0);
export const R_B_new = (x) => (x >= 1 ? (-5.1 * Math.log(x) + 53) / 100 : 0);
export const OLD_INSTALLS = 7000;
export const NEW_INSTALLS = 3000;
export const SWITCH_DAY = 15;

export function dauMixed(day, R_old, R_new) {
  let total = 0;
  for (let installDay = 1; installDay <= day; installDay++) {
    const age = day - installDay;
    if (age === 0) {
      if (installDay < SWITCH_DAY) total += INSTALLS * 1.0;
      else total += OLD_INSTALLS * 1.0 + NEW_INSTALLS * 1.0;
    } else {
      if (installDay < SWITCH_DAY) total += INSTALLS * R_old(age);
      else total += OLD_INSTALLS * R_old(age) + NEW_INSTALLS * R_new(age);
    }
  }
  return total;
}

export function cumRevenuePartD(throughDay, R_old, R_new) {
  let total = 0;
  for (let d = 1; d <= throughDay; d++) total += dauMixed(d, R_old, R_new) * ARPDAU;
  return total;
}

const days = [];
for (let i = 1; i <= 28; i++) days.push(i);

export { days };

export const retentionA = days.map((d) => Math.round(R_A(d) * 10000) / 100);
export const retentionB = days.map((d) => Math.round(R_B(d) * 10000) / 100);
export const dauA = days.map((d) => dau(d, R_A));
export const dauB = days.map((d) => dau(d, R_B));
export const cumRevA = days.map((d) => cumRevenue(d, R_A));
export const cumRevB = days.map((d) => cumRevenue(d, R_B));

export const dau15_A = dau(15, R_A);
export const dau15_B = dau(15, R_B);
export const rev15_A = cumRevenue(15, R_A);
export const rev15_B = cumRevenue(15, R_B);

export const partAPick = dau15_A >= dau15_B ? 'A' : 'B';
export const partBPick = rev15_A >= rev15_B ? 'A' : 'B';

export const rev25_A_c = cumRevenuePartC(25, R_A);
export const rev25_B_c = cumRevenuePartC(25, R_B);
export const partCPick = rev25_A_c >= rev25_B_c ? 'A' : 'B';

export const rev28_A_d = cumRevenuePartD(28, R_A, R_A_new);
export const rev28_B_d = cumRevenuePartD(28, R_B, R_B_new);
export const partDPick = rev28_A_d >= rev28_B_d ? 'A' : 'B';

const days15to25 = [];
for (let i = 15; i <= 25; i++) days15to25.push(i);

export const days15to25Cum = [...days15to25];

export function getPartCChartData() {
  const arpdauC = days15to25.map((d) => arpdauPartC(d));
  const dailyRevA_C = days15to25.map((d) => DAILY_REV_A[d - 1]);
  const dailyRevB_C = days15to25.map((d) => dau(d, R_B) * arpdauPartC(d));
  const cumRevA_PartC_15_25 = days15to25.map((d) => cumRevenuePartC(d, R_A));
  const cumRevB_PartC_15_25 = days15to25.map((d) => cumRevenuePartC(d, R_B));
  return {
    days15to25,
    arpdauC,
    dailyRevA_C,
    dailyRevB_C,
    cumRevA_PartC_15_25,
    cumRevB_PartC_15_25,
  };
}

/** Build cohort table data for a variant. Returns { headers, rows, sumRow }. */
export function buildCohortTableData(R, maxDay) {
  const headers = ['Cohort', ...Array.from({ length: maxDay }, (_, i) => i + 1)];
  const col15Values = [];
  const rows = [];

  for (let installDay = 1; installDay <= maxDay; installDay++) {
    const row = { cohort: `Day ${installDay}`, cells: [] };
    for (let calDay = 1; calDay <= maxDay; calDay++) {
      const age = calDay - installDay;
      let val;
      if (age < 0) val = '—';
      else if (age === 0) val = INSTALLS.toLocaleString(undefined, { maximumFractionDigits: 0 });
      else val = (INSTALLS * R(age)).toLocaleString(undefined, { maximumFractionDigits: 0 });
      if (calDay === 15 && age >= 0) col15Values.push(age === 0 ? INSTALLS : INSTALLS * R(age));
      row.cells.push({ calDay, age, val, isDay15: calDay === 15, empty: age < 0 });
    }
    rows.push(row);
  }

  const sum15 = col15Values.reduce((a, b) => a + b, 0);
  const sumRow = {
    label: 'Sum (Day 15)',
    cells: Array.from({ length: maxDay }, (_, i) =>
      i + 1 === 15 ? sum15.toLocaleString(undefined, { maximumFractionDigits: 0 }) : null
    ),
  };

  return { headers, rows, sumRow };
}
