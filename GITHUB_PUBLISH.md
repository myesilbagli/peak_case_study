# Publish with GitHub (GitHub Pages)

Follow these steps so your links work from PowerPoint or PDF.

---

## Step 1: Create a GitHub repo

1. Go to [github.com](https://github.com) and sign in (or create an account).
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** e.g. `peak-case` (or `peak-product-case`).
4. Choose **Public**.
5. Leave “Add a README” **unchecked** (you’re uploading your own files).
6. Click **Create repository**.

---

## Step 2: Upload your files

You want the **contents** of your `scripts` folder to be at the **root** of the repo (so the main link is `username.github.io/peak-case/`).

**Option A – Upload in the browser (easiest)**

1. On the new repo page, click **“uploading an existing file”** (or **Add file** → **Upload files**).
2. Open your `scripts` folder in Finder.
3. Drag **all** of these into the upload area:
   - `index.html`
   - `q2_simulation.html`
   - `q4_visualization.html`
   - (Optional: `HOW_TO_PUBLISH.md`, `README_Q2_Web.md`, etc. — they won’t affect the links.)
4. Scroll down, add a commit message like **“Add Peak case pages”**, click **Commit changes**.

**Option B – Push from your computer (if you use Git)**

Run this in Terminal from your **scripts** folder (the folder that contains `index.html` and `q2_simulation.html`):

```bash
cd /Users/myesilbagli/Desktop/jobjob/peak/scripts

git init
git add .
git commit -m "Add Peak case visualizations"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/peak-case.git
git push -u origin main
```

Replace **YOUR-USERNAME** with your GitHub username and **peak-case** with your repo name. If Git asks for login, use a [Personal Access Token](https://github.com/settings/tokens) as the password.

---

## Step 3: Turn on GitHub Pages

1. In the repo, go to **Settings** (tab at the top).
2. In the left sidebar, click **Pages** (under “Code and automation”).
3. Under **“Build and deployment”** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**: select **main**, folder **/ (root)**.
5. Click **Save**.

---

## Step 4: Get your links

Wait **1–2 minutes**, then open (replace `YOUR-USERNAME` and `peak-case` with yours):

| What              | URL |
|-------------------|-----|
| **Landing page**  | `https://YOUR-USERNAME.github.io/peak-case/` |
| **Q2 – Combo**    | `https://YOUR-USERNAME.github.io/peak-case/q2_simulation.html` |
| **Q4 – A/B**      | `https://YOUR-USERNAME.github.io/peak-case/q4_visualization.html` |

Test in an **incognito window** or on your phone. If the page loads, you’re done.

---

## Use in PowerPoint or PDF

- **One link:** Use the landing page URL. When someone clicks it they see “Q2” and “Q4” and choose one.
- **Two links:** Add the Q2 and Q4 URLs as separate links (e.g. “Interactive Q2”, “Interactive Q4”).

These links work from any device and network as long as the viewer has internet.
