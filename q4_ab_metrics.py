"""
Q4: A/B test – DAU, retention, ARPDAU, cumulative revenue.
10,000 installs/day per variant. Fit retention from given points; answer parts A–E.
"""

import math

# Exponential retention model: R(x) = exp(a + b * x)
# Coefficients matching your spreadsheet (RetA age 1 = 0.4006375526, RetB age 1 = 0.4271033628)
# Variant A: aA = -0.9109272487, bA = -0.003770870565
# Variant B: aB = -0.8383393092, bB = -0.01238991841

A_COEFF_A = -0.9109272487  # intercept
A_COEFF_B = -0.003770870565  # slope
B_COEFF_A = -0.8383393092  # intercept
B_COEFF_B = -0.01238991841  # slope

# Calculate retention values for ages 0-28 using exponential model (matches your retention table)
RETENTION_A = {0: 1.0}
RETENTION_B = {0: 1.0}
for age in range(1, 29):
    RETENTION_A[age] = math.exp(A_COEFF_A + A_COEFF_B * age)
    RETENTION_B[age] = math.exp(B_COEFF_A + B_COEFF_B * age)

# Retention functions: R(x) = exp(a + b * x)
def R_A(x):
    if x == 0:
        return 1.0
    if x in RETENTION_A:
        return RETENTION_A[x]
    return math.exp(A_COEFF_A + A_COEFF_B * x)

def R_B(x):
    if x == 0:
        return 1.0
    if x in RETENTION_B:
        return RETENTION_B[x]
    return math.exp(B_COEFF_A + B_COEFF_B * x)

# Sanity check
print("Retention values (A):", [round(R_A(x), 4) for x in [0, 1, 3, 7, 14, 28]])
print("Retention values (B):", [round(R_B(x), 4) for x in [0, 1, 3, 7, 14, 28]])
print()

INSTALLS = 10_000
ARPDAU_BASE = 0.50

def dau_day_t(R_fn, t):
    """DAU on day t = sum over cohorts: R(0) + R(1) + ... + R(t-1) where R(0) = 1.0 (same-day installs)."""
    return INSTALLS * sum(R_fn(k) for k in range(t))  # ages 0 to t-1

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

# ---- Part C: ARPDAU from spreadsheet — day 1–15: $0.50; day 16: $0.70; drop to $0.52 by day 25; day 26 onward: $0.50 ----
ARPDAU_PART_C = {
    1: 0.50, 2: 0.50, 3: 0.50, 4: 0.50, 5: 0.50, 6: 0.50, 7: 0.50, 8: 0.50, 9: 0.50, 10: 0.50,
    11: 0.50, 12: 0.50, 13: 0.50, 14: 0.50, 15: 0.50,
    16: 0.70, 17: 0.68, 18: 0.66, 19: 0.64, 20: 0.62, 21: 0.60, 22: 0.58, 23: 0.56, 24: 0.54, 25: 0.52,
}


def arpdau_part_c(day):
    if 1 <= day <= 25:
        return ARPDAU_PART_C.get(day, 0.52)
    return 0.50  # day 26 onward: 50 cent ARPDAU

# Your Variant A daily revenue (day 1 to 28) — cumulative through day 25 = 778,906
DAILY_REV_A = [
    5000, 7003.19, 8998.84, 10986.97, 12967.63, 14940.83, 16906.60, 18864.97, 20815.98, 22759.64,
    24695.98, 26625.04, 28546.83, 30461.40, 32368.75, 47976.50, 49180.26, 50223.17, 51106.13, 51830.01,
    52395.70, 52804.07, 53056.00, 53152.35, 53093.99, 52881.77, 54704.74, 56520.85,
]

# Compare cumulative revenue through day 25
rev25_A_c = sum(DAILY_REV_A[:25])
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
    for install_day in range(1, t + 1):  # install_day 1 .. t
        age = t - install_day  # age = calendar_day - install_day
        if age == 0:
            # Same-day installs: R(0) = 1.0 (100%)
            if install_day < switch_day:
                total += INSTALLS * 1.0
            else:
                total += old_installs * 1.0 + new_installs * 1.0
        else:
            if install_day < switch_day:
                total += INSTALLS * R_old(age)
            else:
                total += old_installs * R_old(age) + new_installs * R_new(age)
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
