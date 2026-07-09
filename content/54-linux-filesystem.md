---
title: "The Linux Filesystem Explained"
section: 5
category: 54
description: "Understand the Linux directory structure and hierarchy."
icon: "folder"
tags: ["filesystem", "directories", "structure", "fhs", "deep-dive"]
---

# The Linux Filesystem Explained

In Windows, you have C:\, D:\, E:\ drives. In Linux, **EVERYTHING** is under one root: `/`

---

## Directory Structure

| Directory | Purpose |
| --- | --- |
| `/` | Root of the entire filesystem (like C:\) |
| `/home/` | All user folders (like C:\Users) |
| `/home/parth-s/` | YOUR personal folder (Desktop, Documents, Downloads, etc.) |
| `/home/parth-s/.config/` | Hidden app settings (starts with `.`) |
| `/home/parth-s/.bashrc` | Your terminal configuration |
| `/etc/` | System configuration files (like Windows Registry, but readable text files) |
| `/usr/` | User programs and libraries |
| `/usr/bin/` | Installed program executables |
| `/usr/share/` | Shared data (icons, docs, etc.) |
| `/opt/` | Optional/third-party software (Chrome, VS Code often install here) |
| `/var/` | Variable data (logs, databases, caches) |
| `/var/log/` | System log files |
| `/tmp/` | Temporary files (cleared on reboot) |
| `/dev/` | Device files — every hardware device is a "file" in Linux! |
| `/proc/` | Virtual filesystem showing running processes |
| `/sys/` | Virtual filesystem for hardware info |
| `/boot/` | Boot loader files (kernel, GRUB) |
| `/mnt/` | Manual mount point for drives |
| `/media/` | Auto-mounted USB drives and CDs |
| `/snap/` | Snap package mountpoints |

---

## Key Differences from Windows

- No drive letters (C:, D:). Everything is under `/`
- Hidden files start with a dot: `.bashrc`, `.config`
- Path separator is `/` (forward slash), not `\` (backslash)
- Linux is **CASE SENSITIVE**: `File.txt` ≠ `file.txt` ≠ `FILE.TXT`
