---
title: "File & Permission Management"
section: 1
category: 8
description: "Make files executable, check permissions, and trust desktop files."
icon: "shield"
tags: ["permissions", "chmod", "executable", "desktop", "gnome"]
---

# File & Permission Management

Control who can read, write, and execute files on your system.

---

## `chmod +x filename.sh`

Make a file executable (so it can be run as a script).

```bash
chmod +x filename.sh
```

---

## `ls -la`

List all files (including hidden) with permissions, owner, size, date.

```bash
ls -la
```

---

## `gio set file.desktop metadata::trusted true`

Mark a `.desktop` file as trusted so it launches on double-click (GNOME-specific).

```bash
gio set file.desktop metadata::trusted true
```
