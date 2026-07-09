---
title: "Python"
section: 4
category: 49
description: "Install and manage Python, pip, virtual environments."
icon: "code"
tags: ['python', 'pip', 'venv', 'programming', 'developer']
---

# Python

## What is it?

The most popular programming language. Used for scripting, web development, AI/ML, automation, data science. Ubuntu comes with Python pre-installed, but you may need extras.


```bash
# Check installed version:
python3 --version
```


```bash
# Install pip (Python package manager — like npm for Python):
sudo apt install python3-pip
```


```bash
# Install a Python package:
pip3 install package_name
```


```bash
# Create a virtual environment (isolated Python workspace):
#   WHY? To keep project dependencies separate, so one project
#   doesn't break another.
python3 -m venv myproject_env
```


```bash
# Activate the virtual environment:
source myproject_env/bin/activate
```


```bash
# Now pip install works inside this environment only:
pip install flask requests numpy
```


```bash
# Deactivate when done:
deactivate
```


```bash
# Run a Python script:
python3 script.py
```


```bash
# Open Python interactive shell:
python3
```

