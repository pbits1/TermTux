---
title: "Google Antigravity (AI Coding Assistant)"
section: 4
category: 35
description: "Install Google Antigravity — an AI-powered desktop coding assistant"
icon: "code"
tags: ["antigravity", "google", "ai", "coding", "assistant", "install"]
---

# Google Antigravity (AI Coding Assistant)

## What is it?

Google's AI-powered coding assistant. A desktop app that helps you write code, debug, manage files, and automate tasks using AI.

---

## METHOD 1 — Via .deb Package (If Downloaded from Google)

```bash
# Install the downloaded .deb file
sudo dpkg -i antigravity-*.deb
sudo apt --fix-broken install
```

---

## METHOD 2 — Via Extracted AppImage/Binary

```bash
# Run the extracted binary from your terminal:
~/Antigravity-x64/antigravity --no-sandbox
```

> [!WARNING]
> **SECURITY RISK:**
> The `--no-sandbox` flag disables the Chromium security sandbox. Only use this if you encounter startup or execution sandbox errors.

> **💡 Tip:** To create a desktop shortcut, create a `.desktop` file — see Section 12 for the `.desktop` file format.

---

## Auto-Updates

If you installed via the `.deb` package, your apt repository is configured to receive updates from:

```text
https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev
```
