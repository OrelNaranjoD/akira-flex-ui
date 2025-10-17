---
applyTo: '**/*.spec.ts'
---

# Testing Instructions

This document establishes conventions and best practices for writing effective,
maintainable, and consistent tests in the monorepo. The designated testing
framework for this project is **Vitest** with **@analogjs/vitest-angular** for
Angular component testing support.

## 1. Test Principles and Structure

Proper organization of test files is fundamental for project maintainability.

### File Location

- All test files (`.spec.ts`) must reside in the `src/test/` directory.
- The folder structure within `src/test/` must be an exact mirror of the
  `src/app/` directory structure.
- Example: The test for `src/app/pages/auth/sign-in/sign-in.ts` must be located
  at `src/test/pages/auth/sign-in/sign-in.spec.ts`.

### File Naming

- Test file names must match the file being tested, with a `.spec.ts` suffix.
- Separate words in file names with hyphens (`-`), not camelCase (e.g.,
  `user-profile.spec.ts`).

### Test Initialization

- Each test file must import the shared initialization file `test.ts` located at
  the root of `src/test/`.
- The import must use a relative path.

```typescript
// Example in: src/test/pages/auth/sign-in/sign-in.spec.ts
import '../../../test'
```

## 2. Vitest Configuration

The project uses a centralized Vitest configuration at the workspace level.

### Workspace Configuration

- Main configuration: `vitest.workspace.ts` at the monorepo root
- Factory function: `createVitestConfig(appName)` creates standardized configs
  for each app
- Shared settings: Globals enabled, setupFiles (`src/test/test.ts`), environment
  (jsdom), plugins (Angular, nxViteTsPaths)

### Application-Specific Configs

Each application has a minimal `vitest.config.ts`:

```typescript
import { createVitestConfig } from '../../vitest.workspace'

export default createVitestConfig('akira-flex-landing')
```

### Library Configuration

Libraries like `libs/core/` can extend the base config with custom settings:

```typescript
import { mergeConfig, defineConfig } from 'vitest/config'
import { createVitestConfig } from '../../vitest.workspace'

export default mergeConfig(
  createVitestConfig('core'),
  defineConfig({
    test: {
      coverage: {
        exclude: ['src/lib/public/**/*'],
      },
    },
  })
)
```

## 3. Test Environment Setup with TestBed

TestBed is Angular's most important testing utility. It emulates an Angular
module (`@NgModule`) to provide and configure necessary components, services,
and directives.

### Basic Configuration

Use `TestBed.configureTestingModule` within a `beforeEach()` block to set up the
environment before each test.

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MyComponent } from '../../../../app/components/my-component/my-component'

describe('MyComponent', () => {
  let component: MyComponent
  let fixture: ComponentFixture<MyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent], // For standalone components
      providers: [
        provideHttpClient(), // Provide HTTP client
        provideNoopAnimations(), // Provide animations (noop for tests)
        MyService, // Real service or mock
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(MyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // Tests go here
})
```

### Required Providers

- **provideHttpClient()**: Always provide when components/services use
  HttpClient
- **provideNoopAnimations()**: Required for components using Angular animations
  (avoids NG05105 error)
- **PLATFORM_ID**: Use `{ provide: PLATFORM_ID, useValue: 'browser' }` for
  platform-specific code

## 4. Writing Tests with Vitest

The project uses Vitest APIs for mocks, not Jasmine.

### Mocks and Stubs

- Use `vi.fn()` from Vitest to create mocks (NOT `jasmine.createSpyObj`)
- Configure return values with `mockReturnValue()`
- Make mocks reusable at a global level whenever possible

```typescript
import { vi } from 'vitest'

let mockAuthService: {
  login: ReturnType<typeof vi.fn>
  getUser: ReturnType<typeof vi.fn>
}

beforeEach(() => {
  mockAuthService = {
    login: vi.fn(),
    getUser: vi.fn(),
  }

  TestBed.configureTestingModule({
    providers: [{ provide: AuthService, useValue: mockAuthService }],
  })
})

it('should call login on submit', () => {
  mockAuthService.login.mockReturnValue(of({ success: true }))
  component.submit()
  expect(mockAuthService.login).toHaveBeenCalled()
})
```

### Test Naming

- Test titles (`it` or `test` descriptions) must be in English
- Use descriptive names that explain what is being tested
- Avoid blank lines between test blocks for consistency

```typescript
describe('SignIn', () => {
  it('should create component', () => {
    expect(component).toBeTruthy()
  })
  it('should initialize form with empty values', () => {
    expect(component.signInForm.get('email')?.value).toBe('')
  })
  it('should validate email format', () => {
    component.signInForm.get('email')?.setValue('invalid')
    expect(component.signInForm.get('email')?.invalid).toBe(true)
  })
})
```

## 5. Testing Real Services vs Mocks

**IMPORTANT**: The project's testing strategy prioritizes using **real
services** over mocks for authentication and core business logic. This enables
easy migration from hardcoded data to API calls.

### When to Use Real Services

- Authentication flows (login, logout, token management)
- Business logic services that will eventually call APIs
- State management (NgRx stores, effects)

```typescript
import { AuthService } from '@core'

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [SignInComponent],
    providers: [
      provideHttpClient(),
      AuthService, // Real service, not mock
    ],
  }).compileComponents()
})

