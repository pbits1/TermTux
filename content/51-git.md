---
title: "GIT (Version Control)"
section: 4
category: 51
icon: "terminal"
---

# GIT (Version Control)


  What is it?
    Tracks changes to your code over time. Like "undo history" for
    your entire project. Used by every developer. GitHub, GitLab,
    and Bitbucket are websites that host Git repositories online.

    # Install:
    sudo apt install git

    # First-time setup (do this once):
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"

    # Clone (download) a repository from GitHub:
    git clone https://github.com/username/repo.git

    # Check status of your changes:
    git status

    # Stage changes (prepare to save):
    git add .                   → Stage ALL changed files
    git add filename.py         → Stage one specific file

    # Commit (save a checkpoint):
    git commit -m "Describe what you changed"

    # Push to GitHub (upload your commits):
    git push

    # Pull latest changes (download from GitHub):
    git pull

    # See commit history:
    git log --oneline -10

    # Create a new branch (work on features without breaking main):
    git checkout -b feature-name

    # Switch between branches:
    git checkout main

    # Merge a branch into main:
    git checkout main
    git merge feature-name

  GIT WORKFLOW CHEAT SHEET:
    Edit files → git add . → git commit -m "message" → git push


