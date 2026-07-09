---
title: "Sudo / Admin Access"
section: 1
category: 9
description: "Grant and revoke temporary passwordless sudo access for automation."
icon: "shield"
tags: ["sudo", "admin", "root", "security", "sudoers"]
---

# Sudo / Admin Access

Sometimes automation tools need passwordless sudo. Here's how to grant it temporarily — and **always** remember to revoke it after.

---

## `echo "$USER ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/temp-antigravity`

Grant temporary passwordless sudo access (for automation tools).

```bash
echo "$USER ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/temp-antigravity
```

> **⚠️ Warning:** This is a **SECURITY RISK** — only use temporarily!

---

## `sudo rm /etc/sudoers.d/temp-antigravity`

Remove the temporary sudo access to re-secure the system.

```bash
sudo rm /etc/sudoers.d/temp-antigravity
```

> **💡 Tip:** Always clean up after automation. Don't leave passwordless sudo enabled!
