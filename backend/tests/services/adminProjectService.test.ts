import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  addProjectImage,
  deleteProjectImage,
  reorderProjectImages,
} from '@/services/adminProjectService';
import { prisma } from '@/config/database';
import { deleteImages } from '@/utils/imageUpload';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { expect } from 'chai';
import { expect } from 'chai';
import { expect } from 'chai';
import { it } from 'node:test';
import { describe } from 'node:test';
import { afterEach } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock Prisma and utilities
jest.mock('@/config/database', () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    projectImage: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

jest.mock('@/utils/imageUpload', () => ({
  deleteImages: jest.fn(),
}));

describe('Admin Project Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.log in tests
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllProjectsAdmin', () => {
    const mockProjects = [
      {
        id: '1',
        name: 'Project 1',
        description: 'Description 1',
        startDate: new Date('2024-01-01'),
        endDate: null,
        demoUrl: 'https://demo1.com',
        githubUrl: 'https://github.com/user/project1',
        isPublished: true,
        deletedAt: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        technologies: [
          {
            technology: {
              id: 'tech1',
              name: 'React',
              slug: 'react',
              iconUrl: 'react.svg',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ],
        contributors: [
          {
            contributor: {
              id: 'cont1',
              name: 'John Doe',
              role: 'Developer',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ],
        images: [
          {
            id: 'img1',
            projectId: '1',
            imageUrl: 'image1.jpg',
            publicId: 'public1',
            displayOrder: 0,
            isPrimary: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    it('should return all projects including unpublished', async () => {
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getAllProjectsAdmin();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        include: {
          technologies: { include: { technology: true } },
          contributors: { include: { contributor: true } },
          images: { orderBy: { displayOrder: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should transform nested relations to flat structure', async () => {
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getAllProjectsAdmin();

      expect(result[0].technologies).toEqual([
        {
          id: 'tech1',
          name: 'React',
          slug: 'react',
          iconUrl: 'react.svg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
      expect(result[0].contributors).toEqual([
        {
          id: 'cont1',
          name: 'John Doe',
          role: 'Developer',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });

    it('should order projects by createdAt desc', async () => {
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      await getAllProjectsAdmin();

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        })
      );
    });

    it('should return empty array when no projects exist', async () => {
      (prisma.project.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAllProjectsAdmin();

      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.project.findMany as jest.Mock).mockRejectedValue(dbError);

      await expect(getAllProjectsAdmin()).rejects.toThrow('Database connection failed');
    });
  });

  describe('createProject', () => {
    const mockCreatedProject = {
      id: '1',
      name: 'New Project',
      description: 'New Description',
      startDate: new Date('2024-01-01'),
      endDate: null,
      demoUrl: 'https://demo.com',
      githubUrl: 'https://github.com/user/project',
      isPublished: true,
      deletedAt: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      technologies: [
        {
          technology: {
            id: 'tech1',
            name: 'React',
            slug: 'react',
            iconUrl: 'react.svg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
      contributors: [
        {
          contributor: {
            id: 'cont1',
            name: 'John Doe',
            role: 'Developer',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
      images: [
        {
          id: 'img1',
          projectId: '1',
          imageUrl: 'image1.jpg',
          publicId: 'public1',
          displayOrder: 0,
          isPrimary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    it('should create project with all fields', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'New Project',
        description: 'New Description',
        startDate: new Date('2024-01-01'),
        endDate: null,
        demoUrl: 'https://demo.com',
        githubUrl: 'https://github.com/user/project',
        isPublished: true,
        technologyIds: ['tech1'],
        contributorIds: ['cont1'],
        images: [
          {
            imageUrl: 'image1.jpg',
            publicId: 'public1',
            displayOrder: 0,
          },
        ],
      };

      const result = await createProject(projectData);

      expect(result.id).toBe('1');
      expect(result.name).toBe('New Project');
      expect(prisma.project.create).toHaveBeenCalled();
    });

    it('should create project without optional fields', async () => {
      const minimalProject = { ...mockCreatedProject, endDate: null, demoUrl: null, githubUrl: null };
      (prisma.project.create as jest.Mock).mockResolvedValue(minimalProject);

      const projectData = {
        name: 'Minimal Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: false,
        technologyIds: ['tech1'],
        contributorIds: [],
      };

      const result = await createProject(projectData);

      expect(result).toBeDefined();
      expect(result.name).toBe('New Project');
    });

    it('should connect technologies correctly', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: ['tech1', 'tech2'],
        contributorIds: [],
      };

      await createProject(projectData);

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            technologies: {
              create: [
                { technology: { connect: { id: 'tech1' } } },
                { technology: { connect: { id: 'tech2' } } },
              ],
            },
          }),
        })
      );
    });

    it('should connect contributors correctly', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: [],
        contributorIds: ['cont1', 'cont2'],
      };

      await createProject(projectData);

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            contributors: {
              create: [
                { contributor: { connect: { id: 'cont1' } } },
                { contributor: { connect: { id: 'cont2' } } },
              ],
            },
          }),
        })
      );
    });

    it('should create images with correct display order', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: ['tech1'],
        contributorIds: [],
        images: [
          { imageUrl: 'img1.jpg', publicId: 'pub1', displayOrder: 0 },
          { imageUrl: 'img2.jpg', publicId: 'pub2', displayOrder: 1 },
        ],
      };

      await createProject(projectData);

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            images: {
              create: expect.arrayContaining([
                expect.objectContaining({ displayOrder: 0, isPrimary: true }),
                expect.objectContaining({ displayOrder: 1, isPrimary: false }),
              ]),
            },
          }),
        })
      );
    });

    it('should set first image as primary', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: [],
        contributorIds: [],
        images: [
          { imageUrl: 'img1.jpg', publicId: 'pub1', displayOrder: 0 },
        ],
      };

      await createProject(projectData);

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            images: {
              create: expect.arrayContaining([
                expect.objectContaining({ isPrimary: true }),
              ]),
            },
          }),
        })
      );
    });

    it('should transform nested relations in response', async () => {
      (prisma.project.create as jest.Mock).mockResolvedValue(mockCreatedProject);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: ['tech1'],
        contributorIds: ['cont1'],
      };

      const result = await createProject(projectData);

      expect(result.technologies).toEqual([
        {
          id: 'tech1',
          name: 'React',
          slug: 'react',
          iconUrl: 'react.svg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database constraint violation');
      (prisma.project.create as jest.Mock).mockRejectedValue(dbError);

      const projectData = {
        name: 'Project',
        description: 'Description',
        startDate: new Date('2024-01-01'),
        isPublished: true,
        technologyIds: [],
        contributorIds: [],
      };

      await expect(createProject(projectData)).rejects.toThrow('Database constraint violation');
    });
  });

  describe('updateProject', () => {
    const mockUpdatedProject = {
      id: '1',
      name: 'Updated Project',
      description: 'Updated Description',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      demoUrl: 'https://updated-demo.com',
      githubUrl: 'https://github.com/user/updated',
      isPublished: true,
      deletedAt: null,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-02-01'),
      technologies: [
        {
          technology: {
            id: 'tech2',
            name: 'Vue.js',
            slug: 'vuejs',
            iconUrl: 'vue.svg',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
      contributors: [],
      images: [],
    };

    it('should update project with all fields', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        name: 'Updated Project',
        description: 'Updated Description',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        demoUrl: 'https://updated-demo.com',
        githubUrl: 'https://github.com/user/updated',
        isPublished: true,
        technologies: ['tech2'],
        contributors: [],
      };

      const result = await updateProject('1', updateData);

      expect(result.name).toBe('Updated Project');
      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: '1' },
        })
      );
    });

    it('should update only provided fields', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        name: 'New Name',
      };

      await updateProject('1', updateData);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'New Name',
          }),
        })
      );
    });

    it('should replace technologies when provided', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        technologies: ['tech1', 'tech2', 'tech3'],
      };

      await updateProject('1', updateData);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            technologies: {
              deleteMany: {},
              create: [
                { technology: { connect: { id: 'tech1' } } },
                { technology: { connect: { id: 'tech2' } } },
                { technology: { connect: { id: 'tech3' } } },
              ],
            },
          }),
        })
      );
    });

    it('should replace contributors when provided', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        contributors: ['cont1', 'cont2'],
      };

      await updateProject('1', updateData);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            contributors: {
              deleteMany: {},
              create: [
                { contributor: { connect: { id: 'cont1' } } },
                { contributor: { connect: { id: 'cont2' } } },
              ],
            },
          }),
        })
      );
    });

    it('should not update technologies if not provided', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        name: 'Updated Name',
      };

      await updateProject('1', updateData);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            technologies: undefined,
          }),
        })
      );
    });

    it('should clear optional fields with null', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const updateData = {
        endDate: null,
        demoUrl: null,
        githubUrl: null,
      };

      await updateProject('1', updateData);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            endDate: null,
            demoUrl: null,
            githubUrl: null,
          }),
        })
      );
    });

    it('should transform nested relations in response', async () => {
      (prisma.project.update as jest.Mock).mockResolvedValue(mockUpdatedProject);

      const result = await updateProject('1', { name: 'Test' });

      expect(result.technologies).toEqual([
        {
          id: 'tech2',
          name: 'Vue.js',
          slug: 'vuejs',
          iconUrl: 'vue.svg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Project not found');
      (prisma.project.update as jest.Mock).mockRejectedValue(dbError);

      await expect(updateProject('non-existent', { name: 'Test' })).rejects.toThrow('Project not found');
    });
  });

  describe('deleteProject', () => {
    const mockProject = {
      id: '1',
      name: 'Project to Delete',
      images: [
        { id: 'img1', publicId: 'public1', imageUrl: 'img1.jpg' },
        { id: 'img2', publicId: 'public2', imageUrl: 'img2.jpg' },
      ],
    };

    it('should delete project and its images from Cloudinary', async () => {
      (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);
      (prisma.project.delete as jest.Mock).mockResolvedValue(mockProject);
      (deleteImages as jest.Mock).mockResolvedValue(undefined);

      const result = await deleteProject('1');

      expect(result.message).toBe('Project deleted successfully');
      expect(deleteImages).toHaveBeenCalledWith(['public1', 'public2']);
      expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw error if project not found', async () => {
      (prisma.project.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(deleteProject('non-existent')).rejects.toThrow('Project not found');
      expect(deleteImages).not.toHaveBeenCalled();
      expect(prisma.project.delete).not.toHaveBeenCalled();
    });

    it('should delete project without images', async () => {
      const projectWithoutImages = { ...mockProject, images: [] };
      (prisma.project.findUnique as jest.Mock).mockResolvedValue(projectWithoutImages);
      (prisma.project.delete as jest.Mock).mockResolvedValue(projectWithoutImages);

      const result = await deleteProject('1');

      expect(result.message).toBe('Project deleted successfully');
      expect(deleteImages).not.toHaveBeenCalled();
      expect(prisma.project.delete).toHaveBeenCalled();
    });

    it('should handle Cloudinary deletion errors', async () => {
      (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);
      (deleteImages as jest.Mock).mockRejectedValue(new Error('Cloudinary error'));

      await expect(deleteProject('1')).rejects.toThrow('Cloudinary error');
      expect(prisma.project.delete).not.toHaveBeenCalled();
    });

    it('should handle database deletion errors', async () => {
      (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);
      (deleteImages as jest.Mock).mockResolvedValue(undefined);
      (prisma.project.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(deleteProject('1')).rejects.toThrow('Database error');
    });
  });

  describe('addProjectImage', () => {
    it('should add image with correct display order', async () => {
      // findMany with take: 1 returns only the last image
      const lastImage = [
        { id: 'img2', displayOrder: 1 },
      ];
      const newImage = {
        id: 'img3',
        projectId: 'project1',
        imageUrl: 'new-image.jpg',
        publicId: 'new-public-id',
        displayOrder: 2,
        isPrimary: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue(lastImage);
      (prisma.projectImage.create as jest.Mock).mockResolvedValue(newImage);

      const result = await addProjectImage('project1', {
        imageUrl: 'new-image.jpg',
        publicId: 'new-public-id',
      });

      expect(result.displayOrder).toBe(2);
      expect(prisma.projectImage.create).toHaveBeenCalledWith({
        data: {
          projectId: 'project1',
          imageUrl: 'new-image.jpg',
          publicId: 'new-public-id',
          displayOrder: 2, // images[0].displayOrder (1) + 1 = 2
        },
      });
    });

    it('should add first image with order 0', async () => {
      const newImage = {
        id: 'img1',
        projectId: 'project1',
        imageUrl: 'first-image.jpg',
        publicId: 'first-public-id',
        displayOrder: 0,
        isPrimary: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.projectImage.create as jest.Mock).mockResolvedValue(newImage);

      const result = await addProjectImage('project1', {
        imageUrl: 'first-image.jpg',
        publicId: 'first-public-id',
      });

      expect(result.displayOrder).toBe(0);
    });

    it('should handle database errors', async () => {
      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.projectImage.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        addProjectImage('project1', {
          imageUrl: 'image.jpg',
          publicId: 'public-id',
        })
      ).rejects.toThrow('Database error');
    });
  });

  describe('deleteProjectImage', () => {
    const mockImage = {
      id: 'img1',
      projectId: 'project1',
      imageUrl: 'image.jpg',
      publicId: 'public-id',
      displayOrder: 0,
      isPrimary: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should delete image from Cloudinary and database', async () => {
      (prisma.projectImage.findUnique as jest.Mock).mockResolvedValue(mockImage);
      (deleteImages as jest.Mock).mockResolvedValue(undefined);
      (prisma.projectImage.delete as jest.Mock).mockResolvedValue(mockImage);

      const result = await deleteProjectImage('img1');

      expect(result.message).toBe('Image deleted successfully');
      expect(deleteImages).toHaveBeenCalledWith(['public-id']);
      expect(prisma.projectImage.delete).toHaveBeenCalledWith({ where: { id: 'img1' } });
    });

    it('should throw error if image not found', async () => {
      (prisma.projectImage.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(deleteProjectImage('non-existent')).rejects.toThrow('Image not found');
      expect(deleteImages).not.toHaveBeenCalled();
      expect(prisma.projectImage.delete).not.toHaveBeenCalled();
    });

    it('should handle Cloudinary deletion errors', async () => {
      (prisma.projectImage.findUnique as jest.Mock).mockResolvedValue(mockImage);
      (deleteImages as jest.Mock).mockRejectedValue(new Error('Cloudinary error'));

      await expect(deleteProjectImage('img1')).rejects.toThrow('Cloudinary error');
      expect(prisma.projectImage.delete).not.toHaveBeenCalled();
    });

    it('should handle database deletion errors', async () => {
      (prisma.projectImage.findUnique as jest.Mock).mockResolvedValue(mockImage);
      (deleteImages as jest.Mock).mockResolvedValue(undefined);
      (prisma.projectImage.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(deleteProjectImage('img1')).rejects.toThrow('Database error');
    });
  });

  describe('reorderProjectImages', () => {
    const mockImages = [
      {
        id: 'img1',
        projectId: 'project1',
        imageUrl: 'image1.jpg',
        publicId: 'public1',
        displayOrder: 0,
        isPrimary: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'img2',
        projectId: 'project1',
        imageUrl: 'image2.jpg',
        publicId: 'public2',
        displayOrder: 1,
        isPrimary: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'img3',
        projectId: 'project1',
        imageUrl: 'image3.jpg',
        publicId: 'public3',
        displayOrder: 2,
        isPrimary: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should reorder images correctly', async () => {
      (prisma.projectImage.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue(mockImages);

      const imageOrders = [
        { id: 'img3', displayOrder: 0 },
        { id: 'img1', displayOrder: 1 },
        { id: 'img2', displayOrder: 2 },
      ];

      const result = await reorderProjectImages('project1', imageOrders);

      expect(result).toHaveLength(3);
      expect(prisma.projectImage.updateMany).toHaveBeenCalledTimes(3);
      expect(prisma.projectImage.findMany).toHaveBeenCalledWith({
        where: { projectId: 'project1' },
        orderBy: { displayOrder: 'asc' },
      });
    });

    it('should update each image display order', async () => {
      (prisma.projectImage.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue(mockImages);

      const imageOrders = [
        { id: 'img1', displayOrder: 2 },
        { id: 'img2', displayOrder: 0 },
      ];

      await reorderProjectImages('project1', imageOrders);

      expect(prisma.projectImage.updateMany).toHaveBeenCalledWith({
        where: { id: 'img1', projectId: 'project1' },
        data: { displayOrder: 2 },
      });
      expect(prisma.projectImage.updateMany).toHaveBeenCalledWith({
        where: { id: 'img2', projectId: 'project1' },
        data: { displayOrder: 0 },
      });
    });

    it('should return images ordered by displayOrder', async () => {
      (prisma.projectImage.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue(mockImages);

      const result = await reorderProjectImages('project1', []);

      expect(prisma.projectImage.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { displayOrder: 'asc' },
        })
      );
      expect(result).toEqual(mockImages);
    });

    it('should handle empty image orders array', async () => {
      (prisma.projectImage.findMany as jest.Mock).mockResolvedValue(mockImages);

      const result = await reorderProjectImages('project1', []);

      expect(prisma.projectImage.updateMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockImages);
    });

    it('should handle database errors', async () => {
      (prisma.projectImage.updateMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        reorderProjectImages('project1', [{ id: 'img1', displayOrder: 0 }])
      ).rejects.toThrow('Database error');
    });
  });
});
