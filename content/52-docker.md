---
title: "DOCKER (Containers)"
section: 4
category: 52
icon: "terminal"
---

# DOCKER (Containers)


  What is it?
    Runs applications in isolated "containers" — like lightweight
    virtual machines. You can run entire apps (databases, web servers,
    AI models) without installing them on your system. Everything
    stays contained and won't mess up your system.

    # Install Docker:
    sudo apt install docker.io

    # Start Docker service:
    sudo systemctl start docker
    sudo systemctl enable docker

    # Allow your user to run docker without sudo:
    sudo usermod -aG docker $USER
    # Then log out and back in for this to take effect.

    # Run your first container (downloads and runs hello-world):
    docker run hello-world

    # Common Docker commands:
    docker ps                     → List running containers
    docker ps -a                  → List ALL containers (including stopped)
    docker images                 → List downloaded images
    docker pull image_name        → Download an image
    docker run -d -p 8080:80 nginx  → Run nginx web server in background
    docker stop container_id      → Stop a container
    docker rm container_id        → Remove a container
    docker rmi image_name         → Remove an image

    # Docker Compose (run multi-container apps):
    sudo apt install docker-compose
    docker-compose up -d          → Start all services defined in docker-compose.yml
    docker-compose down           → Stop all services


