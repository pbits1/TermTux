---
title: "Common Problems & Fixes"
section: 5
category: 57
description: "Solutions for the most common Ubuntu/Linux problems."
icon: "alert-triangle"
tags: ["problems", "fixes", "troubleshooting", "errors", "deep-dive"]
---

# Common Problems & Fixes

Quick solutions for the issues you'll run into most often on Ubuntu.

---

## "Permission denied"

**Cause:** You're trying to do something that needs admin access.

```bash
# Fix: Add 'sudo' before the command
sudo command_name
```

---

## "Command not found"

**Cause:** The program isn't installed, or isn't in your PATH.

```bash
# Fix: Install it
sudo apt install program_name

# Or check if it exists
which program_name
```

---

## "Unable to locate package"

**Cause:** Package list is outdated or package doesn't exist.

```bash
# Fix: Update package list first
sudo apt update

# Then try again. If still fails, search for the correct name
apt search keyword
```

---

## "dpkg was interrupted"

**Cause:** A previous install was interrupted.

```bash
# Fix:
sudo dpkg --configure -a
sudo apt --fix-broken install
```

---

## "E: Could not get lock /var/lib/dpkg/lock"

**Cause:** Another program is using apt (Software Updater, etc.)

```bash
# Fix: Wait for it to finish, or force it:
sudo killall apt apt-get
sudo rm /var/lib/dpkg/lock-frontend
sudo dpkg --configure -a
```

---

## "No space left on device"

**Cause:** Disk is full.

```bash
# Remove unused packages
sudo apt autoremove

# Clear apt cache
sudo apt autoclean

# Shrink system logs
sudo journalctl --vacuum-size=100M

# Find what's eating space
ncdu /
```

---

## "Broken packages"

```bash
# Fix:
sudo apt --fix-broken install
sudo dpkg --configure -a
sudo apt update
```

---

## Wi-Fi not working after install

```bash
# Fix:
sudo ubuntu-drivers install
sudo systemctl restart NetworkManager
```

---

## No sound

```bash
# Check if muted
pactl list sinks | grep -i mute

# Unmute
pactl set-sink-mute @DEFAULT_SINK@ 0

# Restart audio
systemctl --user restart pipewire
```

---

## Screen resolution wrong

```bash
# List available modes
xrandr

# Set correct resolution
xrandr --output HDMI-1 --mode 1920x1080
```

---

## USB drive not showing up

```bash
# Check if detected
lsblk

# See all disks
sudo fdisk -l

# Manually mount
sudo mount /dev/sdb1 /mnt
```

---

## App won't launch (no error shown)

```bash
# Run it from terminal to see error messages
/path/to/app

# Or with verbose output
app-name --verbose
```
