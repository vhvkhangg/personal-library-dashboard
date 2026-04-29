# 0001 — Deployment: Docker Desktop on Windows Desktop Host

## Status

Accepted

## Context

The user has two Windows 11 machines: a desktop with stronger hardware and a laptop without a discrete GPU. The app should be accessible from both machines. The user does not use WSL and prefers Docker Desktop.

## Decision

Use Docker Desktop and Docker Compose on the desktop as the primary host. The laptop accesses the app through browser over LAN or private VPN. PostgreSQL, Spring API, Python RAG service, and Next.js run on the desktop host.

## Alternatives Considered

1. Run everything separately on both machines.
2. Deploy to VPS/cloud.
3. Run without Docker.
4. Use WSL2-first development.

These are rejected for MVP because they either complicate sync, cost money, or conflict with user preference.

## Consequences

There is one primary database and one primary media root. Backup is simpler. Laptop performance does not matter much. Desktop must be online for laptop access.

## Follow-ups

Create Docker Compose after initial app scaffolding. Decide whether Docker Desktop uses Hyper-V or WSL2 backend based on the user's installation constraints.
