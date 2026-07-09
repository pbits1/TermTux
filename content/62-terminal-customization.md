---
title: "Terminal Customisation"
section: 3
category: 62
description: "Swap shell to Zsh, install Oh My Zsh, add code-highlighting plugins, and style your prompt with Starship."
icon: "palette"
tags: ["zsh", "oh-my-zsh", "starship", "theme", "terminal", "customize", "beginner"]
---

# Terminal Customisation

Customising your terminal enhances productivity with better autocompletions, history search, syntax highlighting, and visual themes.

---

## 1. Switching Shell from Bash to Zsh

The default shell in Ubuntu is **Bash**. **Zsh** is a popular alternative that supports extensive plugins and custom themes.

1. Install Zsh:
   ```bash
   sudo apt update && sudo apt install zsh -y
   ```
2. Verify Zsh version:
   ```bash
   zsh --version
   ```
3. Change your default shell to Zsh:
   ```bash
   chsh -s $(which zsh)
   ```
4. Restart your terminal (or log out and log back in) for the default shell switch to take effect. On the first launch, press `0` to create a blank configuration file.

---

## 2. Installing Oh My Zsh

**Oh My Zsh** is an open-source, community-driven framework for managing your Zsh configuration.

1. Install Oh My Zsh using curl:
   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```
2. The installation will automatically update your `~/.zshrc` configuration file.

---

## 3. Adding High-Value Plugins

Two essential plugins make the terminal extremely smart:
* **zsh-autosuggestions** (suggests commands as you type based on your history).
* **zsh-syntax-highlighting** (highlights valid commands in green and typos/errors in red).

### Step 1: Clone the plugin repositories
```bash
# Clone Autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Clone Syntax Highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Step 2: Register the plugins in your config
1. Open your Zsh configuration file:
   ```bash
   nano ~/.zshrc
   ```
2. Find the line that starts with `plugins=(git)` and change it to include the new plugins:
   ```text
   plugins=(
       git
       zsh-autosuggestions
       zsh-syntax-highlighting
   )
   ```
3. Save the file and reload Zsh:
   ```bash
   source ~/.zshrc
   ```

---

## 4. Customising the Theme with Starship

**Starship** is a lightning-fast, highly customisable shell prompt written in Rust. It works with any shell (Zsh, Bash, Fish).

### Step 1: Install Starship
Run the official installation script:
```bash
curl -sS https://starship.rs/install.sh | sh
```

### Step 2: Configure Zsh to use Starship
1. Open your configuration:
   ```bash
   nano ~/.zshrc
   ```
2. Append the following initialization line to the very bottom of the file:
   ```text
   eval "$(starship init zsh)"
   ```
3. Save the file and reload:
   ```bash
   source ~/.zshrc
   ```

### Step 3: Download a Preset Theme (Optional)
Starship is pre-configured, but you can download official style presets. For example, to apply the popular "Bracketed" theme:
```bash
# Create configuration folder
mkdir -p ~/.config

# Save preset config
starship preset bracketed-boots > ~/.config/starship.toml
```

---

## 5. Quick Aliases

An **Alias** is a custom shortcut for a long command. You can add them to your `~/.zshrc` (or `~/.bashrc` if using Bash).

1. Add your custom aliases to the config:
   ```bash
   # Quick updates
   alias update='sudo apt update && sudo apt upgrade -y'

   # Better ls layouts
   alias ll='ls -la'

   # Quick directory navigation
   alias ..='cd ..'
   ```
2. Apply changes:
   ```bash
   source ~/.zshrc
   ```
3. Now, running `update` will automatically run your system upgrade!
