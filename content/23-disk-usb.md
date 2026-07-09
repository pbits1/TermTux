---
title: "Disk & USB Drive Management"
section: 3
category: 23
description: "Manage disks, partitions, USB drives, and storage."
icon: "hard-drive"
tags: ["disk", "usb", "mount", "fdisk", "storage", "partition", "beginner"]
---

# Disk & USB Drive Management

Inspect storage usage, identify partitions, and safely mount or unmount USB drives.

---

## 1. List Storage Devices

List all block storage devices (hard drives, solid-state drives, USB drives, partitions) in a visual tree layout.

```bash
lsblk
```

---

## 2. Show Partitions Detail

Display detailed partition layout, file systems, sizes, and starting sectors for all connected drives.

```bash
sudo fdisk -l
```

---

## 3. Show Disk Space Usage

Display free and used disk space for all mounted filesystems in human-readable sizes (GB, MB).

```bash
df -h
```

---

## 4. Show Folder Size

Check the total storage size of a specific folder and its contents.

```bash
du -sh folder/
```

---

## 5. Find Largest Items

Scan the current directory, list the top 10 largest folders or files, and sort them by size.

```bash
du -sh * | sort -rh | head -10
```

---

## 6. Mount USB Drives

Manually mount a specific partition (e.g., `/dev/sdb1`) to a mounting directory so you can access its files.

```bash
# Create mount directory first
sudo mkdir -p /mnt/usb

# Mount the device
sudo mount /dev/sdb1 /mnt/usb
```

---

## 7. Unmount USB Drives

Safely unmount a USB drive or partition to prevent data corruption before disconnecting it.

```bash
sudo umount /mnt/usb
```

---

## 8. Eject CD/DVD Drives

Trigger the physical ejection of a CD/DVD media drive output.

```bash
sudo eject /dev/sr0
```

---

## 9. Interactive Disk Space Analyzer

Launch `ncdu` — an interactive, text-based visual disk usage analyzer (similar to WinDirStat on Windows). Requires `sudo apt install ncdu`.

```bash
ncdu
```
