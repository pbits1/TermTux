---
title: "Reboot / Shutdown"
section: 1
category: 13
description: "Restart, shut down, or schedule a shutdown for your system."
icon: "settings"
tags: ["reboot", "shutdown", "restart", "power"]
---

# Reboot / Shutdown

Power management from the command line — restart, shut down immediately, or schedule it for later.

---

## `sudo reboot`

Restart the computer.

```bash
sudo reboot
```

---

## `sudo shutdown now`

Shut down immediately.

```bash
sudo shutdown now
```

---

## `sudo shutdown -h +10`

Schedule shutdown in 10 minutes.

```bash
sudo shutdown -h +10
```

> **💡 Tip:** You can cancel a scheduled shutdown with `sudo shutdown -c`.
