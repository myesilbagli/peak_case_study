# Q2 Bomb&Bomb simulation – web version

## Open locally

1. Double-click **`q2_simulation.html`** in Finder, or  
2. From terminal:  
   `open q2_simulation.html`  
   (or drag the file into a browser window).

No server or install needed. Everything runs in your browser.

## Share in your project

**Option A – Send the file**  
Email or upload `q2_simulation.html`. Recipients open it in any browser (Chrome, Safari, Firefox, etc.).

**Option B – Host online (free)**  
1. Put `q2_simulation.html` in a GitHub repo.  
2. Enable **GitHub Pages**: repo → Settings → Pages → Source: main branch, `/ (root)` or `/docs` (if you put the file in `docs/`).  
3. Share the link: `https://<your-username>.github.io/<repo-name>/q2_simulation.html`

**Option C – Netlify / Vercel**  
Drag the folder (or repo) onto [Netlify Drop](https://app.netlify.com/drop) or deploy with Vercel. You get a public URL.

---

The page runs the same logic as `q2_bomb_combo.py`: exact expected cells (5×5 and 3×9) plus a Monte Carlo simulation with configurable trials.
