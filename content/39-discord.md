---
title: "Discord"
section: 4
category: 39
description: "Install Discord — voice, video, and text chat platform"
icon: "chat"
tags: ["discord", "chat", "voice", "gaming", "community", "install"]
---

# Discord

## What is it?

Voice, video, and text chat platform. Used by gamers, communities, and developers for group communication.

---

## METHOD 1 — Download .deb from Website

```bash
wget "https://discord.com/api/download?platform=linux&format=deb" -O discord.deb
sudo dpkg -i discord.deb
sudo apt --fix-broken install
rm discord.deb
```

---

## METHOD 2 — Via Snap

```bash
sudo snap install discord
```

---

## METHOD 3 — Via Flatpak

```bash
flatpak install flathub com.discordapp.Discord
```

---

## Launch

```bash
discord
```
