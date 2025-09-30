# 🎨 AkiraFlex UI

A modern Angular monorepo built with Nx, featuring multiple applications for
AkiraFlex projects. This workspace provides a scalable architecture with shared
components and services, supporting landing pages, platform dashboards, and
tenant-specific applications.

---

## Requirements

- Node.js (v22)
- Angular CLI (v20)

## 🚀 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/OrelNaranjoD/akira-flex-ui.git
cd akira-flex-ui
$env:FLEX_LIB_TOKEN="your_token_here"
npm install
```

Note: You need to have your GitHub token set as an environment variable for the
installation to work. Go to [GitHub](https://github.com) and create a personal
access token with the necessary permissions.

Steps:

1. Click on your profile picture in the top right corner and select "Settings".
2. In the left sidebar, click on "Developer settings".
3. Click on "Personal access tokens" and then "Tokens (classic)".
4. Click "Generate new token", give it a descriptive name, and select the scopes
   you need.
5. Select the scopes related to "repo" and "write:packages".
6. Click "Generate token" and copy the token.
7. Set the token using `$env:FLEX_LIB_TOKEN="your_token_here"`.

---

## 🛠️ Available Scripts

```bash
  npm start                 # Serve all apps in parallel (default ports)
  npm run start:l           # Serve akira-flex-landing (http://localhost:4200)
  npm run start:p           # Serve akira-flex-platform (http://localhost:4201)
  npm run start:t           # Serve akira-flex-tenant (http://localhost:4202)
  npm run lint              # Lint all apps and libs (autofix)
  npm run lint:l            # Lint landing app only
  npm run lint:p            # Lint platform app only
  npm run lint:t            # Lint tenant app only
  npm run lint:lib          # Lint core/shared libs
  npm test                  # Run all unit tests (headless)
  npm run test:l            # Unit tests for landing app
  npm run test:p            # Unit tests for platform app
  npm run test:t            # Unit tests for tenant app
  npm run test:lib          # Unit tests for core/shared libs
  npm run test:cov          # Generate coverage report for all tests
```

---

## 📦 Project Structure

See [.github/project-structure.md](.github/project-structure.md) for the
complete project structure.

---

## 🎨 Tech Stack

- **Frontend Framework**: Angular 20+ with standalone components
- **State Management**: Signals for local component state, NgRx for global state
- **Styling**: Tailwind CSS 4.x for utility-first styling
- **Theming**: PrimeNG Themes for consistent theming
- **Components**: PrimeNG Components for reusable UI elements
- **Icons**: PrimeNG Icons for lightweight iconography
- **Monorepo**: Nx for managing the monorepo structure
- **Testing**: Jasmine + Karma for unit testing
- **Linting**: ESLint + Prettier with JSDoc validation
- **Build**: Angular CLI with modern build system
- **CI/CD**: GitHub Actions for automated testing and releases

---

## 🔧 Development

### Starting the all Development Servers

```bash
npm start
```

The application will be available at `http://localhost:4200` for the landing
app, `http://localhost:4201` for the platform app, and `http://localhost:4202`
for the tenant app. The app will automatically reload when you change any source
files.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in:

- `dist/apps/akira-flex-landing/browser/` for the landing app
- `dist/apps/akira-flex-platform/browser/` for the platform app
- `dist/apps/akira-flex-tenant/browser/` for the tenant app
- `dist/libs/<lib-name>/` for libraries

### Running Tests

```bash
# Run tests once
npm test

# Run tests for a specific app
npm run test:l   # Landing app
npm run test:p   # Platform app
npm run test:t   # Tenant app
npm run test:lib # Core/shared libs

# Generate coverage report
npm run test:cov
```

Coverage reports will be generated in the `coverage/` directory:

- `coverage/apps/akira-flex-landing/`
- `coverage/apps/akira-flex-platform/`
- `coverage/apps/akira-flex-tenant/`
- `coverage/libs/<lib-name>/`

### Code Quality

This project enforces strict code quality standards:

