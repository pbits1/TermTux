---
title: "Display & Screen"
section: 3
category: 24
description: "Manage display resolution, brightness, and screen settings."
icon: "monitor"
tags: ["display", "screen", "resolution", "brightness", "xrandr", "beginner"]
---

# Display & Screen

Configure monitor resolutions, open files/URLs in default apps, and capture screenshots.

---

## 1. List Display Outputs

View all connected monitors, default outputs, and supported resolutions.

```bash
xrandr
```

> **Note:** `xrandr` is an X11 tool. If you are using a modern Ubuntu release running Wayland by default, use system settings for display configuration.

---

## 2. Set Monitor Resolution

Change the resolution of a specific display output (e.g., HDMI-1) on X11.

```bash
xrandr --output HDMI-1 --mode 1920x1080
```

---

## 3. Open Files with Default Apps

Open a document or image with its registered system default application (like double-clicking it).

```bash
xdg-open file.pdf
```

---

## 4. Open URLs in Web Browser

Launch your default web browser and open a specific website link.

```bash
xdg-open https://google.com
```

---

## 5. Capture Screenshots

Take a screenshot of the entire desktop screen.

```bash
gnome-screenshot
```

> **Note:** `gnome-screenshot` is deprecated in Ubuntu 22.04+ (which uses a built-in interactive overlay tool instead). On newer versions, you can install it using `sudo apt install gnome-screenshot` if you need the CLI command.

---

## 6. Screenshot Selected Area

Interactively select a specific region of the screen to screenshot.

```bash
gnome-screenshot -a
```

---

## 7. Simulate Keyboard Keys

Programmatically trigger keyboard presses (requires `sudo apt install xdotool`).

```bash
xdotool key Print
```
