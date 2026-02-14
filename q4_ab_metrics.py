"""
Q4: A/B test – DAU, retention, ARPDAU, cumulative revenue.
10,000 installs/day per variant. Fit retention from given points; answer parts A–E.
"""

import math

# Given retention data (day -> % as decimal)
# Variant A
R_A_data = {1: 0.41, 3: 0.3946, 7: 0.3828, 14: 0.3731, 28: 0.3633}
# Variant B
R_B_data = {1: 0.46, 3: 0.4128, 7: 0.3763, 14: 0.3465, 28: 0.3167}

# Fit R(x) = (a*ln(x)+b)/100 using (ln(x), R*100) -> R*100 = a*ln(x)+b
# Using points (1,41), (28,36.33) for A: 41 = b, 36.33 = a*ln(28)+b -> a = (36.33-41)/ln(28)
# Better: use all points and least squares. For simplicity use (1,41) and (28,36.33): b=41, a=(36.33-41)/ln(28)
def fit_log(d):
    x1, y1 = 1, list(d.values())[0] * 100
    x2, y2 = 28, d[28] * 100
    a = (y2 - y1) / (math.log(x2) - math.log(x1))
    b = y1 - a * math.log(x1)
    return lambda x: (a * math.log(x) + b) / 100 if x >= 1 else 0

R_A = fit_log(R_A_data)
R_B = fit_log(R_B_data)

# Sanity check
print("Retention fit check (A):", [round(R_A(x), 4) for x in [1, 3, 7, 14, 28]])
print("Retention fit check (B):", [round(R_B(x), 4) for x in [1, 3, 7, 14, 28]])
print()

INSTALLS = 10_000
ARPDAU_BASE = 0.50

def dau_day_t(R_fn, t):
    """DAU on day t = sum over cohorts: install day i has 10k users, on day t they contribute 10k * R(t-i)."""
    return INSTALLS * sum(R_fn(k) for k in range(1, t + 1))

def cum_revenue_by_day(T, R_fn, arpdau_fn=None):
    """Cumulative revenue from day 1 to day T. arpdau_fn(day) if given, else constant ARPDAU_BASE."""
    if arpdau_fn is None:
        arpdau_fn = lambda d: ARPDAU_BASE
    total = 0
    for d in range(1, T + 1):
        dau = dau_day_t(R_fn, d)
        total += dau * arpdau_fn(d)
    return total

# ---- Part A: Maximize DAU on day 15 ----
dau15_A = dau_day_t(R_A, 15)
dau15_B = dau_day_t(R_B, 15)
print("Part A – DAU on day 15")
print(f"  Variant A: DAU(15) = {dau15_A:,.0f}")
print(f"  Variant B: DAU(15) = {dau15_B:,.0f}")
print(f"  Pick: {'B' if dau15_B > dau15_A else 'A'}")
print()

# ---- Part B: Maximize cumulative revenue by end of day 15 ----
rev15_A = cum_revenue_by_day(15, R_A)
rev15_B = cum_revenue_by_day(15, R_B)
print("Part B – Cumulative revenue by end of day 15")
print(f"  Variant A: ${rev15_A:,.2f}")
print(f"  Variant B: ${rev15_B:,.2f}")
print(f"  Pick: {'B' if rev15_B > rev15_A else 'A'}")
print()

# ---- Part C: ARPDAU jump to $0.70 on day 15, then linear drop to $0.50 in 10 days ----
# So day 15: 0.70, day 16: 0.68, ..., day 25: 0.50. After day 25: 0.50.
def arpdau_part_c(day):
    if day < 15:
        return 0.50
    if day <= 25:
        return 0.70 - (day - 15) * (0.20 / 10)
    return 0.50

# Compare cumulative revenue through day 25 (or through day 15+10=25)
rev25_A_c = cum_revenue_by_day(25, R_A, arpdau_part_c)
rev25_B_c = cum_revenue_by_day(25, R_B, arpdau_part_c)
print("Part C – ARPDAU jump to $0.70 (day 15), linear to $0.50 by day 25")
print(f"  Variant A cumulative revenue (day 1–25): ${rev25_A_c:,.2f}")
print(f"  Variant B cumulative revenue (day 1–25): ${rev25_B_c:,.2f}")
print(f"  Pick: {'B' if rev25_B_c > rev25_A_c else 'A'}")
print()

# ---- Part D: From day 15, 3k new source / 7k old. New retention: A: (-2.1*ln(x)+48)/100, B: (-5.1*ln(x)+53)/100 ----
R_A_new = lambda x: (-2.1 * math.log(x) + 48) / 100 if x >= 1 else 0
R_B_new = lambda x: (-5.1 * math.log(x) + 53) / 100 if x >= 1 else 0

def dau_day_t_mixed(t, R_old, R_new, switch_day=15, old_installs=7000, new_installs=3000):
    """DAU on day t: before switch_day all 10k with R_old; from switch_day onward 7k R_old + 3k R_new per day."""
    total = 0
    for install_day in range(t):  # install_day 0 .. t-1
        days_since = t - install_day
        if days_since < 1:
            continue
        if install_day < switch_day:
            total += INSTALLS * R_old(days_since)
        else:
            total += old_installs * R_old(days_since) + new_installs * R_new(days_since)
    return total

# Compare DAU and/or revenue on a day after day 15, e.g. day 20 or day 28
for day in [15, 20, 28]:
    dau_A_d = dau_day_t_mixed(day, R_A, R_A_new)
    dau_B_d = dau_day_t_mixed(day, R_B, R_B_new)
    print(f"  Day {day} – A: {dau_A_d:,.0f}, B: {dau_B_d:,.0f}")

def cum_revenue_mixed(T, R_old, R_new, switch_day=15):
    total = 0
    for d in range(1, T + 1):
        dau = dau_day_t_mixed(d, R_old, R_new, switch_day)
        total += dau * ARPDAU_BASE
    return total

rev28_A_d = cum_revenue_mixed(28, R_A, R_A_new)
rev28_B_d = cum_revenue_mixed(28, R_B, R_B_new)
print("\nPart D – New source from day 15 (3k new, 7k old), ARPDAU $0.50")
print(f"  Variant A cumulative revenue (day 1–28): ${rev28_A_d:,.2f}")
print(f"  Variant B cumulative revenue (day 1–28): ${rev28_B_d:,.2f}")
print(f"  Pick: {'B' if rev28_B_d > rev28_A_d else 'A'} (and explain: better retention from new source for A, etc.)")
print()

# ---- Part E: Choose C (ARPDAU jump) vs D (new source) ----
print("Part E – Choose one: C (ARPDAU jump) or D (new source).")
print("  Compare incremental value of C vs D for your chosen variant (e.g. extra revenue from C vs extra DAU/revenue from D).")
print("  Recommendation: state which is better for long-term DAU/revenue and why.")
