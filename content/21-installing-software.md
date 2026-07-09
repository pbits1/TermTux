---
title: "Installing Software (Beyond APT)"
section: 3
category: 21
description: "Install software using APT, dpkg, flatpak, PPAs, and more."
icon: "package"
tags: ["apt", "dpkg", "flatpak", "ppa", "install", "software", "beginner"]
---

# Installing Software (Beyond APT)

Various methods to install, update, and manage software packages on your Linux system.

---

## 1. Install Repository Packages

Install a package from the official Ubuntu software repositories.

```bash
sudo apt install package-name
```

---

## 2. Remove Packages

Uninstall a package while leaving its configuration files intact.

```bash
sudo apt remove package-name
```

---

## 3. Purge Packages

Completely remove a package along with all of its custom system configuration files.

```bash
sudo apt purge package-name
```

---

## 4. Search for Packages

Find available software packages in the repositories matching a specific search keyword.

```bash
apt search keyword
```

---

## 5. Show Package Details

Display version information, dependencies, size, and descriptions of a repository package.

```bash
apt show package-name
```

---

## 6. Install Local DEB Packages

Install a downloaded `.deb` package file (similar to running a `.exe` setup file on Windows).

```bash
sudo dpkg -i package.deb
```

---

## 7. Remove Local DEB Packages

Uninstall a package that was installed using the low-level `dpkg` command.

```bash
sudo dpkg -r package-name
```

---

## 8. Install Flatpak Packages

Install containerized applications from the Flathub app store. Note: Flatpak requires initial environment setup (`sudo apt install flatpak`).

```bash
flatpak install flathub appname
```

---

## 9. Add Third-Party repositories (PPAs)

Register a Personal Package Archive (PPA) repository to access newer software.

```bash
sudo add-apt-repository ppa:user/repo
```

---

## 10. Remove Repositories (PPAs)

Remove an added third-party PPA repository from your package manager sources.

```bash
sudo add-apt-repository --remove ppa:user/repo
```
