---
applyTo: '**'
---

# Angular and TypeScript Best Practices

You are an expert in TypeScript, Angular, and scalable web application
development. You write maintainable, performant, and accessible code following
Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host
  bindings inside the `host` object of the `@Component` or `@Directive`
  decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Naming

- Separate words in file names with hyphens (e.g., `user-profile.ts`)
- Use the same name for a file's tests with `.spec` at the end (e.g.,
  `user-profile.spec.ts`)
- Match file names to the TypeScript identifier within
- Use the same file name for a component's TypeScript, template, and styles
  (e.g., `user-profile.ts`, `user-profile.html`, `user-profile.css`)

## Project Structure

- All the application's code goes in a directory named `src`
- Bootstrap your application in a file named `main.ts` directly inside `src`
- Group closely related files together in the same directory
- Organize your project by feature areas (avoid directories like `components`,
  `directives`, `services`)
- One concept per file

## Dependency Injection

- Prefer the `inject` function over constructor parameter injection
- `inject` is more readable, especially with many dependencies
- Easier to add comments to injected dependencies
- Better type inference
- Avoids separating field declaration and initialization with
  `useDefineForClassFields`

## Components and Directives

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component`
  decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Choosing component selectors: See Components guide
- Naming component and directive members: See Components guide
- Choosing directive selectors: Use application-specific prefix, camelCase for
  attributes
- Group Angular-specific properties (inputs, outputs, queries) before methods
- Keep components and directives focused on presentation
- Avoid overly complex logic in templates (refactor to TypeScript with
  `computed`)
- Use `protected` on class members only used by template
- Use `readonly` for properties initialized by Angular (inputs, outputs,
  queries)
- Prefer `class` and `style` bindings over `ngClass` and `ngStyle`
- Name event handlers for what they do, not the triggering event (e.g.,
  `saveUserData()` not `handleClick()`)
- Keep lifecycle methods simple (call well-named methods from hooks)
- Use lifecycle hook interfaces (implement `OnInit`, etc.)

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`,
  `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- **Separation of long templates**: If the inline template in the component
  exceeds 50 lines, move it to a separate `.html` file (using `templateUrl`
  instead of `template`). This improves readability and facilitates editing in
  specialized HTML tools.
- **Separation of long styles**: If the inline styles in the component (in the
  `styles` property) exceed 30 lines, move them to a separate `.css` file (using
  `styleUrls` instead of `styles`). Avoid inline styles to maintain separation
  of concerns and facilitate maintenance.
- **Comments in HTML templates**: Limit HTML comments (`<!-- -->`) only to
  strictly necessary cases for organizing complex sections. Avoid redundant
  explanatory comments; prioritize HTML code clarity over additional
  explanations.
- **Preference for reusable classes**: For custom styles, prioritize the use of
  Tailwind CSS or PrimeNG classes over custom CSS. Only use custom styles when
  no alternatives are available, and ensure they are specific and not global.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Angular Animations

- Use `animate.enter` to animate elements entering the DOM with CSS classes
  (transitions or keyframes). Angular removes the classes after animation
  completion.
- Use `animate.leave` to animate elements leaving the DOM. Angular removes the
  element after animation completion.
- Support event bindings for functions or third-party libraries (e.g., GSAP).
  Call `event.animationComplete()` to notify Angular when done.
- For testing, use `TestBed.configureTestingModule({animationsEnabled: true})`
  to enable animations in tests.
- Prefer native CSS animations with `@keyframes` for reusability.
- Use CSS transitions or keyframes for state changes (e.g., open/closed).
- Apply timing with `animation-duration`, `animation-delay`,
  `animation-timing-function`.
- Trigger animations by toggling CSS classes or styles.
- Use `animate.enter` and `animate.leave` for view transitions instead of
  complex directives.
- For route transitions, enable with `withViewTransitions()` in router config.
- Customize view transitions with CSS using `::view-transition-old()` and
  `::view-transition-new()`.
- Use `onViewTransitionCreated` for advanced control, e.g., skipping
  transitions.
- Avoid animations for users with `prefers-reduced-motion`.
- Use `Element.getAnimations()` for programmatic control.

## Rendering Strategies

Angular supports three primary rendering strategies to optimize performance,
SEO, and user experience:

### Client-Side Rendering (CSR)

- Default strategy where content renders entirely in the browser after
  JavaScript loads.
- Best for: Interactive applications, real-time apps, internal tools.
- Trade-offs: Poor SEO, slower initial load, but immediate interactivity once
  loaded.

### Static Site Generation (SSG/Prerendering)

- Pre-renders pages at build time into static HTML files.
- Best for: Marketing pages, blogs, documentation, stable content.
- Trade-offs: Excellent SEO, fastest initial load, but requires rebuild for
  content updates.

### Server-Side Rendering (SSR)

- Generates HTML on the server for the initial request.
- Best for: E-commerce, news sites, personalized content.
- Trade-offs: Good SEO, fast initial load, but higher server costs and delayed
  interactivity until hydration.

### Choosing the Right Strategy

- Use CSR for apps where SEO isn't critical and interactivity is key.
- Use SSG for static content that doesn't change frequently.
- Use SSR for dynamic, user-specific content.
- Consider hybrid approaches for mixed requirements.

### Hydration

- Makes SSR/SSG content interactive by attaching event listeners.
- Options: Full hydration (entire app at once), incremental hydration (parts as
  needed), event replay (captures interactions before hydration).

## Routing

- Implement lazy loading for feature routes to improve initial bundle size.
- Use route guards to protect routes based on authentication or permissions.
- Prefer route-level providers for services specific to a route.
- Use `withViewTransitions()` for smooth route transitions in supported
  browsers.
- Customize route behavior with advanced strategies when needed.

### Route Reuse Strategy

- Controls component preservation across navigations.
- Useful for maintaining state in forms, scroll positions, or expensive data.
- Implement custom strategies by extending `RouteReuseStrategy`.
- Configure via route data or application-wide provider.

### Preloading Strategy

- Determines when lazy modules load in background.
- Built-in: `NoPreloading` (default) or `PreloadAllModules`.
- Create custom strategies for selective preloading based on route data.
- Consider performance impact on network and memory.

### URL Handling Strategy

- Controls which URLs Angular processes vs. ignores.
- Useful for hybrid apps or incremental migration.
- Implement custom strategies by extending `UrlHandlingStrategy`.

### Custom Route Matchers

- For complex URL patterns beyond standard path matching.
- Examples: version-based routing, locale-aware routing, business logic
  matching.
- Return `UrlMatchResult` with consumed segments and parameters.
- Keep matchers efficient to avoid performance issues.

## Additional Resources

For complete and up-to-date Angular documentation context, refer to the
following files in the project root:

- `llms.txt`: Index file with links to key Angular resources and guides.
- `llms-full.txt`: Comprehensive compiled set of resources describing how
  Angular works and how to build Angular applications.

These files are based on the official Angular documentation from angular.dev and
provide extensive context for building modern Angular applications.
