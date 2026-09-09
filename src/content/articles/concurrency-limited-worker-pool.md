---
title: "Building a Concurrency-Limited Worker Pool with Promises"
description: "How to write a small, dependency-free utility that runs async tasks with a maximum concurrency limit, using nothing but native Promises."
date: 2026-03-20
category: "Software Development"
readTime: "7 min read"
image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

`Promise.all` is the first tool most of us reach for when we need to run async work in parallel. It works great until the list of tasks gets large enough to overwhelm whatever's on the other end — a rate-limited API, a database connection pool, a filesystem with a file-descriptor ceiling. Firing 500 requests at once isn't "parallel," it's a denial-of-service attack on your own backend.

What you actually want is bounded concurrency: run *up to N* tasks at a time, and start the next one only when a slot frees up. Libraries like `p-limit` solve this, but the implementation is small enough — and useful enough to understand — that it's worth building from scratch.

## The problem with `Promise.all`

```typescript
const userIds = [/* 500 ids */];

// Fires all 500 requests immediately
const users = await Promise.all(userIds.map(id => fetchUser(id)));
```

Every promise in that `.map()` starts executing the moment it's created — `Promise.all` doesn't stagger anything, it just waits for whatever's already running. There's no built-in way to cap concurrency with native `Promise` APIs alone.

## Designing the limiter

The core idea: maintain a counter of in-flight tasks and a queue of pending ones. Whenever a task finishes, pull the next one off the queue.

```typescript
type Task<T> = () => Promise<T>;

function createLimiter(concurrency: number) {
  let active = 0;
  const queue: Array<() => void> = [];

  const next = () => {
    if (active >= concurrency || queue.length === 0) return;
    active++;
    const run = queue.shift()!;
    run();
  };

  return function limit<T>(task: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      queue.push(() => {
        task()
          .then(resolve, reject)
          .finally(() => {
            active--;
            next();
          });
      });
      next();
    });
  };
}
```

The key mechanics:

- `active` tracks how many tasks are currently running.
- `queue` holds functions that *start* a task — not the promises themselves, since calling `task()` is what kicks off execution.
- `next()` only runs a queued task if there's a free slot (`active < concurrency`).
- Every task's `.finally()` decrements `active` and calls `next()` again, pulling the next queued item — this is what keeps the pipeline moving.

## Using it

```typescript
const limit = createLimiter(5); // max 5 concurrent

const results = await Promise.all(
  userIds.map(id => limit(() => fetchUser(id)))
);
```

Note the shape: `limit(() => fetchUser(id))`, not `limit(fetchUser(id))`. Passing a *function* instead of a promise is what lets the limiter control when execution actually starts — if you passed the promise directly, `fetchUser` would already be running before the limiter ever saw it.

`Promise.all` still waits for everything to settle, but now only 5 `fetchUser` calls are ever in flight simultaneously.

## Handling failures without cancelling everything

`Promise.all` rejects as soon as any promise rejects, but the other tasks keep running in the background — they're just orphaned. For a worker pool, you usually want either "fail fast" or "collect everything, including errors." `Promise.allSettled` gives you the latter for free:

```typescript
const outcomes = await Promise.allSettled(
  userIds.map(id => limit(() => fetchUser(id)))
);

const failed = outcomes.filter(o => o.status === "rejected");
console.log(`${failed.length} of ${userIds.length} requests failed`);
```

Because the limiter itself doesn't care whether a task resolves or rejects — it just decrements `active` and moves on either way — this composes cleanly with both `Promise.all` and `Promise.allSettled`.

## Adding a result-order guarantee

One subtlety: results come back in the order tasks *complete*, not the order they were queued, unless you rely on `Promise.all`/`Promise.allSettled` to reassemble them by index — which they already do, since each `limit(...)` call returns a promise tied to its original array position. You don't need to track order manually; the array mapping handles it.

## When to reach for a library instead

This ~20-line limiter covers the common case, but production libraries like `p-limit` or `p-queue` add things worth knowing about if your needs grow: priority queues, pause/resume, per-task timeouts, and abort signals via `AbortController`. If you're just capping concurrency on a fixed batch of async work, though, the hand-rolled version above has no dependencies, no bundle-size cost, and nothing hidden — you can see exactly what it does.

## Conclusion

Bounded concurrency is one of those problems that looks trivial and isn't, mostly because native `Promise.all` gives you *all* or *nothing* — full parallelism or manual sequencing. A small counter-and-queue wrapper closes that gap: it's a handful of lines, has zero dependencies, and makes the difference between a batch job that gently works through a queue and one that knocks over the service it's calling.
