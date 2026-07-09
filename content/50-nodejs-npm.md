---
title: "Node.js & NPM"
section: 5
category: 50
description: "Install Node.js and npm for JavaScript development."
icon: "code"
tags: ['nodejs', 'npm', 'javascript', 'nvm', 'developer']
---

# Node.js & NPM

## What is it?

Node.js runs JavaScript outside the browser. npm is its package manager. Needed for web development, React, Next.js, etc.


```bash
# Install Node.js (recommended: via NodeSource for latest version):
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs
```


```bash
# Verify installation:
node --version
npm --version
```


```bash
# Install a package globally:
sudo npm install -g package_name
```


```bash
# Initialize a new project:
npm init -y
```


```bash
# Install project dependencies:
npm install
```


```bash
# Run a development server:
npm run dev
```

