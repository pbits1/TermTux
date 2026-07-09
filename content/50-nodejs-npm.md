---
title: "Node.js & NPM"
section: 5
category: 50
description: "Install Node.js and npm for JavaScript development."
icon: "code"
tags: ['nodejs', 'npm', 'javascript', 'nvm', 'developer']
---

# Node.js & NPM

Node.js runs JavaScript outside the browser. npm is its package manager. Essential for web development with React, Next.js, Vue, and hundreds of other tools.

---

## 1. Install Node.js via NodeSource

NodeSource provides the latest stable Node.js releases for Ubuntu.

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs
```

---

## 2. Verify Installation

Confirm that Node.js and npm are installed correctly.

```bash
node --version
npm --version
```

---

## 3. Install a Package Globally

Installs a CLI tool or library so it's available system-wide (e.g., `serve`, `eslint`).

```bash
sudo npm install -g package_name
```

---

## 4. Install a Package as a Project Dependency

Add a package to your project's `node_modules` and `package.json`.

```bash
npm install package_name
# or as a dev dependency:
npm install --save-dev package_name
```

---

## 5. Initialize a New Project

Creates a `package.json` file with default values for your project.

```bash
npm init -y
```

---

## 6. Install All Project Dependencies

Downloads every package listed in `package.json` — the first thing you do when cloning a project.

```bash
npm install
```

---

## 7. Run a Script from package.json

Executes any script defined in the `"scripts"` section of `package.json`.

```bash
npm run dev
```

---

## 8. Install nvm (Node Version Manager)

Switch between Node.js versions without affecting other projects.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

---

## 9. Use nvm to Install a Specific Node Version

Install, switch to, and set a default Node.js version with nvm.

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

---

## 10. List Installed npm Packages (Top-Level)

See which packages are installed in your project or globally.

```bash
npm list --depth=0

# List globally installed packages
npm list -g --depth=0
```

---

## 11. Uninstall a Package

Remove a dependency from your project and `package.json`.

```bash
npm uninstall package_name
```

---

## 12. Update All Packages

Check which packages are outdated, then update them all.

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update
```

---

## 13. Clear npm Cache

Fix mysterious npm errors by clearing the cache:

```bash
npm cache clean --force
```

