---
title: "User & Permission Management"
section: 3
category: 18
description: "Manage users, groups, passwords, and file permissions with the numeric cheat sheet."
icon: "shield"
tags: ["users", "permissions", "chmod", "chown", "groups", "sudo", "security", "beginner"]
---

# User & Permission Management

Control who can access what on your system — manage users, groups, and file permissions.

---

## `whoami`

Show current logged-in username.

```bash
whoami
```

---

## `id`

Show your user ID, group ID, and all groups you belong to.

```bash
id
```

---

## `sudo command`

Run a command as administrator (root). Asks for your password.

```bash
sudo command
```

---

## `sudo su`

Switch to root user (full admin shell). Type `exit` to leave.

```bash
sudo su
```

---

## `passwd`

Change your password.

```bash
passwd
```

---

## `sudo adduser newusername`

Create a new user account.

```bash
sudo adduser newusername
```

---

## `sudo deluser username`

Delete a user account.

```bash
sudo deluser username
```

---

## `sudo usermod -aG groupname username`

Add a user to a group (e.g., sudo group for admin access).

```bash
sudo usermod -aG groupname username
```

---

## `chown user:group filename`

Change who owns a file.

```bash
chown user:group filename
```

---

## `chown -R user:group foldername/`

Change ownership recursively for all files in a folder.

```bash
chown -R user:group foldername/
```

---

## `chmod 755 filename`

Set permissions: owner=read/write/execute, group=read/execute, others=read/execute. Common for scripts.

```bash
chmod 755 filename
```

---

## `chmod 644 filename`

Set permissions: owner=read/write, group=read, others=read. Common for regular files.

```bash
chmod 644 filename
```

---

## Permission Cheat Sheet

| Number | Permission              |
|--------|-------------------------|
| `7`    | read + write + execute  |
| `6`    | read + write            |
| `5`    | read + execute          |
| `4`    | read only               |
| `0`    | no permissions          |

> **💡 Tip:** The three digits represent: **First** = Owner, **Second** = Group, **Third** = Others. So `755` means the owner can do everything, but group and others can only read and execute.
