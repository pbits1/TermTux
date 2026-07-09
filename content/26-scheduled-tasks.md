---
title: "Scheduled Tasks (Cron)"
section: 2
category: 26
description: "Automate tasks with cron jobs and at commands."
icon: "clock"
tags: ['cron', 'crontab', 'schedule', 'automation', 'at']
---

# Scheduled Tasks (Cron)

```bash
crontab -e
```

→ Edit your cron jobs (scheduled tasks).


```bash
crontab -l
```

→ List your current cron jobs.


## CRON FORMAT

* * * * *  command to run

## EXAMPLES

0 9 * * *     → Run daily at 9:00 AM
*/5 * * * *   → Run every 5 minutes
0 0 * * 0     → Run every Sunday at midnight
0 8 1 * *     → Run at 8 AM on the 1st of every month
