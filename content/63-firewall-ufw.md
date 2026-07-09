---
title: "Firewall Basics (UFW)"
section: 2
category: 63
description: "Set up and manage Ubuntu's built-in firewall using UFW — Uncomplicated Firewall."
icon: "shield"
tags: ["firewall", "ufw", "security", "network", "ports", "beginner"]
---

# Firewall Basics (UFW)

UFW (Uncomplicated Firewall) is Ubuntu's frontend for `iptables`. It lets you control which network traffic is allowed into your system.

---

## 1. Check Firewall Status

See whether UFW is active or inactive.

```bash
sudo ufw status
```

---

## 2. Enable the Firewall

Turn on UFW. It will block all incoming connections by default and allow all outgoing.

```bash
sudo ufw enable
```

---

## 3. Disable the Firewall

Turn off UFW. Useful for troubleshooting but leaves your system exposed.

```bash
sudo ufw disable
```

---

## 4. Allow a Port

Open a specific port for incoming traffic (e.g., port 22 for SSH).

```bash
sudo ufw allow 22
```

---

## 5. Allow a Service by Name

UFW knows common services by name — no need to remember port numbers.

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
```

---

## 6. Deny a Port

Explicitly block a specific port.

```bash
sudo ufw deny 23
```

---

## 7. Delete a Rule

Remove a previously added rule by specifying it exactly as it was added.

```bash
sudo ufw delete allow 22
```

---

## 8. List Rules with Numbers

Show all rules with numbered indexes — useful for deleting rules by number.

```bash
sudo ufw status numbered
```

---

## 9. Allow from a Specific IP

Allow all traffic from a specific IP address.

```bash
sudo ufw allow from 192.168.1.100
```

---

## 10. Allow a Port Range

Open a range of ports for a specific protocol (e.g., UDP ports 6000-6007).

```bash
sudo ufw allow 6000:6007/udp
```

---

## 11. Reset UFW to Defaults

Disable and reset all rules back to factory defaults (use with caution).

```bash
sudo ufw reset
```

> **⚠️ Warning:** Running `ufw reset` will disable the firewall and delete all your custom rules. Make sure you have alternative access (e.g., physical console) before resetting remotely.