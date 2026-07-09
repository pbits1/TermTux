---
title: "Audio on Linux"
section: 3
category: 77
description: "Manage audio devices, troubleshoot sound, record/play audio, and control PulseAudio and ALSA from the terminal."
icon: "volume-2"
tags: ["audio", "pulseaudio", "alsa", "aplay", "arecord", "pactl", "sound"]
---

# Audio on Linux

Sound on Linux can be tricky. These commands help you manage audio devices, control volume, and troubleshoot sound issues.

---

## 1. List Audio Devices

See what playback and recording hardware is available on your system.

```bash
# List playback devices
aplay -l

# List recording devices
arecord -l
```

---

## 2. Check PulseAudio Server Status

Verify that the PulseAudio sound server is running, or start it.

```bash
pulseaudio --check
pulseaudio --start
```

---

## 3. List PulseAudio Sinks and Sources

Sinks are outputs (speakers/headphones); sources are inputs (microphones).

```bash
# List all sinks
pactl list sinks short

# List all sources
pactl list sources short
```

---

## 4. Set Default Sink (Output Device)

Choose which audio output (speakers, headphones, HDMI) is used by default.

```bash
# Find your sink name or index
pactl list sinks short

# Set the default sink by name
pactl set-default-sink alsa_output.pci-0000_00_1f.3.analog-stereo
```

---

## 5. Adjust Volume

Control the output volume and mute state for the default audio device.

```bash
# Set volume to 50% on the default sink
pactl set-sink-volume @DEFAULT_SINK@ 50%

# Increase by 10%
pactl set-sink-volume @DEFAULT_SINK@ +10%

# Mute
pactl set-sink-mute @DEFAULT_SINK@ 1

# Unmute
pactl set-sink-mute @DEFAULT_SINK@ 0
```

---

## 6. Record Audio with `arecord`

Capture audio from a microphone or line-in and save it to a file.

```bash
# Record a 5-second WAV file
arecord -d 5 -f cd -t wav recording.wav
```

---

## 7. Play Audio with `aplay`

Play back a WAV file through your speakers or headphones.

```bash
aplay recording.wav
```

---

## 8. Record and Play Simultaneously (Monitor)

Listen to what your microphone is picking up in real time.

```bash
# Record what you hear (stereo mix)
parec --channels 2 --format s16le | aplay --format s16le
```

---

## 9. Move an Application to a Different Output

Redirect a specific app's audio to a different device (e.g., move music from speakers to headphones).

```bash
# Find the application's sink-input index
pactl list sink-inputs short

# Move it to a specific sink
pactl move-sink-input 42 1
```

---

## 10. Check ALSA Mixer

Open the interactive ALSA mixer to view and adjust hardware-level volume controls.

```bash
# Show ALSA levels (Master, PCM, Mic, etc.)
alsamixer
```

> **💡 Tip:** In `alsamixer`: arrow keys adjust levels, `M` mutes/unmutes, and F6 lets you select a different sound card.

---

## 11. Reload PulseAudio

Kill and restart PulseAudio to fix many common audio problems:

```bash
pulseaudio -k && pulseaudio --start
```

---

## 12. Test if ALSA Works

Generate a test tone to verify your sound card and speakers are functioning.

```bash
# Play a test sound
speaker-test -t sine -l 1
```