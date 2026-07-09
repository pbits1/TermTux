---
title: "Docker (Containers)"
section: 5
category: 52
description: "Install and use Docker for containerized applications."
icon: "box"
tags: ['docker', 'containers', 'devops', 'developer']
---

# Docker (Containers)

Runs applications in isolated "containers" — like lightweight virtual machines. You can run entire apps (databases, web servers, AI models) without installing them on your system. Everything stays contained and won't mess up your system.

---

## 1. Install Docker

Install the Docker engine package from the repositories.

```bash
sudo apt update
sudo apt install docker.io
```

---

## 2. Start Docker Service

Ensure the background container daemon is running and starts automatically on system boot.

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

---

## 3. Run Without Sudo

Add your current user to the `docker` user group to execute commands without requiring `sudo` privileges.

```bash
sudo usermod -aG docker $USER
# Note: You must log out and log back in for changes to apply.
```

---

## 4. Run First Container

Download and run the basic hello-world sanity check container.

```bash
docker run hello-world
```

---

## 5. Common Docker Commands

Use these commands to manage your running container environments.

```bash
# List running containers
docker ps

# List ALL containers (including stopped ones)
docker ps -a

# List downloaded images
docker images

# Download a package image from Docker Hub
docker pull image_name

# Run Nginx web server in the background on port 8080
docker run -d -p 8080:80 nginx

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id

# Remove an image
docker rmi image_name
```

---

## 6. Docker Compose (Multi-Container Apps)

Define and run multi-container applications using Compose files.

```bash
# Install the Docker Compose plugin (v2)
sudo apt install docker-compose-plugin

# Start all services defined in compose.yaml / docker-compose.yml
docker compose up -d

# Stop and remove all services
docker compose down
```
