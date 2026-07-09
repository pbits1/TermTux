---
title: "Java (JDK)"
section: 5
category: 53
description: "Install Java JDK for Java development."
icon: "coffee"
tags: ['java', 'jdk', 'jre', 'developer']
---

# Java (JDK)

Programming language used for Android apps, enterprise software, and Minecraft. You need the JDK (Java Development Kit) to compile Java code, or just the JRE to run Java apps.

---

## 1. Install Default OpenJDK

Install the default system-recommended Java Development Kit.

```bash
sudo apt install default-jdk
```

---

## 2. Check Java Version

Verify the active runtime version of Java and the compiler.

```bash
java --version
javac --version
```

---

## 3. Install Specific Version

Install a specific JDK major version (e.g., OpenJDK 21).

```bash
sudo apt install openjdk-21-jdk
```

---

## 4. Switch Between Installed Versions

Manage and switch the active default Java version on your system.

```bash
sudo update-alternatives --config java
```
