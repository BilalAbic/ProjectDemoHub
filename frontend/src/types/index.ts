// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// ============================================
// Project Types
// ============================================

export interface Technology {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Contributor {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  publicId: string;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  technologies: Technology[];
  contributors: Contributor[];
  images: ProjectImage[];
}

export interface PaginatedProjects {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Admin Types
// ============================================

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  admin: Admin;
}

// ============================================
// Form Types
// ============================================

export interface ProjectFormData {
  name: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  demo_url?: string;
  github_url?: string;
  is_published: boolean;
  technologies: string[]; // Array of technology IDs
  contributors: string[]; // Array of contributor IDs
  images?: File[];
}

