# Peak Product Case – Summary & Approach

## Case Overview
Product case for a **mobile puzzle game** company. Focus: puzzle genre, special items/combos, metrics, and A/B decisions.

---

## Question 1: Analyze and compare special items & combos
**Games:** Toon Blast, Candy Crush Saga, Gardenscapes (play at least 60 levels each)

**Deliverable:** Comparison of special items and combos across the three games (how they’re made, what they clear, synergies).

*You need to play or use existing knowledge; we can structure the comparison table and bullet points once you have notes.*

---

## Question 2: Toon Blast – Bomb&Bomb combo (9×9 board)
**Task:** On a 9×9 board, how many cells are affected **on average** when a Bomb&Bomb combo is executed?  
**Note:** Combo cell is any cell; all cells have the same probability.

**Assumption (from research):**  
- Single Bomb clears the 8 surrounding cubes → **3×3 area (9 cells)**.  
- Two Bombs next to each other clear “about triple that” → **27 cells** (or we model as a 5×5 = 25 cell area for a “double bomb” blast).

**Approach:**  
- Define the blast shape (e.g. 5×5 or 27-cell shape) centered at the combo cell.  
- For each of the 81 possible combo cells, count how many cells of that shape fall inside the 9×9 board.  
- Average over 81 → **expected number of cells affected.**

**Result (from `q2_bomb_combo.py`):**  
- If Bomb&Bomb clears a **5×5** area: **expected cells affected ≈ 18.78**.  
- If Bomb&Bomb clears a **3×9** (27 cells): **≈ 18.83**.  
State your assumption (blast shape) and use one of these numbers.

---

## Question 3: Propose 2 Toon Blast features for the other games
**Task:** Propose **2 different features from Toon Blast** that could be added to **Gardenscapes** and **Candy Crush**. What do you expect from each addition?

*We can draft the two features and expected impact (retention, monetization, fun) once you have Toon Blast vs others comparison from Q1.*

---

## Question 4: Daily metrics & A/B test
**Definitions:**  
- **DAU** = Daily Active Users  
- **ARPDAU** = Average Revenue per Daily Active User  
- **Retention(x)** = % of users who return on day x after install  

**Setup:** 10,000 installs/day per variant. Metrics:

| Metric       | Variant A | Variant B |
|-------------|-----------|-----------|
| ARPDAU      | $0.50     | $0.50     |
| Retention(1)| 41.00%    | 46.00%    |
| Retention(3)| 39.46%    | 41.28%    |
| Retention(7)| 38.28%    | 37.63%    |
| Retention(14)| 37.31%   | 34.65%    |
| Retention(28)| 36.33%   | 31.67%    |

**Parts:**  
- **A)** Maximize DAU on day 15 → which variant?  
- **B)** Maximize cumulative revenue by end of day 15 → which variant?  
- **C)** From day 15, ARPDAU jumps to $0.70 then drops linearly to $0.50 over 10 days. How does this change the comparison? Which variant?  
- **D)** No ARPDAU jump. From day 15: 3,000 installs from new source, 7,000 from old (total still 10,000). New source retention:  
  - Variant A: y = (−2.1·ln(x)+48)/100  
  - Variant B: y = (−5.1·ln(x)+53)/100  
  Which variant and why?  
- **E)** Choose one: ARPDAU jump (C) or new source (D). Why?

*All calculations for Q4 are in `q4_ab_metrics.py` and summarized in `Q4_Calculations.md`.*
