---
title: "SSH & Remote Access"
section: 3
category: 61
description: "Generate SSH keys, use passwordless logins, configure server shortcuts, and secure remote access."
icon: "shield"
tags: ["ssh", "remote", "keys", "security", "ssh-config", "beginner"]
---

# SSH & Remote Access

Secure Shell (SSH) is a protocol that allows you to securely log in and control a remote Linux server via the terminal.

---

## 1. Connecting to a Server

The basic SSH command is:

```bash
# Connect using username and server IP/domain
ssh username@server_ip

# Connect to a server running on a custom port (default is 22)
ssh -p 2222 username@server_ip
```

---

## 2. Setting Up Passwordless Login (SSH Keys)

Using SSH key pairs is much more secure than passwords. An SSH key pair consists of a **Public Key** (placed on the server) and a **Private Key** (kept safe on your computer).

### Step 1: Generate SSH keys on your local machine
Run this command in your computer's terminal:
```bash
# Generate a secure Ed25519 key pair
ssh-keygen -t ed25519 -C "your_email@example.com"
```
*Press Enter to accept the default file location. You can optionally enter a passphrase for extra security.*

### Step 2: Copy the Public Key to your server
This installs your public key on the remote server:
```bash
ssh-copy-id username@server_ip
```
*Enter your server login password one last time. From now on, you will log in automatically without a password.*

---

## 3. Creating SSH Configuration Shortcuts

If you manage multiple servers, remembering IPs and usernames can be tedious. You can configure friendly shortcuts in your SSH config file.

1. Open (or create) the SSH config file on your local machine:
   ```bash
   nano ~/.ssh/config
   ```
2. Add your server details like this:
   ```text
   # Shortcut name
   Host myserver
       HostName 192.168.1.150
       User ubuntu
       Port 22
       IdentityFile ~/.ssh/id_ed25519
   ```
3. Save and close the file.
4. Now, you can connect instantly using the host shortcut name:
   ```bash
   ssh myserver
   ```

---

## 4. Securing the SSH Server (Hardening)

If you are running an SSH server exposed to the public internet, you must secure it to prevent brute-force attacks.

1. Open the SSH daemon config file **on the server**:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```
2. Edit or add the following settings for maximum security:
   ```text
   # Disable password logins (forces SSH keys only)
   PasswordAuthentication no

   # Disable root user login directly (forces users to login and use sudo)
   PermitRootLogin no

   # Change the default port to reduce bots scanning your server
   Port 2222
   ```
3. Save the file and restart the SSH service:
   ```bash
   sudo systemctl restart ssh
   ```
   *Note: Always keep your current SSH connection open while testing the restart in a new terminal window to prevent getting locked out.*

---

## 5. Useful Commands for SSH Management

```bash
# Generate a new SSH key fingerprint to verify it
ssh-keygen -l -f ~/.ssh/id_ed25519.pub

# View active SSH connections on your server
who

# Check the SSH server service status
sudo systemctl status ssh
```
