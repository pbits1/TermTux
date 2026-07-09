---
title: "Google Chrome"
section: 3
category: 33
description: "Install Google Chrome browser on Ubuntu"
icon: "download"
tags: ["chrome", "browser", "google", "install", "web", "deb"]
---

# Google Chrome

## What is it?

Google's web browser. Not in Ubuntu's default repos because it's proprietary. You need to add Google's repository manually.

---

## Installation — Download the .deb Package from Google

### Step 1: Download the .deb package directly from Google

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

### Step 2: Install it

`dpkg` installs .deb files — like running an .exe on Windows.

```bash
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### Step 3: If there are dependency errors, fix them with:

```bash
sudo apt --fix-broken install
```

### Step 4: Clean up the downloaded file

```bash
rm google-chrome-stable_current_amd64.deb
```

### Launch:

```bash
google-chrome
```

> **💡 Tip:** Installing Chrome also adds Google's repository to your system, so future updates come through `sudo apt upgrade` automatically.
