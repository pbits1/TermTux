---
title: "rsync & Data Backups"
section: 3
category: 67
description: "Back up and synchronize files using rsync — the most powerful copying tool on Linux."
icon: "package"
tags: ["rsync", "backup", "sync", "data", "transfer", "commands", "beginner"]
---

# rsync & Data Backups

`rsync` is the Linux power user's preferred tool for copying and backing up data. It's faster than `cp` for large jobs because it only transfers the parts of files that have changed.

---

## 1. Basic File Copy

Copy a single file from one location to another.

```bash
rsync file.txt /backup/
```

---

## 2. Copy a Directory

The `-a` (archive) flag preserves permissions, timestamps, and works recursively.

```bash
rsync -a /home/user/Documents/ /backup/Documents/
```

> **💡 Note the trailing slash:** `/source/` copies the *contents* of the folder. `/source` (no slash) copies the folder itself.

---

## 3. Show Progress During Transfer

Add `-v` (verbose) and `--progress` to see what's being copied.

```bash
rsync -av --progress /home/user/Photos/ /backup/Photos/
```

---

## 4. Dry Run — See What Would Happen

Use `--dry-run` to preview changes without actually copying anything.

```bash
rsync -av --dry-run /home/user/Documents/ /backup/Documents/
```

---

## 5. Delete Files at Destination

`--delete` removes files in the destination that no longer exist in the source — making the destination an exact mirror.

```bash
rsync -av --delete /home/user/Documents/ /backup/Documents/
```

> **⚠️ Warning:** `--delete` will permanently remove files from the destination. Always do a `--dry-run` first.

---

## 6. Exclude Files and Patterns

Skip certain files or folders (e.g., node_modules, .git, cache).

```bash
rsync -av --exclude 'node_modules' --exclude '.git' /project/ /backup/project/
```

---

## 7. Backup Over Network (SSH)

Rsync works over SSH natively — use `user@host:` syntax.

```bash
rsync -av /local/folder/ user@192.168.1.100:/backup/folder/
```

---

## 8. Compress During Transfer

`-z` compresses data on the fly — ideal for slow network connections.

```bash
rsync -azv --progress /home/user/ user@backup-server:/backups/
```

---

## 9. Incremental Backup with Hard Links

Use `--link-dest` to create full-looking snapshots that only store changed files (similar to Time Machine).

```bash
# First full backup
rsync -a /home/user/ /backup/snapshot-1/

# Next day — only stores changed files but looks like a full copy
rsync -a --link-dest=/backup/snapshot-1/ /home/user/ /backup/snapshot-2/
```

---

## 10. Backup Script Template

A simple daily backup script:

```bash
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"
rsync -av --delete --exclude 'node_modules' /home/user/project/ "$BACKUP_DIR"
echo "Backup completed to $BACKUP_DIR"
```