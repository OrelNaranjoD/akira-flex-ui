# Changelog

All notable changes to the AkiraFlex UI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Angular 20+ project setup with standalone components
- Tailwind CSS 4.x integration for modern utility-first styling
- Font Awesome integration with Angular FontAwesome library
- Comprehensive ESLint configuration with JSDoc validation
- Prettier integration for consistent code formatting
- Husky and lint-staged for pre-commit quality gates
- Commitlint for conventional commit message validation
- GitHub Actions workflow for CI/CD automation
- Unit testing setup with Jasmine and Karma
- Coverage reporting for test quality metrics

### Changed

- Migrated from default Angular README to comprehensive project documentation
- Updated build verification to handle Angular 20+ output structure (browser/
  subdirectory)
- Enhanced GitHub Actions workflow with proper artifact verification

### Fixed

- Resolved Yarn PnP vs npm conflicts by migrating to pure npm setup
- Fixed build artifact verification for Angular 20+ structure
- Corrected commitlint configuration to handle automated release commits

## [0.0.2] - 2025-09-03

### Added

- Project documentation improvements
- Enhanced build verification process

### Fixed

- Build artifact verification issues in CI/CD pipeline
- Commitlint configuration for automated releases

## [0.0.1] - 2025-09-03

### Added

- Initial release with basic Angular setup
- Core project structure and dependencies
- Basic routing and component architecture
- Development and build scripts

---

## Release Types

- **patch**: Bug fixes, documentation updates, internal improvements
- **minor**: New features, component additions, API enhancements (backward
  compatible)
- **major**: Breaking changes, major architectural updates, incompatible API
  changes

## Commit Convention

This project follows
[Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `docs(scope): description` - Documentation changes
- `style(scope): description` - Code style changes (formatting, etc.)
- `refactor(scope): description` - Code refactoring
- `test(scope): description` - Test additions or modifications
- `chore(scope): description` - Build process, tooling changes
- `perf(scope): description` - Performance improvements

Each commit should include a task identifier (e.g., AFU-101) in the scope or
description.

## Migration Notes

### From 0.0.1 to 0.0.2

- No breaking changes
- Enhanced documentation and build processes
- Improved development workflow with quality gates

---

**Note**: This changelog is automatically updated as part of the release
process. Manual entries may be added for significant architectural decisions or
migration notes.
