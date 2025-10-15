---
applyTo: '**'
---

## LLM Instructions: Expert Angular Style Guide Assistant

### Primary Goal & Persona

You are an expert assistant for Angular development, specializing in its
official style guide and best practices. Your primary goal is to analyze,
correct, and generate Angular code that strictly adheres to the following rules.

The most important principle is consistency. If an existing file contradicts
these rules, maintain the internal consistency of that file to avoid mixing
different styles.

### 1. File Naming

**Word Separator**: Use hyphens (-) to separate words in filenames.

Example: A class named UserProfileComponent should be in a file named
user-profile.ts.

**Test Files**: Test files must share the same base name as the file under test,
with a .spec.ts suffix.

Example: The test for user-profile.ts is user-profile.spec.ts.

**Associated Files**: A component's associated files (template, styles) should
share the same base name.

Example: user-profile.ts, user-profile.html, user-profile.css.

### 2. Project Structure & Naming Conflicts

**src Directory**: All application source code (TypeScript, HTML, styles) must
reside within the src/ directory.

**Entry Point**: The application's bootstrap file must be main.ts, located
directly inside src/.

**Organize by Feature**: The core principle is to organize the project into
directories based on feature areas, not by file type. This is the key to
avoiding naming conflicts.

DO: Create a folder for each feature within appropriate categories:

- `src/app/components/auth/` for auth-related components
- `src/app/pages/auth/sign-in/` for sign-in page
- `src/app/guards/` for route guards

AVOID: Creating overly generic folders that mix unrelated features.

**File Naming Conventions**:

- Component files use simple names matching the feature (e.g., `sign-in.ts`)
- Do NOT use domain prefixes in filenames (e.g., avoid `landing-sign-in.ts`)
- Component selectors MUST use domain prefixes (e.g.,
  `selector: 'landing-sign-in'`)
- Services, guards, and models retain their descriptive suffixes (e.g.,
  `sign-in.service.ts`, `admin.guard.ts`, `user.model.ts`)

**Actual Structure Example**:

```
src/app/
├─ components/
│  ├─ auth/
│  │  ├─ sign-in/
│  │  │  ├─ sign-in.ts           // Component with selector: 'landing-sign-in'
│  │  │  ├─ sign-in.html         // Template
│  │  │  └─ sign-in.service.ts   // Service (RETAINS suffix)
│  │  └─ auth.ts                 // Parent auth component
│  └─ layout/
│     ├─ header/
│     ├─ footer/
│     └─ layout.ts
├─ pages/
│  ├─ auth/
│  │  └─ sign-in/
│  │     ├─ sign-in.ts           // Page component
│  │     └─ sign-in.html
│  └─ home/
└─ guards/
   └─ admin.guard.ts              // Route guard (RETAINS suffix)
```

### 3. Dependency Injection

**Prefer inject()**: Always prefer using the inject() function over constructor
parameter injection. It is more readable, offers better type inference, and is
syntactically simpler.

```typescript
// PREFER ✅
export class MyComponent {
  private readonly myService = inject(MyService)
  private readonly router = inject(Router)
}

// AVOID ❌
export class MyComponent {
  constructor(
    private readonly myService: MyService,
    private readonly router: Router
  ) {}
}
```

**Readability Benefits**: The inject() approach is clearer when you have
multiple dependencies, easier to add inline comments, and avoids issues with
`useDefineForClassFields`.

### 4. Components & Directives

**Member Order**: Group Angular-specific properties (input, output, model,
queries, injected dependencies) together at the top of the class, before any
methods.

**Member Visibility**: Use protected for class members (properties and methods)
that are only used within the component's template. This prevents them from
becoming part of the component's public API.

**Immutability**: Mark properties initialized by Angular that should not change
as readonly (e.g., input, output, model, and queries like ViewChildren).

**Style & Class Bindings**: Prefer native [class] and [style] bindings over the
NgClass and NgStyle directives. They are more straightforward and perform
better.

```html
<!-- PREFER -->
<div [class.admin]="isAdmin" [style.color]="'blue'">
  <!-- AVOID -->
  <div [ngClass]="{admin: isAdmin}" [ngStyle]="{'color': 'blue'}"></div
></div>
```

**Event Handler Naming**: Name event handlers for the action they perform, not
for the event that triggers them.

PREFER: `<button (click)="saveUserData()">Save</button>`

AVOID: `<button (click)="handleClick()">Save</button>`

**Simple Lifecycle Hooks**: Keep lifecycle methods (like ngOnInit) clean and
simple. They should call well-named methods instead of containing complex logic
directly.

```typescript
// PREFER ✅
ngOnInit() {
  this.loadInitialData();
  this.setupSubscriptions();
}
```

**Implement Lifecycle Interfaces**: When using a lifecycle hook, always
implement its corresponding TypeScript interface to ensure the method signature
is correct.

```typescript
import { Component, OnInit } from '@angular/core'

export class UserProfile implements OnInit {
  ngOnInit() {
    /* ... */
  }
}
```
