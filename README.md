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

User -> CloudFront -> S3 -> Frontend -> Lambda Function URL -> GET Lambda -> DynamoDB

## Why I Built It

The project was designed to demonstrate practical cloud engineering concepts rather than simply consume the GitHub API.

The main engineering goals were:

- Designing a serverless backend
- Modeling historical data in DynamoDB
- Designing around a specific database access pattern
- Integrating an external API
- Separating read and write responsibilities
- Managing AWS infrastructure with infrastructure-as-code
- Deploying a static frontend through S3 and CloudFront
- Implementing IAM-based access control
- Exposing serverless backend functionality through HTTP
- Understanding deployment, configuration, CORS, and cloud infrastructure troubleshooting

---

## What This Project Demonstrates

### Cloud Engineering

- AWS Lambda
- DynamoDB
- S3
- CloudFront
- IAM
- Secrets Manager
- CloudWatch
- AWS SAM / CloudFormation

### Backend Engineering

- TypeScript
- HTTP APIs
- AWS SDK
- DynamoDB queries
- External API integration
- Serverless architecture
- JSON API responses

### Frontend Engineering

- TypeScript
- API integration
- Client-side data retrieval
- Static production builds
- CloudFront deployment

### Infrastructure

- Infrastructure as Code
- AWS resource configuration
- IAM-based access control
- CDN configuration
- S3 origin protection
- Serverless deployment

---

## Engineering Challenges

A significant part of the project involved debugging problems across both application code and AWS infrastructure.

Examples included:

- DynamoDB table/environment configuration mismatches: 
    My table was in a different region than my lambda function and I misspelled the table name in my lambda configurations so my GET method wasn't calling my actual snapshot table.

- Lambda Function URL CORS configuration:
    When I developed the Express API on local host I had to implement CORS through my source code which was conflicting with the CORS that I deployed with my Lambda functions.

- CloudFront origin configuration:
    This probably to the longest to debug; my Cloudfront could not find my index.html file that I had it point to in my S3 bucket. in my origin path configuration I forgot to add the directory "/dist" it was sitting in.

- CloudFront caching:
    On every new build I had to invalidate Cloudfront caching to update the frontend

- AWS billing/resource discovery:
    This was an issue independent from the product, but I was being charged with EC2 and Elastic Load balancing instances that I was never using. this project cost around ~5$ to host on AWS. This month my bill was ~30$. Lesson Learned.

These issues reinforced that deploying a cloud application requires understanding both the application layer and the infrastructure supporting it.

---

## Future Improvements

Potential future improvements include:

- Automated scheduled snapshot collection
- Repository growth visualizations
- Additional GitHub metrics
- Authentication and user-specific repositories
- Pagination for large snapshot histories
- DynamoDB secondary indexes for additional access patterns
- Automated testing and CI/CD
- More granular monitoring and observability
- Repository comparison functionality

---

## Status

**MVP Complete**

GitHub Granny currently provides the core functionality required to collect, persist, and retrieve historical GitHub repository snapshots through a deployed serverless architecture.