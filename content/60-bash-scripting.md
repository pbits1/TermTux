---
title: "Bash Scripting Basics"
section: 6
category: 60
description: "Learn to write automation scripts, use variables, loops, conditionals, and write your first .sh script."
icon: "terminal"
tags: ["bash", "scripting", "automation", "variables", "loops", "if-else", "sh", "developer"]
---

# Bash Scripting Basics

Bash scripts are text files containing a sequence of commands. Running the script executes all commands sequentially, saving you from typing them manually.

---

## 1. Creating and Running Your First Script

To create a script, follow these steps:

1. Create a new file with a `.sh` extension:
   ```bash
   touch my_script.sh
   ```
2. Open it in a text editor (e.g., `nano`):
   ```bash
   nano my_script.sh
   ```
3. Add the **Shebang** (`#!/bin/bash`) at the very top. This tells Linux to run the file using the Bash interpreter:
   ```bash
   #!/bin/bash
   echo "Hello, World!"
   ```
4. Save and exit (`Ctrl+O`, then `Ctrl+X` in nano).
5. Make the script executable:
   ```bash
   chmod +x my_script.sh
   ```
6. Run the script:
   ```bash
   ./my_script.sh
   ```

---

## 2. Working with Variables

Variables store data for reuse. In Bash, **do not leave spaces around the `=` sign** when assigning variables:

```bash
#!/bin/bash

# Assigning a variable
NAME="Linux User"
AGE=25

# Referencing a variable (use $ sign)
echo "Hello $NAME! You are $AGE years old."

# Storing command output in a variable (use $() syntax)
CURRENT_DIR=$(pwd)
echo "You are currently in: $CURRENT_DIR"
```

---

## 3. Reading User Input

Use the `read` command to capture input typed by the user:

```bash
#!/bin/bash

# Prompt user for input
read -p "Enter your username: " USER_INPUT

echo "Welcome aboard, $USER_INPUT!"
```

---

## 4. Conditionals (If/Else)

Use `if` statements to make decisions. In Bash, brackets `[ ]` require strict spacing:

```bash
#!/bin/bash

read -p "Enter your age: " AGE

# Note the spaces around [ and ] and variables!
if [ "$AGE" -ge 18 ]; then
    echo "Access granted: You are an adult."
else
    echo "Access denied: You are a minor."
fi
```

### Comparison Operators for Numbers:
* `-eq` : Equal to
* `-ne` : Not equal to
* `-gt` : Greater than
* `-lt` : Less than
* `-ge` : Greater than or equal to
* `-le` : Less than or equal to

---

## 5. Loops

Loops execute a block of code multiple times.

### For Loop (Iterating over a range)
```bash
#!/bin/bash

echo "Counting from 1 to 5:"
for i in {1..5}; do
    echo "Number: $i"
done
```

### For Loop (Iterating over files in a folder)
```bash
#!/bin/bash

# Backup all markdown files in the current folder
for file in *.md; do
    cp "$file" "${file}.bak"
    echo "Backed up $file"
done
```

### While Loop (Iterating while a condition is true)
```bash
#!/bin/bash

COUNTER=1
while [ $COUNTER -le 3 ]; do
    echo "Counter is: $COUNTER"
    COUNTER=$((COUNTER + 1)) # Incrementing counter
done
```

---

## 6. Exit Codes

Every command returns an **Exit Code** between `0` and `255` when it finishes.
* `0` means **Success**.
* Any number other than `0` indicates an **Error**.
* You can check the exit code of the last run command using the `$?` variable:

```bash
#!/bin/bash

# Attempt to list a non-existent folder
ls /non-existent-directory

# Print exit code (will be 2, indicating error)
echo "Exit code: $?"
```
