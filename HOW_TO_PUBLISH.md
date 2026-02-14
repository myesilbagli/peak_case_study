# How to publish so the link works everywhere

If you put a link in PowerPoint or PDF, it must point to a **URL on the internet**, not a file on your computer. Once the files are hosted, anyone who clicks the link (from any device or network) will open the page in their browser.

---

## Option 1: GitHub Pages (good for portfolios, stable URL)

**Result:** A link like `https://YOUR-USERNAME.github.io/peak-case/` that works from anywhere (one page with Q2 and Q4 tabs).

1. **Create a GitHub account** if you don’t have one: [github.com](https://github.com).

2. **Create a new repository** (e.g. `peak-case`). Don’t add a README yet if you want to push your existing folder.

3. **Put your files in the repo.** Two ways:
   - **A) Upload in the browser:** In the repo, click “Add file” → “Upload files”. Drag in everything from your `scripts` folder (at least `index.html`, which contains both Q2 and Q4).
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

5. **Wait 1–2 minutes**, then open: `https://YOUR-USERNAME.github.io/peak-case/`

Use this link in your PowerPoint or PDF. The page has Q2 and Q4 tabs. Works on any device with internet.

---

## Option 2: Netlify Drop (no Git, instant link)

**Result:** A link like `https://something-random-123.netlify.app/` that serves your whole folder.

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag your **entire `scripts` folder** (the one that contains `index.html`) into the drop zone.
3. Netlify will give you a URL, e.g. `https://random-name-123.netlify.app`.
4. Use that URL in your PDF or PowerPoint — the page has Q2 and Q4 tabs. They work from any environment as long as the viewer has internet.

**Note:** Free “drop” sites can be taken down if unused. For something you want to keep for a long time (e.g. portfolio), use GitHub Pages (Option 1).

---

## Checklist before you add the link to PowerPoint/PDF

- [ ] The URL starts with `https://` and is not `file:///...` or a path on your computer.
- [ ] You opened the URL in an **incognito/private window** (or another device) and the page loads.
- [ ] Q4 page: charts and fonts load (viewer needs internet; the link itself is fine).

---

One link is enough: `index.html` has Q2 and Q4 as tabs at the top. Once the folder is hosted (GitHub Pages or Netlify), the link works from any environment.
