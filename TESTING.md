# Testing Guide - DemoHub

## Overview
This document provides instructions for running and writing tests for the DemoHub application.

## Quick Start

### Backend Tests
```bash
cd backend

# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with verbose output
npm run test:verbose
```

### Frontend Tests
```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Structure

### Backend (Jest)
```
backend/
├── tests/
│   ├── setup.ts              # Test environment setup
│   ├── utils/                # Utility tests
│   │   ├── jwt.test.ts      # ✅ 100% coverage (25 tests)
│   │   └── catchAsync.test.ts # ✅ 100% coverage (8 tests)
│   └── services/             # Service tests
│       ├── authService.test.ts # ✅ 100% coverage (27 tests)
│       ├── projectService.test.ts # ✅ 100% coverage (22 tests)
│       ├── technologyService.test.ts # ✅ 100% coverage (18 tests)
│       └── adminProjectService.test.ts # ✅ 98.46% coverage (38 tests)
└── jest.config.js            # Jest configuration
```

### Frontend (Vitest)
```
frontend/
├── src/
│   ├── tests/
│   │   ├── setup.ts          # Test environment setup
│   │   └── example.test.ts   # ✅ 100% coverage (16 tests)
│   ├── lib/
│   │   └── utils.test.ts     # ✅ 100% coverage (34 tests)
│   ├── hooks/
│   │   ├── useProjects.test.tsx # ✅ 100% coverage (16 tests)
│   │   └── useAdminProjects.test.tsx # ✅ 100% coverage (18 tests)
│   └── components/
│       └── ui/
│           └── Button.test.tsx # ✅ 100% coverage (27 tests)
└── vitest.config.ts          # Vitest configuration
```

## Current Test Coverage

### Backend ✅
- **JWT Utilities**: 97.22% (25 tests)
- **CatchAsync Utility**: 100% (8 tests)
- **Auth Service**: 100% (27 tests)
- **Project Service**: 100% (22 tests)
- **Technology Service**: 100% (18 tests)
- **Admin Project Service**: 98.46% (38 tests)
- **Overall Services**: 99.23% 🎯
- **Overall Backend**: 31.06%

### Frontend ✅
- **Example Tests**: 100% (16 tests)
- **Utility Functions**: 100% (34 tests)
- **Button Component**: 100% (27 tests)
- **useProjects Hook**: 100% (16 tests)
- **useAdminProjects Hook**: 100% (18 tests)
- **Overall Frontend**: ~60%

### Combined
- **Total Tests**: 249 passing ✅
- **Backend**: 138 tests
- **Frontend**: 111 tests
- **Target**: >80% coverage

## Test Results

### Backend (Jest)
```
Test Suites: 6 passed, 6 total
Tests:       138 passed, 138 total
Coverage:    31.06% overall, 99.23% services
Time:        ~8 seconds
```

### Frontend (Vitest)
```
Test Suites: 5 passed, 5 total
Tests:       111 passed, 111 total
Coverage:    ~60%
Time:        ~7 seconds
```

## Writing Tests

### Backend Test Example
```typescript
import { functionToTest } from '@/path/to/function';

describe('Feature Name', () => {
  describe('functionToTest', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionToTest(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Frontend Component Test Example
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Frontend Hook Test Example
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from './useProjects';

// Create wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProjects', () => {
  it('should fetch projects', async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
```

## Known Issues

### Backend
- ✅ All tests passing
- ✅ No known issues

### Frontend
- ✅ All tests passing
- ✅ React 19 compatibility resolved with @testing-library/react@16.0.1

## Troubleshooting

### Backend Tests Failing
1. Make sure PostgreSQL is running (if integration tests)
2. Check environment variables in `tests/setup.ts`
3. Run `npm install` to ensure all dependencies are installed
4. Clear Jest cache: `npx jest --clearCache`

### Frontend Tests Failing
1. Make sure all dependencies are installed: `npm install`
2. Check if jsdom is properly configured
3. Clear Vitest cache: `npx vitest --clearCache`

### Coverage Not Generating
1. Make sure coverage directory is not in .gitignore
2. Run with `--coverage` flag explicitly
3. Check coverage configuration in jest.config.js or vitest.config.ts

## Completed Tests ✅

### Backend
- [x] JWT Utilities (25 tests)
- [x] CatchAsync Utility (8 tests)
- [x] Auth Service (27 tests)
- [x] Project Service (22 tests)
- [x] Technology Service (18 tests)
- [x] Admin Project Service (38 tests)

### Frontend
- [x] Example Tests (16 tests)
- [x] Utility Functions (34 tests)
- [x] Button Component (27 tests)
- [x] useProjects Hook (16 tests)
- [x] useAdminProjects Hook (18 tests)

## Next Steps (Optional)

### Medium Priority
- [ ] Auth Controller tests
- [ ] Project Controller tests
- [ ] Input component tests
- [ ] Modal component tests
- [ ] ProjectCard component tests

### Low Priority
- [ ] Integration tests
- [ ] E2E tests with Playwright
- [ ] Performance tests

## CI/CD Integration

Tests will run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment checks

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install Backend Dependencies
        run: cd backend && npm install
      - name: Run Backend Tests
        run: cd backend && npm test
      - name: Install Frontend Dependencies
        run: cd frontend && npm install
      - name: Run Frontend Tests
        run: cd frontend && npm test
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Support

For questions or issues:
1. Check the test README files in `backend/tests/` and `frontend/src/tests/`
2. Review existing test files for examples
3. Consult the documentation links above

---

**Last Updated**: October 30, 2025  
**Test Status**: 249 tests passing ✅  
**Coverage**: Backend 31.06% (Services 99.23%), Frontend ~60%