it('should authenticate with valid credentials', async () => {
  component.signInForm.get('email')?.setValue('admin@tenant.com')
  component.signInForm.get('password')?.setValue('admin123')
  component.signInSubmit()

  // Wait for async Observable to complete
  await new Promise((resolve) => setTimeout(resolve, 1100))

  expect(component.serverError()).toBeNull()
})
```

### When to Use Mocks

- External dependencies (HTTP backends, third-party libraries)
- Complex dependencies that are not the focus of the test
- Performance-critical tests that need to run fast

### Handling CSS Variables in JSDOM

When using PrimeNG or other UI libraries that rely on CSS custom properties
(variables), JSDOM's cssstyle library may fail to parse complex CSS
declarations. To prevent errors like
`TypeError: Cannot create property 'border-width' on string '1px solid var(--p-button-primary-border-color)'`,
add mock CSS variables to the test setup.

**Solution**: Define essential CSS variables in the test setup file:

```typescript
// In src/test/test.ts
// Mock CSS variables to prevent JSDOM CSS parsing errors
const mockCSSVariables = `
  :root {
    --p-button-primary-border-color: #007bff;
    --p-button-primary-background: #007bff;
    --p-button-primary-color: #ffffff;
    --p-surface-ground: #f8f9fa;
    --p-surface-section: #ffffff;
    --p-text-color: #212529;
    --p-text-muted-color: #6c757d;
  }
`

// Add mock CSS to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = mockCSSVariables
  document.head.appendChild(style)
}
```

This ensures that CSS custom properties are resolved before JSDOM attempts to
parse them, preventing parsing errors during component rendering.

1. Mark the test function as `async`
2. Use `await new Promise(resolve => setTimeout(resolve, duration))` to wait for
   Observables with artificial delays
3. The timeout should match or exceed the service's delay (e.g., 1100ms for
   1000ms service delay)
4. For services without artificial delays, use `fakeAsync` and `tick()` from
   Angular testing utilities

```typescript
it('should handle login error with invalid credentials', async () => {
  component.signInForm.get('email')?.setValue('wrong@example.com')
  component.signInForm.get('password')?.setValue('wrongpassword')
  component.signInSubmit()

  await new Promise((resolve) => setTimeout(resolve, 1100))

  expect(component.serverError()).toBeTruthy()
})
```

## 6. Common Testing Scenarios

### Testing Services

#### Services with HTTP

Use real `HttpClient` with `provideHttpClient()`:

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), MyDataService],
  })
  service = TestBed.inject(MyDataService)
})
```

#### Services with Dependencies

