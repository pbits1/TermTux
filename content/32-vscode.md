---
title: "Visual Studio Code (VS Code)"
section: 3
category: 32
description: "Install and set up VS Code — a powerful, free code editor by Microsoft"
icon: "code"
tags: ["vscode", "editor", "code", "ide", "microsoft", "install", "extensions"]
---

# Visual Studio Code (VS Code)

## What is it?

A powerful, free code editor by Microsoft. Used by developers worldwide for writing code in Python, JavaScript, HTML, C++, and 100+ languages. Think of it like Notepad++ on steroids, with built-in terminal, Git integration, debugging, and thousands of extensions.

---

## METHOD 1 — Via Microsoft's Official Repository (Recommended)

### Step 1: Download Microsoft's GPG key

This verifies the package is genuine.

```bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
```

### Step 2: Add the VS Code repository to your system

```bash
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
```

### Step 3: Update package list and install

```bash
sudo apt update
sudo apt install code
```

### Step 4: Launch it

```bash
code
```

---

## METHOD 2 — Via Snap (Simpler, But Slightly Slower Startup)

```bash
sudo snap install code --classic
```

---

## Useful VS Code Commands

```bash
# Open current folder in VS Code
code .

# Open a specific file
code filename.py

# List installed extensions
code --list-extensions

# Install an extension
code --install-extension extensionID
```

> **💡 Tip:** `code .` is one of the most useful commands — it opens the entire current folder as a project in VS Code.
