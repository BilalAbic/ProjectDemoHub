# Frontend Tests

## Overview
This directory contains all frontend tests for the DemoHub application.

## Test Structure
```
src/
├── tests/
│   ├── setup.ts              # Test environment setup
│   ├── example.test.ts       # Example tests
│   └── README.md             # This file
├── lib/
│   └── utils.test.ts         # Utility function tests
├── hooks/
│   ├── useProjects.test.tsx  # Public hooks tests
│   └── useAdminProjects.test.tsx # Admin hooks tests
└── components/
    └── ui/
        └── Button.test.tsx   # Button component tests
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage Goals
- **Target**: >80% code coverage
- **Current**: ~60%

## Writing Tests

### Test File Naming
- Unit tests: `*.test.ts` or `*.test.tsx`
- Component tests: `ComponentName.test.tsx`
- Hook tests: `hookName.test.tsx`

### Component Test Structure
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

### Hook Test Structure
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from './useProjects';

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

## Test Results

```bash
Test Files: 5 passed (5)
Tests:      111 passed (111)
Coverage:   ~60%
Time:       ~7 seconds
```

## Completed Tests

### ✅ Example Tests (`tests/example.test.ts`)
- Math operations
- String operations
- Array operations
- Object operations
- Boolean logic
- **Tests**: 16
- **Coverage**: 100%

### ✅ Utility Functions (`lib/utils.test.ts`)
- formatDate
- truncateString
- getInitials
- isValidUrl
- debounce
- generateId
- capitalize
- isEmpty
- **Tests**: 34
- **Coverage**: 100%

### ✅ Button Component (`components/ui/Button.test.tsx`)
- All variants (primary, secondary, danger, ghost)
- All sizes (sm, md, lg)
- Full width mode
- Icon positioning
- Disabled state
- Click events
- Accessibility
- **Tests**: 27
- **Coverage**: 100%

### ✅ useProjects Hook (`hooks/useProjects.test.tsx`)
- useProjects with pagination
- Technology filtering
- useProject single fetch
- useTechnologies caching
- Query key validation
- Error handling
- **Tests**: 16
- **Coverage**: 100%

### ✅ useAdminProjects Hook (`hooks/useAdminProjects.test.tsx`)
- useAdminProjects fetch
- useCreateProject mutation
- useUpdateProject with cache
- useDeleteProject cleanup
- useUploadImages multipart
- useDeleteImage invalidation
- **Tests**: 18
- **Coverage**: 100%

## TODO Tests

### High Priority
- [x] useProjects hook tests ✅
- [x] useAdminProjects hook tests ✅
- [ ] Input component tests (optional)
- [ ] Modal component tests (optional)

### Medium Priority
- [ ] ProjectCard component tests (optional)
- [ ] Navbar component tests (optional)
- [ ] useAuth hook tests (optional)

### Low Priority
- [ ] Integration tests
- [ ] E2E tests with Playwright

## Test Environment
- **Framework**: Vitest
- **React Testing**: @testing-library/react
- **Environment**: jsdom
- **Coverage**: v8

## Mocking
- Console methods are mocked to reduce noise
- IntersectionObserver is mocked for components
- Window.matchMedia is mocked for responsive tests
- API calls are mocked with vi.mock

## Best Practices
1. Test user behavior, not implementation
2. Use semantic queries (getByRole, getByLabelText)
3. Avoid testing internal state
4. Mock external dependencies
5. Keep tests simple and focused

## CI/CD Integration
Tests will run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment checks
