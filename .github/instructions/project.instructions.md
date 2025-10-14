---
applyTo: '**'
---

# Project-Specific Instructions for Akira Flex UI

These instructions complement the Angular and TypeScript best practices. Follow
them to maintain code quality and project structure.

## Comments and Documentation

- All comments must be in English.
- Use JSDoc format (`/** */`) in multi-line style for all documentation
  comments, including classes, methods, properties, parameters, and explanatory
  blocks.
- **Do NOT use inline comments (`//`) or explanatory comments within the body of
  methods.** Use descriptive variable and function names instead. Code should be
  self-explanatory.
- Only use JSDoc for public API documentation (classes, methods, properties).
- Example:

```typescript
/**
 * Represents a user in the system.
 */
export class User {
  /**
   * The user's unique identifier.
   */
  id: number

  /**
   * Creates a new user instance.
   * @param name The user's name.
   */
  constructor(public name: string) {}
}
```

## Clean Code and Best Practices

- Follow SOLID principles (Single Responsibility, Open-Closed, Liskov
  Substitution, Interface Segregation, Dependency Inversion).
- Keep functions and methods short (less than 20 lines ideal).
- Use descriptive names in English for variables, functions, and classes (avoid
  confusing abbreviations).
- Avoid code duplication (DRY principle - Don't Repeat Yourself).
- Handle errors appropriately; do not silence exceptions without reason.
- Prefer composition over inheritance.
- Use async/await instead of nested promises when possible.
- Avoid explanatory comments within the body of methods, even short ones, unless
  strictly necessary; use descriptive variable and function names instead.

## Project Structure

- Maintain Nx folder organization: `apps/` for specific applications, `libs/`
  for shared libraries.
- Name files and folders in kebab-case (e.g., `landing-login.ts`,
  `landing-header/`).
- Group related components in dedicated folders (e.g.,
  `components/landing-login/`).
- Use `index.ts` to export library modules and facilitate imports.
- Follow naming conventions: PascalCase for classes/components, camelCase for
  variables/methods/properties.
- Maintain consistency in structure: `src/app/` with subfolders `components/`,
  `pages/`, `services/`, `themes/`, etc.
- Avoid overly long files; split logic into multiple files if necessary.

## Specific Libraries and Technologies

- **PrimeNG Components**: Use PrimeNG components for reusable UI elements
  (buttons, forms, tables, etc.). Avoid creating custom components if PrimeNG
  offers a suitable alternative. Prefer importing individual PrimeNG components
  (e.g., `Button` from 'primeng/button') over entire modules (e.g.,
  `ButtonModule`) to optimize bundle size through better tree-shaking.
- **PrimeNG Icons**: Use PrimeNG icons for lightweight and consistent
  iconography. Do not import external icons unless necessary.
- **Tailwind CSS**: Use Tailwind utility classes for styling. Avoid custom CSS
  styles or inline styles; prefer Tailwind classes to maintain consistency.
- **NgRx State Management**: Use NgRx for global state management. For local
  component state, use signals. Avoid Ngxs or other state libraries.
- **Testing**: Write unit tests with Jasmine + Karma for all components,
  services, and utilities. Use Angular testing patterns. Test spec files
  (.spec.ts) do not require JSDoc documentation. Test titles (it descriptions)
  in spec files must be in English and avoid blank lines between test blocks for
  consistency. Make mocks reusable at a global level whenever possible. Note:
  Configuration files like test.ts may include JSDoc and formatting as needed.
- **Linting and Formatting**: Follow ESLint and Prettier rules. Include JSDoc in
  all public classes, methods, and functions. The project uses ESLint with
  Prettier integration to ensure consistent formatting. Prettier is configured
  via `.prettierrc` with specific rules for TypeScript, HTML, CSS, etc. Use
  blank lines to separate methods within classes for better readability.
- **Commits**: Use Conventional Commits in English with prefixes like `feat:`,
  `fix:`, `docs:`, etc. Include ticket references (e.g., `AFU-101`).

## Provider Configuration

- Do not include comments in provider configurations (e.g., `provideStore`,
  `provideEffects`, `provideStoreDevtools`).
- Keep provider configurations clean and minimal without explanatory comments.
- Use descriptive provider names and rely on code clarity rather than comments.

## Environment Configuration

- Create separate environment files for development, staging, and production.
- Use environment variables for API URLs, tokens, etc.
- Do not hardcode sensitive values; use external configuration.
- Configure API endpoints using the Global Configuration Service pattern:
  - Each application defines endpoints in `src/app/config/api-endpoints.ts`
  - Endpoints are configured via `provideAppInitializer` in `app.config.ts`
  - Shared services like `AuthService` read configuration from
    `GlobalConfigService`
  - This ensures apps can be separated in the future while maintaining shared
    logic.

## CI/CD and Code Quality

- Run linting.
- Maintain test coverage above 80%.
- Use Husky for pre-commit hooks that validate quality.

- **Automatic Formatting Setup**: To ensure code is pre-formatted when inserted:
  - Install the Prettier extension in VS Code (`esbenp.prettier-vscode`).
  - Update `.vscode/settings.json` with:
    ```json
    {
      "editor.formatOnSave": true,
      "editor.formatOnPaste": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "eslint.format.enable": true
    }
    ```
  - This enables automatic formatting on save and paste, ensuring inserted code
    follows Prettier rules without manual intervention.

## Shared Services Configuration

- Use the `GlobalConfigService` for configuring shared services with
  app-specific settings.
- Each application configures the `GlobalConfigService` during initialization
  via `provideAppInitializer`.
- Shared services (like `AuthService`) read their configuration from
  `GlobalConfigService.apiEndpoints`.
- This pattern allows services to remain in the shared library while being
  configurable per application.

Example implementation:

```typescript
// In app.config.ts
function initializeApp(globalConfig: GlobalConfigService): () => void {
  return () => {
    globalConfig.configureApiEndpoints(API_ENDPOINTS)
  }
}

// Provider configuration
provideAppInitializer(initializeApp, [GlobalConfigService])
```

## Internationalization (i18n)

### General Rules

- The base language for internationalization is **English**. All source texts in
  the code must be in English.
- Use Angular's built-in i18n system with `$localize` for TypeScript code and
  `i18n` attributes for HTML templates.
- Extract translations using `npm run i18n` to generate XLF files per domain.
- Merge translations using `npm run i18n:merge` to create consolidated XLF with
  `<target>` tags for Spanish.
- Translation files are located in `libs/core/src/lib/i18n/locale/`.

### Translation ID Conventions

- **Always use camelCase** for translation IDs (e.g., `@@mainPanel`,
  `@@cashAndBanks`, `@@toggleTheme`)
- Use camelCase consistently in both TypeScript and HTML for easier maintenance
  and refactoring
- **Never use kebab-case** for IDs to maintain consistency with JavaScript
  naming conventions

### Default Text Conventions

- **Use proper capitalization** for default text values (e.g., `Main panel`,
  `Cash and banks`, `Toggle theme`)
- Capitalize the first letter of sentences and proper nouns
- For error messages and form labels, use appropriate capitalization (e.g.,
  `Email is required`, `Please enter a valid email`)
- Use CSS classes like `capitalize`, `uppercase`, or `lowercase` for additional
  styling when needed
- Alternative: Use Angular's `titlecase` pipe for dynamic capitalization in
  templates

### Examples

**TypeScript (camelCase IDs, properly capitalized text):**

```typescript
const label = $localize`:@@mainPanel:Main panel`
const title = $localize`:@@cashAndBanks:Cash and banks`
const action = $localize`:@@newSale:New sale`
const error = $localize`:@@emailRequired:Email is required`
```

**HTML Templates (camelCase IDs, properly capitalized text):**

```html
<h1 i18n="@@pageTitle">Dashboard</h1>
<button i18n-title="@@toggleTheme" i18n-aria-label="@@themeSwitcher">
  Theme
</button>
<label i18n="@@emailLabel">Email address</label>
<p-message i18n="@@emailRequired">Email is required</p-message>
```

**Additional Capitalization with CSS:**

```html
<!-- Capitalize first letter of each word -->
<h1 class="capitalize" i18n="@@mainPanel">Main panel</h1>

<!-- Uppercase all letters -->
<button class="uppercase" i18n="@@saveButton">Save</button>

<!-- Lowercase all letters -->
<span class="lowercase" i18n="@@codeSnippet">Code snippet</span>

<!-- Capitalize with pipe -->
<span>{{ 'mainPanel' | titlecase }}</span>
```

### Workflow

1. Developer writes code with `$localize`:@@camelCaseId:Properly capitalized
   text``
2. Run `npm run i18n` → Extracts to `locale/{domain}/messages.xlf`
3. Run `npm run i18n:merge` → Merges all XLF files into `locale/messages.es.xlf`
4. Translator edits `messages.es.xlf` and replaces `[TRANSLATE]` placeholders
5. Build generates localized versions for English and Spanish
6. CSS or pipes handle additional text styling as needed
