[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# taintguard

> **⚠️ Experimental – Not for production**
> 
> This package is a *reference implementation / idea starter* for span-based taint tracking and guardrails around LLM prompts. It is **not** a drop-in security control and comes **without guarantees**. Use it for exploration, prototypes, or as a basis for your own hardened implementation.  
> For any production use, perform your own threat modeling, add comprehensive tests, and combine with defense-in-depth controls (rate limiting, moderation, output validation, allowlists, human review, etc.).

Span-based taint tracking for LLM prompts (TypeScript-first). Keep untrusted text from hijacking system instructions or tools.

## Why taintguard?

Prompt injection thrives on mixing instructions with data. Regex-only filters are brittle.

## Features

🧱 Prompt fencing: XML-like <DATA trust="low">…</DATA> by default  
🔎 Preflight detection: jailbreak/role-hijack/developer mode/tool-trigger patterns  
🌍 Language packs: English & German rules out of the box  
🧪 Property tests: adversarial fuzzing (zero-width, homoglyphs, spacing) with fast-check

## Quick Start

```bash
pnpm i
pnpm build
pnpm test
```

Branch Code Coverage: 77.77%  