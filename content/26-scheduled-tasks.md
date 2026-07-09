---
title: "SCHEDULED TASKS (Cron — like Task Scheduler in Windows)"
section: 2
category: 26
icon: "terminal"
---

# SCHEDULED TASKS (Cron — like Task Scheduler in Windows)


```bash
crontab -e
```
    → Edit your cron jobs (scheduled tasks).

```bash
crontab -l
```
    → List your current cron jobs.

    CRON FORMAT:
    ┌───────────── minute (0-59)
    │ ┌───────────── hour (0-23)
    │ │ ┌───────────── day of month (1-31)
    │ │ │ ┌───────────── month (1-12)
    │ │ │ │ ┌───────────── day of week (0-6, 0=Sunday)
    │ │ │ │ │
    * * * * *  command to run

    EXAMPLES:
    0 9 * * *     → Run daily at 9:00 AM
    */5 * * * *   → Run every 5 minutes
    0 0 * * 0     → Run every Sunday at midnight
    0 8 1 * *     → Run at 8 AM on the 1st of every month


