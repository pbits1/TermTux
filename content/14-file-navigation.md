---
title: "Navigating the File System"
section: 3
category: 14
description: "Move around the file system, list files, and find your way in the terminal."
icon: "folder"
tags: ["navigation", "cd", "ls", "pwd", "directory", "filesystem", "beginner"]
---

# Navigating the File System

The terminal is your file explorer. These commands help you move around, see what's in a folder, and never get lost.

---

## `pwd`

Print Working Directory — shows where you are right now.

```bash
pwd
```

---

## `cd /path/to/folder`

Change Directory — move to a specific folder.

```bash
cd /path/to/folder
```

---

## `cd ~`

Go to your Home folder (same as `cd /home/username`).

```bash
cd ~
```

---

## `cd ..`

Go up one folder level (parent directory).

```bash
cd ..
```

---

## `cd -`

Go back to the previous directory you were in.

```bash
cd -
```

---

## `ls`

List files and folders in the current directory.

```bash
ls
```

---

## `ls -la`

List ALL files (including hidden ones starting with `.`) with details.

```bash
ls -la
```

---

## `ls -lh`

List files with human-readable sizes (KB, MB, GB).

```bash
ls -lh
```

---

## `tree`

Show folder structure as a tree diagram.

```bash
tree
```

> **💡 Tip:** Install first with `sudo apt install tree`.

---

## `clear`

Clear the terminal screen.

```bash
clear
```

> **💡 Tip:** Shortcut: `Ctrl+L` does the same thing!
