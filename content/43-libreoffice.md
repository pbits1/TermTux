---
title: "LibreOffice"
section: 3
category: 43
description: "Install LibreOffice — free Microsoft Office alternative"
icon: "book"
tags: ["libreoffice", "office", "word", "excel", "powerpoint", "install"]
---

# LibreOffice (Microsoft Office Alternative)

## What is it?

Free office suite — replacement for Microsoft Word, Excel, PowerPoint. Can open and save `.docx`, `.xlsx`, `.pptx` files. Usually pre-installed on Ubuntu.

---

## Installation

```bash
# If not already installed:
sudo apt install libreoffice
```

---

## Individual Apps

| Command | App | Windows Equivalent |
|---------|-----|-------------------|
| `libreoffice --writer` | Word processor | MS Word |
| `libreoffice --calc` | Spreadsheet | MS Excel |
| `libreoffice --impress` | Presentations | MS PowerPoint |
| `libreoffice --draw` | Drawing/diagrams | MS Visio |

---

## Usage

```bash
# Launch Writer (word processor)
libreoffice --writer

# Launch Calc (spreadsheet)
libreoffice --calc

# Launch Impress (presentations)
libreoffice --impress

# Launch Draw (drawing/diagrams)
libreoffice --draw

# Open a .docx file directly
libreoffice --writer document.docx
```
