---
title: "Network Diagnostics & Tools"
section: 3
category: 68
description: "Advanced network troubleshooting with dig, nmap, lsof, ss deep, and tcpdump."
icon: "wifi"
tags: ["dig", "nmap", "tcpdump", "lsof", "netstat", "network", "diagnostics", "dns", "ports"]
---

# Network Diagnostics & Tools

When `ping` and `ip a` aren't enough, these tools help you trace DNS, scan ports, inspect traffic, and find which process is using a port.

---

## 1. `dig` — DNS Lookup (Advanced)

More detailed than `nslookup`. Queries DNS servers directly.

```bash
# Basic DNS lookup
dig google.com

# Short answer only (clean output)
dig google.com +short

# Query a specific DNS server
dig @8.8.8.8 google.com

# Find the mail server for a domain
dig gmail.com MX
```

---

## 2. `host` — Quick DNS Lookup

Simpler alternative to `dig` for quick lookups.

```bash
host google.com
host 8.8.8.8
```

---

## 3. `ss` — Socket Statistics (Deep)

SS is the modern replacement for `netstat`. It shows every network connection on your system.

```bash
# Show all listening ports
ss -tuln

# Show all TCP connections (including established)
ss -t

# Show processes using each socket (needs sudo)
sudo ss -tulnp

# Show connections to a specific port
ss -tuln sport = :22

# Show IP addresses instead of hostnames
ss -nt
```

---

## 4. `lsof` — List Open Files (Including Sockets)

In Linux, everything is a file — including network connections. Lsof shows which process owns which port.

```bash
# Show which process is using port 80
sudo lsof -i :80

# List all network connections
lsof -i

# List all open files by a specific process
lsof -p PID

# List files opened by a user
lsof -u username
```

---

## 5. `nmap` — Network Mapper

Scan hosts and networks for open ports and running services. Install with `sudo apt install nmap`.

```bash
# Scan a single host for open ports
nmap 192.168.1.1

# Scan a specific port range
nmap -p 1-1000 192.168.1.1

# Detect OS and service versions
nmap -O -sV 192.168.1.1

# Scan an entire subnet (use carefully — can be detected as an attack)
nmap 192.168.1.0/24
```

> **⚠️ Warning:** Scanning networks you don't own is illegal in many jurisdictions. Only scan your own devices.

---

## 6. `tcpdump` — Packet Capture

Inspect raw network packets in real time. Install with `sudo apt install tcpdump`.

```bash
# Capture all traffic on a specific interface
sudo tcpdump -i wlp2s0

# Capture HTTP traffic (port 80) — show packet contents
sudo tcpdump -i any port 80 -A

# Capture DNS queries (port 53)
sudo tcpdump -i any port 53

# Write capture to a file for analysis in Wireshark
sudo tcpdump -i any -w capture.pcap
```

---

## 7. `ping` — Advanced Options

Beyond basic ping.

```bash
# Ping with timestamp for logging
ping -D google.com

# Ping a specific number of times and stop
ping -c 5 google.com

# Flood ping (requires root) — dangerous, for testing only
sudo ping -f -c 100 localhost
```

---

## 8. `traceroute` — Network Path

See every hop between you and a destination. Available via `sudo apt install traceroute`.

```bash
traceroute google.com
```

---

## 9. Test Bandwidth with `iperf3`

Measure network throughput between two machines. Install on both with `sudo apt install iperf3`.

On the **server**:

```bash
iperf3 -s
```

On the **client**:

```bash
iperf3 -c 192.168.1.100
```

---

## 10. Check Wi-Fi Signal Strength

```bash
# Show Wi-Fi signal and connection quality
iwconfig wlp2s0

# Scan available networks and their signal strengths
sudo iw dev wlp2s0 scan | grep -E "SSID|signal"
```