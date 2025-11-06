# jenkins/Dockerfile
FROM jenkins/jenkins:lts

USER root

# Instala dependencias y docker CLI + docker compose plugin (solo cliente)
RUN apt-get update -y && \
    apt-get install -y ca-certificates curl gnupg lsb-release apt-transport-https && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list && \
    apt-get update -y && \
    apt-get install -y docker-ce-cli docker-compose-plugin && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# (opcional) verifica versiones cuando arranque
RUN docker --version || true && docker compose version || true

# Vuelve a usuario jenkins
USER jenkins
