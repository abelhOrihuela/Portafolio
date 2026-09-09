---
title: "Why Claude Doesn't Remember What You Said Two Messages Ago"
description: "The Claude API is stateless — there's no hidden memory between calls. Here's how multi-turn conversations actually work under the hood, and why that matters for cost and context."
date: 2026-09-08
category: "AI Engineering"
readTime: "4 min read"
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

When you chat with Claude on claude.ai, it feels like the model is quietly keeping track of everything you've said. So the first time I called the API directly, I expected the same thing — that the model would just *remember* the previous turn. It doesn't.

The Claude API is stateless. Every call is independent, and there is no server-side memory of what was said before. If the model appears to "remember" anything, it's because your code sent that history back to it, in full, on every single request.

## The conversation is just an array

A multi-turn conversation is nothing more than a list of messages, alternating between the `user` and `assistant` roles:

```python
messages = [
    {"role": "user", "content": "What is a DLQ in IT?"},
    {"role": "assistant", "content": "A Dead Letter Queue stores messages that couldn't be processed successfully."},
    {"role": "user", "content": "Give me an example with SQS"},
]
```

That's it. There's no session, no conversation ID, no server-side state to reference. The entire "memory" of the conversation lives in that array, on your side.

## Building it with direct API calls

Here's what it looks like without any abstraction — just the SDK, called directly, turn by turn:

```python
from anthropic import Anthropic

client = Anthropic()
messages = []

# turn 1
messages.append({"role": "user", "content": "What is a DLQ in IT?"})

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1000,
    messages=messages,
)
reply = response.content[0].text

messages.append({"role": "assistant", "content": reply})

# turn 2
messages.append({"role": "user", "content": "Give me an example with SQS"})

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1000,
    messages=messages,
)
```

Notice the pattern: append the user's message, call the API, append the model's reply, repeat. By the second call, `messages` contains all three entries — the model sees the full exchange, not just the latest question.

## Why this matters

Three consequences fall directly out of this design:

- **Order matters.** The array is processed as a sequence, so the model interprets each message in the context of everything before it. Shuffle the order and you change the meaning of the conversation.
- **Context — and cost — grows with every turn.** Since you resend the entire history each time, both the tokens you're billed for and the context window you're consuming grow with conversation length. A 20-turn conversation isn't 20 independent calls; it's a call with an array 20 messages deep.
- **Resetting is trivial.** Want to start over? Just empty the array. There's nothing to invalidate on the server, because there was never anything stored there in the first place.

## The foundation of everything built on top

This pattern — a growing list of role-tagged messages, sent in full on every request — is not a Claude-specific quirk. It's the foundation almost every LLM API is built on, and by extension, the foundation of any chatbot, agent, or memory-aware tool you'll build with one. Once you understand that the "conversation" is just data you own and pass around, a lot of what looks like magic in agent frameworks — context trimming, summarization, conversation branching — starts to look like straightforward array manipulation instead.
