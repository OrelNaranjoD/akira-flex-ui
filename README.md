# 🎨 AkiraFlex UI

Frontend application for AkiraFlex projects, built with
[Angular](https://angular.io/) and TypeScript. This application provides a
modern, responsive user interface for managing projects, tasks, and team
collaboration.

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

```bash
akira-flex-ui/
├── apps/
│   ├── akira-flex-landing/      # Landing app (SPA/SSR)
│   ├── akira-flex-platform/     # Platform app (SPA/SSR)
│   ├── akira-flex-tenant/       # Tenant app (SPA/SSR)
├── libs/
│   ├── components/              # Shared UI components (checkbox, loading, logotype, etc.)
│   ├── services/                # Shared services (theme, page-title, etc.)
│   ├── utils/                   # Utility functions (cookie-utils, etc.)
│   ├── test/                    # Shared test utilities
│   ├── flex-shared-lib/         # Shared library entry point
│   └── index.ts                 # Libs barrel file
├── .github/
│   └── workflows/               # CI/CD automation
├── .commitlintrc.mjs            # Commit message linting rules
├── .editorconfig                # Code editor configuration
├── .gitignore                   # Git ignore file
├── .postcssrc.json              # PostCSS configuration
├── .prettierignore              # Prettier ignore file
├── .prettierrc                  # Prettier configuration
├── CHANGELOG.md                 # Project changelog
├── CONTRIBUTING.md               # Contribution guidelines
├── css-custom-data.json          # CSS custom properties for Tailwind IntelliSense
├── eslint.config.mjs            # ESLint configuration
├── nx.json                      # Nx workspace configuration
├── package-lock.json            # NPM lock file
├── package.json                 # NPM scripts and dependencies
├── README.md                    # Project documentation
└── tsconfig.base.json           # Base TypeScript config
```

---

## 🎨 Tech Stack

- **Frontend Framework**: Angular 20+ with standalone components
- **Styling**: Tailwind CSS 4.x for utility-first styling
- **Theming**: PrimeNg Themes for consistent Theming
- **Components**: PrimeNg Components for reusable UI elements
- **Icons**: PrimeNg Icons for lightweight iconography
- **State Management**: Ngxs for reactive state management
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

Create environment files for different stages:

- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.staging.ts` - Staging configuration
- `src/environments/environment.prod.ts` - Production configuration

Example environment configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'AkiraFlex',
  version: '0.0.2',
}
```

---

## 👤 Author

### Orel Naranjo

---

## 📄 License

This project is for internal use only. License: **Proprietary**
