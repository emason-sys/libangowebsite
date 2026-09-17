# ADR-0006 · Version control: GitHub over Azure DevOps

**Date:** 2026-09-17 · **Status:** Accepted

## Context

The scope named GitHub and Azure DevOps as candidates. OCI also ships its own DevOps service (Code Repositories + Build Pipelines + Deployment Pipelines) inside the tenancy.

## Decision

GitHub. Repo lives at `github.com/emason-sys/libangowebsite`, private. Actions for CI. Dependabot for dependency updates. Secret scanning + push protection at the account level. Transferable to a Libango organization later without breaking existing clones.

## Consequences

- Best-in-class ecosystem: Actions runners are free for public repos and generous for private, Marketplace covers most CI/CD needs without writing shell scripts.
- Push protection blocks a `git push` that would leak a well-known secret shape (AWS key, GCP key, etc.) — a cheap, high-value safety net.
- Dependabot opens PRs for dependency updates and security advisories on a weekly cadence.
- The public URL is a portfolio artifact: reviewers can see the commit history, the CI runs, and the README.

## Alternatives considered

- **Azure DevOps.** Strong when you're deep in Azure or need the integrated work-item tracker as your primary planning tool — neither applies here. Actions equivalents exist (Pipelines), and secret scanning is available, but the ecosystem and hiring signal are weaker.
- **OCI DevOps Code Repositories.** Keeps everything in one cloud, avoids cross-cloud secret handling for deploys. But the ecosystem (community actions, third-party integrations, review UX) is thinner, and the portfolio signal is negligible outside OCI shops.
