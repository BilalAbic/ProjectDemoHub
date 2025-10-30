import {
  getAllProjects,
  getProjectById,
  getProjectStats,
} from '@/services/projectService';
import prisma from '@/config/database';

// Mock Prisma
jest.mock('@/config/database', () => ({
  __esModule: true,
  default: {
    project: {
      count: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe('Project Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProjects', () => {
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
            displayOrder: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    it('should return paginated projects with default pagination', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(10);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getAllProjects();

      expect(result.projects).toHaveLength(1);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 8,
        total: 10,
        totalPages: 2,
      });
      expect(prisma.project.count).toHaveBeenCalledWith({
        where: {
          isPublished: true,
          deletedAt: null,
        },
      });
    });

    it('should return paginated projects with custom pagination', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(25);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getAllProjects(2, 10);

      expect(result.pagination).toEqual({
        page: 2,
        limit: 10,
        total: 25,
        totalPages: 3,
      });
      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        })
      );
    });

    it('should filter projects by technology slug', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(5);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      await getAllProjects(1, 8, 'react');

      expect(prisma.project.count).toHaveBeenCalledWith({
        where: {
          isPublished: true,
          deletedAt: null,
          technologies: {
            some: {
              technology: {
                slug: 'react',
              },
            },
          },
        },
      });
    });

    it('should transform nested relations to flat structure', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(1);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      const result = await getAllProjects();

      expect(result.projects[0].technologies).toEqual([
        {
          id: 'tech1',
          name: 'React',
          slug: 'react',
          iconUrl: 'react.svg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
      expect(result.projects[0].contributors).toEqual([
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
      (prisma.project.count as jest.Mock).mockResolvedValue(1);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      await getAllProjects();

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            createdAt: 'desc',
          },
        })
      );
    });

    it('should order images by displayOrder asc', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(1);
      (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

      await getAllProjects();

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            images: {
              orderBy: {
                displayOrder: 'asc',
              },
            },
          }),
        })
      );
    });

    it('should return empty array when no projects found', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(0);
      (prisma.project.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAllProjects();

      expect(result.projects).toEqual([]);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    it('should calculate totalPages correctly', async () => {
      (prisma.project.count as jest.Mock).mockResolvedValue(15);
      (prisma.project.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAllProjects(1, 8);

      expect(result.pagination.totalPages).toBe(2); // Math.ceil(15/8) = 2
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.project.count as jest.Mock).mockRejectedValue(dbError);

      await expect(getAllProjects()).rejects.toThrow('Database connection failed');
    });
  });

  describe('getProjectById', () => {
    const mockProject = {
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
          displayOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    it('should return project by id', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(mockProject);

      const result = await getProjectById('1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
      expect(result?.name).toBe('Project 1');
      expect(prisma.project.findFirst).toHaveBeenCalledWith({
        where: {
          id: '1',
          isPublished: true,
          deletedAt: null,
        },
        include: expect.any(Object),
      });
    });

    it('should return null if project not found', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await getProjectById('non-existent-id');

      expect(result).toBeNull();
    });

    it('should only return published projects', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(null);

      await getProjectById('1');

      expect(prisma.project.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            isPublished: true,
          }),
        })
      );
    });

    it('should exclude deleted projects', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(null);

      await getProjectById('1');

      expect(prisma.project.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deletedAt: null,
          }),
        })
      );
    });

    it('should transform nested relations to flat structure', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(mockProject);

      const result = await getProjectById('1');

      expect(result?.technologies).toEqual([
        {
          id: 'tech1',
          name: 'React',
          slug: 'react',
          iconUrl: 'react.svg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
      expect(result?.contributors).toEqual([
        {
          id: 'cont1',
          name: 'John Doe',
          role: 'Developer',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });

    it('should include images ordered by displayOrder', async () => {
      (prisma.project.findFirst as jest.Mock).mockResolvedValue(mockProject);

      await getProjectById('1');

      expect(prisma.project.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            images: {
              orderBy: {
                displayOrder: 'asc',
              },
            },
          }),
        })
      );
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.project.findFirst as jest.Mock).mockRejectedValue(dbError);

      await expect(getProjectById('1')).rejects.toThrow('Database connection failed');
    });
  });

  describe('getProjectStats', () => {
    it('should return project statistics', async () => {
      (prisma.project.count as jest.Mock)
        .mockResolvedValueOnce(10) // totalPublished
        .mockResolvedValueOnce(5); // totalDraft

      const result = await getProjectStats();

      expect(result).toEqual({
        totalPublished: 10,
        totalDraft: 5,
        total: 15,
      });
    });

    it('should count only published projects for totalPublished', async () => {
      (prisma.project.count as jest.Mock)
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(5);

      await getProjectStats();

      expect(prisma.project.count).toHaveBeenNthCalledWith(1, {
        where: {
          isPublished: true,
          deletedAt: null,
        },
      });
    });

    it('should count only draft projects for totalDraft', async () => {
      (prisma.project.count as jest.Mock)
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(5);

      await getProjectStats();

      expect(prisma.project.count).toHaveBeenNthCalledWith(2, {
        where: {
          isPublished: false,
          deletedAt: null,
        },
      });
    });

    it('should exclude deleted projects from counts', async () => {
      (prisma.project.count as jest.Mock)
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(5);

      await getProjectStats();

      expect(prisma.project.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deletedAt: null,
          }),
        })
      );
    });

    it('should return zero stats when no projects exist', async () => {
      (prisma.project.count as jest.Mock)
        .mockResolvedValueOnce(0)
        .mockResolvedValueOnce(0);

      const result = await getProjectStats();

      expect(result).toEqual({
        totalPublished: 0,
        totalDraft: 0,
        total: 0,
      });
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.project.count as jest.Mock).mockRejectedValue(dbError);

      await expect(getProjectStats()).rejects.toThrow('Database connection failed');
    });
  });
});
