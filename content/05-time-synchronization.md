---
title: "Time Synchronization"
section: 1
category: 5
description: "Check and fix system time, timezone, and NTP synchronization."
icon: "clock"
tags: ["time", "ntp", "timezone", "chrony", "synchronization"]
---

# Time Synchronization

Keep your system clock accurate — important for security certificates, file timestamps, and scheduled tasks.

---

## `timedatectl status`

Show current date, time, timezone, and NTP sync status.

```bash
timedatectl status
```

---

## `timedatectl set-ntp true`

Enable automatic time sync via NTP.

```bash
timedatectl set-ntp true
```

---

## `chronyc makestep`

Force an immediate time synchronization (if using chrony).

```bash
chronyc makestep
```
