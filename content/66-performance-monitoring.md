---
title: "Performance Monitoring"
section: 2
category: 66
description: "Monitor CPU, memory, disk I/O, and network performance with iostat, vmstat, sar, and top."
icon: "display"
tags: ["performance", "iostat", "vmstat", "sar", "top", "monitoring", "cpu", "memory", "disk", "system"]
---

# Performance Monitoring

Beyond basic `uptime` and `ps`, these tools give you deep insight into what your system is doing at any moment.

---

## 1. `top` — Real-Time Process Viewer

Interactive process viewer updated every few seconds. Press `q` to quit.

```bash
top
```

---

## 2. `top` — Sort by Memory

Press `M` while running `top` to sort processes by memory usage instead of CPU.

```bash
top
```

> **💡 Tip:** Inside `top`: `M` = sort by memory, `P` = sort by CPU, `k` = kill a process, `u` = filter by user.

---

## 3. `htop` — Improved Top

Colorful, interactive version of top with mouse support and easier navigation.

```bash
sudo apt install htop
htop
```

---

## 4. `iostat` — CPU and I/O Statistics

Monitor CPU usage and disk I/O. Shows how busy each disk is.

```bash
# Install first
sudo apt install sysstat

# Basic CPU and disk stats
iostat

# Continuous output every 2 seconds (5 reports)
iostat 2 5

# Show only disk utilization
iostat -d 2
```

---

## 5. `vmstat` — System Memory, Processes, and CPU

A single command gives you a snapshot of processes, memory, paging, block I/O, traps, and CPU activity.

```bash
# Overall system summary
vmstat

# Continuous mode (every 2 seconds)
vmstat 2

# Show disk stats too
vmstat -d
```

---

## 6. `sar` — Historical Performance Data

Sysstat's data collector. View CPU, memory, and network trends from the past.

```bash
# View CPU usage from today's collected data
sar -u

# View memory usage
sar -r

# View disk I/O
sar -b

# View network stats
sar -n DEV
```

---

## 7. `free` — Memory Usage (Deep)

Already covered in basic monitoring, but worth knowing these flags.

```bash
# Human-readable (use -h)
free -h

# Show in megabytes
free -m

# Update every 2 seconds
free -s 2

# Show low vs high memory stats
free -l
```

---

## 8. `/proc/meminfo` — Raw Memory Details

The most detailed view of system memory available.

```bash
cat /proc/meminfo
```

---

## 9. `/proc/cpuinfo` — CPU Details

See every core, its speed, cache sizes, and flags.

```bash
cat /proc/cpuinfo
```

---

## 10. Check System Load

Load averages show how many processes are waiting for CPU, disk, or network.

```bash
# Quick load average (1, 5, 15 minutes)
uptime

# Show load from /proc directly
cat /proc/loadavg
```

---

## 11. Monitor Disk I/O per Process

Find which process is hammering your disk.

```bash
# Install iotop
sudo apt install iotop

# Run in real-time (requires root)
sudo iotop
```