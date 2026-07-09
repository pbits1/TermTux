---
title: "Environment Variables"
section: 3
category: 25
description: "Set, view, and manage environment variables and PATH."
icon: "settings"
tags: ["env", "environment", "variables", "path", "export", "bashrc", "beginner"]
---

# Environment Variables

Configure system variables, print paths, export temporary properties, and customize `.bashrc`.

---

## 1. Print Specific Variable

Print the value of a specific system environment variable (e.g., your Home folder path).

```bash
echo $HOME
```

---

## 2. Print System PATH Directories

Display the `$PATH` variable — a list of system directories where Linux looks for program command files.

```bash
echo $PATH
```

---

## 3. List All Environment Variables

List every active environment variable registered in your current shell session.

```bash
env
```

---

## 4. Set Temporary Variables

Create or update a temporary environment variable that exists only until you close the current terminal window.

```bash
export MY_VAR="hello"
```

---

## 5. Set Permanent Variables

Append an environment variable setting to your `.bashrc` profile configuration so it automatically registers in every new terminal session.

```bash
# 1. Append the export command to .bashrc
echo 'export MY_VAR="hello"' >> ~/.bashrc

# 2. Reload config to apply changes immediately
source ~/.bashrc
```
