---
applyTo: '**/*'
---

# 📁 Project Structure

This document outlines the recommended folder structure for the Akira Flex UI Nx
monorepo. This structure ensures consistency, scalability, and maintainability
across all applications and shared libraries.

```bash
akira-flex-ui/                    # Nx monorepo root
├── apps/                         # Application-specific code
│   ├── akira-flex-landing/       # Landing page application
│   │   ├── src/
│   │   │   ├── index.html
│   │   │   ├── main.ts                      # Application bootstrap (client)
│   │   │   ├── main.server.ts               # Server-side rendering bootstrap
│   │   │   ├── server.ts                    # Express server for SSR
│   │   │   ├── styles.css
│   │   │   ├── environments/                # Environment configurations
│   │   │   └── app/                         # Application-specific code
│   │   │       ├── components/              # Landing components
│   │   │       │   ├── auth/                # Authentication components (reusable)
│   │   │       │   │   ├── auth.component.ts
│   │   │       │   │   ├── sign-in/
│   │   │       │   │   ├── sign-up/
│   │   │       │   │   └── verify-email/
│   │   │       │   └── layout/              # Layout components
│   │   │       │       ├── footer/
│   │   │       │       ├── header/
│   │   │       │       ├── menu/
│   │   │       │       └── layout.component.ts
│   │   │       ├── pages/                   # Landing pages
│   │   │       ├── themes/                  # Landing themes
│   │   │       ├── app.routes.ts        # Landing-specific routes
│   │   │       ├── app.config.server.ts     # Server-side rendering configuration
│   │   │       └── app.config.ts            # Application configuration
│   │   └── project.json                     # Nx project configuration
│   ├── akira-flex-platform/      # Main platform application
│   │   ├── src/
│   │   │   ├── index.html
│   │   │   ├── main.ts                      # Application bootstrap (client)
│   │   │   ├── main.server.ts               # Server-side rendering bootstrap
│   │   │   ├── server.ts                    # Express server for SSR
│   │   │   ├── styles.css
│   │   │   ├── environments/                # Environment configurations
│   │   │   └── app/                         # Application-specific code
│   │   │       ├── components/              # Platform components
│   │   │       │   └── layout/              # Layout components
│   │   │       │       ├── footer/
│   │   │       │       ├── header/
│   │   │       │       ├── menu/
│   │   │       │       └── layout.component.ts
│   │   │       ├── pages/                   # Platform pages
│   │   │       ├── themes/                  # Platform themes
│   │   │       ├── app.routes.ts       # Platform-specific routes
│   │   │       ├── app.config.server.ts     # Server-side rendering configuration
│   │   │       └── app.config.ts            # Application configuration
│   │   └── project.json                     # Nx project configuration
│   └── akira-flex-tenant/        # Tenant application
│       ├── src/
│       │   ├── index.html
│       │   ├── main.ts                      # Application bootstrap (client)
│       │   ├── main.server.ts               # Server-side rendering bootstrap
│       │   ├── server.ts                    # Express server for SSR
│       │   ├── styles.css
│       │   ├── environments/                # Environment configurations
│       │   └── app/                         # Application-specific code
│       │   │       ├── components/              # Tenant components
│       │   │       │   ├── company-brand/       # Company branding components
│       │   │       │   └── layout/              # Layout components
│       │   │       │       ├── footer/
│       │   │       │       ├── header/
│       │   │       │       ├── menu/
│       │   │       │       └── layout.component.ts
│       │   │       ├── pages/                   # Tenant pages
│       │   │       │   ├── auth/                # Authentication pages
│       │   │       │   │   ├── sign-in/
│       │   │       │   │   └── password-recovery/
│       │   │       │   ├── home/
│       │   │       │   └── settings/
│       │   │       ├── guards/                  # Route guards
│       │   │       ├── themes/                  # Tenant themes
│       │   │       ├── app.routes.ts         # Tenant-specific routes
│       │   │       ├── app.config.server.ts     # Server-side rendering configuration
│       │   │       └── app.config.ts            # Application configuration
│       └── project.json                     # Nx project configuration
├── libs/                         # Shared libraries
│   └── core/                     # Consolidated shared library
│       ├── src/lib/
│       │   ├── components/       # Reusable UI components
│       │   ├── i18n/             # Internationalization files
│       │   ├── interceptors/     # HTTP interceptors
│       │   ├── public/           # Shared assets
│       │   ├── services/         # Shared services
│       │   ├── shared/           # Shared utilities and types
│       │   │   ├── mocks/        # Mock data for testing
│       │   │   ├── auth.types.ts
│       │   │   ├── common.types.ts
│       │   │   ├── entities.types.ts
│       │   │   ├── enums.types.ts
│       │   │   └── index.ts
│       │   ├── state/            # NgRx state management
│       │   │   └── state.types.ts # State type definitions
│       │   ├── utils/            # Utility functions
│       │   └── index.ts          # Library exports
│       └── project.json          # Nx library configuration
├── coverage/                     # Test coverage reports
├── tmp/                          # Temporary build files
├── nx.json                       # Nx workspace configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.base.json            # TypeScript base configuration
```
