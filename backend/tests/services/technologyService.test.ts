import {
  getAllTechnologies,
  getTechnologyBySlug,
  getTechnologiesWithCount,
} from '@/services/technologyService';
import prisma from '@/config/database';

// Mock Prisma
jest.mock('@/config/database', () => ({
  __esModule: true,
  default: {
    technology: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('Technology Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTechnologies', () => {
    const mockTechnologies = [
      {
        id: '1',
        name: 'React',
        slug: 'react',
        iconUrl: 'react.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        name: 'Node.js',
        slug: 'nodejs',
        iconUrl: 'nodejs.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '3',
        name: 'TypeScript',
        slug: 'typescript',
        iconUrl: 'typescript.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
    ];

    it('should return all technologies', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologies);

      const result = await getAllTechnologies();

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockTechnologies);
      expect(prisma.technology.findMany).toHaveBeenCalledTimes(1);
    });

    it('should order technologies by name ascending', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologies);

      await getAllTechnologies();

      expect(prisma.technology.findMany).toHaveBeenCalledWith({
        orderBy: {
          name: 'asc',
        },
      });
    });

    it('should return empty array when no technologies exist', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAllTechnologies();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.technology.findMany as jest.Mock).mockRejectedValue(dbError);

      await expect(getAllTechnologies()).rejects.toThrow('Database connection failed');
    });

    it('should return technologies with all required fields', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologies);

      const result = await getAllTechnologies();

      result.forEach((tech) => {
        expect(tech).toHaveProperty('id');
        expect(tech).toHaveProperty('name');
        expect(tech).toHaveProperty('slug');
        expect(tech).toHaveProperty('iconUrl');
        expect(tech).toHaveProperty('createdAt');
        expect(tech).toHaveProperty('updatedAt');
      });
    });
  });

  describe('getTechnologyBySlug', () => {
    const mockTechnology = {
      id: '1',
      name: 'React',
      slug: 'react',
      iconUrl: 'react.svg',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    it('should return technology by slug', async () => {
      (prisma.technology.findUnique as jest.Mock).mockResolvedValue(mockTechnology);

      const result = await getTechnologyBySlug('react');

      expect(result).toEqual(mockTechnology);
      expect(result?.slug).toBe('react');
      expect(prisma.technology.findUnique).toHaveBeenCalledWith({
        where: {
          slug: 'react',
        },
      });
    });

    it('should return null if technology not found', async () => {
      (prisma.technology.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getTechnologyBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.technology.findUnique as jest.Mock).mockRejectedValue(dbError);

      await expect(getTechnologyBySlug('react')).rejects.toThrow('Database connection failed');
    });

    it('should query with correct slug parameter', async () => {
      (prisma.technology.findUnique as jest.Mock).mockResolvedValue(mockTechnology);

      await getTechnologyBySlug('nodejs');

      expect(prisma.technology.findUnique).toHaveBeenCalledWith({
        where: {
          slug: 'nodejs',
        },
      });
    });

    it('should handle special characters in slug', async () => {
      (prisma.technology.findUnique as jest.Mock).mockResolvedValue(null);

      await getTechnologyBySlug('node.js');

      expect(prisma.technology.findUnique).toHaveBeenCalledWith({
        where: {
          slug: 'node.js',
        },
      });
    });
  });

  describe('getTechnologiesWithCount', () => {
    const mockTechnologiesWithCount = [
      {
        id: '1',
        name: 'React',
        slug: 'react',
        iconUrl: 'react.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        _count: {
          projects: 5,
        },
      },
      {
        id: '2',
        name: 'Node.js',
        slug: 'nodejs',
        iconUrl: 'nodejs.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        _count: {
          projects: 3,
        },
      },
      {
        id: '3',
        name: 'TypeScript',
        slug: 'typescript',
        iconUrl: 'typescript.svg',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        _count: {
          projects: 0,
        },
      },
    ];

    it('should return technologies with project counts', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologiesWithCount);

      const result = await getTechnologiesWithCount();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: '1',
        name: 'React',
        slug: 'react',
        projectCount: 5,
      });
      expect(result[1]).toEqual({
        id: '2',
        name: 'Node.js',
        slug: 'nodejs',
        projectCount: 3,
      });
    });

    it('should include technologies with zero projects', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologiesWithCount);

      const result = await getTechnologiesWithCount();

      const zeroCountTech = result.find((tech) => tech.projectCount === 0);
      expect(zeroCountTech).toBeDefined();
      expect(zeroCountTech?.name).toBe('TypeScript');
    });

    it('should order technologies by name ascending', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologiesWithCount);

      await getTechnologiesWithCount();

      expect(prisma.technology.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            name: 'asc',
          },
        })
      );
    });

    it('should include project count in query', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologiesWithCount);

      await getTechnologiesWithCount();

      expect(prisma.technology.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: {
            _count: {
              select: {
                projects: true,
              },
            },
          },
        })
      );
    });

    it('should return empty array when no technologies exist', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getTechnologiesWithCount();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      (prisma.technology.findMany as jest.Mock).mockRejectedValue(dbError);

      await expect(getTechnologiesWithCount()).rejects.toThrow('Database connection failed');
    });

    it('should transform data correctly', async () => {
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(mockTechnologiesWithCount);

      const result = await getTechnologiesWithCount();

      result.forEach((tech) => {
        expect(tech).toHaveProperty('id');
        expect(tech).toHaveProperty('name');
        expect(tech).toHaveProperty('slug');
        expect(tech).toHaveProperty('projectCount');
        expect(tech).not.toHaveProperty('_count');
        expect(tech).not.toHaveProperty('iconUrl');
        expect(tech).not.toHaveProperty('createdAt');
        expect(tech).not.toHaveProperty('updatedAt');
      });
    });

    it('should handle large project counts', async () => {
      const largeMock = [
        {
          ...mockTechnologiesWithCount[0],
          _count: { projects: 999 },
        },
      ];
      (prisma.technology.findMany as jest.Mock).mockResolvedValue(largeMock);

      const result = await getTechnologiesWithCount();

      expect(result[0].projectCount).toBe(999);
    });
  });
});
