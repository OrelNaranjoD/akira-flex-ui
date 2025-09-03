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
npm start               # Start development server (http://localhost:4200)
npm run build           # Build the app for production
npm run watch           # Build with file watching for development
npm test                # Run unit tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run lint            # Run ESLint with auto-fix
npm run format          # Apply Prettier formatting
npm run validate        # Run linting and tests
```

---

## 📦 Project Structure

```bash
akira-flex-ui/
├── src/
│   ├── app/
│   │   ├── core/                 # Core application modules
│   │   │   ├── components/       # Shared components (header, footer, layout)
│   │   │   └── services/         # Core services and utilities
│   │   ├── pages/                # Feature pages
│   │   │   └── home/            # Home page components
│   │   ├── app.config.ts        # Application configuration
│   │   └── app.routes.ts        # Routing configuration
│   ├── styles.css               # Global styles
│   ├── main.ts                  # Application bootstrap
│   └── index.html               # Main HTML template
├── public/
│   └── favicon.ico              # Application icon
├── .github/
│   └── workflows/               # CI/CD automation
├── angular.json                 # Angular workspace configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration with JSDoc validation
├── .commitlintrc.mjs           # Commit message linting rules
├── .lintstagedrc.json          # Pre-commit hooks configuration
└── README.md                   # Project documentation
```

---

## 🎨 Tech Stack

- **Frontend Framework**: Angular 20+ with standalone components
- **Styling**: Tailwind CSS 4.x for utility-first styling
- **Icons**: Font Awesome with Angular integration
- **Testing**: Jasmine + Karma for unit testing
- **Linting**: ESLint + Prettier with JSDoc validation
- **Build**: Angular CLI with modern build system
- **CI/CD**: GitHub Actions for automated testing and releases

---

## 🔧 Development

### Starting the Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200`. The app will
automatically reload when you change any source files.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/akira-flex-ui/browser/`
directory.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

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