- **ESLint**: Validates code style and catches potential errors
- **JSDoc**: Requires documentation for all classes, methods, and functions
- **Prettier**: Ensures consistent code formatting
- **Commitlint**: Validates commit message format
- **Husky**: Runs pre-commit hooks to ensure quality

---

## 🧪 Testing

Unit tests use [Jasmine](https://jasmine.github.io/) and
[Karma](https://karma-runner.github.io/). All components and services should
have corresponding test files with `.spec.ts` extension.

Test files are located alongside their source files following Angular
conventions:

- `component.ts` → `component.spec.ts`
- `service.ts` → `service.spec.ts`

---

## 🧭 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/)
in English for traceability and version control. Examples:

```bash
feat(AFU-101): add user dashboard component
fix(AFU-102): correct navigation menu styling
docs(AFU-103): update component documentation
style(AFU-104): improve responsive layout for mobile
```

All commits must include JSDoc documentation for new classes, methods, and
functions.

---

## 📦 Release Strategy

Releases are published from the `main` branch via GitHub Actions. The team works
on `develop` and merges manually when ready to publish. The release type
(`patch`, `minor`, `major`) is selected manually.

The build process:

1. Validates code quality (linting, formatting, JSDoc)
2. Runs all unit tests
3. Builds the production bundle
4. Verifies build artifacts
5. Creates automated version bump and tag
6. Publishes release

---

## 🔐 Environment Configuration

This project uses Angular's built-in environment configuration system for
managing environment-specific settings.

### Environment Files

Each application has its own environment configuration:

- `apps/[app-name]/src/environments/environment.ts` - Development environment
- `apps/[app-name]/src/environments/environment.prod.ts` - Production
  environment

### Available Variables

| Variable     | Description      | Landing Default                | Platform Default               | Tenant Default                 |
| ------------ | ---------------- | ------------------------------ | ------------------------------ | ------------------------------ |
| `production` | Environment flag | `false`                        | `false`                        | `false`                        |
| `apiBaseUrl` | Base API URL     | `http://localhost:3000/api/v1` | `http://localhost:3001/api/v1` | `http://localhost:3002/api/v1` |

### Usage in Code

Environment variables are imported directly from the environment files:

```typescript
import { environment } from '../environments/environment'

console.log('API Base URL:', environment.apiBaseUrl)
```

### API Endpoints Configuration

Each application configures its API endpoints using the Global Configuration
Service:

```typescript
// apps/[app-name]/src/app/config/api-endpoints.ts
import { environment } from '../../environments/environment'

export const API_BASE_URL = environment.apiBaseUrl

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    verifyEmail: `${API_BASE_URL}/auth/verify-email`,
    me: `${API_BASE_URL}/auth/me`,
  },
  // Additional modules can be added here
  // users: {
  //   list: `${API_BASE_URL}/users`,
  //   create: `${API_BASE_URL}/users`,
  // },
}
```

### Automatic Configuration

The GlobalConfigService automatically loads endpoint configuration when each
application starts using `provideAppInitializer`, allowing shared services like
AuthService to work with app-specific API URLs.

---

## 🏗️ Architecture

This is an Nx monorepo with a consolidated shared library approach:

### Applications

- **akira-flex-landing**: Public landing page and authentication
- **akira-flex-platform**: Main platform dashboard and features
- **akira-flex-tenant**: Tenant-specific customizations and features

### Shared Library

- **libs/core**: Consolidated library containing all reusable code
  - Components (UI elements, forms, etc.)
  - Services (authentication, theming, HTTP interceptors)
  - Utilities (cookies, validation, helpers)
  - Configuration types and interfaces

### Configuration Pattern

Each application maintains its own configuration while sharing common services:

- App-specific `api-endpoints.ts` files define API URLs
- `GlobalConfigService` provides configuration to shared services
- Environment files contain app-specific settings
- Shared services remain agnostic of app-specific details

This architecture enables:

- **Code reuse** across applications
- **Independent deployment** of each app
- **Future separation** into individual repositories
- **Consistent development** experience

---

## 👤 Author

### Orel Naranjo

---

## 📄 License

This project is for internal use only. License: **Proprietary**
