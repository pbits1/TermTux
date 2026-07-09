---
title: "Scheduled Tasks (Cron)"
section: 3
category: 26
description: "Automate tasks with cron jobs and at commands."
icon: "clock"
tags: ["cron", "crontab", "schedule", "automation", "at", "beginner"]
---

# Scheduled Tasks (Cron)

Automate scripts and commands to execute at specific times or intervals using the built-in system cron scheduler.

---

## 1. Edit Scheduled Tasks (Crontab)

Open your user crontab schedule file in a terminal editor to add or modify automated tasks.

```bash
crontab -e
```

---

## 2. List Active Scheduled Tasks

Print all currently configured automated tasks to the terminal.

```bash
crontab -l
```

---

## 3. Cron Time Format Reference

Cron tasks are defined in a five-field format representing time intervals:

```text
┌───────────── minute (0 - 59)
│ ┌─────────── hour (0 - 23)
│ │ ┌───────── day of month (1 - 31)
│ │ │ ┌─────── month (1 - 12)
│ │ │ │ ┌───── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *  /path/to/command_or_script.sh
```

---

## 4. Practical Cron Examples

```text
# Run a backup script every day at 9:00 AM
0 9 * * * /home/username/backup.sh

# Run a status check command every 5 minutes
*/5 * * * * /usr/bin/curl ifconfig.me

# Run a database cleanup script every Sunday at midnight
0 0 * * 0 /home/username/db-cleanup.sh

# Run updates at 8:00 AM on the 1st of every month
0 8 1 * * sudo apt update
```
