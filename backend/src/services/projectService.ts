import prisma from '@/config/database';
import { Project, Technology, Contributor, ProjectImage } from '@prisma/client';

// Types for responses
export interface ProjectWithRelations extends Project {
  technologies: Technology[];
  contributors: Contributor[];
  images: ProjectImage[];
}

export interface PaginatedProjects {
  projects: ProjectWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all published projects with pagination and optional technology filter
 */
export const getAllProjects = async (
  page: number = 1,
  limit: number = 8,
  technologySlug?: string
): Promise<PaginatedProjects> => {
  // Calculate skip for pagination
  const skip = (page - 1) * limit;

  // Build where clause
  const whereClause: any = {
    isPublished: true,
    deletedAt: null,
  };

  // Add technology filter if provided
  if (technologySlug) {
    whereClause.technologies = {
      some: {
        technology: {
          slug: technologySlug,
        },
      },
    };
  }

  // Get total count for pagination
  const total = await prisma.project.count({
    where: whereClause,
  });

  // Get projects with relations
  const projects = await prisma.project.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
      contributors: {
        include: {
          contributor: true,
        },
      },
      images: {
        orderBy: {
          displayOrder: 'asc',
        },
      },
    },
  });

  // Transform data to flatten nested relations
  const transformedProjects: ProjectWithRelations[] = projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
    contributors: project.contributors.map((pc) => pc.contributor),
  }));

  return {
    projects: transformedProjects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single project by ID
 */
export const getProjectById = async (id: string): Promise<ProjectWithRelations | null> => {
  const project = await prisma.project.findFirst({
    where: {
      id,
      isPublished: true,
      deletedAt: null,
    },
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
      contributors: {
        include: {
          contributor: true,
        },
      },
      images: {
        orderBy: {
          displayOrder: 'asc',
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  // Transform data
  return {
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
    contributors: project.contributors.map((pc) => pc.contributor),
  };
};

/**
 * Get project statistics (for future use)
 */
export const getProjectStats = async () => {
  const totalPublished = await prisma.project.count({
    where: {
      isPublished: true,
      deletedAt: null,
    },
  });

  const totalDraft = await prisma.project.count({
    where: {
      isPublished: false,
      deletedAt: null,
    },
  });

  return {
    totalPublished,
    totalDraft,
    total: totalPublished + totalDraft,
  };
};

