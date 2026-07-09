---
title: "Git (Version Control)"
section: 5
category: 51
description: "Set up and use Git for version control."
icon: "git-branch"
tags: ['git', 'github', 'version-control', 'developer']
---

# Git (Version Control)

## What is it?

Tracks changes to your code over time. Like "undo history" for your entire project. Used by every developer. GitHub, GitLab, and Bitbucket are websites that host Git repositories online.


```bash
# Install:
sudo apt install git
```


```bash
# First-time setup (do this once):
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```


```bash
# Clone (download) a repository from GitHub:
git clone https://github.com/username/repo.git
```


```bash
# Check status of your changes:
git status
```


```bash
# Stage ALL changed files:
git add .

# Stage one specific file:
git add filename.py
```


```bash
# Commit (save a checkpoint):
git commit -m "Describe what you changed"
```


```bash
# Push to GitHub (upload your commits):
git push
```


```bash
# Pull latest changes (download from GitHub):
git pull
```


```bash
# See commit history:
git log --oneline -10
```


```bash
# Create a new branch (work on features without breaking main):
git checkout -b feature-name
```


```bash
# Switch between branches:
git checkout main
```


```bash
# Merge a branch into main:
git checkout main
git merge feature-name
```


## GIT WORKFLOW CHEAT SHEET

Edit files → git add . → git commit -m "message" → git push
