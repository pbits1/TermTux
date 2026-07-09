---
title: "Text Processing (sed, awk, grep)"
section: 3
category: 64
description: "Master the Unix text processing toolbox — sed, awk, sort, uniq, cut, tr, and jq."
icon: "book"
tags: ["sed", "awk", "grep", "sort", "uniq", "cut", "tr", "jq", "text", "processing", "beginner"]
---

# Text Processing (sed, awk, grep)

The real power of the Linux terminal comes from chaining small text-processing commands together. These tools let you slice, filter, transform, and analyze text in any way imaginable.

---

## 1. `grep` — Search Patterns in Files

Search for lines matching a pattern.

```bash
# Find lines containing "error" in a log file
grep "error" /var/log/syslog

# Case-insensitive search
grep -i "warning" system.log

# Show line numbers with matches
grep -n "TODO" main.py

# Recursively search all files in a directory
grep -r "function" ./src/

# Count matching lines
grep -c "failed" auth.log

# Show 2 lines before and after each match
grep -B 2 -A 2 "crash" log.txt
```

---

## 2. `sed` — Stream Editor (Find & Replace)

Sed is a non-interactive text editor. Use it to find and replace text in files.

```bash
# Replace first occurrence of "foo" with "bar" on each line
sed 's/foo/bar/' file.txt

# Replace ALL occurrences on each line (the g flag)
sed 's/foo/bar/g' file.txt

# Edit file in-place (overwrite the original)
sed -i 's/old/new/g' file.txt

# Delete lines matching a pattern
sed '/pattern/d' file.txt

# Print only lines 10-20
sed -n '10,20p' file.txt
```

---

## 3. `awk` — Pattern Scanning and Processing

Awk is a full programming language for text processing. At its simplest, it splits lines into columns.

```bash
# Print the 1st and 3rd column of a file
awk '{print $1, $3}' file.txt

# Print lines where column 2 equals "error"
awk '$2 == "error" {print}' log.txt

# Sum values in the 4th column
awk '{sum += $4} END {print sum}' data.txt

# Print columns with custom separator (e.g., CSV)
awk -F',' '{print $1, $2}' data.csv
```

---

## 4. `sort` — Sort Lines

Sort lines alphabetically or numerically.

```bash
# Alphabetical sort
sort file.txt

# Reverse sort
sort -r file.txt

# Numeric sort
sort -n numbers.txt

# Sort by column (e.g., column 2)
sort -k2 data.txt

# Sort human-readable sizes (e.g., du output)
du -sh * | sort -rh
```

---

## 5. `uniq` — Filter Unique Lines

Remove duplicate adjacent lines. Often used after `sort`.

```bash
# Remove consecutive duplicates
uniq file.txt

# Count occurrences of each unique line
sort file.txt | uniq -c

# Show only lines that appear exactly once
sort file.txt | uniq -u
```

---

## 6. `cut` — Extract Columns

Extract specific fields or character ranges from each line.

```bash
# Extract first 10 characters of each line
cut -c1-10 file.txt

# Extract columns by delimiter (e.g., /etc/passwd uses :)
cut -d':' -f1 /etc/passwd

# Extract multiple fields
cut -d',' -f1,3 data.csv
```

---

## 7. `tr` — Translate Characters

Replace or delete specific characters.

```bash
# Convert lowercase to uppercase
cat file.txt | tr 'a-z' 'A-Z'

# Delete all digits
echo "abc123" | tr -d '0-9'

# Squeeze repeated characters into one
echo "hello    world" | tr -s ' '
```

---

## 8. `wc` — Word, Line, Character Count

Count lines, words, and characters in files.

```bash
# Count lines
wc -l file.txt

# Count words
wc -w file.txt

# Count characters
wc -c file.txt

# Line, word, and character count for all .py files
wc -l *.py
```

---

## 9. `jq` — Parse JSON in Terminal

Jq is a lightweight command-line JSON processor. Install it first with `sudo apt install jq`.

```bash
# Pretty-print a JSON file
jq . file.json

# Extract a specific field
jq '.name' package.json

# Extract nested fields
jq '.dependencies | keys' package.json

# Filter array elements
curl https://api.github.com/repos/pbits1/TermTux/commits | jq '.[0].commit.message'
```