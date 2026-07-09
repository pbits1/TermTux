---
title: "INSTALLING SOFTWARE (Beyond APT)"
section: 2
category: 21
icon: "terminal"
---

# INSTALLING SOFTWARE (Beyond APT)


```bash
sudo apt install package-name
```
    → Install a package from Ubuntu repositories.

```bash
sudo apt remove package-name
```
    → Remove a package (keeps config files).

```bash
sudo apt purge package-name
```
    → Completely remove a package AND its config files.

```bash
sudo apt search keyword
```
    → Search for packages by keyword.

```bash
apt show package-name
```
    → Show detailed info about a package.

```bash
sudo dpkg -i package.deb
```
    → Install a downloaded .deb file (like running an .exe on Windows).

```bash
sudo dpkg -r package-name
```
    → Remove a package installed via dpkg.

```bash
flatpak install flathub appname
```
    → Install apps from Flathub (alternative app store).
      Setup: sudo apt install flatpak

```bash
sudo add-apt-repository ppa:user/repo
```
    → Add a third-party PPA repository for extra software.

```bash
sudo add-apt-repository --remove ppa:user/repo
```
    → Remove a PPA repository.


