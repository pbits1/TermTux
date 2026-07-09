---
title: "Filesystem & Storage Management"
section: 3
category: 65
description: "Create filesystems, format drives, manage partitions, and use fstab for automatic mounting."
icon: "hard-drive"
tags: ["filesystem", "mkfs", "mount", "fstab", "partition", "fsck", "blkid", "dd", "storage", "beginner"]
---

# Filesystem & Storage Management

Beyond listing disks with `lsblk`, this covers creating filesystems, formatting drives, configuring automatic mounts, and repairing disk issues.

---

## 1. List Block Devices with Details

Show all disks, partitions, and their mount points with UUIDs.

```bash
lsblk -f
```

---

## 2. View Disk UUID and Filesystem Type

Blkid prints UUID and filesystem type for every block device — essential for configuring mounts.

```bash
sudo blkid
```

---

## 3. Create a Filesystem

Format a partition with a filesystem (ext4 is the standard for Linux).

```bash
# Format partition /dev/sdb1 as ext4 (erases all data!)
sudo mkfs.ext4 /dev/sdb1

# Format as NTFS (for Windows compatibility)
sudo mkfs.ntfs /dev/sdb1

# Format as FAT32 (for USB drives, universal compatibility)
sudo mkfs.vfat /dev/sdb1
```

> **💡 Tip:** `mkfs.ext4` is the most common choice for internal Linux drives. NTFS and FAT32 are for drives that need to work with Windows.

---

## 4. Mount a Drive

Attach a filesystem to a directory so you can access its contents.

```bash
# Create a mount point directory
sudo mkdir -p /mnt/mydrive

# Mount by device path
sudo mount /dev/sdb1 /mnt/mydrive

# Mount by UUID (more reliable — UUID doesn't change)
sudo mount UUID="your-uuid-here" /mnt/mydrive
```

---

## 5. Unmount a Drive

Safely detach a mounted filesystem.

```bash
sudo umount /mnt/mydrive
```

---

## 6. Auto-Mount at Boot (/etc/fstab)

Edit the filesystem table to mount drives automatically every time the system boots.

```bash
# First, get the UUID of the drive
sudo blkid /dev/sdb1

# Then add a line to /etc/fstab (edit with sudo)
sudo nano /etc/fstab
```

Add a line with this format:

```
UUID=your-uuid-here  /mnt/mydrive  ext4  defaults  0  2
```

```bash
# Test that the fstab entry works (mounts all drives from fstab)
sudo mount -a
```

---

## 7. Check and Repair a Filesystem

Run a filesystem check (like `chkdsk` on Windows). The drive must be unmounted first.

```bash
# Check an unmounted ext4 partition
sudo fsck /dev/sdb1

# Force a check even if it seems clean
sudo fsck -f /dev/sdb1

# Check NTFS partition
sudo ntfsfix /dev/sdb1
```

---

## 8. Clone a Drive with `dd`

Disk duplicator — copies data byte-by-byte. Use with extreme caution.

```bash
# Clone /dev/sda to /dev/sdb (exact copy, overwrites sdb!)
sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress

# Create a disk image to a file
sudo dd if=/dev/sda of=~/disk-backup.img bs=4M status=progress

# Wipe a drive with zeros (secure erase before disposal)
sudo dd if=/dev/zero of=/dev/sdb bs=4M status=progress
```

> **⚠️ Warning:** `dd` is called "Disk Destroyer" for a reason. Double-check your `of=` target — writing to the wrong drive will instantly destroy all your data.

---

## 9. Find Large Files and Directories

Quickly identify what's eating disk space.

```bash
# Show sizes of top-level items in /, sorted by size
sudo du -sh /* | sort -rh

# Find all files larger than 1GB
sudo find / -type f -size +1G -exec ls -lh {} \; 2>/dev/null

# Show total size of current directory
du -sh .
```

---

## 10. Check Disk Usage (XDG Compliant)

Check storage used by desktop environments without root.

```bash
# Check your home directory usage
du -sh ~

# List largest directories in home
du -sh ~/* | sort -rh | head -10
```