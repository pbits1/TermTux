---
title: "System Recovery & Live USB"
section: 2
category: 73
description: "Recover a broken system — access GRUB, use recovery mode, repair GRUB, chroot, and fix a system without reinstalling."
icon: "alert-circle"
tags: ["recovery", "grub", "chroot", "live-usb", "repair", "boot", "rescue"]
---

# System Recovery & Live USB

When your system won't boot, these techniques let you recover your data and repair the installation without reinstalling.

---

## 1. Access GRUB at Boot

Hold **Shift** (BIOS) or press **Esc** (UEFI) during boot to access the GRUB menu.

---

## 2. Boot into Recovery Mode

From GRUB:
1. Select **Advanced options for Ubuntu**
2. Choose a kernel with **(recovery mode)**
3. From the recovery menu, select:
   - **root** — Drop to a root shell
   - **fsck** — Check filesystems
   - **network** — Enable networking

---

## 3. Boot from GRUB with Kernel Parameter

Edit the GRUB entry to bypass a frozen boot:
1. Press **e** on the boot entry in GRUB
2. Find the line starting with `linux`
3. Add `single` or `nomodeset` or `systemd.unit=multi-user.target` at the end
4. Press **Ctrl+X** to boot

---

## 4. Boot from a Live USB and Chroot

The most powerful recovery method: boot from a live USB, mount your system, and chroot into it.

```bash
# Mount the root partition
sudo mount /dev/sdX1 /mnt

# Mount boot, dev, proc, sys
sudo mount /dev/sdX2 /mnt/boot
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys

# Chroot into the system
sudo chroot /mnt
```

---

## 5. Reinstall GRUB from Chroot

Once you're in chroot, reinstall GRUB if the bootloader is corrupted.

```bash
# Reinstall GRUB
grub-install /dev/sdX

# Update GRUB configuration
update-grub

# Exit chroot
exit
```

---

## 6. Fix a Broken Package System from Chroot

If packages or dependencies are broken, run these from within the chroot:

```bash
apt update
apt --fix-broken install
apt upgrade
```

---

## 7. Regenerate Initramfs

If you're stuck at a kernel panic or missing driver, rebuild the initial ramdisk.

```bash
# From chroot:
update-initramfs -u -k all
```

---

## 8. Reset a Forgotten Root Password

Boot into recovery mode → select **root** → then:

```bash
mount -o remount,rw /
passwd your_username
```

Or from a live USB with chroot:

```bash
sudo chroot /mnt
passwd username
```

---

## 9. Copy Data Off a Dead System

Boot from a live USB, mount the drive, and back up your data.

```bash
# Identify the drive
lsblk

# Mount and copy data
sudo mount /dev/sdX1 /mnt
rsync -av /mnt/home/ /media/backup-drive/
```

---

## 10. Check System Logs After Boot

Once recovered, check what went wrong:

```bash
# Check last boot log
journalctl -b -1

# Check kernel messages
dmesg | tail -50

# Check boot-up services
systemctl --failed
```