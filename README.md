# TermTux

A comprehensive, searchable reference guide for Linux commands, tools, and fixes.

Visit the live site: **[https://termtux.pages.dev](https://termtux.pages.dev)**

---

## Features

- **77 Categories** covering everything from basic navigation to Docker, SSH, bash scripting, and system health.
- **500+ Commands** with one-click copy and code-block formatting.
- **Modern UI** with Ubuntu Yaru-inspired design and seamless dark/light mode toggle.
- **Advanced Search** — Press `Ctrl+K` to quickly find commands, tags, or descriptions.
- **Responsive** — Works on desktop, tablet, and mobile.
- **Static & Fast** — Built with vanilla HTML/CSS/JS for instant load times (no framework bloat).

---

## Running Locally

This is a static site with a client-side markdown renderer. Commands are stored as markdown files in the `/content` directory.

```bash
# Using Python
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Deployment

The site is hosted on **Cloudflare Pages**. Any push to the `main` branch automatically triggers a deployment.

---

## Contributing & Adding Content

To add new commands or categories:
1. Create a new `.md` file in the `/content` directory.
2. Add the metadata entry to the `sections` array in `js/categories.js` with the file ID, title, description, and search tags.