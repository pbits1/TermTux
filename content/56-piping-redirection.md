---
title: "PIPING & REDIRECTION (The Power of Linux)"
section: 5
category: 56
icon: "terminal"
---

# PIPING & REDIRECTION (The Power of Linux)


  This is what makes Linux terminal incredibly powerful.
  You can chain commands together like LEGO blocks.

  PIPE ( | ):
    Sends the OUTPUT of one command as INPUT to the next.

    ls -la | grep ".txt"
      → List files, then filter to show only .txt files.

    ps aux | grep chrome
      → List all processes, then filter for Chrome.

    cat bigfile.log | head -20
      → Show only the first 20 lines of a big file.

    history | grep "apt" | tail -5
      → Search history for 'apt' commands, show last 5.

    du -sh * | sort -rh | head -10
      → Find the 10 biggest items in current folder.

  REDIRECT OUTPUT ( > and >> ):

    command > file.txt
      → Save output to file (OVERWRITES existing content).

    command >> file.txt
      → APPEND output to file (adds to the end).

    echo "Hello World" > greeting.txt
      → Creates greeting.txt with "Hello World" inside.

    ls -la >> file_list.txt
      → Appends the file listing to file_list.txt.

  REDIRECT ERRORS ( 2> ):

    command 2> errors.txt
      → Save error messages to a file.

    command > output.txt 2>&1
      → Save BOTH normal output AND errors to the same file.

    command > /dev/null 2>&1
      → Throw away ALL output (silence a noisy command).
        /dev/null is a "black hole" — anything sent to it vanishes.


