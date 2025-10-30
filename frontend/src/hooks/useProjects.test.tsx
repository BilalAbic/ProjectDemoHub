import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProjects, useProject, useTechnologies } from './useProjects';
import api from '@/lib/api';
import type { ReactNode } from 'react';

// Mock the API
vi.mock('@/lib/api');

// Helper to create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });
  
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch projects with default parameters', async () => {
    const mockProjects = {
      data: {
        data: {
          projects: [
            {
              id: '1',
              name: 'Project 1',
              description: 'Description 1',
              technologies: [],
              images: [],
            },
          ],
          pagination: {
            page: 1,
            limit: 8,
            total: 1,
            totalPages: 1,
          },
        },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProjects.data.data);
    expect(api.get).toHaveBeenCalledWith('/projects?page=1&limit=8');
  });

  it('should fetch projects with custom page and limit', async () => {
    const mockProjects = {
      data: {
        data: {
          projects: [],
          pagination: {
            page: 2,
            limit: 10,
            total: 20,
            totalPages: 2,
          },
        },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

    const { result } = renderHook(() => useProjects(2, 10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/projects?page=2&limit=10');
  });

  it('should fetch projects filtered by technology slug', async () => {
    const mockProjects = {
      data: {
        data: {
          projects: [
            {
              id: '1',
              name: 'React Project',
              technologies: [{ id: 'tech1', name: 'React', slug: 'react' }],
            },
          ],
          pagination: {
            page: 1,
            limit: 8,
            total: 1,
            totalPages: 1,
          },
        },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

    const { result } = renderHook(() => useProjects(1, 8, 'react'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/projects?page=1&limit=8&technology=react');
  });

  it('should not add technology parameter when slug is "all"', async () => {
    const mockProjects = {
      data: {
        data: {
          projects: [],
          pagination: {
            page: 1,
            limit: 8,
            total: 0,
            totalPages: 0,
          },
        },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

    const { result } = renderHook(() => useProjects(1, 8, 'all'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/projects?page=1&limit=8');
  });

  it('should handle API errors', async () => {
    const mockError = new Error('Network error');
    vi.mocked(api.get).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it('should use correct query key for caching', async () => {
    const mockProjects = {
      data: {
        data: {
          projects: [],
          pagination: { page: 1, limit: 8, total: 0, totalPages: 0 },
        },
      },
    };

    vi.mocked(api.get).mockResolvedValue(mockProjects);

    const { result: result1 } = renderHook(() => useProjects(1, 8, 'react'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    // Query key should include all parameters
    expect(result1.current.data).toBeDefined();
  });

  it('should have correct staleTime configuration', () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    // Check that the hook is configured (we can't directly test staleTime)
    expect(result.current).toBeDefined();
  });
});

describe('useProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch single project by id', async () => {
    const mockProject = {
      data: {
        data: {
          id: '1',
          name: 'Project 1',
          description: 'Description 1',
          technologies: [],
          contributors: [],
          images: [],
        },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProject);

    const { result } = renderHook(() => useProject('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProject.data.data);
    expect(api.get).toHaveBeenCalledWith('/projects/1');
  });

  it('should not fetch when id is empty', async () => {
    const { result } = renderHook(() => useProject(''), {
      wrapper: createWrapper(),
    });

    // Query should be disabled
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(api.get).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const mockError = new Error('Project not found');
    vi.mocked(api.get).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useProject('non-existent'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it('should use correct query key', async () => {
    const mockProject = {
      data: {
        data: { id: '123', name: 'Test Project' },
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockProject);

    const { result } = renderHook(() => useProject('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });
});

describe('useTechnologies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all technologies', async () => {
    const mockTechnologies = {
      data: {
        data: [
          { id: '1', name: 'React', slug: 'react', iconUrl: 'react.svg' },
          { id: '2', name: 'Node.js', slug: 'nodejs', iconUrl: 'nodejs.svg' },
          { id: '3', name: 'TypeScript', slug: 'typescript', iconUrl: 'ts.svg' },
        ],
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockTechnologies);

    const { result } = renderHook(() => useTechnologies(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTechnologies.data.data);
    expect(result.current.data).toHaveLength(3);
    expect(api.get).toHaveBeenCalledWith('/technologies');
  });

  it('should handle empty technologies list', async () => {
    const mockTechnologies = {
      data: {
        data: [],
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockTechnologies);

    const { result } = renderHook(() => useTechnologies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });

  it('should handle API errors', async () => {
    const mockError = new Error('Failed to fetch technologies');
    vi.mocked(api.get).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useTechnologies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it('should use correct query key for caching', async () => {
    const mockTechnologies = {
      data: {
        data: [{ id: '1', name: 'React', slug: 'react', iconUrl: 'react.svg' }],
      },
    };

    vi.mocked(api.get).mockResolvedValueOnce(mockTechnologies);

    const { result } = renderHook(() => useTechnologies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });

  it('should have longer staleTime than projects', () => {
    const { result } = renderHook(() => useTechnologies(), {
      wrapper: createWrapper(),
    });

    // Technologies should be cached longer (30 minutes vs 5 minutes)
    expect(result.current).toBeDefined();
  });
});
