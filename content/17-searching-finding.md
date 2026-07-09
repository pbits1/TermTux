---
title: "Searching & Finding"
section: 2
category: 17
description: "Find files by name, size, or date, and search inside files for text patterns."
icon: "search"
tags: ["find", "grep", "search", "locate", "which", "whereis", "beginner"]
---

# Searching & Finding

Lost a file? Need to find a specific line of text buried somewhere? These commands are your search superpowers.

---

## `find /home -name "*.pdf"`

Find all PDF files inside `/home`.

```bash
find /home -name "*.pdf"
```

---

## `find . -name "*.log" -mtime -7`

Find `.log` files modified in the last 7 days (in current directory).

```bash
find . -name "*.log" -mtime -7
```

---

## `find / -size +100M`

Find files larger than 100MB on the entire system.

```bash
find / -size +100M
```

---

## `grep "search term" filename.txt`

Search for text inside a file.

```bash
grep "search term" filename.txt
```

---

## `grep -r "search term" /path/to/folder/`

Search for text inside all files in a folder (recursive).

```bash
grep -r "search term" /path/to/folder/
```

---

## `grep -i "search term" filename.txt`

Case-insensitive search.

```bash
grep -i "search term" filename.txt
```

---

## `which command_name`

Find where a command is installed (e.g., `which python3`).

```bash
which command_name
```

---

## `whereis command_name`

Show binary, source, and man page locations for a command.

```bash
whereis command_name
```

---

## `locate filename`

Quickly find files by name (uses a database, very fast).

```bash
locate filename
```

> **💡 Tip:** Update the database first with `sudo updatedb`.
