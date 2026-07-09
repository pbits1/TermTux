---
title: "ENVIRONMENT VARIABLES"
section: 2
category: 25
icon: "terminal"
---

# ENVIRONMENT VARIABLES


```bash
echo $HOME
```
    → Print the value of the HOME variable.

```bash
echo $PATH
```
    → Print all directories where the system looks for commands.

```bash
env
```
    → List ALL environment variables.

```bash
export MY_VAR="hello"
```
    → Set a temporary environment variable (lasts until terminal closes).

To make it permanent, add it to ~/.bashrc:
    echo 'export MY_VAR="hello"' >> ~/.bashrc
    source ~/.bashrc


