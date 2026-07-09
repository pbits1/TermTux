---
title: "Linux Installation Guide"
section: 1
category: 59
description: "Step-by-step guide to choosing a distro and installing Linux (Dual boot, UEFI, partitioning)."
icon: "hard-drive"
tags: ["install", "ubuntu", "distros", "dual-boot", "partition", "uefi", "bios", "usb"]
---

# Linux Installation Guide

Before you can run commands, you need to install Linux. This guide covers how to choose a Linux distribution (distro) and install it on your machine.

---

## 1. What is a Linux Distribution (Distro)?

Linux is not a single operating system. It is a **kernel** (the core engine). A **Distribution (Distro)** is a complete operating system built on top of the Linux kernel, including a desktop interface, package manager, and pre-installed software.

Different distros are tailored for different needs:

* **Ubuntu** — The most popular distro. Great support, highly stable, and widely used by developers.
* **Linux Mint** — Excellent for beginners migrating from Windows. Its interface looks and feels like Windows.
* **Fedora** — Sponsored by Red Hat. Always includes the latest software features and clean designs.
* **Debian** — Extremely stable and rock-solid. The foundation that Ubuntu itself is built upon.
* **Arch Linux** — A lightweight, DIY distro for advanced users. You install and configure everything manually.

### Distro Download Links
* Download [Ubuntu Desktop LTS](https://ubuntu.com/download/desktop) (Recommended)
* Download [Linux Mint Cinnamon](https://linuxmint.com/download.php) (Best Windows alternative)
* Download [Fedora Workstation](https://fedoraproject.org/workstation/download) (For modern packages)
* Download [Debian Netinst](https://www.debian.org/distrib/) (For server or extreme stability)
* Download [Arch Linux](https://archlinux.org/download/) (For advanced users)

---

## 2. Prerequisites

* A **USB flash drive** (8GB or larger) — *Note: This drive will be erased.*
* The downloaded `.iso` file of your chosen distro from the links above.
* A backup of your important files (just in case).

---

## 3. Creating a Bootable USB

You need to write the downloaded ISO file to your USB drive so your computer can boot from it.

### On Windows
1. Download **Rufus** (free tool from [rufus.ie](https://rufus.ie)).
2. Plug in your USB drive and open Rufus.
3. Select your USB drive under **Device**.
4. Click **Select** and choose the downloaded `.iso` file.
5. Keep **Partition scheme** as `GPT` and **Target system** as `UEFI`.
6. Click **Start** and select "Write in ISO Image mode".

### On macOS / Linux
1. Download **balenaEtcher** (free tool from [etcher.balena.io](https://etcher.balena.io)).
2. Connect your USB drive and open balenaEtcher.
3. Click **Flash from file** and select the `.iso`.
4. Click **Select target** and choose your USB drive.
5. Click **Flash!**

---

## 4. Configuring BIOS/UEFI Settings

1. Shut down your PC completely.
2. Turn it on and immediately press your motherboard's BIOS key repeatedly (typically `F2`, `F12`, `Delete`, or `Esc` depending on your brand).
3. Find the **Boot Menu** and set your boot mode to **UEFI** (disable Legacy/CSM boot).
4. If you plan to dual-boot with Windows, you may need to disable **Secure Boot** (optional, but highly recommended for driver compatibility).
5. Change the boot order so your USB drive is the **first** device.
6. Save settings and restart (usually `F10`).

---

## 5. Partitioning (Installation Type)

When the installer boots, it will ask where to install the files:

### Option A: Erase Disk and Install (Easiest)
* **When to use:** If you want Linux to be the ONLY operating system on this drive.
* **What it does:** Automatically erases all existing data and configures partitions.

### Option B: Install Alongside Windows (Automatic Dual Boot)
* **When to use:** If you want to keep Windows and choose which OS to run at boot.
* **What it does:** Automatically shrinks your Windows partition to make space for Linux.

### Option C: Something Else (Manual Partitioning)
* **Recommended Manual Partitions (for a 100GB space):**
  1. **EFI System Partition** (Size: `500MB`, Type: `Primary`, Location: `Beginning of space`). Used for boot files.
  2. **Root Partition `/`** (Size: `30GB - 50GB`, Format: `Ext4`, Mount Point: `/`). Stores operating system files.
  3. **Home Partition `/home`** (Size: `Remaining space`, Format: `Ext4`, Mount Point: `/home`). Stores your personal files and settings.
  4. **Swap area** (Size: Equal to your RAM size, Mount Point: `swap`). Virtual memory backup.

---

## 6. Finishing Up

1. Choose your **Timezone** on the map.
2. Enter your details:
   * **Your Name** and **Computer's Name**
   * **Username** (lowercase, no spaces)
   * **Password** (make sure it's secure; you will use this for `sudo` commands)
3. Wait for the installation to finish (usually 10-15 minutes).
4. Click **Restart Now** and remove the USB drive when prompted.

---

## 7. Post-Installation Checklist

Once logged into your new Linux desktop, run these initial commands in the terminal:

```bash
# Update the system package lists and upgrade packages (Ubuntu/Debian-based)
sudo apt update && sudo apt upgrade -y

# Update system packages (Fedora)
sudo dnf upgrade -y

# Update system packages (Arch Linux)
sudo pacman -Syu
```
