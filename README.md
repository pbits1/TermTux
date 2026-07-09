# TermTux

A comprehensive, searchable reference guide for Linux commands, tools, and fixes. 

Built for Ubuntu users, this directory contains 400+ commands organized across 58 categories, presented with a beautiful Yaru (Ubuntu) inspired design system.

## Features

- **58 Categories** covering everything from basic navigation to Docker and system health
- **Yaru Theme** with dark/light mode toggle based on Ubuntu's official design language
- **Searchable** — Quickly find the exact command you need
- **One-click Copy** — Easily copy commands to your clipboard
- **Static & Fast** — Built with vanilla HTML/CSS/JS for instant load times (no framework bloat)

## Development

This is a static site with a custom markdown renderer. The commands are stored as markdown files in the `/content` directory.

### Running Locally

You can use any local web server to run the site:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is designed to be hosted on **Cloudflare Pages**. Since it's a completely static site with no build step required, you can simply connect this GitHub repository to Cloudflare Pages and set the root directory as the output directory.

## Contributing

To add new commands or categories:
1. Add a new `.md` file to the `/content` directory
2. Update the `sections` array in `js/categories.js` to include the new file.
