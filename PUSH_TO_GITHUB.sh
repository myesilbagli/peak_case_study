#!/bin/bash
# Run this from the scripts folder after creating an EMPTY repo on GitHub.
# Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME peak-case
# Example: ./PUSH_TO_GITHUB.sh johndoe peak-case

USER=${1:?Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME REPO_NAME}
REPO=${2:?Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME REPO_NAME}

git remote add origin "https://github.com/${USER}/${REPO}.git" 2>/dev/null || git remote set-url origin "https://github.com/${USER}/${REPO}.git"
git push -u origin main

echo ""
echo "Done. Enable GitHub Pages: repo → Settings → Pages → Source: main, / (root)."
echo "Then open: https://${USER}.github.io/${REPO}/"
