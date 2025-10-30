import bcrypt from 'bcrypt';
import { login, getAdminById, refreshAccessToken } from '@/services/authService';
import { prisma } from '@/config/database';
import * as jwtUtils from '@/utils/jwt';

// Mock Prisma
jest.mock('@/config/database', () => ({
  prisma: {
    admin: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Mock bcrypt
jest.mock('bcrypt');

// Mock JWT utils
jest.mock('@/utils/jwt');

describe('Auth Service', () => {
  const mockAdmin = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'admin@example.com',
    password: '$2b$10$hashedpassword',
    name: 'Admin User',
    role: 'admin',
    lastLogin: new Date('2023-01-01'),
    createdAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      // Mock Prisma findUnique
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      
      // Mock bcrypt compare
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      
      // Mock Prisma update
      (prisma.admin.update as jest.Mock).mockResolvedValue(mockAdmin);
      
      // Mock JWT generation
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access-token');
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      const result = await login('admin@example.com', 'password123');

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        admin: {
          id: mockAdmin.id,
          email: mockAdmin.email,
          name: mockAdmin.name,
          role: mockAdmin.role,
          lastLogin: mockAdmin.lastLogin,
          createdAt: mockAdmin.createdAt,
        },
      });

      expect(prisma.admin.findUnique).toHaveBeenCalledWith({
        where: { email: 'admin@example.com' },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          role: true,
          lastLogin: true,
          createdAt: true,
        },
      });

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockAdmin.password);
      expect(prisma.admin.update).toHaveBeenCalled();
    });

    it('should throw error if admin not found', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(login('nonexistent@example.com', 'password123')).rejects.toThrow(
        'Invalid email or password'
      );

      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw error if password is invalid', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(login('admin@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid email or password'
      );

      expect(prisma.admin.update).not.toHaveBeenCalled();
    });

    it('should update lastLogin on successful login', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.admin.update as jest.Mock).mockResolvedValue(mockAdmin);
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access-token');
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      await login('admin@example.com', 'password123');

      expect(prisma.admin.update).toHaveBeenCalledWith({
        where: { id: mockAdmin.id },
        data: { lastLogin: expect.any(Date) },
      });
    });

    it('should generate JWT tokens with correct payload', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.admin.update as jest.Mock).mockResolvedValue(mockAdmin);
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access-token');
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      await login('admin@example.com', 'password123');

      const expectedPayload = {
        userId: mockAdmin.id,
        email: mockAdmin.email,
        role: mockAdmin.role,
      };

      expect(jwtUtils.generateAccessToken).toHaveBeenCalledWith(expectedPayload);
      expect(jwtUtils.generateRefreshToken).toHaveBeenCalledWith(expectedPayload);
    });

    it('should not return password in response', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.admin.update as jest.Mock).mockResolvedValue(mockAdmin);
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access-token');
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      const result = await login('admin@example.com', 'password123');

      expect(result.admin).not.toHaveProperty('password');
    });
  });

  describe('getAdminById', () => {
    it('should return admin data by ID', async () => {
      const adminWithoutPassword = {
        id: mockAdmin.id,
        email: mockAdmin.email,
        name: mockAdmin.name,
        role: mockAdmin.role,
        lastLogin: mockAdmin.lastLogin,
        createdAt: mockAdmin.createdAt,
      };

      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(adminWithoutPassword);

      const result = await getAdminById(mockAdmin.id);

      expect(result).toEqual(adminWithoutPassword);
      expect(prisma.admin.findUnique).toHaveBeenCalledWith({
        where: { id: mockAdmin.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          lastLogin: true,
          createdAt: true,
        },
      });
    });

    it('should throw error if admin not found', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getAdminById('nonexistent-id')).rejects.toThrow('Admin not found');
    });

    it('should not return password field', async () => {
      const adminWithoutPassword = {
        id: mockAdmin.id,
        email: mockAdmin.email,
        name: mockAdmin.name,
        role: mockAdmin.role,
        lastLogin: mockAdmin.lastLogin,
        createdAt: mockAdmin.createdAt,
      };

      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(adminWithoutPassword);

      const result = await getAdminById(mockAdmin.id);

      expect(result).not.toHaveProperty('password');
    });
  });

  describe('refreshAccessToken', () => {
    it('should generate new access token from payload', () => {
      const payload = {
        userId: mockAdmin.id,
        email: mockAdmin.email,
        role: mockAdmin.role,
      };

      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('new-access-token');

      const result = refreshAccessToken(payload);

      expect(result).toBe('new-access-token');
      expect(jwtUtils.generateAccessToken).toHaveBeenCalledWith(payload);
    });

    it('should preserve payload data', () => {
      const payload = {
        userId: '123',
        email: 'test@example.com',
        role: 'admin',
      };

      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('token');

      refreshAccessToken(payload);

      expect(jwtUtils.generateAccessToken).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: '123',
          email: 'test@example.com',
          role: 'admin',
        })
      );
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete login flow', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.admin.update as jest.Mock).mockResolvedValue(mockAdmin);
      (jwtUtils.generateAccessToken as jest.Mock).mockReturnValue('access-token');
      (jwtUtils.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

      const result = await login('admin@example.com', 'password123');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('admin');
      expect(result.admin).not.toHaveProperty('password');
    });

    it('should handle database errors gracefully', async () => {
      (prisma.admin.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      );

      await expect(login('admin@example.com', 'password123')).rejects.toThrow(
        'Database connection failed'
      );
    });

    it('should handle bcrypt errors gracefully', async () => {
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Bcrypt error'));

      await expect(login('admin@example.com', 'password123')).rejects.toThrow(
        'Bcrypt error'
      );
    });
  });
});