Use TestBed to manage dependency injection:

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      MyService,
      { provide: DependencyService, useValue: mockDependency },
    ],
  })
})
```

### Testing Components

#### ComponentFixture

The test harness for interacting with the created component and its DOM element.

```typescript
let fixture: ComponentFixture<MyComponent>
let component: MyComponent

beforeEach(() => {
  fixture = TestBed.createComponent(MyComponent)
  component = fixture.componentInstance
  fixture.detectChanges() // Trigger change detection
})
```

#### Change Detection

- `fixture.detectChanges()`: Triggers Angular change detection, updating DOM
  with current component state
- Call after modifying component state to see changes in the template

```typescript
it('should display user name', () => {
  component.userName = 'John Doe'
  fixture.detectChanges()

  const element = fixture.nativeElement.querySelector('.user-name')
  expect(element.textContent).toContain('John Doe')
})
```

#### DOM Interaction

- `fixture.nativeElement`: Access component's root element, use `querySelector`
  for children
- `fixture.debugElement`: Platform-safe abstraction, use
  `debugElement.query(By.css('.selector'))`

```typescript
it('should click button and trigger action', () => {
  const button = fixture.nativeElement.querySelector('button')
  button.click()
  fixture.detectChanges()

  expect(component.actionTriggered).toBe(true)
})
```

#### Components with Inputs and Outputs

**Inputs**: Assign values directly to component property and call
`detectChanges()`

```typescript
it('should accept input value', () => {
  component.userName = 'Test User'
  fixture.detectChanges()

  expect(component.userName).toBe('Test User')
})
```

**Outputs**: Subscribe to output (EventEmitter) and verify emission

```typescript
it('should emit event on click', () => {
  let emittedValue: string | undefined
  component.userSelected.subscribe((value: string) => {
    emittedValue = value
  })

  component.selectUser('John')

  expect(emittedValue).toBe('John')
})
```

### Testing Animations

Components using Angular animations require animation providers:

```typescript
import { provideNoopAnimations } from '@angular/platform-browser/animations'

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyAnimatedComponent],
    providers: [provideNoopAnimations()], // Required!
  }).compileComponents()
})
```

Without this provider, you'll get:
`NG05105: Unexpected synthetic listener @animation.start found`

## 7. Code Coverage and CI

### Generate Coverage Report

The project provides specific commands to run tests with coverage reporting:

- `npm run test:cov` - Run coverage for all domains sequentially, showing
  results per domain
- `npm run test:cov:l` - Run coverage for landing domain only
- `npm run test:cov:p` - Run coverage for platform domain only
- `npm run test:cov:t` - Run coverage for tenant domain only
- `npm run test:cov:lib` - Run coverage for core library only

Coverage reports are saved to `coverage/` directory with HTML, JSON, and LCOV
formats.

### Coverage Thresholds

The project targets >80% code coverage. Configure minimum thresholds in
`vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

### Continuous Integration

For CI environments, use appropriate flags:

```bash
npm run test:l -- --reporter=junit --outputFile=test-results.xml
# or
npx vitest run --reporter=junit --outputFile=test-results.xml
```

## 8. Test Scripts

The project provides domain-specific test scripts:

- `npm test` - Run all tests across all domains
- `npm run test:l` - Test Landing application only
- `npm run test:p` - Test Platform application only
- `npm run test:t` - Test Tenant application only
- `npm run test:core` - Test Core library only

**Coverage scripts:**

- `npm run test:cov` - Run coverage for all domains sequentially
- `npm run test:cov:l` - Run coverage for landing domain only
- `npm run test:cov:p` - Run coverage for platform domain only
- `npm run test:cov:t` - Run coverage for tenant domain only
- `npm run test:cov:lib` - Run coverage for core library only

## 9. Debugging Tests

### VS Code Debugging

