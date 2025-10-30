import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { PaginatedProjects, Technology, ApiResponse } from '@/types';

export function useProjects(page: number = 1, limit: number = 8, technologyId?: string) {
  return useQuery({
    queryKey: ['projects', page, limit, technologyId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (technologyId && technologyId !== 'all') {
        params.append('technology', technologyId);
      }

      const { data } = await api.get<ApiResponse<PaginatedProjects>>(
        `/projects?${params.toString()}`
      );
      
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useTechnologies() {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Technology[]>>('/technologies');
      return data.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

