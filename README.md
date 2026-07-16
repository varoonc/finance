# Net Worth Tracker

A personal finance dashboard built as a self-contained PWA — no backend, no subscription, no data leaves your device. One HTML file tracks your entire financial picture across US stocks, SGX stocks, SET Thailand stocks, and other assets, with a retirement goal planner calibrated for Singapore residents.

---

## What it does

### Overview tab
- FX rate bar (USD→SGD, EUR→SGD, THB→SGD) — editable, live-fetchable, always visible before recording a snapshot
- Four metric cards: net worth, stock portfolio value, other assets, liabilities
- **Retirement goal planner** with four sliders (monthly income needed, years to retirement, annual return %, safe withdrawal rate)
  - **Two-stream projection model**: investable assets (stocks + cash) grow at your chosen rate; CPF grows at 3%, Singapore property at 2%, Thai property at 1.5%, insurance at 1.5%
  - Shows realistic projected total by retirement year vs naive single-rate calculation
  - Asset growth breakdown: each asset class shown with current value → projected value → assumed rate
  - Monthly savings needed calculated on investable assets only (not total net worth)
- Net worth trend chart with clickable/hoverable snapshot dots

### Stock Portfolio tab
- Three sections: 🇺🇸 US Market, 🇸🇬 SGX Singapore, 🇹🇭 SET Thailand
- Live price fetch via Yahoo Finance through multiple CORS proxies with automatic fallback chain (v7 quote → v8 chart → Google Finance)
- Sortable columns per exchange (independent sort state)
- Multi-currency: USD, SGD, THB, EUR — all converted to SGD equivalent
- Auto name resolution: stocks added without a successful name lookup get resolved automatically after each refresh
- Hardcoded name overrides for tickers where Yahoo proxies return abbreviated names (BUOU, N2IU)
- Edit position: units, company name override, name lock

### Dividends tab
Three separate sortable tables — one per market — each with independent sort:

**Tax treatment per market (Singapore resident):**
- 🇺🇸 US stocks: −30% withholding tax (no SG-US treaty, not recoverable)
- 🇹🇭 Thailand stocks: −10% withholding tax
- 🇸🇬 SGX stocks: 0% tax-free (one-tier system)

Each table shows: DPS (in native currency) · Frequency · Net yield after WHT · Gross SGD · Tax withheld · Net SGD · Monthly net

Summary section shows:
- Total net annual income after all withholding
- Annual tax drag in SGD
- Progress bar toward S$10K/month retirement income goal
- Per-market breakdown cards (gross → withheld → you receive)
- Payout calendar (12 months) colour-coded: 🔵 US, 🟢 SGX, 🟣 SET Thailand
- Non-dividend positions panel
- Suspended/distressed positions warning (e.g. EC World REIT BWCU)

Edit button per stock to override DPS and frequency; reset to researched default.

### Insights tab

**Asset map**: visual investable vs locked split bar + asset cards tagged:
- ✅ Investable: stocks, cash
- 🔒 Locked: CPF, insurance
- 🚫 No income / No income to you: SG property, TH property

**Allocation vs target**: single table combining description, current %, target %, gap in SGD, and action (Buy more / Trim / hold). Click any row to expand a positions panel showing which specific stocks are in that category with live prices. Target allocation calibrated for Singapore retirement income goal — maximises tax-free SGX income.

**Industry exposure**: three pie charts (US, SGX, SET Thailand) built from live prices, with colour-consistent legends. Below the charts: collapsible stock detail grouped by market → industry → individual stock, with Expand all / Collapse all buttons.

**Monthly savings tracker**: dual-bar chart from snapshot comparisons separating net new savings (green) from market movement (blue).

### Other Assets tab
- Add/edit/delete assets with multi-currency (SGD, THB, USD, EUR)
- Categories: Cash, CPF, Property, Insurance, Other
- Native currency amount + SGD equivalent per row
- Liability flag for mortgage, credit cards

### History tab
- Snapshot list (reverse chronological) with delta vs prior
- Click ▼ Detail to expand allocation breakdown at that point in time
- Full trend chart with hover tooltip
- Backup & restore: export `finance-data.json`, import from file
- Stock list management

---

## Supported markets

| Exchange | Currency | Yahoo suffix | Tax on dividends (SG resident) |
|---|---|---|---|
| US (NYSE/NASDAQ) | USD | none | −30% WHT |
| SGX Singapore | SGD / EUR | `.SI` | 0% tax-free |
| SET Thailand | THB | `.BK` | −10% WHT |

---

## Privacy

**All financial data stays on your device.** Nothing is uploaded anywhere. Data is stored in browser `localStorage` only, under key `pf2_v2`. The code on GitHub contains zero personal information — anyone who visits your GitHub Pages URL starts with generic seed data.

Never upload `finance-data.json` to GitHub.

---

## Setup (~10 minutes)

