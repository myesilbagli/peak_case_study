"""
Q2: Toon Blast - Bomb&Bomb combo on 9x9 board.
Expected number of cells affected when combo cell is uniformly random.

Assumptions (from Toon Blast wiki):
- Single Bomb clears 3x3 (9 cells).
- Bomb&Bomb "clears about triple that" = 27 cells.
  We model as 5x5 (25 cells) OR a 3x9 rectangle (27 cells) centered at combo cell.
  Using 5x5 as standard "double bomb" blast; 27-cell shape would be similar logic.
"""

import random

N = 9  # 9x9 board

def cells_affected_5x5(combo_row, combo_col):
    """Number of cells in 5x5 centered at (combo_row, combo_col) that lie inside [0..N-1]^2."""
    r, c = combo_row, combo_col
    r_lo, r_hi = max(0, r - 2), min(N - 1, r + 2)
    c_lo, c_hi = max(0, c - 2), min(N - 1, c + 2)
    return (r_hi - r_lo + 1) * (c_hi - c_lo + 1)

def cells_affected_3x9(combo_row, combo_col):
    """27 cells: 3 rows x 9 cols centered at combo cell (row band)."""
    r, c = combo_row, combo_col
    r_lo, r_hi = max(0, r - 1), min(N - 1, r + 1)
    c_lo, c_hi = max(0, c - 4), min(N - 1, c + 4)
    return (r_hi - r_lo + 1) * (c_hi - c_lo + 1)

def expected_cells(shape_fn, label):
    total = 0
    for i in range(N):
        for j in range(N):
            total += shape_fn(i, j)
    avg = total / (N * N)
    print(f"{label}: expected cells affected = {avg:.4f}")
    return avg


def simulate_expected_cells(shape_fn, num_trials=100_000, seed=None):
    """
    Monte Carlo simulation: repeatedly pick a random combo cell (uniform over 81),
    count cells affected by the blast, return sample mean and std.
    """
    if seed is not None:
        random.seed(seed)
    total = 0
    sq_total = 0  # for std dev
    for _ in range(num_trials):
        r, c = random.randint(0, N - 1), random.randint(0, N - 1)
        n = shape_fn(r, c)
        total += n
        sq_total += n * n
    mean = total / num_trials
    variance = (sq_total / num_trials) - (mean * mean)
    std = (variance ** 0.5) if variance > 0 else 0.0
    return mean, std


if __name__ == "__main__":
    NUM_SIM_TRIALS = 100_000

    print("Q2 - Bomb&Bomb combo on 9x9 board (combo cell uniform over 81 cells)\n")

    print("--- Exact (average over all 81 positions) ---")
    print("5x5 blast (25 cells):")
    exact_5x5 = expected_cells(cells_affected_5x5, "5x5")
    print("3x9 blast (27 cells):")
    exact_3x9 = expected_cells(cells_affected_3x9, "3x9")

    print("\n--- Simulation (random combo position, {} trials) ---".format(NUM_SIM_TRIALS))
    mean_5x5, std_5x5 = simulate_expected_cells(cells_affected_5x5, NUM_SIM_TRIALS, seed=42)
    print("5x5: mean = {:.4f}, std = {:.4f}  (exact = {:.4f})".format(mean_5x5, std_5x5, exact_5x5))
    mean_3x9, std_3x9 = simulate_expected_cells(cells_affected_3x9, NUM_SIM_TRIALS, seed=43)
    print("3x9: mean = {:.4f}, std = {:.4f}  (exact = {:.4f})".format(mean_3x9, std_3x9, exact_3x9))
