---
title: "Swap Management"
section: 2
category: 71
description: "Create, resize, monitor, and tune swap space on Linux for better memory management."
icon: "zap"
tags: ["swap", "memory", "swapfile", "swapon", "swapoff", "performance"]
---

# Swap Management

Swap is disk space that the kernel uses as overflow when RAM is full. It also handles hibernation on many systems.

---

## 1. Check Current Swap Usage

View which swap devices or files are active and their sizes.

```bash
swapon --show
```

---

## 2. Check Swap with free

Shows total, used, and free swap alongside RAM.

```bash
free -h
```

---

## 3. Create a Swap File

Create a 2 GB swap file and activate it.

```bash
# Create a 2 GB empty file
sudo fallocate -l 2G /swapfile

# Or use dd if fallocate is not available
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048

# Set correct permissions (only root should read it)
sudo chmod 600 /swapfile

# Format the file as swap
sudo mkswap /swapfile

# Activate the swap file
sudo swapon /swapfile
```

---

## 4. Make Swap Permanent

Add the swap file to `/etc/fstab` so it's available after reboot.

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 5. Disable Swap

Turn off a swap file or partition.

```bash
sudo swapoff /swapfile
```

---

## 6. Remove a Swap File

Disable swap, then delete the file.

```bash
sudo swapoff /swapfile
sudo rm /swapfile
```

---

## 7. Adjust Swappiness

Swappiness (0–100) controls how aggressively the kernel uses swap. Lower values prefer RAM; higher values free RAM sooner.

```bash
# View current swappiness
cat /proc/sys/vm/swappiness

# Temporarily set to 10 (use RAM more before swapping)
sudo sysctl vm.swappiness=10

# Make permanent
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

> **💡 Tip:** For desktops with plenty of RAM, try swappiness=10. For servers, 1 is common. The default is 60.

---

## 8. Monitor Swap Pressure

Watch swap activity in real time — `si` (swap in) and `so` (swap out) columns tell you if swapping is happening.

```bash
vmstat 1
```

---

## 9. Create a Swap Partition

If you prefer a dedicated swap partition over a file:

```bash
# Create the partition with fdisk, then:
sudo mkswap /dev/sdX2
sudo swapon /dev/sdX2
```

---

## 10. Check Swap Usage by Process

```bash
# Top processes using swap (requires root)
sudo top -o %MEM

# Check /proc status for a specific process
cat /proc/[PID]/status | grep -i swap
```