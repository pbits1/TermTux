// category index & metadata
const sections = [
  {
    id: 1,
    title: "System Logs & Admin",
    description: "Core commands for system administration and logging.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
    categories: [
      { id: 1, file: "01-system-logs.md", title: "System Logs (journalctl)" },
      { id: 2, file: "02-system-health.md", title: "System Health & Monitoring" },
      { id: 3, file: "03-package-management.md", title: "Package Management (APT)" },
      { id: 4, file: "04-bluetooth-troubleshooting.md", title: "Bluetooth Troubleshooting" },
      { id: 5, file: "05-time-synchronization.md", title: "Time Synchronization" },
      { id: 6, file: "06-snap-packages.md", title: "Snap Package Management" },
      { id: 7, file: "07-hardware-info.md", title: "Hardware & System Information" },
      { id: 8, file: "08-file-permissions.md", title: "File & Permission Management" },
      { id: 9, file: "09-sudo-admin.md", title: "Sudo / Admin Access" },
      { id: 10, file: "10-process-management.md", title: "Process Management" },
      { id: 11, file: "11-networking.md", title: "Networking" },
      { id: 12, file: "12-desktop-shortcuts.md", title: "Desktop Shortcuts" },
      { id: 13, file: "13-reboot-shutdown.md", title: "Reboot / Shutdown" }
    ]
  },
  {
    id: 2,
    title: "Essential Beginner Commands",
    description: "Navigation, file operations, and basics.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>`,
    categories: [
      { id: 14, file: "14-file-navigation.md", title: "Navigating the File System" },
      { id: 15, file: "15-file-operations.md", title: "File & Folder Operations" },
      { id: 16, file: "16-viewing-editing.md", title: "Viewing & Editing Files" },
      { id: 17, file: "17-searching-finding.md", title: "Searching & Finding" },
      { id: 18, file: "18-user-permissions.md", title: "User & Permission Management" },
      { id: 19, file: "19-archives-compression.md", title: "Archive & Compression" },
      { id: 20, file: "20-system-services.md", title: "System Services (systemctl)" },
      { id: 21, file: "21-installing-software.md", title: "Installing Software (Beyond APT)" },
      { id: 22, file: "22-networking-commands.md", title: "Networking Commands" },
      { id: 23, file: "23-disk-usb.md", title: "Disk & USB Drive Management" },
      { id: 24, file: "24-display-screen.md", title: "Display & Screen" },
      { id: 25, file: "25-environment-variables.md", title: "Environment Variables" },
      { id: 26, file: "26-scheduled-tasks.md", title: "Scheduled Tasks (Cron)" },
      { id: 27, file: "27-getting-help.md", title: "Getting Help" },
      { id: 28, file: "28-terminal-shortcuts.md", title: "Terminal Shortcuts" },
      { id: 29, file: "29-gnome-shortcuts.md", title: "GNOME Shortcuts" },
      { id: 30, file: "30-windows-linux-cheatsheet.md", title: "Windows → Linux Cheat Sheet" },
      { id: 31, file: "31-useful-tools.md", title: "Useful Tools to Install" }
    ]
  },
  {
    id: 3,
    title: "Software Installation Guides",
    description: "Install popular apps like VS Code, Chrome, and Discord.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`,
    categories: [
      { id: 32, file: "32-vscode.md", title: "Visual Studio Code" },
      { id: 33, file: "33-google-chrome.md", title: "Google Chrome" },
      { id: 34, file: "34-brave-browser.md", title: "Brave Browser" },
      { id: 35, file: "35-antigravity.md", title: "Google Antigravity" },
      { id: 36, file: "36-vlc.md", title: "VLC Media Player" },
      { id: 37, file: "37-gimp.md", title: "GIMP" },
      { id: 38, file: "38-obs-studio.md", title: "OBS Studio" },
      { id: 39, file: "39-discord.md", title: "Discord" },
      { id: 40, file: "40-spotify.md", title: "Spotify" },
      { id: 41, file: "41-steam.md", title: "Steam" },
      { id: 42, file: "42-telegram.md", title: "Telegram" },
      { id: 43, file: "43-libreoffice.md", title: "LibreOffice" },
      { id: 44, file: "44-thunderbird.md", title: "Thunderbird" },
      { id: 45, file: "45-qbittorrent.md", title: "qBittorrent" },
      { id: 46, file: "46-flameshot.md", title: "Flameshot" },
      { id: 47, file: "47-htop.md", title: "htop" },
      { id: 48, file: "48-timeshift.md", title: "Timeshift" }
    ]
  },
  {
    id: 4,
    title: "Developer Tools",
    description: "Python, Node.js, Git, Docker, and Java.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
    categories: [
      { id: 49, file: "49-python.md", title: "Python" },
      { id: 50, file: "50-nodejs-npm.md", title: "Node.js & NPM" },
      { id: 51, file: "51-git.md", title: "Git" },
      { id: 52, file: "52-docker.md", title: "Docker" },
      { id: 53, file: "53-java.md", title: "Java (JDK)" }
    ]
  },
  {
    id: 5,
    title: "Deep Dive Explanations",
    description: "Understanding how Linux actually works.",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
    categories: [
      { id: 54, file: "54-linux-filesystem.md", title: "The Linux Filesystem Explained" },
      { id: 55, file: "55-apt-explained.md", title: "APT Package Manager" },
      { id: 56, file: "56-piping-redirection.md", title: "Piping & Redirection" },
      { id: 57, file: "57-common-problems.md", title: "Common Problems & Fixes" },
      { id: 58, file: "58-snap-vs-flatpak.md", title: "Snap vs Flatpak vs APT vs .DEB" }
    ]
  }
];

export { sections };
