---
title: "NODE.JS & NPM"
section: 4
category: 50
icon: "terminal"
---

# NODE.JS & NPM


  What is it?
    Node.js runs JavaScript outside the browser. npm is its package
    manager. Needed for web development, React, Next.js, etc.

    # Install Node.js (recommended: via NodeSource for latest version):
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install nodejs

    # Verify installation:
    node --version
    npm --version

    # Install a package globally:
    sudo npm install -g package_name

    # Initialize a new project:
    npm init -y

    # Install project dependencies:
    npm install

    # Run a development server:
    npm run dev


