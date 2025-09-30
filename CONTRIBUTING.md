# 🧭 Workflow and Release Guide (Angular UI)

This guide explains how to collaborate on the Angular UI repository in an
organized way, without creating branches per task, using semantic commits in
English, and controlling releases from the `main` branch.

## 🔧 Branch structure

- **develop**: shared working branch. All day-to-day work and task integration
  happens here.
- **main**: protected branch. Only updated by merge from `develop` and used to
  publish official releases.

## 🔁 Operational flow

### 1. Daily work on develop

- The whole team works directly on the `develop` branch.
- Each commit must follow the semantic commit convention in English and include
  the task identifier (e.g. `AFU-101`).
- Valid examples:
  - `feat(AFU-101): add user dashboard component`
  - `fix(AFU-102): correct navigation menu styling`
  - `refactor(AFU-103): optimize component performance`
  - `docs(AFU-104): add JSDoc documentation to services`
- Do not create branches per task. Tracking is done in the Kanban board and
  reflected in commits.

### 2. Code Quality Requirements

All code must meet quality standards before committing:

- **JSDoc Documentation**: All classes, methods, and functions must have proper
  JSDoc comments
- **ESLint**: Code must pass linting without errors
- **Prettier**: Code must be properly formatted
- **Tests**: New components and services should include unit tests
- **Conventional Commits**: All commit messages must follow the established
  format

### 3. Pre-commit Process

Before each commit, the following checks run automatically via Husky:

```bash
- ESLint validation and auto-fix
- Prettier formatting
- JSDoc validation
- Commit message validation (Commitlint)
```

### 4. Publishing a new release

- When a stable release is ready:
  - Perform a manual merge from `develop` into `main` (via PR).
  - Run the `build` workflow (it can be triggered automatically on `push` to
    `main` or manually via `workflow_dispatch`).
  - Select the release type:
    - `patch`: for minor fixes or internal adjustments
    - `minor`: for new features that maintain compatibility
    - `major`: for breaking changes

### 5. Error handling and rollback

- If a published release has problems:
  - Fix the issue in `develop`.
  - Merge the fix from `develop` into `main`.
  - Re-run the `build` workflow with an appropriate release type (you can bump
    minor/major to force a new release if necessary).

- The `main` branch must be protected and require review before merging.
- Keep branches synchronized: after each release ensure `develop` includes the
  changes from `main`.

---

## 🛠️ Development Workflow Commands

```bash
# Switch to develop
git checkout develop

# Update develop with remote changes
git pull origin develop

# Work in develop
# Make your changes here

# Run quality checks locally (optional but recommended)
npm run lint      # Fix linting issues
npm test          # Run unit tests

# Stage changes and create a semantic commit
git add .
git commit -m "feat(AFU-101): add user dashboard component"

# Push changes to develop
git push origin develop

# Create PR to main when ready for release
gh pr create --base main --head develop --title "Merge develop into main" --body "Automated PR to merge changes from develop into main"

# NOTE: Stay on the PR page for review and approval

# Sync develop with main after release if necessary
git fetch --all
git pull origin main
git push origin develop

# View commit history
git log --oneline --decorate --graph --all
```

---

## 📋 Code Standards

### JSDoc Documentation Requirements

All public classes, methods, and functions must include JSDoc comments:

```typescript
/**
 * Service for managing user authentication and session state.
 * Provides methods for login, logout, and token validation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Authenticates a user with email and password.
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise that resolves to authentication result
   * @throws {Error} When credentials are invalid
   */
  async login(email: string, password: string): Promise<AuthResult> {
    // Implementation
  }
}
```

### Component Documentation

#### Option one(Preferred)

```typescript
/**
 * Header component
 */
@Component({
  selector: 'app-header',
  template: `
    <header class="flex items-center justify-between p-4">
      <nav>
        <ul class="flex space-x-4">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/about">About</a></li>
          <li><a routerLink="/contact">Contact</a></li>
          <li><button (click)="onLogout()">Logout</button></li>
        </ul>
      </nav>
    </header>
  `,
  imports: [RouterLink],
  styles: [
    `
      header {
        background-color: #f8f9fa;
        padding: 1rem;
      }
    `,
  ],
})
export class HeaderComponent {
  /**
   * Handles user logout process and redirects to login page.
   * Clears local storage and resets authentication state.
   */
  onLogout(): void {
    // Implementation
  }
}
```

#### Option two

```typescript
/**
 * Header component that displays navigation menu and user actions.
 * Responsive design that adapts to mobile and desktop viewports.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  /**
   * Handles user logout process and redirects to login page.
   * Clears local storage and resets authentication state.
   */
  onLogout(): void {
    // Implementation
  }
}
```

### Testing Requirements

- All components must have corresponding `.spec.ts` files
- Services should include unit tests for public methods
- Test coverage should be maintained above 80%
- Use descriptive test names that explain the behavior being tested

```typescript
describe('AuthService', () => {
  it('should authenticate user with valid credentials', () => {
    // Test implementation
  })

  it('should throw error for invalid credentials', () => {
    // Test implementation
  })
})
```

---

## 🚀 Angular-Specific Guidelines

### Component Architecture

- Use standalone components (Angular 15+)
- Follow Angular style guide conventions
- Implement OnDestroy for cleanup when needed
- Use Angular signals for reactive state management where appropriate

### File Organization

See [.github/project-structure.md](.github/project-structure.md) for the
complete project structure.

### Styling Guidelines

- Use Tailwind CSS utility classes for consistent styling
- Create component-specific styles in `.component.css` files
- Follow mobile-first responsive design principles
- Use CSS custom properties for theme variables

### Performance Considerations

- Implement OnPush change detection strategy where appropriate
- Use trackBy functions in \*ngFor loops
- Lazy load feature modules when possible
- Optimize bundle size with proper imports

---

## 🔍 Code Review Checklist

Before approving a PR, verify:

- [ ] All new code has proper JSDoc documentation
- [ ] ESLint passes without errors or warnings
- [ ] Prettier formatting is applied consistently
- [ ] Unit tests are included for new functionality
- [ ] Component follows Angular style guide
- [ ] Responsive design works on mobile and desktop
- [ ] No console.log statements in production code
- [ ] Commit messages follow conventional format
- [ ] No breaking changes without major version bump

---

## 👤 Author

### Orel Naranjo

---

## 📄 License

This project is for internal use only. License: **Proprietary**
