---
title: "Hardware Stress Testing"
section: 2
category: 78
description: "Benchmark and stress test CPU, GPU, RAM, cache, and thermals with stress-ng and glmark2."
icon: "cpu"
tags: ["stress", "benchmark", "stress-ng", "glmark2", "cpu", "gpu", "ram", "thermals", "burn-in", "hardware"]
---

# Hardware Stress Testing ⚡

Hardware stress testing pushes system components (CPU, GPU, RAM, storage, cooling) to their maximum operational limits. It is used to verify hardware stability, diagnose thermal throttling, detect calculation bit-flip errors, benchmark peak performance, or rapidly discharge batteries for gauge recalibration.

---

## 1. Installing the Stress Testing Suite

The two primary tools for comprehensive Linux stress testing: `stress-ng` (CPU, memory, cache, I/O) and `glmark2` (3D OpenGL/Vulkan GPU benchmark).

```bash
# Install stress-ng (comprehensive CPU, RAM, and system stress suite)
sudo apt install -y stress-ng

# Install glmark2 for Wayland desktop sessions
sudo apt install -y glmark2-wayland

# Install glmark2 for X11 desktop sessions (if using Xorg)
sudo apt install -y glmark2-x11

# Install hardware sensor monitoring
sudo apt install -y lm-sensors
```

---

## 2. CPU Single-Core Peak Boost Test

Pushes a single CPU core to its absolute limit to test AMD Precision Boost or Intel Turbo Boost clock speeds (reaching 3.0+ to 4.0+ GHz).

```bash
# Stress exactly 1 CPU core for 1 minute with brief metrics summary
stress-ng --cpu 1 --timeout 1m --metrics-brief
```

> **💡 Why it boosts higher:** When only one core is loaded, the processor routes its entire electrical and thermal wattage into that single core, achieving maximum clock frequencies.

---

## 3. CPU Physical Multi-Core Stress

Loads all physical execution cores at 100% computational capacity while keeping system responsiveness intact.

```bash
# Stress 4 physical CPU cores for 5 minutes
stress-ng --cpu 4 --timeout 5m --metrics-brief
```

---

## 4. Maximum CPU & Thread Saturation (All SMT / Hyperthreads)

Saturates all virtual hyperthreads/SMT threads at 100%, generating maximum electrical current and thermal output.

```bash
# Stress all 8 threads (on an 8-thread CPU) for 5 minutes
stress-ng --cpu 8 --timeout 5m --metrics-brief
```

---

## 5. Targeting Specific CPU Math Algorithms

By default, `stress-ng` uses a round-robin mix of methods. You can isolate specific mathematical instruction sets to stress distinct parts of the processor architecture:

| Command Method | Target Architectural Subsystem |
|---|---|
| `--cpu-method matrixprod` | Heavy integer matrix math (stresses ALUs & thermal heat) |
| `--cpu-method fft` | Fast Fourier Transform (stresses Floating-Point Unit / FPU) |
| `--cpu-method fibonacci` | Deep recursive function calls (stresses CPU stack & branch predictor) |
| `--cpu-method sqrt` | Intensive square root computations |
| `--cpu-method all` | Cycles continuously through all 80+ CPU stress algorithms |

```bash
# Heavy ALU & thermal heat generation via matrix multiplication
stress-ng --cpu 4 --cpu-method matrixprod --timeout 3m

# Floating-point unit (FPU) stress test
stress-ng --cpu 4 --cpu-method fft --timeout 3m

# Cycle through all 80+ CPU stress methods sequentially
stress-ng --cpu 4 --cpu-method all --timeout 10m
```

> **💡 View All Methods:** Run `stress-ng --cpu-method which` to view the complete list of 80+ supported mathematical stress algorithms.

---

## 6. Verifying CPU Stability & Bit-Flip Detection

When overclocking, undervolting, or testing aging silicon, CPUs can produce silent calculation errors before crashing. The `--verify` flag verifies mathematical results on the fly.

```bash
# Verify arithmetic computations to detect silent CPU calculation bit-flips
stress-ng --cpu 4 --verify --timeout 5m --metrics-brief
```

