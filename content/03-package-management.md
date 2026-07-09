---
title: "Package Management (APT)"
section: 1
category: 3
description: "Manage software packages using Ubuntu's APT package manager — update, upgrade, and clean up."
icon: "package"
tags: ["apt", "packages", "update", "upgrade", "drivers", "software"]
---

# Package Management (APT)

APT (Advanced Package Tool) is Ubuntu's built-in package manager. Use it to install, update, and remove software — like a command-line version of the Microsoft Store.

---

## `sudo apt update`

Refresh the package lists from repositories (check for new updates).

```bash
sudo apt update
```

---

## `sudo apt upgrade -y`

Install all available upgrades. The `-y` flag auto-confirms.

```bash
sudo apt upgrade -y
```

---

## `apt list --upgradable`

List all packages that have updates available (without installing).

```bash
apt list --upgradable
```

---

## `sudo apt autoremove -y`

Remove packages that were installed as dependencies but are no longer needed.

```bash
sudo apt autoremove -y
```

---

## `sudo apt autoclean -y`

Clear out old downloaded package files from the apt cache.

```bash
sudo apt autoclean -y
```

---

## `sudo ubuntu-drivers install`

Auto-detect and install the recommended hardware drivers (GPU, Wi-Fi, etc.).

```bash
sudo ubuntu-drivers install
```
