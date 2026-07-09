---
title: "Getting Help"
section: 2
category: 27
description: "Use man pages, --help, info, and other help commands."
icon: "help-circle"
tags: ['man', 'help', 'info', 'whatis', 'apropos']
---

# Getting Help

```bash
man command_name
```

→ Open the manual page for any command (press 'q' to quit).

Example: man grep

command_name --help
→ Quick help/usage for a command.

Example: ls --help

tldr command_name
→ Simplified, practical examples for a command (community-driven).

Install: sudo apt install tldr
First run: tldr --update

history
→ Show all commands you've previously typed.


history | grep "keyword"
→ Search your command history.


Ctrl+R
→ Reverse-search your command history (start typing to find).

