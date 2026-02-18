# Google Sheets – Q4 Charts Setup Guide

This guide shows how to recreate the Q4 visualizations (retention, DAU, cohort analysis, cumulative revenue) in Google Sheets.

---

## Step 1: Set up the data tables

### Sheet 1: "Retention"

| A | B | C |
|---|---|---|
| Day | Variant A | Variant B |
| 1 | 41.00% | 46.00% |
| 2 | | |
| ... | | |

**Columns:**
- **A:** Day (1, 2, 3, ... 28)
- **B:** Variant A retention % (formula: `=(-1.4*LN(A2)+41)/100` for day in A2)
- **C:** Variant B retention % (formula: `=(-4.3*LN(A2)+46)/100`)

**To create:**
1. Column A: Fill 1, 2, 3, ... 28
2. B2: `=(-1.4*LN(A2)+41)/100` → Format as Percentage (2 decimals)
3. C2: `=(-4.3*LN(A2)+46)/100` → Format as Percentage
4. Copy B2:C2 down to row 29

---

### Sheet 2: "DAU"

| A | B | C |
|---|---|---|
| Day | Variant A | Variant B |
| 1 | 10,000 | 10,000 |
| 2 | 14,100 | 14,600 |
| ... | | |

**Note:** Day 1 DAU = 10,000 (only same-day installs, R(0) = 100%). Day 2 DAU = 10,000 + 10k×R(1) = 10k + 4,100 = 14,100 for A.

**Columns:**
- **A:** Day (1–28)
- **B:** DAU for Variant A = `=10000*(1+SUM(Retention!$B$2:INDEX(Retention!$B$2:$B$29, A2-1)))` (includes R(0)=1.0 + R(1) to R(day-1))
- **C:** DAU for Variant B = `=10000*(1+SUM(Retention!$C$2:INDEX(Retention!$C$2:$C$29, A2-1)))`

**Note:** DAU includes same-day new installs (R(0) = 100%). Day t DAU = 10k × [R(0) + R(1) + ... + R(t-1)] = 10k × [1.0 + R(1) + ... + R(t-1)].

**To create:**
1. Copy Day column from Retention sheet
2. B2: `=10000*(1+SUM(Retention!$B$2:INDEX(Retention!$B$2:$B$29, A2-1)))` → Format as Number (no decimals)
   - For day 1: `=10000*(1+0)` = 10,000 (only R(0))
   - For day 2: `=10000*(1+Retention!$B$2)` = 10k × [1.0 + R(1)]
   - For day 15: `=10000*(1+SUM(Retention!$B$2:$B$15))` = 10k × [1.0 + R(1) + ... + R(14)]
3. C2: `=10000*(1+SUM(Retention!$C$2:INDEX(Retention!$C$2:$C$29, A2-1)))`
4. Copy down

---

### Sheet 3: "Cumulative Revenue"

| A | B | C |
|---|---|---|
| Day | Variant A | Variant B |
| 1 | $20,500 | $23,000 |
| 2 | $40,230 | $43,640 |
| ... | | |

**Columns:**
- **A:** Day (1–28)
- **B:** Cum. Revenue A = `=SUM(DAU!$B$2:B2)*0.5` (sum of DAU up to this day × $0.50)
- **C:** Cum. Revenue B = `=SUM(DAU!$C$2:C2)*0.5`

**To create:**
1. Copy Day column
2. B2: `=SUM(DAU!$B$2:B2)*0.5` → Format as Currency
3. C2: `=SUM(DAU!$C$2:C2)*0.5`
4. Copy down

---

### Sheet 4: "Cohort Table"

**Structure:** Rows = Cohort (install day 1–15), Columns = Calendar day 1–15. Cell = that cohort's contribution to DAU on that day.

| | A | B | C | ... | P |
|---|---|---|---|---|---|
| 1 | Cohort | Day 1 | Day 2 | ... | Day 15 |
| 2 | Day 1 | 4,100 | 3,946 | ... | |
| 3 | Day 2 | — | 4,100 | ... | |

