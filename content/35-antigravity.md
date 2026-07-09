---
title: "Google Antigravity (AI Coding Assistant)"
section: 3
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
# Your Antigravity is installed at:
/home/parth-s/Antigravity-x64/antigravity

# To run it:
/home/parth-s/Antigravity-x64/antigravity --no-sandbox
```

> **💡 Tip:** To create a desktop shortcut, create a `.desktop` file — see Section 12 for the `.desktop` file format.

---

## Auto-Updates

Antigravity updates automatically via its built-in updater. Your apt repo is already configured:

```
https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev
```
