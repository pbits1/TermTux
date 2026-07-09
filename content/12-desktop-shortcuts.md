---
title: "Desktop Shortcuts"
section: 1
category: 12
description: "Create and configure .desktop shortcut files for launching applications."
icon: "display"
tags: ["desktop", "shortcuts", "launcher", "gnome", ".desktop"]
---

# Desktop Shortcuts (.desktop files)

`.desktop` files are Linux's version of application shortcuts. They tell the system how to launch an app, what icon to show, and where it appears in menus.

---

## `.desktop` file structure

A `.desktop` file follows this format:

```bash
[Desktop Entry]
Type=Application
Name=App Name
Comment=Description
Exec=/path/to/script.sh
Icon=/path/to/icon.png
Terminal=false
Categories=Network;
StartupNotify=true
```

---

## Making it launchable

After creating the `.desktop` file, make it executable and trusted:

```bash
chmod +x filename.desktop
```

```bash
gio set filename.desktop metadata::trusted true
```

> **💡 Tip:** The `gio set` command is GNOME-specific. Without it, you'll see a warning when you try to double-click the file.
