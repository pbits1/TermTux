---
title: "APT Package Manager — How It Works"
section: 6
category: 55
description: "Deep dive into how APT finds, downloads, and installs packages."
icon: "package"
tags: ["apt", "package-manager", "repositories", "deep-dive"]
---

# APT Package Manager — How It Works

`apt` is Ubuntu's package manager. Think of it as an **app store that runs from the terminal**.

---

## How It Works

1. Ubuntu maintains **"repositories"** (servers with thousands of software packages).
2. When you run `apt update`, it downloads the latest **LIST** of available packages (but doesn't install anything yet).
3. When you run `apt install X`, it downloads package X and all its **dependencies** from the repository.
4. When you run `apt upgrade`, it upgrades all installed packages to their latest versions.

---

## Important Concepts

### Repository (repo)

A server that hosts software packages. Ubuntu has official repos. Third-party software (Chrome, VS Code) adds their own repos.

Your repos are listed in:

```bash
ls /etc/apt/sources.list.d/
```

### PPA (Personal Package Archive)

A third-party repository hosted on Launchpad. Anyone can create one. **Use with caution** — only add PPAs from trusted sources.

```bash
# Add a PPA:
sudo add-apt-repository ppa:user/repo

# Remove a PPA:
sudo add-apt-repository --remove ppa:user/repo
```

### .deb file

A pre-packaged application file (like `.exe` on Windows).

```bash
# Install a .deb file:
sudo dpkg -i file.deb

# If dependencies are missing:
sudo apt --fix-broken install
```

### Dependencies

Software that a package **NEEDS** to work. `apt` handles these automatically. This is why `apt install` is better than manually downloading `.deb` files.

### apt vs apt-get

They do the same thing. `apt` is newer and more user-friendly. Use `apt` for interactive use. Use `apt-get` in scripts.
