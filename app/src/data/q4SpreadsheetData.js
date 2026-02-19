/**
 * Part D data extracted from spreadsheet (csv shit .csv).
 * DAU and Daily Revenue by day 1–28 for Variant A and B (mixed 7k old + 3k new from day 15).
 */

export const daysPartD = Array.from({ length: 28 }, (_, i) => i + 1);

// DAU by day (from spreadsheet row "DAU" for Variant A and Variant B)
export const dauA_Spreadsheet = [
  10000, 14006, 17998, 21974, 25935, 29882, 33813, 37730, 41632, 45519,
  49392, 53250, 57094, 60923, 64738, 68538, 72562, 76532, 80467, 84376,
  88260, 92122, 95966, 99791, 103601, 107394, 111171, 114934,
];

export const dauB_Spreadsheet = [
  10000, 14271, 18489, 22656, 26771, 30836, 34850, 38815, 42731, 46599,
  50420, 54193, 57920, 61601, 65237, 68827, 72683, 76405, 80037, 83598,
  87098, 90543, 93938, 97287, 100593, 103857, 107081, 110268,
];

// Daily revenue ($) by day from spreadsheet
export const dailyRevenueA_Spreadsheet = [
  5000, 7003.19, 8998.84, 10986.97, 12967.63, 14940.83, 16906.6, 18864.97, 20815.98, 22759.64,
  24695.98, 26625.04, 28546.83, 30461.4, 32368.75, 34268.93, 36280.77, 38266.02, 40233.69, 42187.77,
  44129.76, 46061.15, 47982.95, 49895.66, 51800.27, 53696.79, 55585.7, 57467.02,
];

export const dailyRevenueB_Spreadsheet = [
  5000, 7135.52, 9244.74, 11327.99, 13385.58, 15417.85, 17425.08, 19407.6, 21365.71, 23299.71,
  25209.89, 27096.56, 28959.99, 30800.47, 32618.3, 34413.74, 36341.55, 38202.33, 40018.5, 41799.03,
  43548.86, 45271.43, 46969.2, 48643.6, 50296.59, 51928.62, 53540.64, 55134.1,
];

// Cumulative revenue through each day
export const cumRevenueA_Spreadsheet = dailyRevenueA_Spreadsheet.reduce(
  (acc, rev, i) => [...acc, (acc[i] || 0) + rev],
  [0]
).slice(1);

export const cumRevenueB_Spreadsheet = dailyRevenueB_Spreadsheet.reduce(
  (acc, rev, i) => [...acc, (acc[i] || 0) + rev],
  [0]
).slice(1);

// Difference (A - B) for charts
export const dauDiffPartD = dauA_Spreadsheet.map((a, i) => a - dauB_Spreadsheet[i]);
export const revDiffPartD = cumRevenueA_Spreadsheet.map((a, i) => a - cumRevenueB_Spreadsheet[i]);

export const partDPick_Spreadsheet =
  cumRevenueA_Spreadsheet[27] >= cumRevenueB_Spreadsheet[27] ? 'A' : 'B';
