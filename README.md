# Net Worth Tracker

A personal finance dashboard — track your stock portfolio, assets, liabilities, and progress toward a retirement goal.

## Features
- Live stock prices (US + SGX) via Yahoo Finance
- Multi-currency: USD, SGD, THB, EUR
- Retirement goal planner with adjustable assumptions
- Net worth trend chart with snapshot history
- Export / import data as JSON for cross-device sync
- Works offline as a PWA (Add to Home Screen on iPhone/iPad)

## Privacy
**All your financial data stays on your device.** Nothing is uploaded anywhere. The app stores data in your browser's `localStorage` only. The HTML/JS files on GitHub contain zero personal information — only the app code.

Anyone who uses this template starts with a blank slate and their own private data.

---

## Setup (GitHub Pages — takes ~10 minutes)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up for a free account.

### Step 2 — Create a new repository
1. Click **+** → **New repository**
2. Name it `finance` (or anything you like)
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 3 — Upload the files
Click **uploading an existing file** and upload ALL of these files:
```
index.html          ← rename my-finance-dashboard.html to this
manifest.json
sw.js
icon-192.png
icon-512.png
```

Commit with message "Initial upload".

### Step 4 — Enable GitHub Pages
1. Go to repository **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait ~2 minutes → your URL appears: `https://YOURNAME.github.io/finance/`

### Step 5 — Add to Home Screen on iPhone
1. Open the URL in **Safari** (must be Safari, not Chrome/Edge)
2. Tap the **Share** button (box with arrow)
3. Scroll down → **Add to Home Screen**
4. Name it "Net Worth" → **Add**

It now appears on your home screen as an app icon, opens full-screen with no browser chrome.

---

## Syncing data between devices

Your data lives in each browser's localStorage. To move it between devices:

1. **On laptop:** click **⬇ Export data** (top bar) → saves `finance-data.json`
2. **Move the file** to iCloud Drive / email it to yourself
3. **On iPhone:** open the app → History tab → **⬆ Load from file** → pick the JSON

Do this whenever you make significant changes on one device.

---

## Sharing with friends

Share your GitHub Pages URL. Each person gets:
- A completely blank dashboard (no your data)
- Their own private localStorage on their device
- Full functionality to add their own stocks and assets

Or they can fork your repository on GitHub to get their own copy they can modify.

---

## Updating the app

When a new version of the HTML is available:
1. Go to your GitHub repository
2. Click on `index.html` → **Edit** (pencil icon) → paste new content → Commit
3. Or drag-and-drop the new file to replace the old one
4. GitHub Pages updates within ~2 minutes
5. On iPhone, close and reopen the app to get the latest version

---

## Files
| File | Purpose |
|------|---------|
| `index.html` | The entire app (HTML + CSS + JS in one file) |
| `manifest.json` | PWA metadata — name, icon, colors |
| `sw.js` | Service worker — enables offline use and install prompt |
| `icon-192.png` | App icon (home screen, small) |
| `icon-512.png` | App icon (splash screen, large) |
| `finance-data.json` | Your exported data (keep this private, don't upload to GitHub) |
