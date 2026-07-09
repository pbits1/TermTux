---
title: "Networking Commands"
section: 2
category: 22
description: "Check IPs, test connectivity, manage Wi-Fi, and troubleshoot network issues."
icon: "wifi"
tags: ['networking', 'ip', 'ping', 'wget', 'curl', 'wifi', 'dns']
---

# Networking Commands

```bash
ip a
```

→ Show all network interfaces and IP addresses

(replacement for the old 'ifconfig').

```bash
ip route
```

→ Show the routing table (find your gateway).


```bash
ping google.com
```

→ Test internet connectivity. Press Ctrl+C to stop.


```bash
ping -c 4 google.com
```

→ Ping exactly 4 times and stop.


```bash
wget https://example.com/file.zip
```

→ Download a file from the internet.


```bash
curl -O https://example.com/file.zip
```

→ Download a file (alternative to wget).


```bash
curl ifconfig.me
```

→ Show your public IP address.


```bash
ss -tuln
```

→ Show all open/listening network ports.

(replacement for the old 'netstat').

```bash
nmcli device status
```

→ Show Wi-Fi/Ethernet connection status.


```bash
nmcli device wifi list
```

→ Scan and list available Wi-Fi networks.


```bash
nmcli device wifi connect "NetworkName" password "YourPassword"
```

→ Connect to a Wi-Fi network from terminal.


```bash
nslookup domain.com
```

→ Look up DNS information for a domain.


```bash
traceroute google.com
```

→ Trace the network path to a server (shows every hop).

Install: sudo apt install traceroute
