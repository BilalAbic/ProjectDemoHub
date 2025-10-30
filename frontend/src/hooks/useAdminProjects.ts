import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Project, ApiResponse } from '@/types';

// Get all projects (admin - includes unpublished)
export function useAdminProjects() {
  return useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Project[]>>('/admin/projects');
      return data.data;
    },
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData: FormData) => {
      const { data } = await api.post<ApiResponse<Project>>('/admin/projects', projectData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, projectData }: { id: string; projectData: FormData }) => {
      const { data } = await api.put<ApiResponse<Project>>(`/admin/projects/${id}`, projectData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      // Aggressively invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['admin-projects'], refetchType: 'active' });
      queryClient.invalidateQueries({ queryKey: ['projects'], refetchType: 'active' });
      
      // Also refetch immediately
      queryClient.refetchQueries({ queryKey: ['admin-projects'] });
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Upload images
export function useUploadImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, images }: { projectId: string; images: FormData }) => {
      const { data } = await api.post(`/admin/projects/${projectId}/images`, images, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Delete image
export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, imageId }: { projectId: string; imageId: string }) => {
      await api.delete(`/admin/projects/${projectId}/images/${imageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

