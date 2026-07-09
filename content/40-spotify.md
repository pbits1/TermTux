---
title: "Spotify"
section: 4
category: 40
description: "Install Spotify — music streaming service for Linux"
icon: "music"
tags: ["spotify", "music", "streaming", "audio", "install"]
---

# Spotify (Music Streaming)

## What is it?

Music streaming service. The Linux app works great and syncs with your Spotify account, playlists, and downloads.

---

## METHOD 1 — Via Snap (Easiest)

```bash
sudo snap install spotify
```

---

## METHOD 2 — Via apt (Official Repository)

```bash
# Add Spotify's GPG key
curl -sS https://download.spotify.com/debian/pubkey_C85668DF69375001.gpg | sudo gpg --dearmor --yes -o /etc/apt/trusted.gpg.d/spotify.gpg

# Add the repository
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list

# Update and install
sudo apt update
sudo apt install spotify-client
```

---

## Launch

```bash
spotify
```
