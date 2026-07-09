---
title: "Archive & Compression"
section: 3
category: 19
description: "Compress and extract files using tar, gzip, and zip."
icon: "package"
tags: ["archive", "compression", "tar", "zip", "gzip", "extract", "beginner"]
---

# Archive & Compression

Pack files up for sharing or backup, and unpack archives you've downloaded.

---

## `tar -czf archive.tar.gz folder/`

Compress a folder into a `.tar.gz` file. (`c`=create, `z`=gzip, `f`=filename)

```bash
tar -czf archive.tar.gz folder/
```

---

## `tar -xzf archive.tar.gz`

Extract a `.tar.gz` file. (`x`=extract)

```bash
tar -xzf archive.tar.gz
```

---

## `tar -xzf archive.tar.gz -C /destination/`

Extract to a specific folder.

```bash
tar -xzf archive.tar.gz -C /destination/
```

---

## `zip -r archive.zip folder/`

Create a ZIP file from a folder.

```bash
zip -r archive.zip folder/
```

---

## `unzip archive.zip`

Extract a ZIP file.

```bash
unzip archive.zip
```

---

## `unzip archive.zip -d /destination/`

Extract a ZIP to a specific folder.

```bash
unzip archive.zip -d /destination/
```
