---
title: "Infrastructure as code: lessons from production deployments"
description: "Hard-won lessons from managing cloud infrastructure with Terraform across multiple environments and teams."
date: 2026-01-28
category: "DevOps"
readTime: "12 min read"
image: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

Three years ago, my team inherited a production AWS environment managed entirely through the console. No version control, no audit trail, no way to reproduce it. When a senior engineer left, they took years of implicit knowledge with them. That experience convinced me that Infrastructure as Code isn't optional — it's the minimum bar for operating responsibly.

## The state problem

The hardest part of IaC isn't writing Terraform. It's managing state. Terraform's state file is a source of truth that must be:

- **Stored remotely** — never on a developer's laptop
- **Locked during operations** — to prevent concurrent modifications
- **Encrypted at rest** — it contains sensitive data

We use S3 with DynamoDB locking. The setup is ten lines of Terraform and it's solved every state conflict we've ever had.

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

## Module composition over copy-paste

The most common mistake I see in Terraform codebases is copying module configurations across environments. When you need to update a security group rule, you update it in 12 places and miss one.

The solution is a proper module hierarchy:

```
infrastructure/
├── modules/
│   ├── vpc/
│   ├── ecs-service/
│   └── rds-cluster/
└── environments/
    ├── staging/
    └── production/
```

Each environment composes the same modules with different variable values. A change to the ECS service module propagates consistently to all environments.

## Drift detection in CI

Terraform plan in CI is the most underused safety net. Every PR that touches infrastructure runs `terraform plan` and posts the diff as a comment. Reviewers see exactly what will change before it changes.

We go further: a nightly job runs `terraform plan` against production and alerts if drift is detected. Drift usually means someone made a manual console change — which is now a policy violation.

## Gradual rollouts with feature flags

The hardest infrastructure changes are the ones that affect running services. We use a combination of Terraform workspaces and application-level feature flags to do gradual rollouts of infrastructure changes:

1. Provision the new resource in Terraform
2. Route 5% of traffic to it via application config
3. Monitor for 24 hours
4. Increase to 100% if healthy
5. Decommission the old resource

This approach has let us migrate databases, change caching layers, and switch message queues without downtime.

## What I'd tell my past self

Start with remote state on day one. Write modules before you have to. Every manual console change is technical debt. And when something breaks in production — and it will — you want a `git blame` that tells you exactly what changed and who approved it.
