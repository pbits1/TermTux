---
title: "Docker Deep Dive"
section: 6
category: 76
description: "Build images with Dockerfile, use docker-compose for multi-container apps, manage volumes, and optimize images."
icon: "box"
tags: ["docker", "compose", "dockerfile", "containers", "volumes", "networks", "images"]
---

# Docker: Deep Dive

Goes beyond `docker run` and `docker ps`. This covers building custom images, multi-service orchestration with Compose, and production best practices.

---

## 1. Write a Dockerfile

A Dockerfile defines how to build a Docker image from scratch.

```dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y nginx
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build the image
docker build -t my-nginx:latest .
```

---

## 2. Multi-Stage Build — Smaller Images

Use multiple FROM statements to keep final images small. Build artifacts in one stage, copy only what's needed to the final stage.

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t my-app:latest .
```

---

## 3. Docker Compose — Multi-Container Setup

Define complex apps with multiple services (e.g., web + database + cache) in a single `docker-compose.yml`.

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret

volumes:
  pgdata:
```

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove everything
docker compose down -v
```

---

## 4. Docker Volumes — Persistent Data

Containers are ephemeral. Volumes keep data alive even after containers are removed.

```bash
# Create a named volume
docker volume create mydata

# Mount a volume into a container
docker run -v mydata:/app/data ubuntu

# Bind mount a host directory
docker run -v /home/user/data:/app/data ubuntu

# Copy files from/to a container
docker cp myfile.txt container_name:/path/
```

---

## 5. Docker Networks

Containers need to communicate. Docker provides isolation with user-defined bridge networks.

```bash
# Create a network
docker network create mynet

# Run containers on the same network
docker run --network mynet --name app1 nginx
docker run --network mynet --name app2 nginx

# Containers can reach each other by name
docker exec app1 ping app2

# List networks
docker network ls

# Inspect what's connected to a network
docker network inspect mynet
```

---

## 6. View Container Logs

```bash
# Follow logs in real time
docker logs -f container_name

# Show last 50 lines
docker logs --tail 50 container_name

# Show timestamps
docker logs -t container_name
```

---

## 7. Inspect Container/Image Details

```bash
# Get full JSON metadata about a container
docker inspect container_name

# Get the IP address of a container
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name
```

---

## 8. Clean Up Unused Resources

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything unused (containers, images, networks, build cache)
docker system prune -a

# Show disk usage
docker system df
```

---

## 9. Tag and Push to a Registry

```bash
# Tag a local image
docker tag my-app:latest username/my-app:v1.0

# Push to Docker Hub
docker push username/my-app:v1.0

# Pull from a registry
docker pull username/my-app:v1.0
```

---

## 10. Environment Variables in Docker

```bash
# Pass env vars when running
docker run -e DB_HOST=localhost -e DB_USER=admin my-app

# Use an env file
docker run --env-file .env my-app
```