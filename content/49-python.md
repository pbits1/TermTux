---
title: "Python"
section: 5
category: 49
description: "Install and manage Python, pip, virtual environments."
icon: "code"
tags: ['python', 'pip', 'venv', 'programming', 'developer']
---

# Python

Python is the most popular programming language, used for scripting, web development, AI/ML, automation, and data science. Ubuntu comes with Python pre-installed.

---

## 1. Check Python Version

```bash
python3 --version
```

---

## 2. Install pip (Python Package Manager)

```bash
sudo apt install python3-pip
```

---

## 3. Install a Python Package Globally

```bash
pip3 install package_name
```

> [!WARNING]
> **PEP 668 Restrictions:**
> On Ubuntu 23.04+ (and Debian 12+), installing packages globally using `pip3` is restricted by default. It is highly recommended to use a virtual environment (see Section 4). If you absolutely must install a package globally, append the `--break-system-packages` flag:
> ```bash
> pip3 install package_name --break-system-packages
> ```

---

## 4. Create a Virtual Environment

Isolated Python workspace — keeps project dependencies separate so projects don't conflict.

```bash
python3 -m venv myproject_env
```

---

## 5. Activate a Virtual Environment

```bash
source myproject_env/bin/activate
```

---

## 6. Install Packages Inside a Virtual Environment

```bash
pip install flask requests numpy
```

---

## 7. Deactivate a Virtual Environment

```bash
deactivate
```

---

## 8. Run a Python Script

```bash
python3 script.py
```

---

## 9. Open Python Interactive Shell

```bash
python3
```

---

## 10. Install Python from DeadSnakes PPA (Alternate Versions)

Get Python 3.12, 3.13, etc., when the default repo version isn't recent enough.

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12
```

---

## 11. List Installed Packages

```bash
pip3 list
```

---

## 12. Freeze Dependencies (for requirements.txt)

Outputs all installed packages in pip's standard format for sharing with others.

```bash
pip3 freeze > requirements.txt
```

---

## 13. Install Dependencies from requirements.txt

```bash
pip install -r requirements.txt
```

---

## 14. Check if a Specific Python Package is Installed

```bash
pip3 show package_name
```

