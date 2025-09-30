# 📁 Project Structure

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
│   │   │       ├── config/                  # App-specific configuration
│   │   │       │   └── api-endpoints.ts     # API endpoints configuration
│   │   │       ├── components/              # Landing components
│   │   │       ├── pages/                   # Landing pages
│   │   │       ├── themes/                  # Landing themes
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
│   │   │       ├── config/                  # Platform-specific config
│   │   │       │   └── api-endpoints.ts     # API endpoints configuration
│   │   │       ├── components/              # Platform components
│   │   │       ├── pages/                   # Platform pages
│   │   │       ├── themes/                  # Platform themes
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
│       │       ├── config/                  # Tenant-specific config
│       │       │   └── api-endpoints.ts     # API endpoints configuration
│       │       ├── components/              # Tenant components
│       │       ├── pages/                   # Tenant pages
│       │       ├── themes/                  # Tenant themes
│       │       ├── app.config.server.ts     # Server-side rendering configuration
│       │       └── app.config.ts            # Application configuration
│       └── project.json                     # Nx project configuration
├── libs/                         # Shared libraries
│   ├── core/                     # Consolidated shared library
│   │   ├── src/lib/
│   │   │   ├── components/       # Reusable UI components
│   │   │   ├── config/           # Shared configuration
│   │   │   ├── interceptors/     # HTTP interceptors
│   │   │   ├── public/           # Shared assets
│   │   │   ├── services/         # Shared services
│   │   │   ├── shared/           # Shared utilities
│   │   │   └── utils/            # Utility functions
│   │   └── project.json          # Nx library configuration
│   └── index.ts                  # Library exports
├── coverage/                     # Test coverage reports
├── tmp/                          # Temporary build files
├── nx.json                       # Nx workspace configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.base.json            # TypeScript base configuration
```
