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

DO: Create a folder for each feature (e.g., src/header/, src/user-profile/).

AVOID: Creating generic folders like src/components/, src/services/, or
src/guards/.

**Solving Naming Conflicts**: By using feature folders, you can simplify the
component's filename while keeping other file types distinct.

The component can use the simplified name, acting as the feature's main file.

Services, guards, models, and other files must retain their descriptive suffixes
to ensure clarity and prevent filename collisions.

**Recommended Structure Example**:

```
src/
└─ user-profile/
   ├─ user-profile.ts            // The component (simplified name)
   ├─ user-profile.html          // Its template
   ├─ user-profile.css           // Its styles
   ├─ user-profile.service.ts    // The service (RETAINS suffix for clarity)
   └─ user.model.ts              // A related model (RETAINS suffix)
```

### 3. Dependency Injection

**Prefer inject()**: Always prefer using the inject() function over constructor
parameter injection. It is more readable, offers better type inference, and is
syntactically simpler.

```typescript
// PREFER ✅
export class MyComponent {
  private readonly myService = inject(MyService)
}

// AVOID ❌
export class MyComponent {
  constructor(private readonly myService: MyService) {}
}
```

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
