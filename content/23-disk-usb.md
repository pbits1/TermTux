---
title: "DISK & USB DRIVE MANAGEMENT"
section: 2
category: 23
icon: "terminal"
---

# DISK & USB DRIVE MANAGEMENT


```bash
lsblk
```
    → List all block devices (disks, partitions, USB drives).

```bash
sudo fdisk -l
```
    → Detailed disk partition information.

```bash
df -h
```
    → Show disk space usage (all mounted drives).

```bash
du -sh folder/
```
    → Show total size of a folder.

```bash
du -sh * | sort -rh | head -10
```
    → Find the 10 largest items in current directory.

```bash
sudo mount /dev/sdb1 /mnt/usb
```
    → Manually mount a USB drive.

```bash
sudo umount /mnt/usb
```
    → Safely unmount/eject a USB drive.

```bash
sudo eject /dev/sr0
```
    → Eject CD/DVD drive.

```bash
ncdu
```
    → Interactive disk usage analyzer (like WinDirStat).
      Install: sudo apt install ncdu


