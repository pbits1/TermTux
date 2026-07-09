// category index & metadata
const sections = [
  {
    id: 1,
    title: "Getting Started",
    description: "First steps to choosing a distribution and installing Linux.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>`,
    categories: [
      { id: 59, file: "59-linux-installation.md", title: "Linux Installation Guide", description: "Step-by-step guide to choosing a distro and installing Linux (Dual boot, UEFI, partitioning).", tags: ["install", "ubuntu", "distros", "dual-boot", "partition", "uefi", "bios", "usb"] }
    ]
  },
  {
    id: 2,
    title: "System Logs & Admin",
    description: "Core commands for system administration and logging.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
    categories: [
      { id: 1, file: "01-system-logs.md", title: "System Logs (journalctl)", description: "View and filter system logs using journalctl — the Linux equivalent of Windows Event Viewer.", tags: ["logs", "journalctl", "debugging", "boot", "systemd", "troubleshooting"] },
      { id: 2, file: "02-system-health.md", title: "System Health & Monitoring", description: "Monitor system uptime, memory, disk space, and running processes.", tags: ["monitoring", "uptime", "memory", "disk", "cpu", "processes", "health"] },
      { id: 3, file: "03-package-management.md", title: "Package Management (APT)", description: "Manage software packages using Ubuntu's APT package manager — update, upgrade, and clean up.", tags: ["apt", "packages", "update", "upgrade", "drivers", "software"] },
      { id: 4, file: "04-bluetooth-troubleshooting.md", title: "Bluetooth Troubleshooting", description: "Fix common Bluetooth issues — restart the service, unblock devices, and check status.", tags: ["bluetooth", "troubleshooting", "rfkill", "wireless", "hardware"] },
      { id: 5, file: "05-time-synchronization.md", title: "Time Synchronization", description: "Check and fix system time, timezone, and NTP synchronization.", tags: ["time", "ntp", "timezone", "chrony", "synchronization"] },
      { id: 6, file: "06-snap-packages.md", title: "Snap Package Management", description: "Manage Snap packages — Ubuntu's containerized app format.", tags: ["snap", "packages", "update", "software"] },
      { id: 7, file: "07-hardware-info.md", title: "Hardware & System Information", description: "Get detailed hardware info — laptop model, BIOS version, serial number, and more.", tags: ["hardware", "bios", "serial", "model", "system-info", "dmidecode"] },
      { id: 8, file: "08-file-permissions.md", title: "File & Permission Management", description: "Make files executable, check permissions, and trust desktop files.", tags: ["permissions", "chmod", "executable", "desktop", "gnome"] },
      { id: 9, file: "09-sudo-admin.md", title: "Sudo / Admin Access", description: "Grant and revoke temporary passwordless sudo access for automation.", tags: ["sudo", "admin", "root", "security", "sudoers"] },
      { id: 10, file: "10-process-management.md", title: "Process Management", description: "Find, stop, and manage running processes.", tags: ["processes", "kill", "pid", "background", "nohup"] },
      { id: 11, file: "11-networking.md", title: "Networking", description: "Check web service status and send desktop notifications.", tags: ["networking", "curl", "notifications", "web", "service"] },
      { id: 12, file: "12-desktop-shortcuts.md", title: "Desktop Shortcuts", description: "Create and configure .desktop shortcut files for launching applications.", tags: ["desktop", "shortcuts", "launcher", "gnome", ".desktop"] },
      { id: 13, file: "13-reboot-shutdown.md", title: "Reboot / Shutdown", description: "Restart, shut down, or schedule a shutdown for your system.", tags: ["reboot", "shutdown", "restart", "power"] }
    ]
  },
  {
    id: 3,
    title: "Essential Beginner Commands",
    description: "Navigation, file operations, and basics.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>`,
    categories: [
      { id: 14, file: "14-file-navigation.md", title: "Navigating the File System", description: "Move around the file system, list files, and find your way in the terminal.", tags: ["navigation", "cd", "ls", "pwd", "directory", "filesystem", "beginner"] },
      { id: 15, file: "15-file-operations.md", title: "File & Folder Operations", description: "Create, copy, move, rename, and delete files and folders.", tags: ["files", "folders", "copy", "move", "delete", "rename", "symlink", "beginner"] },
      { id: 16, file: "16-viewing-editing.md", title: "Viewing & Editing Files", description: "View file contents, edit files in the terminal, count lines, and compare files.", tags: ["cat", "head", "tail", "less", "nano", "gedit", "editing", "viewing", "beginner"] },
      { id: 17, file: "17-searching-finding.md", title: "Searching & Finding", description: "Find files by name, size, or date, and search inside files for text patterns.", tags: ["find", "grep", "search", "locate", "which", "whereis", "beginner"] },
      { id: 18, file: "18-user-permissions.md", title: "User & Permission Management", description: "Manage users, groups, passwords, and file permissions with the numeric cheat sheet.", tags: ["users", "permissions", "chmod", "chown", "groups", "sudo", "security", "beginner"] },
      { id: 19, file: "19-archives-compression.md", title: "Archive & Compression", description: "Compress and extract files using tar, gzip, and zip.", tags: ["archive", "compression", "tar", "zip", "gzip", "extract", "beginner"] },
      { id: 20, file: "20-system-services.md", title: "System Services (systemctl)", description: "Start, stop, enable, and manage system services with systemctl.", tags: ["systemctl", "services", "systemd", "enable", "disable", "start", "stop", "beginner"] },
      { id: 21, file: "21-installing-software.md", title: "Installing Software (Beyond APT)", description: "Install software using APT, dpkg, flatpak, PPAs, and more.", tags: ["apt", "dpkg", "flatpak", "ppa", "install", "software"] },
      { id: 22, file: "22-networking-commands.md", title: "Networking Commands", description: "Check IPs, test connectivity, manage Wi-Fi, and troubleshoot network issues.", tags: ["networking", "ip", "ping", "wget", "curl", "wifi", "dns"] },
      { id: 23, file: "23-disk-usb.md", title: "Disk & USB Drive Management", description: "Manage disks, partitions, USB drives, and storage.", tags: ["disk", "usb", "mount", "fdisk", "storage", "partition"] },
      { id: 24, file: "24-display-screen.md", title: "Display & Screen", description: "Manage display resolution, brightness, and screen settings.", tags: ["display", "screen", "resolution", "brightness", "xrandr"] },
      { id: 25, file: "25-environment-variables.md", title: "Environment Variables", description: "Set, view, and manage environment variables and PATH.", tags: ["env", "environment", "variables", "path", "export", "bashrc"] },
      { id: 26, file: "26-scheduled-tasks.md", title: "Scheduled Tasks (Cron)", description: "Automate tasks with cron jobs and at commands.", tags: ["cron", "crontab", "schedule", "automation", "at"] },
      { id: 27, file: "27-getting-help.md", title: "Getting Help", description: "Use man pages, --help, info, and other help commands.", tags: ["man", "help", "info", "whatis", "apropos"] },
      { id: 28, file: "28-terminal-shortcuts.md", title: "Terminal Shortcuts", description: "Essential keyboard shortcuts for the terminal.", tags: ["shortcuts", "keyboard", "terminal", "hotkeys"] },
      { id: 29, file: "29-gnome-shortcuts.md", title: "GNOME Shortcuts", description: "Essential keyboard shortcuts for the GNOME desktop.", tags: ["shortcuts", "keyboard", "gnome", "desktop", "hotkeys"] },
      { id: 30, file: "30-windows-linux-cheatsheet.md", title: "Windows → Linux Cheat Sheet", description: "Find Linux equivalents for common Windows commands and actions.", tags: ["windows", "linux", "translation", "cheatsheet", "migration"] },
      { id: 31, file: "31-useful-tools.md", title: "Useful Tools to Install", description: "Recommended tools to enhance your Ubuntu experience.", tags: ["tools", "utilities", "recommended", "install"] },
      { id: 61, file: "61-ssh-configuration.md", title: "SSH & Remote Access", description: "Generate SSH keys, use passwordless logins, configure server shortcuts, and secure remote access.", tags: ["ssh", "remote", "keys", "security", "ssh-config", "beginner"] },
      { id: 62, file: "62-terminal-customization.md", title: "Terminal Customisation", description: "Swap shell to Zsh, install Oh My Zsh, add code-highlighting plugins, and style your prompt with Starship.", tags: ["zsh", "oh-my-zsh", "starship", "theme", "terminal", "customize", "beginner"] }
    ]
  },
  {
    id: 4,
    title: "Software Installation Guides",
    description: "Install popular apps like VS Code, Chrome, and Discord.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`,
    categories: [
      { id: 32, file: "32-vscode.md", title: "Visual Studio Code", description: "Install and set up VS Code — a powerful, free code editor by Microsoft", tags: ["vscode", "editor", "code", "ide", "microsoft", "install", "extensions"] },
      { id: 33, file: "33-google-chrome.md", title: "Google Chrome", description: "Install Google Chrome browser on Ubuntu", tags: ["chrome", "browser", "google", "install", "web", "deb"] },
      { id: 34, file: "34-brave-browser.md", title: "Brave Browser", description: "Install Brave — a privacy-focused browser built on Chromium", tags: ["brave", "browser", "privacy", "chromium", "install", "web"] },
      { id: 35, file: "35-antigravity.md", title: "Google Antigravity", description: "Install Google Antigravity — an AI-powered desktop coding assistant", tags: ["antigravity", "google", "ai", "coding", "assistant", "install"] },
      { id: 36, file: "36-vlc.md", title: "VLC Media Player", description: "Install VLC — the best media player that plays every format", tags: ["vlc", "media", "video", "audio", "player", "install"] },
      { id: 37, file: "37-gimp.md", title: "GIMP", description: "Install GIMP — a free and open-source Photoshop alternative", tags: ["gimp", "image", "editor", "photoshop", "graphics", "install"] },
      { id: 38, file: "38-obs-studio.md", title: "OBS Studio", description: "Install OBS Studio — the #1 tool for screen recording and live streaming", tags: ["obs", "screen-recording", "streaming", "twitch", "youtube", "install"] },
      { id: 39, file: "39-discord.md", title: "Discord", description: "Install Discord — voice, video, and text chat platform", tags: ["discord", "chat", "voice", "gaming", "community", "install"] },
      { id: 40, file: "40-spotify.md", title: "Spotify", description: "Install Spotify — music streaming service for Linux", tags: ["spotify", "music", "streaming", "audio", "install"] },
      { id: 41, file: "41-steam.md", title: "Steam", description: "Install Steam — Valve's game store and launcher for Linux gaming", tags: ["steam", "gaming", "games", "proton", "valve", "install"] },
      { id: 42, file: "42-telegram.md", title: "Telegram", description: "Install Telegram — fast, secure messaging app for Linux", tags: ["telegram", "messaging", "chat", "communication", "install"] },
      { id: 43, file: "43-libreoffice.md", title: "LibreOffice", description: "Install LibreOffice — free Microsoft Office alternative", tags: ["libreoffice", "office", "word", "excel", "powerpoint", "install"] },
      { id: 44, file: "44-thunderbird.md", title: "Thunderbird", description: "Install Thunderbird — free email client and Outlook alternative", tags: ["thunderbird", "email", "mail", "outlook", "mozilla", "install"] },
      { id: 45, file: "45-qbittorrent.md", title: "qBittorrent", description: "Install qBittorrent — a clean, ad-free torrent client", tags: ["qbittorrent", "torrent", "download", "p2p", "install"] },
      { id: 46, file: "46-flameshot.md", title: "Flameshot", description: "Install Flameshot — a powerful screenshot tool with annotation support", tags: ["flameshot", "screenshot", "snipping-tool", "annotation", "install"] },
      { id: 47, file: "47-htop.md", title: "htop", description: "Install htop — an interactive, colorful process viewer", tags: ["htop", "process", "task-manager", "monitor", "system", "install"] },
      { id: 48, file: "48-timeshift.md", title: "Timeshift", description: "Install Timeshift — system backup and restore tool (HIGHLY RECOMMENDED!)", tags: ["timeshift", "backup", "restore", "snapshot", "system", "install", "safety"] }
    ]
  },
  {
    id: 5,
    title: "Developer Tools",
    description: "Python, Node.js, Git, Docker, and Java.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
    categories: [
      { id: 49, file: "49-python.md", title: "Python", description: "Install and manage Python, pip, virtual environments.", tags: ["python", "pip", "venv", "programming", "developer"] },
      { id: 50, file: "50-nodejs-npm.md", title: "Node.js & NPM", description: "Install Node.js and npm for JavaScript development.", tags: ["nodejs", "npm", "javascript", "nvm", "developer"] },
      { id: 51, file: "51-git.md", title: "Git", description: "Set up and use Git for version control.", tags: ["git", "github", "version-control", "developer"] },
      { id: 52, file: "52-docker.md", title: "Docker", description: "Install and use Docker for containerized applications.", tags: ["docker", "containers", "devops", "developer"] },
      { id: 53, file: "53-java.md", title: "Java (JDK)", description: "Install Java JDK for Java development.", tags: ["java", "jdk", "jre", "developer"] }
    ]
  },
  {
    id: 6,
    title: "Deep Dive Explanations",
    description: "Understanding how Linux actually works.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
    categories: [
      { id: 54, file: "54-linux-filesystem.md", title: "The Linux Filesystem Explained", description: "Understand the Linux directory structure and hierarchy.", tags: ["filesystem", "directories", "structure", "fhs", "deep-dive"] },
      { id: 55, file: "55-apt-explained.md", title: "APT Package Manager", description: "Deep dive into how APT finds, downloads, and installs packages.", tags: ["apt", "package-manager", "repositories", "deep-dive"] },
      { id: 56, file: "56-piping-redirection.md", title: "Piping & Redirection", description: "Master the pipe operator, input/output redirection, and command chaining.", tags: ["pipe", "redirection", "stdin", "stdout", "deep-dive"] },
      { id: 57, file: "57-common-problems.md", title: "Common Problems & Fixes", description: "Solutions for the most common Ubuntu/Linux problems.", tags: ["problems", "fixes", "troubleshooting", "errors", "deep-dive"] },
      { id: 58, file: "58-snap-vs-flatpak.md", title: "Snap vs Flatpak vs APT vs .DEB", description: "Understand the differences between package formats and when to use each.", tags: ["snap", "flatpak", "apt", "deb", "appimage", "deep-dive"] },
      { id: 60, file: "60-bash-scripting.md", title: "Bash Scripting Basics", description: "Learn to write automation scripts, use variables, loops, conditionals, and write your first .sh script.", tags: ["bash", "scripting", "automation", "variables", "loops", "if-else", "sh", "developer"] }
    ]
  }
];

// Dynamically generate slugs for all categories at runtime
sections.forEach(s => {
  s.categories.forEach(c => {
    c.slug = c.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  });
});

export { sections };
