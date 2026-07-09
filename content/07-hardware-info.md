---
title: "Hardware & System Information"
section: 1
category: 7
description: "Get detailed hardware info — laptop model, BIOS version, serial number, and more."
icon: "disk"
tags: ["hardware", "bios", "serial", "model", "system-info", "dmidecode"]
---

# Hardware & System Information

Need your laptop model for a support ticket? Want to check your BIOS version? These commands pull hardware details straight from the system.

---

## `cat /sys/devices/virtual/dmi/id/product_name`

Get laptop model/product name.

```bash
cat /sys/devices/virtual/dmi/id/product_name
```

---

## `cat /sys/devices/virtual/dmi/id/product_sku`

Get product number/SKU (useful for HP support lookups).

```bash
cat /sys/devices/virtual/dmi/id/product_sku
```

---

## `cat /sys/devices/virtual/dmi/id/bios_version`

Check the current BIOS version installed.

```bash
cat /sys/devices/virtual/dmi/id/bios_version
```

---

## `cat /sys/devices/virtual/dmi/id/bios_date`

Check when the BIOS was released/installed.

```bash
cat /sys/devices/virtual/dmi/id/bios_date
```

---

## `cat /sys/devices/virtual/dmi/id/board_name`

Get the motherboard/baseboard model name.

```bash
cat /sys/devices/virtual/dmi/id/board_name
```

---

## `sudo dmidecode -s system-serial-number`

Get the laptop's serial number (requires sudo).

```bash
sudo dmidecode -s system-serial-number
```

---

## `sudo dmidecode -s system-product-name`

Get the full product name (requires sudo).

```bash
sudo dmidecode -s system-product-name
```