1. Set breakpoints in your `.spec.ts` files
2. Create or update `.vscode/launch.json` with Vitest configuration:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug Current Test File",
         "type": "node",
         "request": "launch",
         "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
         "args": ["run", "${relativeFile}"],
         "console": "integratedTerminal",
         "internalConsoleOptions": "neverOpen"
       }
     ]
   }
   ```
3. Run tests in debug mode from VS Code debugger

### Console Logging

Use `console.log()` for quick debugging (remove before committing):

```typescript
it('should debug values', () => {
  console.log('Component state:', component.someValue)
  expect(component.someValue).toBe('expected')
})
```

### Filtering Tests

Run specific tests:

```bash
# Run tests matching pattern
npm run test:l -- --grep "should authenticate"

# Run only in specific file
npx vitest run src/test/components/auth/sign-in/sign-in.spec.ts
```

## 10. Common Errors and Solutions

### Error: `Cannot find module '@core'`

**Solution**: Ensure `nxViteTsPaths()` plugin is in `vitest.workspace.ts`

### Error: `$localize is not defined`

**Solution**: Import `test.ts` at the top of your spec file

### Error: `NG0201: No provider for HttpClient`

**Solution**: Add `provideHttpClient()` to TestBed providers

### Error: `NG05105: Unexpected synthetic listener @animation.start`

**Solution**: Add `provideNoopAnimations()` to TestBed providers

### Error: Test timeout with async operations

**Solution**: Use `async/await` with appropriate timeout for services with
artificial delays:

```typescript
it('should complete async operation', async () => {
  component.startAsyncTask()
  await new Promise((resolve) => setTimeout(resolve, 1100))
  expect(component.taskComplete).toBe(true)
})
```

For services without artificial delays, use Angular's `fakeAsync` and `tick()`:

```typescript
import { fakeAsync, tick } from '@angular/core/testing'

it('should complete async operation', fakeAsync(() => {
  component.startAsyncTask()
  tick() // Advance virtual time
  expect(component.taskComplete).toBe(true)
}))
```

## 11. Best Practices Summary

1. ✅ **Use real services** for authentication and business logic
2. ✅ **Mirror app structure** in test directory
3. ✅ **Import test.ts** in every spec file
4. ✅ **Use Vitest APIs** (vi.fn(), not jasmine)
5. ✅ **Provide animations** with provideNoopAnimations()
6. ✅ **Handle async** with async/await and timeouts
7. ✅ **Write in English** for test descriptions
8. ✅ **Keep coverage >80%** across all domains
9. ✅ **Avoid mocks** unless necessary for performance
10. ✅ **Test behavior**, not implementation details

## 12. Example: Complete Test File

```typescript
import '../../../test'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { provideHttpClient } from '@angular/common/http'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { vi } from 'vitest'
import { SignIn } from '../../../../app/components/auth/sign-in/sign-in'
import { SignInService } from '../../../../app/components/auth/sign-in/sign-in.service'

describe('SignIn', () => {
  let component: SignIn
  let fixture: ComponentFixture<SignIn>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideNoopAnimations(),
        SignInService, // Real service
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SignIn)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form with empty values', () => {
    expect(component.signInForm.get('email')?.value).toBe('')
    expect(component.signInForm.get('password')?.value).toBe('')
  })

  it('should validate required fields', () => {
    const emailControl = component.signInForm.get('email')
    emailControl?.setValue('')
    emailControl?.markAsTouched()
    expect(emailControl?.hasError('required')).toBe(true)
  })

  it('should submit form successfully with valid credentials', async () => {
    component.signInForm.get('email')?.setValue('admin@tenant.com')
    component.signInForm.get('password')?.setValue('admin123')
    const emitSpy = vi.spyOn(component.loginSuccess, 'emit')

    component.signInSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))

    expect(emitSpy).toHaveBeenCalled()
    expect(component.visible).toBe(false)
  })

  it('should handle login error with invalid credentials', async () => {
    component.signInForm.get('email')?.setValue('wrong@example.com')
    component.signInForm.get('password')?.setValue('wrongpassword')

    component.signInSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))

    expect(component.serverError()).toBeTruthy()
  })
})
```

---

**Note**: These instructions are subject to updates as the project evolves.
Always refer to the latest version in
`.github/instructions/testing.instructions.md`.
