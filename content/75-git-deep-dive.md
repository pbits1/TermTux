---
title: "Git Deep Dive"
section: 3
category: 75
description: "Advanced Git workflows — branching strategies, rebase vs merge, git bisect, stashing, reflog, and submodules."
icon: "git-merge"
tags: ["git", "branching", "rebase", "merge", "stash", "reflog", "bisect", "submodules"]
---

# Git: Deep Dive

Goes beyond the basics of add/commit/push. These commands handle complex workflows, undo mistakes, and manage multi-repo projects.

---

## 1. Git Rebase — Cleaner History

Rebase replays commits from one branch onto another, creating a linear history without merge commits.

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (edit, squash, reorder commits)
git rebase -i HEAD~5
```

> **⚠️ Warning:** Never rebase commits that have been pushed to a shared branch. Rebase rewrites history.

---

## 2. Squash Commits into One

Combine the last 3 commits into a single commit.

```bash
git rebase -i HEAD~3
# Change 'pick' to 'squash' for the commits to merge
```

---

## 3. Cherry-Pick a Commit

Apply a specific commit from another branch without merging the whole branch.

```bash
git cherry-pick commit-hash
```

---

## 4. Git Stash — Temporarily Save Changes

Stash your working directory when you need to switch branches without committing.

```bash
# Save changes
git stash

# List all stashes
git stash list

# Apply the most recent stash and keep it
git stash apply

# Apply the most recent stash and drop it
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Create a named stash
git stash push -m "WIP: fixing bug"
```

---

## 5. Git Reflog — Recover Lost Commits

Reflog is the safety net for Git disasters. It logs every HEAD change — even commits that are no longer referenced by any branch.

```bash
# View the reflog
git reflog

# Recover a commit you accidentally reset
git reset --hard HEAD@{2}
```

---

## 6. Git Bisect — Find the Commit That Introduced a Bug

Binary search through your commit history to find exactly where a bug was introduced.

```bash
# Start the bisect
git bisect start

# Mark the current commit as bad
git bisect bad

# Mark an old commit as good (known working)
git bisect good known-good-commit

# Git will check out a commit in the middle. Test it, then:
git bisect good  # or
git bisect bad

# Git narrows it down to the exact commit
git bisect reset
```

---

## 7. Git Submodules — Include Other Repos

Embed one git repo inside another while keeping their histories separate.

```bash
# Add a submodule
git submodule add https://github.com/user/library.git lib/

# Clone a repo WITH its submodules
git clone --recursive https://github.com/user/project.git

# Update all submodules to latest
git submodule update --remote

# Pull latest for all submodules
git submodule foreach git pull origin main
```

---

## 8. Reset vs Revert

- `git reset` — Moves HEAD and optionally changes the working tree (dangerous)
- `git revert` — Creates a NEW commit that undoes a previous commit (safe)

```bash
# Soft reset (just move HEAD, keep changes)
git reset --soft HEAD~1

# Hard reset (DANGER — discard all changes after that commit)
git reset --hard HEAD~1

# Revert a commit safely (creates an undo commit)
git revert commit-hash
```

---

## 9. Git Tags — Mark Important Releases

```bash
# Create an annotated tag
git tag -a v1.0 -m "Release version 1.0"

# Push tags to remote
git push origin --tags

# Checkout a tag
git checkout v1.0
```

---

## 10. Git Log Advanced

```bash
# One-line log with graph
git log --oneline --graph --all

# Show commits by a specific author
git log --author="name"

# Show commits that changed a specific file
git log -- path/to/file

# Search commit messages
git log --grep="fix"
```