---
title: "Reboot / Shutdown"
section: 2
category: 13
description: "Restart, shut down immediately, schedule tasks, or manage power states (Sleep vs. Hibernation)."
icon: "settings"
tags: ["reboot", "shutdown", "restart", "power", "sleep", "hibernate", "boot-speed"]
---

# Reboot / Shutdown

Power management from the command line — restart, shut down, analyze boot times, or test sleep and hibernation states.

---

## 1. Core Power Commands

```bash
# Restart the computer immediately
sudo reboot

# Shut down the computer immediately
sudo shutdown now

# Schedule a shutdown in 10 minutes
sudo shutdown -h +10

# Cancel a scheduled shutdown
sudo shutdown -c
```

---

## 2. Analyzing Boot Speed

Linux boots extremely fast, but you can analyze what services are slowing it down:

```bash
# See how long the last boot took (Kernel vs. Userspace)
systemd-analyze

# Show a detailed list of services sorted by how long they took to start
systemd-analyze blame
```

---

## 3. Power States: Sleep vs. Hibernation vs. Fast Startup

Windows and Linux handle low-power states differently. Here is how they behave:

### Sleep (Suspend-to-RAM)
* **What it is:** Keeps your session (open apps, tabs) stored in RAM while putting the CPU and disk to sleep.
* **Linux Status:** **Enabled by default.** Closing your laptop lid or selecting "Suspend" uses this. It resumes almost instantly.
* **Command:**
  ```bash
  systemctl suspend
  ```

### Hibernation (Suspend-to-Disk)
* **What it is:** Saves your session from RAM onto your hard drive (specifically inside your **Swap** space) and powers the system completely off.
* **Linux Status:** **Disabled by default.**
* **Why?** It requires a Swap space larger than your physical RAM size, can be unreliable on certain graphics card drivers, and is blocked by secure boot.
* **How to test if your hardware supports it:**
  ```bash
  sudo systemctl hibernate
  ```

> [!WARNING]
> **SAVE YOUR WORK BEFORE TESTING HIBERNATION:**
> Running `sudo systemctl hibernate` can cause data loss or freeze your system if hibernation is not properly supported by your hardware or Swap configuration. Make sure all open documents are saved.

### Fast Startup (Windows Hybrid Boot)
* **What it is:** Windows logs you out, saves the Kernel state to a file, and shuts down to speed up subsequent boots.
* **Linux Status:** **Not available/Not needed.** The Linux kernel is modular and boots natively on SSDs without needing to load cache files.

---

## 4. Troubleshooting Sleep Issues

If your laptop does not suspend when the lid is closed, you can check which system files are inhibiting sleep:

```bash
# View active system power inhibitors
systemd-inhibit --list
```
