---
title: "COMMON PROBLEMS & FIXES"
section: 5
category: 57
icon: "terminal"
---

# COMMON PROBLEMS & FIXES


  PROBLEM: "Permission denied"
    CAUSE:  You're trying to do something that needs admin access.
    FIX:    Add 'sudo' before the command.
            sudo command_name

  PROBLEM: "Command not found"
    CAUSE:  The program isn't installed, or isn't in your PATH.
    FIX:    Install it: sudo apt install program_name
            Or check: which program_name

  PROBLEM: "Unable to locate package"
    CAUSE:  Package list is outdated or package doesn't exist.
    FIX:    Run: sudo apt update
            Then try again. If still fails, the package name may
            be different — search: apt search keyword

  PROBLEM: "dpkg was interrupted"
    CAUSE:  A previous install was interrupted.
    FIX:    sudo dpkg --configure -a
            sudo apt --fix-broken install

  PROBLEM: "E: Could not get lock /var/lib/dpkg/lock"
    CAUSE:  Another program is using apt (Software Updater, etc.)
    FIX:    Wait for it to finish, or:
            sudo killall apt apt-get
            sudo rm /var/lib/dpkg/lock-frontend
            sudo dpkg --configure -a

  PROBLEM: "No space left on device"
    CAUSE:  Disk is full.
    FIX:    sudo apt autoremove        → Remove unused packages
            sudo apt autoclean         → Clear apt cache
            sudo journalctl --vacuum-size=100M  → Shrink system logs
            ncdu /                     → Find what's eating space

  PROBLEM: "Broken packages"
    FIX:    sudo apt --fix-broken install
            sudo dpkg --configure -a
            sudo apt update

  PROBLEM: Wi-Fi not working after install
    FIX:    sudo ubuntu-drivers install
            sudo systemctl restart NetworkManager

  PROBLEM: No sound
    FIX:    Check if muted: pactl list sinks | grep -i mute
            Unmute:        pactl set-sink-mute @DEFAULT_SINK@ 0
            Restart audio: systemctl --user restart pipewire

  PROBLEM: Screen resolution wrong
    FIX:    xrandr (to list available modes)
            xrandr --output HDMI-1 --mode 1920x1080

  PROBLEM: USB drive not showing up
    FIX:    lsblk                      → Check if detected
            sudo fdisk -l              → See all disks
            sudo mount /dev/sdb1 /mnt  → Manually mount

  PROBLEM: App won't launch (no error shown)
    FIX:    Run it from terminal to see error messages:
            /path/to/app
            Or: app-name --verbose


