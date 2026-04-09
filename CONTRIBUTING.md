# Contributing to Live Character Guide

Thank you for your interest in contributing to the Live Character Guide! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please be considerate of others and follow standard open-source community guidelines.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or pnpm
- Git

### Local Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/live-char-guide.git
cd live-char-guide

# Add upstream remote
git remote add upstream https://github.com/vudirvp-sketch/live-char-guide.git

# Install dependencies
npm install

# Run initial build
npm run build:all

# Verify setup
npm run validate
npm test
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-bugfix
# or
git checkout -b docs/my-documentation
```

### 2. Make Changes

- Edit files in `src/parts/` for content changes
- Edit files in `src/assets/` for client-side scripts
- Edit files in `src/scripts/` for build logic
- Edit files in `scripts/` for validation/testing

### 3. Test Your Changes

```bash
# Build artifacts
npm run build:all

# Validate artifacts
npm run validate

# Run tests
npm test

# Run accessibility tests (requires running server)
npm run serve &
npm run test:a11y
```

### 4. Commit Your Changes

Pre-commit hooks will automatically:
1. Format your code with Prettier
2. Build both artifacts
3. Run validation

```bash
git add .
git commit -m "feat: add new section for advanced prompts"
```

#### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub.

## Pull Request Process

1. **Fill out the PR template** - Describe your changes and link any related issues
2. **Ensure CI passes** - All tests and validations must pass
3. **Request review** - Maintainers will review your PR
4. **Address feedback** - Make requested changes
5. **Squash and merge** - A maintainer will merge your PR

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] Commit messages follow convention
- [ ] PR description is complete

## Coding Standards

### HTML

- Use semantic HTML elements
- Include proper `id` attributes for anchor navigation
- Maintain accessibility (ARIA attributes, labels)
- Follow existing indentation (2 spaces)

### CSS

- Use BEM naming convention where appropriate
- Keep styles organized by component
- Minimize specificity conflicts
- Test responsive layouts

### JavaScript

- Use ES modules (import/export)
- Use async/await for async operations
- Include JSDoc comments for functions
- Handle errors gracefully

### Build Scripts

- Use ES modules (.mjs extension)
- Include proper error handling
- Log progress and errors clearly
- Return meaningful exit codes

## Testing

### Unit Tests

Place unit tests in `tests/` directory:

```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('My Feature', () => {
  it('should do something', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
```

### Integration Tests

Place integration tests in `tests/integration/`:

```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'child_process';

describe('Integration Test', () => {
  it('should run full pipeline', () => {
    execSync('npm run build:all', { stdio: 'inherit' });
    assert.ok(true);
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Watch mode
node --test --watch tests/*.mjs
```

## Documentation

### README Updates

When adding new features:
1. Update relevant sections in README.md
2. Add any new build commands
3. Update project structure if adding files

### JSDoc Comments

Document all exported functions:

```javascript
/**
 * Validates an HTML anchor element
 * @param {string} content - HTML content to search
 * @param {string} anchorId - ID of the anchor to find
 * @returns {boolean} True if anchor exists
 */
function hasAnchor(content, anchorId) {
  return new RegExp(`id="${anchorId}"`).test(content);
}
```

### CHANGELOG

Add entries to CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

### Added
- New feature description

### Fixed
- Bug fix description
```

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Use the issue templates provided

Thank you for contributing!
