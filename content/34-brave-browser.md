---
title: "Brave Browser"
section: 3
category: 34
description: "Install Brave — a privacy-focused browser built on Chromium"
icon: "shield"
tags: ["brave", "browser", "privacy", "chromium", "install", "web"]
---

# Brave Browser

## What is it?

A privacy-focused browser built on Chromium (same engine as Chrome). Blocks ads and trackers by default, uses less RAM than Chrome.

---

## Installation — Via Brave's Official Repository

### Step 1: Download Brave's GPG key

```bash
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg \
  https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
```

### Step 2: Add Brave's repository

```bash
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | \
  sudo tee /etc/apt/sources.list.d/brave-browser-release.list
```

### Step 3: Install

```bash
sudo apt update
sudo apt install brave-browser
```

### Launch:

```bash
brave-browser
```
