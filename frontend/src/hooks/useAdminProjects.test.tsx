import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    useAdminProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
    useUploadImages,
    useDeleteImage,
} from './useAdminProjects';
import api from '@/lib/api';
import type { ReactNode } from 'react';

// Mock the API
vi.mock('@/lib/api');

// Helper to create a wrapper with QueryClient
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
            mutations: {
                retry: false,
            },
        },
    });

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useAdminProjects', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Suppress console.log in tests
        vi.spyOn(console, 'log').mockImplementation();
        vi.spyOn(console, 'error').mockImplementation();
    });

    it('should fetch all admin projects', async () => {
        const mockProjects = {
            data: {
                data: [
                    {
                        id: '1',
                        name: 'Project 1',
                        description: 'Description 1',
                        isPublished: true,
                        technologies: [],
                        images: [],
                    },
                    {
                        id: '2',
                        name: 'Project 2',
                        description: 'Description 2',
                        isPublished: false,
                        technologies: [],
                        images: [],
                    },
                ],
            },
        };

        vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

        const { result } = renderHook(() => useAdminProjects(), {
            wrapper: createWrapper(),
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockProjects.data.data);
        expect(result.current.data).toHaveLength(2);
        expect(api.get).toHaveBeenCalledWith('/admin/projects');
    });

    it('should handle API errors', async () => {
        const mockError = new Error('Unauthorized');
        vi.mocked(api.get).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useAdminProjects(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should return empty array when no projects exist', async () => {
        const mockProjects = {
            data: {
                data: [],
            },
        };

        vi.mocked(api.get).mockResolvedValueOnce(mockProjects);

        const { result } = renderHook(() => useAdminProjects(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual([]);
    });
});

describe('useCreateProject', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a new project', async () => {
        const mockProject = {
            data: {
                data: {
                    id: '1',
                    name: 'New Project',
                    description: 'New Description',
                    isPublished: true,
                    technologies: [],
                    images: [],
                },
            },
        };

        vi.mocked(api.post).mockResolvedValueOnce(mockProject);

        const { result } = renderHook(() => useCreateProject(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        formData.append('name', 'New Project');
        formData.append('description', 'New Description');

        result.current.mutate(formData);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockProject.data.data);
        expect(api.post).toHaveBeenCalledWith(
            '/admin/projects',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    });

    it('should handle creation errors', async () => {
        const mockError = new Error('Validation failed');
        vi.mocked(api.post).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useCreateProject(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        result.current.mutate(formData);

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should invalidate queries on success', async () => {
        const mockProject = {
            data: {
                data: { id: '1', name: 'New Project' },
            },
        };

        vi.mocked(api.post).mockResolvedValueOnce(mockProject);

        const queryClient = new QueryClient();
        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useCreateProject(), { wrapper });

        const formData = new FormData();
        result.current.mutate(formData);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['admin-projects'] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
    });
});

describe('useUpdateProject', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'log').mockImplementation();
        vi.spyOn(console, 'error').mockImplementation();
    });

    it('should update an existing project', async () => {
        const mockProject = {
            data: {
                data: {
                    id: '1',
                    name: 'Updated Project',
                    description: 'Updated Description',
                    isPublished: true,
                    technologies: [],
                    images: [],
                },
            },
        };

        vi.mocked(api.put).mockResolvedValueOnce(mockProject);

        const { result } = renderHook(() => useUpdateProject(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        formData.append('name', 'Updated Project');

        result.current.mutate({ id: '1', projectData: formData });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockProject.data.data);
        expect(api.put).toHaveBeenCalledWith(
            '/admin/projects/1',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    });

    it('should handle update errors', async () => {
        const mockError = new Error('Project not found');
        vi.mocked(api.put).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useUpdateProject(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        result.current.mutate({ id: 'non-existent', projectData: formData });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should clear cache and refetch on success', async () => {
        const mockProject = {
            data: {
                data: { id: '1', name: 'Updated Project' },
            },
        };

        vi.mocked(api.put).mockResolvedValueOnce(mockProject);

        const queryClient = new QueryClient();
        const removeSpy = vi.spyOn(queryClient, 'removeQueries');
        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useUpdateProject(), { wrapper });

        const formData = new FormData();
        result.current.mutate({ id: '1', projectData: formData });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(removeSpy).toHaveBeenCalledWith({ queryKey: ['admin-projects'] });
        expect(removeSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
        expect(invalidateSpy).toHaveBeenCalled();
    });
});

describe('useDeleteProject', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should delete a project', async () => {
        vi.mocked(api.delete).mockResolvedValueOnce({ data: { success: true } });

        const { result } = renderHook(() => useDeleteProject(), {
            wrapper: createWrapper(),
        });

        result.current.mutate('1');

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(api.delete).toHaveBeenCalledWith('/admin/projects/1');
    });

    it('should handle deletion errors', async () => {
        const mockError = new Error('Project not found');
        vi.mocked(api.delete).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useDeleteProject(), {
            wrapper: createWrapper(),
        });

        result.current.mutate('non-existent');

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should invalidate queries on success', async () => {
        vi.mocked(api.delete).mockResolvedValueOnce({ data: { success: true } });

        const queryClient = new QueryClient();
        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useDeleteProject(), { wrapper });

        result.current.mutate('1');

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['admin-projects'] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
    });
});

describe('useUploadImages', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should upload images to a project', async () => {
        const mockResponse = {
            data: {
                data: [
                    { id: 'img1', imageUrl: 'image1.jpg', displayOrder: 0 },
                    { id: 'img2', imageUrl: 'image2.jpg', displayOrder: 1 },
                ],
            },
        };

        vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

        const { result } = renderHook(() => useUploadImages(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        formData.append('images', new File([], 'image1.jpg'));

        result.current.mutate({ projectId: '1', images: formData });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockResponse.data.data);
        expect(api.post).toHaveBeenCalledWith(
            '/admin/projects/1/images',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    });

    it('should handle upload errors', async () => {
        const mockError = new Error('File too large');
        vi.mocked(api.post).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useUploadImages(), {
            wrapper: createWrapper(),
        });

        const formData = new FormData();
        result.current.mutate({ projectId: '1', images: formData });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should invalidate queries on success', async () => {
        const mockResponse = {
            data: {
                data: [{ id: 'img1', imageUrl: 'image1.jpg' }],
            },
        };

        vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

        const queryClient = new QueryClient();
        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useUploadImages(), { wrapper });

        const formData = new FormData();
        result.current.mutate({ projectId: '1', images: formData });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['admin-projects'] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
    });
});

describe('useDeleteImage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should delete an image from a project', async () => {
        vi.mocked(api.delete).mockResolvedValueOnce({ data: { success: true } });

        const { result } = renderHook(() => useDeleteImage(), {
            wrapper: createWrapper(),
        });

        result.current.mutate({ projectId: '1', imageId: 'img1' });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(api.delete).toHaveBeenCalledWith('/admin/projects/1/images/img1');
    });

    it('should handle deletion errors', async () => {
        const mockError = new Error('Image not found');
        vi.mocked(api.delete).mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useDeleteImage(), {
            wrapper: createWrapper(),
        });

        result.current.mutate({ projectId: '1', imageId: 'non-existent' });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });

    it('should invalidate queries on success', async () => {
        vi.mocked(api.delete).mockResolvedValueOnce({ data: { success: true } });

        const queryClient = new QueryClient();
        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useDeleteImage(), { wrapper });

        result.current.mutate({ projectId: '1', imageId: 'img1' });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['admin-projects'] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['projects'] });
    });
});
