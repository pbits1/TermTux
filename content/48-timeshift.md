---
title: "Timeshift (System Restore)"
section: 4
category: 48
description: "Install Timeshift — system backup and restore tool (HIGHLY RECOMMENDED!)"
icon: "clock"
tags: ["timeshift", "backup", "restore", "snapshot", "system", "install", "safety"]
---

# Timeshift (System Restore — HIGHLY RECOMMENDED!)

## What is it?

System backup and restore tool — exactly like "System Restore" in Windows. Creates snapshots of your system that you can roll back to if something breaks. **ESSENTIAL for new Linux users!**

---

## Installation

```bash
sudo apt install timeshift
```

---

## Usage

```bash
# Launch the GUI
sudo timeshift-gtk

# Create a snapshot from terminal
sudo timeshift --create --comments "Before risky changes"

# List snapshots
sudo timeshift --list

# Restore a snapshot
sudo timeshift --restore
```

---

## Setup Guide

1. Open Timeshift
2. Choose **RSYNC** (works on all filesystems)
3. Select your main drive
4. Set schedule: **Weekly + keep 3 snapshots**
5. Click **"Create"** to make your first snapshot

---

> **⚠️ Warning:** ALWAYS create a snapshot before:
> - Major system upgrades
> - Adding PPAs
> - Installing experimental software
> - Editing system config files
