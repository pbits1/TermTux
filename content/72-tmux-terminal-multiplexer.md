---
title: "tmux — Terminal Multiplexer"
section: 1
category: 72
description: "Manage multiple terminal sessions inside a single window with tmux — split panes, detach/reattach, and never lose your work."
icon: "layout"
tags: ["tmux", "terminal", "multiplexer", "sessions", "panes", "windows"]
---

# tmux — Terminal Multiplexer

Tmux lets you run multiple terminal sessions inside a single window, split the screen into panes, and detach/reattach sessions — perfect for long-running processes over SSH.

---

## 1. Start a New Session

Creates a new tmux session with a default window.

```bash
tmux
```

---

## 2. Start a Named Session

Give your session a descriptive name so you can reattach to it later.

```bash
tmux new -s mysession
```

---

## 3. Split Panes

Split the current pane horizontally or vertically.

```bash
# Split horizontally (top and bottom)
Ctrl+b, then "

# Split vertically (left and right)
Ctrl+b, then %
```

---

## 4. Navigate Between Panes

Move focus between the different panes in your current window.

```bash
# Move to another pane
Ctrl+b, then arrow keys

# Move to the next pane in order
Ctrl+b, then o
```

---

## 5. Resize Panes

Adjust the size of the currently focused pane.

```bash
# Hold Ctrl+b, then press arrow keys repeatedly
Ctrl+b, then (hold) Ctrl+arrow keys
```

---

## 6. Create a New Window

Windows are like browser tabs — each one can hold its own set of panes.

```bash
Ctrl+b, then c
```

---

## 7. Switch Between Windows

Cycle through or jump directly to a specific window.

```bash
# Next window
Ctrl+b, then n

# Previous window
Ctrl+b, then p

# Go to window by number
Ctrl+b, then 0–9

# List all windows
Ctrl+b, then w
```

---

## 8. Detach and Reattach

Detach to leave a session running in the background, then reattach later.

```bash
# Detach from the session (processes keep running)
Ctrl+b, then d

# List all sessions
tmux ls

# Reattach to a session
tmux attach -t mysession
```

---

## 9. Scroll and Copy Mode

Enter copy mode to scroll through output and select text.

```bash
Ctrl+b, then [
# Now use arrow keys or Page Up/Page Down to scroll
# Press q to quit copy mode
```

---

## 10. Kill a Session

Permanently end a session or kill the current pane.

```bash
# Kill a specific session
tmux kill-session -t mysession

# Kill all sessions
tmux kill-session

# Kill a pane
Ctrl+b, then x (and confirm with y)
```

---

## 11. Rename a Session

Give your session a new name without leaving it.

```bash
Ctrl+b, then $
```