---
title: "Bluetooth Troubleshooting"
section: 1
category: 4
description: "Fix common Bluetooth issues — restart the service, unblock devices, and check status."
icon: "settings"
tags: ["bluetooth", "troubleshooting", "rfkill", "wireless", "hardware"]
---

# Bluetooth Troubleshooting

Bluetooth acting up? These commands will help you restart the service, check for software blocks, and get things connected again.

---

## `sudo systemctl restart bluetooth`

Restart the Bluetooth service.

```bash
sudo systemctl restart bluetooth
```

---

## `rfkill unblock bluetooth`

Unblock Bluetooth if it's been soft-blocked (disabled via software).

```bash
rfkill unblock bluetooth
```

---

## `rfkill list`

Show all wireless devices and whether they are blocked.

```bash
rfkill list
```
