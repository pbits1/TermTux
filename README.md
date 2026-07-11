# TermTux 🐧

A high-performance, searchable Linux commands reference portal and developer utility hub. Engineered with vanilla HTML5, CSS3, and JavaScript, it features an interactive design inspired by Ubuntu's Yaru desktop theme.

Visit the live site: **[https://termtux.pages.dev](https://termtux.pages.dev)**

---

## ⚡ Core Features

- **1,000+ Commands** organized systematically across **77 Categories** and **6 Parent Sections** (from basics to Docker, systemd, SSH, and troubleshooting).
- **Interactive Developer Tools:**
  - **chmod Calculator:** Visually toggle file permissions to dynamically compute octal codes (`755`, `600`), symbolic flags (`rwxr-xr-x`), and copy ready-to-run commands.
  - **Crontab Schedule Builder:** Slide selectors to construct cron expressions with real-time natural English translations (e.g. `"Runs: At 02:00 AM, only on Sunday"`).
  - **tar Archiver Builder:** Visually build compress, extract, and file-listing commands with detailed breakdowns of cryptic flag arguments (`-czvf` vs `-xzvf`).
- **Fuzzy Search Engine:** Tap `Ctrl + K` (or `Cmd + K`) from anywhere to search commands, descriptions, or tags instantly. Press `Escape` to close and clear.
- **Progressive Web App (PWA):** Installs directly as a standalone app on your Desktop or Mobile home screen with complete **offline functionality** powered by Service Worker caching.
- **Visual Excellence:** High-contrast Dark and Light modes featuring smooth micro-animations, vestibular motion controls (`prefers-reduced-motion`), and responsive design for mobile, tablet, and widescreen layouts.

---

## 🏗️ Architecture & Decoupled Content

TermTux uses a decoupled Single Page Application (SPA) structure:

```
TermTux/
├── content/              # Command database (Individual Markdown files)
├── css/                  # Styling modules (yaru-tokens, layout, components, animations)
├── js/
│   ├── categories.js     # Registry mapping categories, descriptions, & search tags
│   ├── markdown-renderer.js # Regex-based custom markdown-to-HTML parser
│   └── app.js            # Router, search engine, theme manager, and dynamic rendering
├── tools.html            # Interactive chmod/cron/tar generators dashboard
├── index.html            # Main site entrypoint and search hub
├── category.html         # Template page for documentation rendering
└── sw.js                 # Service worker caching and offline interception
```

### Content Pipeline
To add or modify commands:
1. **Add Markdown:** Create or edit a `.md` file inside the `content/` directory.
2. **Register Entry:** Reference the file inside the central registry array in `js/categories.js` (specifying a unique ID, title, description, and tags). The custom markdown parser (`markdown-renderer.js`) handles rendering at runtime.

---

## 🚀 Running Locally

Because TermTux is static, you can run it locally with zero dependencies or node server bloat.

### Using Python
```bash
python3 -m http.server 8000
```

### Using Node (npx)
```bash
npx http-server -p 8000
```

Once running, open **`http://localhost:8000`** in your browser.