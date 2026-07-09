---
title: "System Services (systemctl)"
section: 2
category: 20
description: "Start, stop, enable, and manage system services with systemctl."
icon: "settings"
tags: ["systemctl", "services", "systemd", "enable", "disable", "start", "stop", "beginner"]
---

# System Services (systemctl)

Services are background programs that keep your system running — things like Bluetooth, networking, and web servers. Use `systemctl` to control them.

---

## `sudo systemctl start servicename`

Start a service (e.g., bluetooth, apache2, nginx).

```bash
sudo systemctl start servicename
```

---

## `sudo systemctl stop servicename`

Stop a service.

```bash
sudo systemctl stop servicename
```

---

## `sudo systemctl restart servicename`

Restart a service (stop + start).

```bash
sudo systemctl restart servicename
```

---

## `sudo systemctl status servicename`

Check if a service is running, and see recent logs.

```bash
sudo systemctl status servicename
```

---

## `sudo systemctl enable servicename`

Enable a service to start automatically on boot.

```bash
sudo systemctl enable servicename
```

---

## `sudo systemctl disable servicename`

Prevent a service from starting on boot.

```bash
sudo systemctl disable servicename
```

---

## `systemctl list-units --type=service --state=running`

List all currently running services.

```bash
systemctl list-units --type=service --state=running
```
