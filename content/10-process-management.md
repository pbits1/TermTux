---
title: "Process Management"
section: 2
category: 10
description: "Find, stop, and manage running processes."
icon: "terminal"
tags: ["processes", "kill", "pid", "background", "nohup"]
---

# Process Management

Find running processes, stop them gracefully, or run long tasks in the background.

---

## `pgrep -f "process-name"`

Find the PID of a running process by name.

```bash
pgrep -f "process-name"
```

---

## `kill PID`

Gracefully stop a process by its PID.

```bash
kill PID
```

---

## `kill -0 PID`

Check if a process is still running (returns 0 if alive).

```bash
kill -0 PID
```

---

## `nohup command > logfile 2>&1 &`

Run a command in the background that survives terminal close. Output is redirected to logfile.

```bash
nohup command > logfile 2>&1 &
```

> **💡 Tip:** `nohup` stands for "no hang up" — it keeps the process running even after you close the terminal.
