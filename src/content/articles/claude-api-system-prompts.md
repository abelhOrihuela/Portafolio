---
title: "The System Prompt: Teaching Claude How to Behave, Not What to Say"
description: "A small experiment — a Claude-powered math tutor for kindergartners — shows why the system prompt is the most underrated parameter in the Claude API."
date: 2026-09-09
category: "AI Engineering"
readTime: "4 min read"
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

I asked Claude to be a math tutor for kindergartners. The instruction that made it actually work wasn't "answer well" — it was "don't answer."

That's the kind of behavior a `messages` array alone can't reliably enforce turn after turn. It's what the `system` parameter is for.

## A separate channel for behavior

When you call the Claude API, you can shape the model's behavior in two very different ways: by writing instructions into the user's message, or by setting a `system` prompt — an instruction defined once, outside the `messages` array, that governs the entire conversation regardless of how many turns it has.

The distinction matters more than it sounds. An instruction buried in a user message competes with whatever else that message says, and has to be repeated (or re-inferred) on every turn to stay effective. A system prompt doesn't compete with anything — it lives in its own channel, applied uniformly to every response the model gives, for as long as the conversation lasts.

## The tutor example

Here's the system prompt I used:

```
You are a patient math tutor for kindergarten students.
Do not directly answer student's questions.
Guide them to a solution step by step.
```

And here's the full call, with no abstraction on top of the SDK:

```python
from anthropic import Anthropic

client = Anthropic()

system = """
You are a patient math tutor for kindergarten students.
Do not directly answer student's questions.
Guide them to a solution step by step.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1000,
    system=system,
    messages=[
        {"role": "user", "content": "What is 2 + 2?"}
    ],
)

print(response.content[0].text)

# > "Let's find out together! How many fingers
#    do you have on one hand? Now, if you had
#    two hands like that, how many would that be?"
```

## What the instruction actually changes

Without the system prompt, "What is 2 + 2?" gets answered with "4" — correct, and the interaction is over. Nothing was learned in the process.

With it, the model does what a good teacher does: it asks a question back, points to something the student can already count on their own hands, and lets them arrive at the answer themselves. The constraint — *don't answer directly* — is what forces that shift from "answering machine" to "tutor."

That constraint has to hold on every single turn of the conversation, not just the first one. That's precisely the job a system prompt is suited for and a one-off instruction in a user message is not: it's evaluated fresh alongside every response the model generates, so a rule set once at the start doesn't quietly erode ten turns later.

## Beyond tutoring

The pattern generalizes well past education. Any time you need a model to hold a consistent role, tone, output format, or hard constraint across an entire conversation — never reveal certain information, always answer in a fixed JSON shape, stay in character as a specific persona — the system prompt is the parameter designed for exactly that job. It's a small piece of the API surface, but it's often the difference between a model that answers questions and one that behaves like the tool you actually designed it to be.
