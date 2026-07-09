---
title: "Getting Help"
section: 3
category: 27
description: "Use man pages, --help, info, and other help commands."
icon: "help-circle"
tags: ["man", "help", "info", "whatis", "apropos", "beginner"]
---

# Getting Help

How to find usage instructions, documentation, and history shortcuts for terminal commands.

---

## 1. System Manuals (`man`)

The `man` command opens the built-in system reference manual for any command.

```bash
# Open the manual page (press 'q' to quit)
man command_name

# Example: View the manual for grep
man grep
```

---

## 2. Inline Help (`--help`)

Most commands support a `--help` flag to print a quick summary of options directly in the terminal.

```bash
# Display quick usage and available flags
command_name --help

# Example: Display help for the 'ls' command
ls --help
```

---

## 3. Simplified Examples (`tldr`)

The `tldr` tool provides short, community-driven cheat sheets with practical examples instead of long manual pages.

```bash
# Install tldr first
sudo apt install tldr -y

# Perform initial update (first run only)
tldr --update

# Show simplified examples for a command
tldr command_name
```

---

## 4. Command History

You can search and recall commands you have run in the past.

```bash
# Show your entire command history
history

# Search your command history for a specific keyword
history | grep "keyword"
```

---

## 5. Reverse Search (`Ctrl + R`)

Press **Ctrl + R** in the terminal to search through your history interactively. Just start typing, and it will auto-complete the matching command from your history. Press **Enter** to run it, or **Ctrl + G** to cancel.
