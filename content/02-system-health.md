---
title: "System Health & Monitoring"
section: 2
category: 2
description: "Monitor system uptime, memory, disk space, and running processes."
icon: "display"
tags: ["monitoring", "uptime", "memory", "disk", "cpu", "processes", "health"]
---

# System Health & Monitoring

Keep an eye on your system's vital signs — uptime, memory usage, disk space, and which processes are hogging resources.

---

## `uptime`

Shows how long the system has been running, number of users, and load averages (1 min, 5 min, 15 min).

```bash
uptime
```

---

## `free -h`

Display RAM and swap usage in human-readable format (GB/MB).

```bash
free -h
```

---

## `df -h / /home`

Show disk space usage for root (`/`) and `/home` partitions.

```bash
df -h / /home
```

---

## `ps aux --sort=-%cpu | head -10`

List top 10 processes by CPU usage.

```bash
ps aux --sort=-%cpu | head -10
```

---

## `ps aux --sort=-%mem | head -10`

List top 10 processes by memory usage.

```bash
ps aux --sort=-%mem | head -10
```

---

## `systemctl --failed`

Show all systemd services that failed to start.

```bash
systemctl --failed
```
