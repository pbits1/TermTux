---
title: "htop (Task Manager)"
section: 4
category: 47
description: "Install htop — an interactive, colorful process viewer"
icon: "settings"
tags: ["htop", "process", "task-manager", "monitor", "system", "install"]
---

# htop (Task Manager Alternative)

## What is it?

An interactive, colorful process viewer — way better than the built-in System Monitor. Shows CPU, RAM, swap usage per core. You can search, filter, sort, and kill processes live.

---

## Installation

```bash
sudo apt install htop
```

---

## Launch

```bash
htop
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F5` | Tree view (show parent-child processes) |
| `F6` | Sort by column (CPU, MEM, etc.) |
| `F9` | Kill a selected process |
| `F10` / `q` | Quit |
| `/` | Search for a process by name |
| `u` | Filter by user |
