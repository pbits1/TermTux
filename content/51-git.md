---
title: "Git (Version Control)"
section: 5
category: 51
description: "Set up and use Git for version control."
icon: "git-branch"
tags: ['git', 'github', 'version-control', 'developer']
---

# Git (Version Control)

Tracks changes to your code over time. Like "undo history" for your entire project. Used by every developer. GitHub, GitLab, and Bitbucket are websites that host Git repositories online.

---

## 1. Install Git

Install the Git package from the official repository index.

```bash
sudo apt install git
```

---

## 2. First-Time Setup

Configure your identity once so your commits are correctly attributed.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 3. Clone a Repository

Download an existing remote repository from GitHub, GitLab, or Bitbucket to your local machine.

```bash
git clone https://github.com/username/repo.git
```

---

## 4. Check Changes Status

See which files have been modified, created, or staged for the next save.

```bash
git status
```

---

## 5. Stage Files for Saving

Add your changes to the staging index to prepare them for a commit.

```bash
# Stage ALL changed files
git add .

# Stage one specific file
git add filename.py
```

---

## 6. Commit Changes (Save Point)

Save a named checkpoint of your staged changes locally with a descriptive message.

```bash
git commit -m "Describe what you changed"
```

---

## 7. Push Changes to Remote

Upload your local commit saves to the remote repository on GitHub.

```bash
git push
```

---

## 8. Pull Remote Changes

Download and merge any updates made to the remote repository by other contributors.

```bash
git pull
```

---

## 9. View Commit History

List the recent checkpoints with their identifiers and messages.

```bash
git log --oneline -10
```

---

## 10. Create and Switch Branches

Create a new isolated branch line to work on features without modifying the main line.

```bash
# Create a new branch and switch to it
git checkout -b feature-name
```

---

## 11. Switch Between Branches

Switch your current workspace to another branch.

```bash
git checkout main
```

---

## 12. Merge Branches

Integrate the changes from one branch into your current branch (e.g. main).

```bash
git checkout main
git merge feature-name
```

---

## Git Workflow Cheat Sheet

> **Standard Daily Workflow:**
> ```text
> Edit files ──> git add . ──> git commit -m "message" ──> git push
> ```
