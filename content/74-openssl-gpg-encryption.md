---
title: "Encryption & GPG"
section: 6
category: 74
description: "Encrypt files, sign documents, manage keys, and verify integrity using GPG, OpenSSL, and checksums."
icon: "lock"
tags: ["gpg", "openssl", "encryption", "sha256", "md5", "checksum", "gnupg", "security"]
---

# Encryption & GPG

From generating checksums to encrypting files with GPG, these tools protect your data from unauthorized access.

---

## 1. Generate a File Checksum (SHA256)

Verify file integrity — ensures a file hasn't been tampered with or corrupted.

```bash
sha256sum file.iso
```

---

## 2. Verify a Checksum File

Compare a file against a known checksum to confirm it hasn't been altered.

```bash
sha256sum -c checksums.txt
```

---

## 3. Generate an MD5 Checksum

Older standard, faster but less collision-resistant than SHA256.

```bash
md5sum file.iso
```

---

## 4. Encrypt a File with OpenSSL

Symmetric encryption using AES-256.

```bash
# Encrypt a file (you'll be prompted for a password)
openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc

# Decrypt the file
openssl enc -aes-256-cbc -d -in secret.enc -out secret.txt
```

---

## 5. Base64 Encode/Decode

Convert binary data to text format for safe transmission or storage.

```bash
# Encode a file as base64
base64 file.txt > file.b64

# Decode
base64 -d file.b64 > file.txt
```

---

## 6. Generate a GPG Key Pair

GPG (GNU Privacy Guard) is the standard for encrypting email and files using public-key cryptography.

```bash
# Generate a new key pair
gpg --full-generate-key
```

---

## 7. List GPG Keys

```bash
# List public keys
gpg --list-keys

# List private keys
gpg --list-secret-keys
```

---

## 8. Export and Import GPG Keys

```bash
# Export a public key (share this)
gpg --export -a "Your Name" > public.key

# Export private key (back this up securely)
gpg --export-secret-keys -a "Your Name" > private.key

# Import a key from someone else
gpg --import public.key
```

---

## 9. Encrypt and Decrypt a File with GPG

```bash
# Encrypt a file for a specific recipient
gpg -e -r "Recipient Name" file.txt

# Decrypt a file
gpg -d file.txt.gpg
```

---

## 10. Sign a File

Prove you authored a file and it hasn't been tampered with.

```bash
# Create a detached signature
gpg --detach-sign file.txt

# Verify the signature
gpg --verify file.txt.sig file.txt
```

---

## 11. Encrypt and Sign in One Step

Encrypt a file so only the recipient can read it, and prove you sent it.

```bash
gpg --encrypt --sign -r "Recipient Name" file.txt
```

---

## 12. Generate a Random Password

Create a cryptographically secure random password.

```bash
# Generate a 32-character random password
openssl rand -base64 32

# Generate a 12-character alphanumeric password
openssl rand -base64 12
```