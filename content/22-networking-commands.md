---
title: "Networking Commands"
section: 3
category: 22
description: "Check IPs, test connectivity, manage Wi-Fi, and troubleshoot network issues."
icon: "wifi"
tags: ["networking", "ip", "ping", "wget", "curl", "wifi", "dns", "beginner"]
---

# Networking Commands

Troubleshoot connections, list local network interfaces, query DNS records, and manage Wi-Fi profiles.

---

## 1. Show IP Addresses

List all network interfaces (Ethernet, Wi-Fi, loopback) and their assigned IP addresses. This is the modern replacement for `ifconfig`.

```bash
ip a
```

---

## 2. Show Network Gateway

Display the system routing table and find your gateway IP address.

```bash
ip route
```

---

## 3. Test Connectivity

Ping a server indefinitely to check connection stability. Press `Ctrl+C` to terminate the test.

```bash
ping google.com
```

---

## 4. Test Connectivity (Limited Count)

Send a specific number of ping requests (e.g., 4 times) and stop automatically.

```bash
ping -c 4 google.com
```

---

## 5. Download Files (`wget`)

Download a remote file or webpage from a specific URL.

```bash
wget https://example.com/file.zip
```

---

## 6. Download Files (`curl`)

Save a remote file or webpage using curl (an alternative download utility).

```bash
curl -O https://example.com/file.zip
```

---

## 7. Show Public IP Address

Query an external API to retrieve and print your public IP address.

```bash
curl ifconfig.me
```

---

## 8. List Listening Ports

Show all active and listening network ports on your machine. This is the modern replacement for `netstat`.

```bash
ss -tuln
```

---

## 9. View Network Interface Status

Show the connection status of all network hardware devices (Wi-Fi, Ethernet).

```bash
nmcli device status
```

---

## 10. List Wi-Fi Networks

Scan and display all available Wi-Fi access points in your range.

```bash
nmcli device wifi list
```

---

## 11. Connect to Wi-Fi

Connect to a specific Wi-Fi access point by name and password.

```bash
nmcli device wifi connect "NetworkName" password "YourPassword"
```

---

## 12. DNS Lookup

Query DNS servers to find the IP address details of a specific domain name.

```bash
nslookup domain.com
```

---

## 13. Trace Network Route

Trace the route packets take to reach a destination server (requires `sudo apt install traceroute`).

```bash
traceroute google.com
```
