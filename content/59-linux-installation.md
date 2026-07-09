---
title: "Ubuntu Installation Guide"
section: 5
category: 59
description: "Step-by-step guide to installing Ubuntu Linux (Dual boot, UEFI, partitioning)."
icon: "hard-drive"
tags: ["install", "ubuntu", "dual-boot", "partition", "uefi", "bios", "usb", "bootloader"]
---

# Ubuntu Installation Guide

A complete, step-by-step walkthrough to flashing and installing Ubuntu Linux on your computer, including partitioning and dual-boot configurations.

---

## 1. Prerequisites

Before starting, make sure you have:
* A **USB flash drive** (8GB or larger) — *Note: This drive will be erased.*
* The latest **Ubuntu ISO image** (Download the LTS version from [ubuntu.com/download/desktop](https://ubuntu.com/download/desktop)).
* A backup of your important files (just in case).

---

## 2. Creating a Bootable USB

You need to write the downloaded ISO file to your USB drive so your computer can boot from it.

### On Windows
1. Download **Rufus** (free tool from [rufus.ie](https://rufus.ie)).
2. Plug in your USB drive and open Rufus.
3. Select your USB drive under **Device**.
4. Click **Select** and choose the downloaded Ubuntu `.iso` file.
5. Keep **Partition scheme** as `GPT` and **Target system** as `UEFI`.
6. Click **Start** and select "Write in ISO Image mode".

### On macOS / Linux
1. Download **balenaEtcher** (free tool from [etcher.balena.io](https://etcher.balena.io)).
2. Connect your USB drive and open balenaEtcher.
3. Click **Flash from file** and select the Ubuntu `.iso`.
4. Click **Select target** and choose your USB drive.
5. Click **Flash!**

---

## 3. Configuring BIOS/UEFI Settings

1. Shut down your PC completely.
2. Turn it on and immediately press your motherboard's BIOS key repeatedly (typically `F2`, `F12`, `Delete`, or `Esc` depending on your brand).
3. Find the **Boot Menu** and set your boot mode to **UEFI** (disable Legacy/CSM boot).
4. If you plan to dual-boot with Windows, you may need to disable **Secure Boot** (optional, but highly recommended for driver compatibility).
5. Change the boot order so your USB drive is the **first** device.
6. Save settings and restart (usually `F10`).

---

## 4. The Installation Steps

Once your PC boots from the USB, you will see the Ubuntu Welcome screen:

1. Select your language and click **Install Ubuntu**.
2. Choose your keyboard layout.
3. Select **Normal installation** (includes browser, office tools, media players) or **Minimal installation**.
4. Check **Install third-party software for graphics and Wi-Fi hardware** (critical for Nvidia graphics cards and proprietary Wi-Fi chips).

---

## 5. Partitioning (Installation Type)

This is the most critical step. Choose one of the following options:

### Option A: Erase Disk and Install Ubuntu (Easiest)
* **When to use:** If you want Linux to be the ONLY operating system on this drive.
* **What it does:** Automatically erases all existing data and configures partitions.

### Option B: Install Alongside Windows (Automatic Dual Boot)
* **When to use:** If you want to keep Windows and choose which OS to run at boot.
* **What it does:** Automatically shrinks your Windows partition to make space for Ubuntu.

### Option C: Something Else (Manual Partitioning)
* **When to use:** Advanced users who want custom sizes for system folders.
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

Once logged into your new Ubuntu desktop, run these initial commands in the terminal:

```bash
# 1. Update the system package lists and upgrade packages
sudo apt update && sudo apt upgrade -y

# 2. Install essential codecs (if skipped during setup)
sudo apt install ubuntu-restricted-extras -y
```
