# ----------- Base Stage -----------
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:20-bullseye AS base

# Install system dependencies
RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -y \
        git \
        zsh \
        python3 \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# ----------- Node Tools Stage -----------
FROM base AS node-tools

# Install global npm tools
RUN npm install -g pnpm npx

# Update pnpm version
RUN npm add -g pnpm

# ----------- Final Devcontainer Stage -----------
FROM node-tools

# Set working directory
WORKDIR /workspace
