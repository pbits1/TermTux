---
title: "Networking"
section: 2
category: 11
description: "Check web service status and send desktop notifications."
icon: "network"
tags: ["networking", "curl", "notifications", "web", "service"]
---

# Networking

Quick commands for checking if a web service is responding and sending desktop notifications from scripts.

---

## `curl -s -o /dev/null --connect-timeout 2 "http://localhost:8080"`

Silently check if a web service is responding on a given URL. Exit code 0 = service is up.

```bash
curl -s -o /dev/null --connect-timeout 2 "http://localhost:8080"
```

> **💡 Tip:** Use `echo $?` right after to see the exit code. `0` means success!

---

## `notify-send "Title" "Message" -i icon-name`

Send a desktop notification popup. Used in scripts to alert the user.

```bash
notify-send "Title" "Message" -i icon-name
```
