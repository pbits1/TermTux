---
title: "System Logs"
section: 1
category: 1
description: "View and filter system logs using journalctl — the Linux equivalent of Windows Event Viewer."
icon: "terminal"
tags: ["logs", "journalctl", "debugging", "boot", "systemd", "troubleshooting"]
---

# System Logs

Linux uses `journalctl` to view system logs — think of it as the **Windows Event Viewer** equivalent. It's your go-to tool for debugging boot issues, service failures, and hardware problems.

---

## `journalctl -b`

Show all logs from the current boot session.

```bash
journalctl -b
```

---

## `journalctl -b -p err`

Show only **ERROR** level messages from current boot.

```bash
journalctl -b -p err
```

---

## `journalctl -b -p warning`

Show **WARNING** and above from current boot.

```bash
journalctl -b -p warning
```

---

## `journalctl -k -b`

Show only **KERNEL** messages (hardware, drivers) from current boot.

```bash
journalctl -k -b
```

---

## `journalctl -n 50`

Show the last 50 log entries.

```bash
journalctl -n 50
```

---

## `journalctl -f`

Live tail — watch logs in real-time (like Windows Event Viewer live mode).

```bash
journalctl -f
```

> **💡 Tip:** Press `Ctrl+C` to stop the live tail.

---

## `journalctl --since "1 hour ago"`

Show logs from the last 1 hour.

```bash
journalctl --since "1 hour ago"
```

---

## `journalctl --since "..." --until "..."`

Show logs within a specific time range.

```bash
journalctl --since "2025-07-09 10:00" --until "2025-07-09 14:00"
```

---

## `journalctl -u NetworkManager`

Show logs for a specific service (e.g., NetworkManager, bluetooth, ssh).

```bash
journalctl -u NetworkManager
```

---

## `journalctl -u bluetooth`

Show Bluetooth service logs specifically.

```bash
journalctl -u bluetooth
```

---

## `journalctl -t sshd`

Show SSH authentication logs (security).

```bash
journalctl -t sshd
```

---

## `journalctl --list-boots`

List all recorded boot sessions with timestamps.

```bash
journalctl --list-boots
```

---

## `journalctl --failed`

Show only failed services/units.

```bash
journalctl --failed
```
