---
title: "TypeScript: Type Aliases vs Interfaces"
description: "A practical breakdown of when to reach for a type alias and when to reach for an interface, and why the difference matters less than the ecosystem convention around it."
date: 2026-03-12
category: "Software Development"
readTime: "6 min read"
image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
---

Every TypeScript codebase eventually runs into the same debate: should this shape be a `type` or an `interface`? The two look almost interchangeable at first glance, and for simple object shapes they often are. But the differences that do exist — declaration merging, how unions are expressed, how errors get reported — are exactly the kind of thing that's easy to forget until it bites you mid-refactor.

## The basics: they can look identical

For a plain object shape, `type` and `interface` are close enough that either works:

```typescript
type UserType = {
  name: string;
  age: number;
};

interface UserInterface {
  name: string;
  age: number;
}
```

Both give you structural typing, both support optional properties (`age?: number`), both work with `extends`-style composition. If this were the whole story, the debate wouldn't exist.

## Where they actually diverge

### 1. Declaration merging

Interfaces can be declared multiple times, and TypeScript merges them into one:

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

// User is now { name: string; age: number }
const user: User = { name: "Abel", age: 34 };
```

Type aliases can't do this — redeclaring a `type` with the same name is a compile error. This makes interfaces the better fit for things you expect other code (or other people) to extend, like ambient type definitions or a library's public API that consumers might augment.

### 2. Unions, intersections, and primitives

Type aliases can describe things interfaces fundamentally can't: unions, tuples, and primitives.

```typescript
type Status = "pending" | "active" | "archived";
type Coordinates = [number, number];
type ID = string | number;
```

There's no interface equivalent for a union of string literals. If your type isn't a plain object shape, you don't really have a choice — it has to be a `type`.

### 3. Composition: `extends` vs intersections

Interfaces compose with `extends`:

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

Type aliases compose with intersections (`&`):

```typescript
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};
```

Functionally these produce similar results, but they behave differently when there's a conflict. Extending an interface with an incompatible property is a clear compile-time error. Intersecting two types with a conflicting property silently produces `never` for that property — which can surface as a confusing error much later, at the point of use rather than at the point of definition.

## Performance: interfaces cache better

For large, deeply nested object shapes, interfaces are generally faster for the TypeScript compiler to check, because interface types are cached by name while type aliases with intersections get re-evaluated more aggressively. In most codebases this is irrelevant. In large monorepos with thousands of files, it's part of why teams like the TypeScript team itself default to interfaces for object shapes.

## The convention that actually matters

In practice, most style guides converge on a simple rule:

- Use **`interface`** for object shapes, especially anything public-facing (component props, API response shapes, class contracts) — it reads clearly and supports declaration merging if you ever need it.
- Use **`type`** for everything an interface can't express: unions, tuples, mapped types, conditional types, and function signatures.

```typescript
// Object shape → interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

// Union / derived type → type
type Theme = "light" | "dark";
type ButtonVariant = ButtonProps["variant"];
```

## Conclusion

The `type` vs `interface` choice isn't really a technical decision most of the time — it's a convention decision. Pick object shapes with `interface`, reach for `type` when you need unions, tuples, or derived types, and be consistent within a codebase. The one case where the choice does matter is when you're designing something meant to be extended by consumers — there, declaration merging makes `interface` the only real option.
