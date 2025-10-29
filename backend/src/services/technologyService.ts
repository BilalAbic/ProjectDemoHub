import prisma from '@/config/database';
import { Technology } from '@prisma/client';

/**
 * Get all technologies
 */
export const getAllTechnologies = async (): Promise<Technology[]> => {
  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return technologies;
};

/**
 * Get technology by slug
 */
export const getTechnologyBySlug = async (slug: string): Promise<Technology | null> => {
  const technology = await prisma.technology.findUnique({
    where: {
      slug,
    },
  });

  return technology;
};

/**
 * Get technologies with project count (for future use)
 */
export const getTechnologiesWithCount = async () => {
  const technologies = await prisma.technology.findMany({
    include: {
      _count: {
        select: {
          projects: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return technologies.map((tech) => ({
    id: tech.id,
    name: tech.name,
    slug: tech.slug,
    projectCount: tech._count.projects,
  }));
};