### 1. Create a GitHub account
[github.com](https://github.com) — free account is sufficient.

### 2. Create a repository
1. Click **+** → **New repository**
2. Name: `finance` (or anything)
3. Visibility: **Public** (required for free GitHub Pages)
4. Click **Create repository**

### 3. Upload files
Drag and drop all of these into the repository file list:
```
index.html
manifest.json
sw.js
icon-192.png
icon-512.png
```
Commit with message "Initial upload".

### 4. Enable GitHub Pages
1. **Settings** → **Pages** (left sidebar)
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** → **Save**
4. Wait ~2 minutes → URL appears: `https://YOURNAME.github.io/finance/`

---

## Installing as a home screen app

### iPhone / iPad (Safari only)
1. Open your GitHub Pages URL in **Safari** (not Chrome or Edge)
2. Tap **Share** → **Add to Home Screen** → **Add**
3. Opens full-screen with no browser chrome

### Android (Chrome)
1. Open your GitHub Pages URL in **Chrome**
2. Tap **⋮** menu → **Add to Home screen**
3. Or Chrome may show a banner automatically

### Laptop
- **Chrome**: look for the install icon (⊕) in the address bar
- **Edge**: ⋯ menu → Apps → Install

| Platform | Browser | Works? |
|---|---|---|
| iPhone/iPad | Safari | ✅ |
| iPhone/iPad | Chrome/Edge | ❌ Must use Safari |
| Android | Chrome | ✅ |
| Android | Samsung Internet | ✅ |
| Laptop | Chrome or Edge | ✅ |

---

## Syncing data between devices

Data lives in each browser's localStorage. To sync:

1. **Laptop** → click **⬇ Export data** (top bar) → saves `finance-data.json`
2. Move file to iCloud Drive / email to yourself
3. **iPhone** → open app → **History** tab → **⬆ Load from file** → pick the JSON

Do this after making significant changes on one device. A yellow banner appears if you haven't exported in over 24 hours.

---

## Deploying updates

Every time you update `index.html`, also bump the cache version in `sw.js` so all devices receive the update automatically:

### In `sw.js`, change:
```js
const CACHE = 'nwt-v4';  // increment this each deploy: v4 → v5 → v6
```

### Upload both files to GitHub:
1. Go to your repository
2. Drag `index.html` and `sw.js` onto the file list
3. GitHub detects same filenames → click **Commit changes**
4. Wait ~2 minutes for GitHub Pages to deploy
5. Open the app on any device → a **"🆕 New version available"** banner appears at the bottom
6. Tap **Update now** → app reloads with the latest version

No need to delete and re-add the home screen icon.

### Why you must bump the cache version
The service worker caches the app locally for offline use, named by the cache string (e.g. `nwt-v4`). Changing it to `nwt-v5` creates a new cache, forces all devices to download the fresh `index.html`, and triggers the update banner. Without this change, devices serve the old cached version indefinitely.

---

## Files

| File | Purpose | Upload to GitHub? |
|---|---|---|
| `index.html` | Entire app — HTML, CSS, JavaScript | ✅ Yes |
| `manifest.json` | PWA metadata — name, icon, colours | ✅ Yes |
| `sw.js` | Service worker — offline cache + auto-update | ✅ Yes |
| `icon-192.png` | App icon (home screen) | ✅ Yes |
| `icon-512.png` | App icon (splash screen) | ✅ Yes |
| `finance-data.json` | Your exported financial data | ❌ Never |

---

## Technical notes

**Architecture**: single HTML file, zero backend, zero dependencies except Chart.js (loaded dynamically from CDN for pie charts only).

**Price fetching**: Yahoo Finance via public CORS proxies (allorigins.win, corsproxy.io, codetabs.com). Tries v7 quote endpoint first (most accurate), falls back to v8 chart API, then Google Finance scrape. Parallel batches of 4 with retry pass. Cache-busting via `_b=timestamp` embedded in Yahoo URL to defeat proxy caching. iOS-safe: uses `Promise.race` not `AbortSignal.timeout`.

**Name resolution**: after every price refresh, stocks where `companyName === ticker` (i.e. name was never resolved) are retried via a separate lightweight lookup. Hardcoded overrides in `TICKER_NAME_LOCK` for tickers where Yahoo proxies return abbreviated names.

**FX rates**: USD/SGD, EUR/SGD, THB/SGD — editable in FX bar on Overview tab, persisted in localStorage, fetchable via Yahoo (`USDSGD=X` etc.). Always verify FX rates before recording a snapshot — rate changes affect all THB and USD-denominated assets.

**Data storage**: `localStorage` key `pf2_v2` — unified JSON payload (stocks, assets, snapshots, FX rates, goal settings). `saveAll()` writes on every change. `loadAll()` on startup.

**Retirement projection**: two-stream model. Investable assets (stocks + cash) compound at user's chosen return rate. CPF at 3% blended, Singapore property at 2%, Thai property at 1.5%, insurance at 1.5%. Monthly savings needed is calculated as the FV contribution required to close the gap between projected multi-rate total and the nest egg target — not applied to total net worth.
