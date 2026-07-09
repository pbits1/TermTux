---
title: "Piping & Redirection"
section: 5
category: 56
description: "Master the pipe operator, input/output redirection, and command chaining."
icon: "arrow-right"
tags: ["pipe", "redirection", "stdin", "stdout", "deep-dive"]
---

# Piping & Redirection — The Power of Linux

This is what makes the Linux terminal **incredibly powerful**. You can chain commands together like LEGO blocks.

---

## Pipe ( | )

Sends the **OUTPUT** of one command as **INPUT** to the next.

```bash
# List files, then filter to show only .txt files
ls -la | grep ".txt"
```

```bash
# List all processes, then filter for Chrome
ps aux | grep chrome
```

```bash
# Show only the first 20 lines of a big file
cat bigfile.log | head -20
```

```bash
# Search history for 'apt' commands, show last 5
history | grep "apt" | tail -5
```

```bash
# Find the 10 biggest items in current folder
du -sh * | sort -rh | head -10
```

---

## Redirect Output ( > and >> )

```bash
# Save output to file (OVERWRITES existing content)
command > file.txt
```

```bash
# APPEND output to file (adds to the end)
command >> file.txt
```

```bash
# Creates greeting.txt with "Hello World" inside
echo "Hello World" > greeting.txt
```

```bash
# Appends the file listing to file_list.txt
ls -la >> file_list.txt
```

---

## Redirect Errors ( 2> )

```bash
# Save error messages to a file
command 2> errors.txt
```

```bash
# Save BOTH normal output AND errors to the same file
command > output.txt 2>&1
```

```bash
# Throw away ALL output (silence a noisy command)
# /dev/null is a "black hole" — anything sent to it vanishes
command > /dev/null 2>&1
```
