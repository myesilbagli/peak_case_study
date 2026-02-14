# How to publish so the link works everywhere

If you put a link in PowerPoint or PDF, it must point to a **URL on the internet**, not a file on your computer. Once the files are hosted, anyone who clicks the link (from any device or network) will open the page in their browser.

---

## Option 1: GitHub Pages (good for portfolios, stable URL)

**Result:** A link like `https://YOUR-USERNAME.github.io/peak-case/q2_simulation.html` that works from anywhere.

1. **Create a GitHub account** if you don’t have one: [github.com](https://github.com).

2. **Create a new repository** (e.g. `peak-case`). Don’t add a README yet if you want to push your existing folder.

3. **Put your files in the repo.** Two ways:
   - **A) Upload in the browser:** In the repo, click “Add file” → “Upload files”. Drag in everything from your `scripts` folder (at least `q2_simulation.html`, `q4_visualization.html`, and any other files you want online).
   - **B) Use Git:** From your project folder:
     ```bash
     git init
     git add .
     git commit -m "Add Peak case visualizations"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/peak-case.git
     git push -u origin main
     ```
     (Replace `YOUR-USERNAME` and `peak-case` with your repo.)

4. **Turn on GitHub Pages:**  
   Repo → **Settings** → **Pages** (left sidebar).  
   Under “Source” choose **Deploy from a branch**.  
   Branch: **main**, folder: **/ (root)**. Save.

5. **Wait 1–2 minutes**, then open:
   - `https://YOUR-USERNAME.github.io/peak-case/q2_simulation.html`
   - `https://YOUR-USERNAME.github.io/peak-case/q4_visualization.html`

Use these two links in your PowerPoint or PDF. They work on any device with internet.

---

## Option 2: Netlify Drop (no Git, instant link)

**Result:** A link like `https://something-random-123.netlify.app/` that serves your whole folder.

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag your **entire `scripts` folder** (the one that contains `q2_simulation.html` and `q4_visualization.html`) into the drop zone.
3. Netlify will give you a URL, e.g. `https://random-name-123.netlify.app`.
4. Your links will be:
   - `https://random-name-123.netlify.app/q2_simulation.html`
   - `https://random-name-123.netlify.app/q4_visualization.html`

Put these in your PDF or PowerPoint. They work from any environment as long as the viewer has internet.

**Note:** Free “drop” sites can be taken down if unused. For something you want to keep for a long time (e.g. portfolio), use GitHub Pages (Option 1).

---

## Checklist before you add the link to PowerPoint/PDF

- [ ] The URL starts with `https://` and is not `file:///...` or a path on your computer.
- [ ] You opened the URL in an **incognito/private window** (or another device) and the page loads.
- [ ] Q4 page: charts and fonts load (viewer needs internet; the link itself is fine).

---

## One link or two?

- **One link:** Create a simple `index.html` that has two buttons or links: “Q2 – Bomb combo” and “Q4 – A/B metrics”. You host that one page and give a single link; from there people can open Q2 and Q4.
- **Two links:** Use the direct links to `q2_simulation.html` and `q4_visualization.html` in your slide or PDF (e.g. “Interactive Q2” and “Interactive Q4”).

Either way, once the files are hosted (GitHub Pages or Netlify), the link will work when clicked from any environment.
