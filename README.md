# GitHub Granny

> A serverless GitHub repository analytics platform that captures historical repository snapshots and makes repository trends queryable over time.

[Live Demo](https://dwnfz5rofriyz.cloudfront.net)

---

## Overview

GitHub Granny is a serverless repository analytics application designed to track how GitHub repositories change over time.

GitHub's API provides the current state of a repository, but historical repository metrics are not inherently available through a simple repository lookup. GitHub Granny addresses this by periodically capturing repository snapshots and persisting them in DynamoDB.

Each snapshot records repository metadata such as:

- Stars
- Forks
- Open issues
- Repository description
- Repository owner
- Programming languages
- Timestamp

The application separates snapshot creation from snapshot retrieval, allowing historical data to be stored independently from the API-facing read path.

---

## Architecture

```text
                         ┌──────────────────┐
                         │      GitHub       │
                         │       API        │
                         └────────┬─────────┘
                                  │
                                  │ Repository Data
                                  ▼
                    ┌─────────────────────────┐
                    │   Snapshot Lambda       │
                    │                         │
                    │ Fetch repository data   │
                    │ Create timestamped      │
                    │ repository snapshot     │
                    └────────────┬────────────┘
                                 │
                                 │ PutItem
                                 ▼
                    ┌─────────────────────────┐
                    │       DynamoDB          │
                    │                         │
                    │ Repository Snapshots    │
                    └────────────┬────────────┘
                                 │
                                 │ Query
                                 ▼
                    ┌─────────────────────────┐
                    │    GET Lambda           │
                    │                         │
                    │ Retrieve repository     │
                    │ historical snapshots    │
                    └────────────┬────────────┘
                                 │
                           Lambda Function URL
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       Frontend          │
                    │                         │
                    │ React / TypeScript      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       CloudFront        │
                    │                         │
                    │ CDN / HTTPS delivery    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │          S3             │
                    │                         │
                    │   Static frontend       │
                    └─────────────────────────┘
