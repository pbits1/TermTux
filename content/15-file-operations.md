---
title: "File & Folder Operations"
section: 2
category: 15
description: "Create, copy, move, rename, and delete files and folders."
icon: "folder"
tags: ["files", "folders", "copy", "move", "delete", "rename", "symlink", "beginner"]
---

# File & Folder Operations

The essential toolkit for managing files and folders — creating, copying, moving, renaming, and (carefully!) deleting.

---

## `touch filename.txt`

Create an empty file.

```bash
touch filename.txt
```

---

## `mkdir foldername`

Create a new folder.

```bash
mkdir foldername
```

---

## `mkdir -p path/to/deep/folder`

Create nested folders in one go (creates all parent folders too).

```bash
mkdir -p path/to/deep/folder
```

---

## `cp file.txt /destination/`

Copy a file to another location.

```bash
cp file.txt /destination/
```

---

## `cp -r folder/ /destination/`

Copy a folder and everything inside it (`-r` = recursive).

```bash
cp -r folder/ /destination/
```

---

## `mv file.txt /destination/`

Move a file to another location (also used to **rename** files).

```bash
mv file.txt /destination/
```

---

## `mv oldname.txt newname.txt`

Rename a file.

```bash
mv oldname.txt newname.txt
```

---

## `rm file.txt`

Delete a file (permanent — no Recycle Bin!).

```bash
rm file.txt
```

---

## `rm -r foldername/`

Delete a folder and everything inside it.

```bash
rm -r foldername/
```

---

## `rm -rf foldername/`

Force delete without asking for confirmation.

```bash
rm -rf foldername/
```

> **⚠️ Warning:** BE VERY CAREFUL — there is **no undo**!

---

## `ln -s /path/to/original /path/to/shortcut`

Create a symbolic link (like a shortcut in Windows).

```bash
ln -s /path/to/original /path/to/shortcut
```
