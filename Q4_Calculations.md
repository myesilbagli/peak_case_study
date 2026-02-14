# Q4 – Calculations (share this for “Share your calculations”)

## Retention formula (trendline)

Using **logarithmic trendline** \( R(x) = \frac{a \ln(x) + b}{100} \) with the given data:

- **Variant A:** Fit with (1, 41) and (28, 36.33) →  
  \( a = \frac{36.33 - 41}{\ln(28)} \approx -1.40 \), \( b = 41 \)  
  **\( R_A(x) = \frac{-1.40 \ln(x) + 41}{100} \)**

- **Variant B:** Fit with (1, 46) and (28, 31.67) →  
  \( a = \frac{31.67 - 46}{\ln(28)} \approx -4.30 \), \( b = 46 \)  
  **\( R_B(x) = \frac{-4.30 \ln(x) + 46}{100} \)**

Check: these match the given Retention(1), (3), (7), (14), (28) for both variants.

---

## DAU on day \( t \)

With 10,000 installs per day and retention \( R(k) \):

\[
\text{DAU}(t) = 10{,}000 \times \sum_{k=1}^{t} R(k).
\]

(Each cohort \( i = 0, \ldots, t-1 \) contributes \( 10{,}000 \cdot R(t - i) \) on day \( t \).)

---

## Part A – Maximize DAU on day 15

- **Variant A:** DAU(15) = 10,000 × Σ R_A(k) for k=1..15 ≈ **57,590**
- **Variant B:** DAU(15) = 10,000 × Σ R_B(k) for k=1..15 ≈ **57,002**

**Answer: Choose Variant A** (higher DAU on day 15).  
A has lower early retention but flatter decay, so by day 15 more cumulative cohorts are still active.

---

## Part B – Maximize cumulative revenue by end of day 15

Revenue on day \( d \) = DAU(d) × ARPDAU = DAU(d) × 0.50.  
Cumulative revenue by day 15 = Σ (DAU(d) × 0.50) for d = 1..15.

- **Variant A:** ≈ **$233,583**
- **Variant B:** ≈ **$237,898**

**Answer: Choose Variant B** (higher cumulative revenue by day 15).  
B’s stronger early retention (e.g. R(1)=46% vs 41%) drives more DAU in the first two weeks, so more revenue in that window.

---

## Part C – ARPDAU jump to $0.70, then linear drop to $0.50 in 10 days

- From day 15: ARPDAU = $0.70.
- Drops linearly to $0.50 over 10 days (by day 25):  
  ARPDAU(day) = 0.70 − (day − 15) × (0.20/10) for day 15..25; then $0.50.

Cumulative revenue (day 1–25) with this ARPDAU schedule:

- **Variant A:** ≈ **$698,511**
- **Variant B:** ≈ **$688,470**

**Answer: Choose Variant A.**  
The revenue bump is applied to DAU; A has higher DAU in the later days (flatter retention), so it benefits more from the temporary ARPDAU increase.

---

## Part D – New source from day 15 (3k new, 7k old), ARPDAU stays $0.50

From day 15: 3,000 installs from new source, 7,000 from old (total 10,000).  
New-source retention (given):

- **Variant A:** \( R_{A,\text{new}}(x) = \frac{-2.1 \ln(x) + 48}{100} \)
- **Variant B:** \( R_{B,\text{new}}(x) = \frac{-5.1 \ln(x) + 53}{100} \)

DAU from day 15 onward: for each install day ≥ 15, add 7,000 × R_old(days_since) + 3,000 × R_new(days_since).  
Cumulative revenue (day 1–28) with ARPDAU = $0.50:

- **Variant A:** ≈ **$783,697**
- **Variant B:** ≈ **$767,397**

**Answer: Choose Variant A.**  
New source retention for A decays more slowly (coefficient −2.1 vs −5.1), so the 3k new installs contribute more DAU over time for A. That leads to higher cumulative revenue and better long-term DAU.

---

## Part E – Choose one: Part C (ARPDAU jump) or Part D (new source)

**Recommendation: Prefer Part D (new source).**

- **Part C** is a one-time ARPDAU boost for 10 days; after that, ARPDAU is back to $0.50 and the advantage is just the extra revenue in that window.
- **Part D** adds a new marketing channel with better retention for Variant A; that improves DAU and revenue every day after day 15 and compounds over time.
- So for long-term DAU and revenue, the new source (D) is the better “change” to have, especially when the new source retention curve favors your chosen variant (A).

*(You can also compare incremental revenue: e.g. extra from C over 10 days vs extra from D over 13+ days; D’s tail is larger.)*
