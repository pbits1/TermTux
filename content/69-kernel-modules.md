---
title: "Kernel & Modules"
section: 2
category: 69
description: "Manage Linux kernel modules, view hardware drivers, and configure kernel parameters at runtime."
icon: "settings"
tags: ["kernel", "modules", "lsmod", "modprobe", "modinfo", "sysctl", "hardware", "drivers"]
---

# Kernel & Modules

The Linux kernel is the core of your operating system. Kernel modules are drivers and features that can be loaded or unloaded on demand without rebooting.

---

## 1. Check the Kernel Version

This shows the installed kernel version — useful for verifying updates or checking compatibility with drivers.

```bash
uname -r
```

---

## 2. View Detailed Kernel Info

Shows the full kernel release string including architecture, hostname, and build date.

```bash
uname -a
```

---

## 3. List All Loaded Modules

Shows every kernel module currently loaded — equivalent to viewing all active drivers in Windows Device Manager.

```bash
lsmod
```

---

## 4. Get Info About a Module

Show description, dependencies, and parameters for a specific module.

```bash
modinfo module_name
```

---

## 5. Load a Kernel Module

Insert a module into the running kernel (e.g., enable a driver).

```bash
sudo modprobe module_name
```

---

## 6. Unload a Kernel Module

Remove a module from the running kernel.

```bash
sudo modprobe -r module_name
```

---

## 7. Blacklist a Module

Prevent a module from loading at boot (useful for conflicting drivers like `nouveau` vs NVIDIA).

```bash
echo "blacklist module_name" | sudo tee -a /etc/modprobe.d/blacklist.conf
```

---

## 8. View Kernel Ring Buffer Messages

Show kernel messages — useful for debugging hardware issues and driver failures.

```bash
dmesg

# Show recent messages and follow new ones
dmesg | tail -20

# Watch kernel messages in real time (requires root)
sudo dmesg -w
```

---

## 9. Configure Kernel Parameters at Runtime

`sysctl` lets you change kernel behavior without rebooting.

```bash
# View all kernel parameters
sysctl -a

# Enable IP forwarding (for router/NAT setups)
sudo sysctl net.ipv4.ip_forward=1

# View a specific parameter
sysctl net.ipv4.tcp_congestion_control

# Make changes permanent (edit /etc/sysctl.conf)
sudo nano /etc/sysctl.conf
```

---

## 10. Check CPU Architecture

View processor details including cores, threads, architecture, and cache.

```bash
# Detailed CPU architecture info
lscpu

# Show whether your system is 32-bit or 64-bit
uname -m
```