**Formula for cell (cohort i, calendar day j):**
- If j < i: `"—"` (empty, cohort hasn't installed yet)
- If j = i: `=10000` (age 0, R(0) = 100% — same-day installs are always active)
- If j > i: `=10000*INDEX(Retention!$B$2:$B$29, j-i)` (10k × retention for age = j - i)

**Note:** Age = calendar_day - install_day (no +1 shift). Diagonal cells (j = i) must be 10,000 because R(0) = 100%.

**Example (B2 = cohort 1, day 1):**
Age = 1 - 1 = 0 → `=10000` (R(0) = 100%) = 10,000

**Example (C2 = cohort 1, day 2):**
Age = 2 - 1 = 1 → `=10000*INDEX(Retention!$B$2:$B$29, 1)` = 10k × R(1) = 4,100

**Example (C3 = cohort 2, day 2):**
Age = 2 - 2 = 0 → `=10000` (R(0) = 100%) = 10,000

**Example (P2 = cohort 1, day 15):**
Age = 15 - 1 = 14 → `=10000*INDEX(Retention!$B$2:$B$29, 14)` = 10k × R(14)

**To create:**
1. Row 1: Cohort, Day 1, Day 2, ... Day 15
2. Column A: Day 1, Day 2, ... Day 15
3. B2 (cohort 1, day 1): `=IF(B$1<$A2, "—", IF(B$1=$A2, 10000, 10000*INDEX(Retention!$B$2:$B$29, B$1-$A2)))`
   - If calendar day < install day: empty
   - If calendar day = install day: 10,000 (age 0)
   - If calendar day > install day: 10k × R(age) where age = calendar_day - install_day
4. Copy B2 across and down

---

## Step 2: Create charts

### Chart 1: Retention (%) by day

1. Select **Retention** sheet → columns A, B, C (Day, Variant A, Variant B)
2. **Insert → Chart**
3. Chart type: **Line chart**
4. X-axis: Day
5. Series: Variant A, Variant B
6. Customize: Colors (blue for A, red for B), title "Retention (%) by day"

---

### Chart 2: DAU over time

1. Select **DAU** sheet → columns A, B, C
2. **Insert → Chart** → Line chart
3. Title: "DAU over time"
4. Colors: Blue (A), Red (B)

---

### Chart 3: Cumulative revenue

1. Select **Cumulative Revenue** sheet → columns A, B, C
2. **Insert → Chart** → Line chart
3. Title: "Cumulative revenue"
4. Format Y-axis as Currency

---

### Chart 4: Cohort heatmap (optional)

1. Select the **Cohort Table** (without row/col headers)
2. **Insert → Chart** → **Heatmap** or use **Conditional formatting** (Format → Conditional formatting)
3. Color scale: Low = dark, High = bright (e.g. blue/red)

---

## Quick formulas reference

| What | Variant A | Variant B |
|------|-----------|-----------|
| **Retention on day x** | `=(-1.4*LN(x)+41)/100` | `=(-4.3*LN(x)+46)/100` |
| **R(0) (same-day installs)** | `1.0` (100%) | `1.0` (100%) |
| **DAU on day t** | `=10000*(1+SUM(R_A(1..t-1)))` | `=10000*(1+SUM(R_B(1..t-1)))` |
| **Cum. Revenue by day t** | `=SUM(DAU_A(1..t))*0.5` | `=SUM(DAU_B(1..t))*0.5` |

**Note:** DAU includes same-day new installs. R(0) = 100% by definition (users who install that day are active that day).

---

## Tips

- **Named ranges:** Name Retention!B2:B29 as "RetentionA" to simplify formulas
- **Day 15 marker:** Add a vertical line in charts (Chart → Customize → Series → Add line at x=15)
- **Part A/B values:** Use `=INDEX(DAU!B16,1)` for DAU(15) A, `=INDEX(CumRevenue!B16,1)` for Cum Rev(15) A

---

Once set up, the charts update automatically when you change inputs. Share the sheet or export charts as images for your presentation.
