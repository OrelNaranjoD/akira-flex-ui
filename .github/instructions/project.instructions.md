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
- Avoid explanatory comments within the body of methods, even short ones, unless
  strictly necessary; use descriptive variable and function names instead.
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