---

## 7. Memory (RAM) & Zswap Compression Stress

Allocates, writes, and reads massive memory pages to test RAM stability, memory bus bandwidth, and in-kernel zswap/zram compression efficiency.

```bash
# Stress 4 GB of RAM using 2 worker processes for 3 minutes
stress-ng --vm 2 --vm-bytes 4G --timeout 3m --metrics-brief

# Stress 80% of total available system RAM
stress-ng --vm 2 --vm-bytes 80% --timeout 5m

# Test RAM stability with memory bit-flip verification
stress-ng --vm 2 --vm-bytes 3G --verify --timeout 2m
```

---

## 8. CPU Cache Throughput Stress (L1 / L2 / L3)

Stresses the CPU cache hierarchy and memory controller bandwidth with rapid, cache-aligned random reads and writes.

```bash
# Stress L1/L2/L3 caches using 4 parallel workers
stress-ng --cache 4 --timeout 2m --metrics-brief
```

---

## 9. Storage (NVMe SSD / HDD) I/O Stress

Tests sustained disk throughput, filesystem queueing, and thermal endurance under heavy read/write mixtures.

```bash
# Mixed read and write operations
stress-ng --iomix 2 --timeout 2m --metrics-brief

# Aggressive disk write and sync stress (writes 2GB files)
stress-ng --hdd 2 --hdd-bytes 2G --timeout 2m
```

---

## 10. GPU 3D Benchmark & Stress Testing (glmark2)

`glmark2` exercises the 3D graphics pipeline (shading, lighting, textures, normal mapping, terrain generation, and particle physics).

```bash
# Run default windowed benchmark (800x600)
glmark2-wayland

# Run in Fullscreen mode (native panel resolution)
glmark2-wayland --fullscreen

# Run at custom 1080p Full HD resolution
glmark2-wayland --size 1920x1080

# Run at 2K (1440p QHD) resolution
glmark2-wayland --size 2560x1440

# Run at 4K (3840x2160 UHD) resolution
glmark2-wayland --size 3840x2160
```

---

## 11. 4K Off-Screen GPU Stress Loop

Renders in 4K resolution off-screen without window clipping, looping indefinitely for maximum GPU thermal burn-in.

```bash
# Infinite 4K off-screen burn-in loop (Press Ctrl+C to stop)
glmark2-wayland --off-screen --size 3840x2160 --run-forever
```

---

## 12. Full-System Burn-in Test (CPU + RAM + Cache)

Simultaneously stresses the CPU, virtual memory, and cache hierarchy to evaluate cooling performance and power supply stability.

```bash
# Combined full-system burn-in test
stress-ng --cpu 4 --vm 2 --vm-bytes 2G --cache 2 --timeout 5m --metrics-brief
```

---

## 13. Real-Time Hardware Telemetry During Stress Tests

Monitor temperatures, fan speeds, clock frequencies, and power draw in real time in a second terminal window:

```bash
# Continuous temperature and sensor readout (refreshed every 1 second)
watch -n 1 sensors

# Monitor real-time CPU frequencies across all cores
watch -n 1 "cat /proc/cpuinfo | grep 'MHz'"

# Monitor detailed AMD/Intel CPU power and C-states (requires root)
sudo turbostat --interval 2
```

---

## 14. Fast Battery Discharge Protocol (Recalibration)

To recalibrate a drifting laptop battery fuel gauge, the battery must be drained to its hardware shutoff (~10.0V–10.2V) and charged to 100% without interruption. To drain the remaining 15–20% in 8–10 minutes instead of hours:

```bash
# 1. Turn screen brightness to 100% (backlight draws ~3–5W)

# 2. Run multi-core CPU stress combined with background 4K GPU rendering
stress-ng --cpu 4 --timeout 15m & glmark2-wayland --off-screen --size 3840x2160 --run-forever
```

> **⚠️ Warning:** Ensure all unsaved work is closed before running the fast discharge protocol. The laptop will cut power abruptly when the hardware cutoff is reached. Connect your AC charger immediately once powered off.
