---
title: "Viewing & Editing Files"
section: 3
category: 16
description: "View file contents, edit files in the terminal, count lines, and compare files."
icon: "book"
tags: ["cat", "head", "tail", "less", "nano", "gedit", "editing", "viewing", "beginner"]
---

# Viewing & Editing Files

Read files without opening a full editor, follow logs in real-time, or fire up a text editor right from the terminal.

---

## `cat filename.txt`

Display the entire file contents in terminal.

```bash
cat filename.txt
```

---

## `head -20 filename.txt`

Show the first 20 lines of a file.

```bash
head -20 filename.txt
```

---

## `tail -20 filename.txt`

Show the last 20 lines of a file.

```bash
tail -20 filename.txt
```

---

## `tail -f logfile.log`

Live-follow a file (great for watching logs in real-time).

```bash
tail -f logfile.log
```

> **💡 Tip:** Press `Ctrl+C` to stop following.

---

## `less filename.txt`

View file page by page (scroll with arrows, quit with `q`).

```bash
less filename.txt
```

---

## `nano filename.txt`

Open a simple text editor in terminal.

```bash
nano filename.txt
```

> **💡 Tip:** Save: `Ctrl+O` → `Enter`. Exit: `Ctrl+X`.

---

## `gedit filename.txt`

Open a file in GNOME's graphical text editor.

```bash
gedit filename.txt
```

---

## `wc -l filename.txt`

Count the number of lines in a file.

```bash
wc -l filename.txt
```

---

## `diff file1.txt file2.txt`

Show differences between two files.

```bash
diff file1.txt file2.txt
```
