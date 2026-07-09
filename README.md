# TermTux

A comprehensive, searchable reference guide for Linux commands, tools, and fixes. 

Visit the live site: **[https://termtux.pages.dev](https://termtux.pages.dev)**

---

## Features

- **58 Categories** covering everything from basic navigation to Docker and system health.
- **Modern UI** with a seamless dark/light mode toggle.
- **Advanced Search** — Quickly find the exact command, tag, or description you need.
- **One-click Copy** — Easily copy commands straight to your clipboard.
- **Static & Fast** — Built with vanilla HTML/CSS/JS for instant load times (no framework bloat).

---

## Running Locally

This is a static single-page application (SPA) utilizing a client-side markdown renderer. The commands are stored as markdown files in the `/content` directory.

To run the site locally, start a local web server in the project directory:

```bash
# Using Python
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

---

## Deployment

The site is hosted on **Cloudflare Pages**. Since it's a completely static site with no build step required, any push to the `main` branch of this repository automatically triggers a deployment update on Cloudflare.

---

## Contributing & Adding Content

To add new commands or categories:
1. Create a new `.md` file in the `/content` directory.
2. Update the `sections` array in `js/categories.js` to include the new file ID, title, description, and search tags.
