---
title: "Advanced Permissions & Security"
section: 3
category: 70
description: "Beyond chmod — umask, SUID/SGID, sticky bit, ACLs, and file system security features."
icon: "shield"
tags: ["permissions", "umask", "suid", "sgid", "sticky", "acl", "setfacl", "getfacl", "security"]
---

# Advanced Permissions & Security

Once you understand basic `chmod 755`, these concepts give you fine-grained control over who can do what with your files and processes.

---

## 1. Default Permissions: `umask`

Umask controls the default permissions assigned when creating new files and folders.

```bash
# View current umask value
umask

# Explanation: umask 022 means new files get 644, new folders get 755
# Formula: 666 - umask = file permissions, 777 - umask = folder permissions

# Set a more restrictive umask for this session
umask 077
```

---

## 2. Special Permission: SUID (Set User ID)

When set on an executable, the program runs with the file owner's privileges instead of the user's. The owner's execute bit becomes `s` instead of `x`.

```bash
# Find all SUID binaries on the system (potential security risk)
find / -perm -4000 2>/dev/null

# Set SUID on a binary (run as owner)
sudo chmod u+s /path/to/program

# Remove SUID
sudo chmod u-s /path/to/program
```

> **⚠️ Warning:** SUID binaries are a common target for privilege escalation attacks. Only set SUID on programs you trust completely.

---

## 3. Special Permission: SGID (Set Group ID)

Similar to SUID but for groups. On a directory, new files inherit the directory's group instead of the creator's default group.

```bash
# Set SGID on a shared directory
sudo chmod g+s /shared/folder

# Find all SGID binaries
find / -perm -2000 2>/dev/null
```

---

## 4. Special Permission: Sticky Bit

When set on a directory, users can only delete files they own — even if they have write access. `/tmp` is the classic example.

```bash
# View sticky bit (shown as 't' in permissions: drwxrwxrwt)
ls -ld /tmp

# Set sticky bit on a shared directory
sudo chmod +t /shared/directory
```

---

## 5. ACLs — Access Control Lists

ACLs give you per-user and per-group permissions beyond the basic owner/group/others model.

```bash
# View ACLs on a file
getfacl file.txt

# Grant read/write to a specific user
setfacl -m u:username:rw file.txt

# Grant read to a specific group
setfacl -m g:groupname:r file.txt

# Remove all ACLs
setfacl -b file.txt

# Set default ACL for a directory (new files inherit it)
setfacl -d -m u:username:rwx shared_directory/
```

---

## 6. File Attributes with `chattr`

Immutable and append-only attributes — even root can't modify them without removing the attribute first.

```bash
# Make a file immutable (cannot be deleted or modified, even by root)
sudo chattr +i important.conf

# Allow only appending to a file (log files)
sudo chattr +a /var/log/secure.log

# View attributes
lsattr important.conf

# Remove immutable flag
sudo chattr -i important.conf
```

---

## 7. File Descriptors and `ulimit`

Every process has a limit on how many files it can open. View and change these limits.

```bash
# View all resource limits for the current shell
ulimit -a

# View the max number of open file descriptors
ulimit -n

# Raise the limit (e.g., for a database server)
ulimit -n 65535
```

---

## 8. Find Files with Specific Permissions

```bash
# Find files with 777 permissions (world-writable)
find / -type f -perm 0777 2>/dev/null

# Find world-writable directories
find / -type d -perm 0777 2>/dev/null

# Find files that have no owner
find / -nouser -o -nogroup 2>/dev/null
```

---

## 9. Permission Audit Example

Quickly scan for security issues in your home directory:

```bash
# Check for files with overly permissive permissions
find ~ -type f -perm /o+w 2>/dev/null

# Check for directories that allow anyone to write
find ~ -type d -perm /o+w 2>/dev/null
```