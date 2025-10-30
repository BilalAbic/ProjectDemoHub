import { prisma } from '@/config/database';
import { deleteImages } from '@/utils/imageUpload';

/**
 * Get all projects (including unpublished) for admin
 */
export const getAllProjectsAdmin = async () => {
  const projects = await prisma.project.findMany({
    include: {
      technologies: { include: { technology: true } },
      contributors: { include: { contributor: true } },
      images: { orderBy: { displayOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Transform to flatten nested relations
  return projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
    contributors: project.contributors.map((pc) => pc.contributor),
  }));
};

/**
 * Create new project
 */
export const createProject = async (data: {
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  isPublished: boolean;
  technologyIds: string[]; // Array of technology IDs
  contributorIds: string[]; // Array of contributor IDs
  images?: Array<{
    imageUrl: string;
    publicId: string;
    displayOrder: number;
  }>;
}) => {
  // Create project with relations
  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      isPublished: data.isPublished,
      // Connect technologies
      technologies: {
        create: data.technologyIds.map((techId) => ({
          technology: { connect: { id: techId } },
        })),
      },
      // Connect contributors
      contributors: {
        create: data.contributorIds.map((contrId) => ({
          contributor: { connect: { id: contrId } },
        })),
      },
      // Create images if provided
      images: data.images && data.images.length > 0
        ? {
            create: data.images.map((img, index) => ({
              imageUrl: img.imageUrl,
              publicId: img.publicId,
              displayOrder: img.displayOrder || index,
              isPrimary: index === 0, // First image is primary
            })),
          }
        : undefined,
    },
    include: {
      technologies: { include: { technology: true } },
      contributors: { include: { contributor: true } },
      images: { orderBy: { displayOrder: 'asc' } },
    },
  });

  // Transform to flatten nested relations
  return {
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
    contributors: project.contributors.map((pc) => pc.contributor),
  };
};

/**
 * Update project
 */
export const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date | null;
    demoUrl?: string | null;
    githubUrl?: string | null;
    isPublished?: boolean;
    technologies?: string[]; // Array of technology IDs
    contributors?: string[]; // Array of contributor IDs
  }
) => {
  // If technologies are provided, delete old ones and create new
  const techUpdate = data.technologies
    ? {
        deleteMany: {},
        create: data.technologies.map((techId) => ({
          technology: { connect: { id: techId } },
        })),
      }
    : undefined;

  // If contributors are provided, delete old ones and create new
  const contribUpdate = data.contributors
    ? {
        deleteMany: {},
        create: data.contributors.map((contrId) => ({
          contributor: { connect: { id: contrId } },
        })),
      }
    : undefined;

  const project = await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      isPublished: data.isPublished,
      technologies: techUpdate,
      contributors: contribUpdate,
    },
    include: {
      technologies: { include: { technology: true } },
      contributors: { include: { contributor: true } },
      images: { orderBy: { displayOrder: 'asc' } },
    },
  });

  // Transform to flatten nested relations
  return {
    ...project,
    technologies: project.technologies.map((pt) => pt.technology),
    contributors: project.contributors.map((pc) => pc.contributor),
  };
};

/**
 * Delete project (hard delete with cascade)
 */
export const deleteProject = async (id: string) => {
  // Get project with images to delete from Cloudinary
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  // Delete images from Cloudinary
  if (project.images.length > 0) {
    const publicIds = project.images.map((img) => img.publicId);
    await deleteImages(publicIds);
  }

  // Delete project (will cascade delete relations)
  await prisma.project.delete({
    where: { id },
  });

  return { message: 'Project deleted successfully' };
};

/**
 * Upload project image
 */
export const addProjectImage = async (
  projectId: string,
  imageData: {
    imageUrl: string;
    publicId: string;
  }
) => {
  // Get current max displayOrder
  const images = await prisma.projectImage.findMany({
    where: { projectId },
    orderBy: { displayOrder: 'desc' },
    take: 1,
  });

  const nextOrder = images.length > 0 ? images[0].displayOrder + 1 : 0;

  const image = await prisma.projectImage.create({
    data: {
      projectId,
      imageUrl: imageData.imageUrl,
      publicId: imageData.publicId,
      displayOrder: nextOrder,
    },
  });

  return image;
};

/**
 * Delete project image
 */
export const deleteProjectImage = async (imageId: string) => {
  const image = await prisma.projectImage.findUnique({
    where: { id: imageId },
  });

  if (!image) {
    throw new Error('Image not found');
  }

  // Delete from Cloudinary
  await deleteImages([image.publicId]);

  // Delete from database
  await prisma.projectImage.delete({
    where: { id: imageId },
  });

  return { message: 'Image deleted successfully' };
};

/**
 * Reorder project images
 */
export const reorderProjectImages = async (
  projectId: string,
  imageOrders: Array<{ id: string; displayOrder: number }>
) => {
  // Update each image's displayOrder
  await Promise.all(
    imageOrders.map((item) =>
      prisma.projectImage.updateMany({
        where: { id: item.id, projectId },
        data: { displayOrder: item.displayOrder },
      })
    )
  );

  // Return updated images
  const images = await prisma.projectImage.findMany({
    where: { projectId },
    orderBy: { displayOrder: 'asc' },
  });

  return images;
};
