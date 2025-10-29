import bcrypt from 'bcrypt';
import { prisma } from '@/config/database';
import { generateAccessToken, generateRefreshToken, JwtPayload } from '@/utils/jwt';

/**
 * Login with email and password
 * @param email - Admin email
 * @param password - Admin password
 * @returns Access token, refresh token, and admin data
 */
export const login = async (email: string, password: string) => {
  // Find admin by email
  const admin = await prisma.admin.findUnique({
    where: { email },
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

  // Check if admin exists
  if (!admin) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() },
  });

  // Create JWT payload
  const payload: JwtPayload = {
    userId: admin.id,
    email: admin.email,
    role: admin.role,
  };

  // Generate tokens
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Return tokens and admin data (without password)
  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt,
    },
  };
};

/**
 * Get admin by ID
 * @param adminId - Admin ID
 * @returns Admin data
 */
export const getAdminById = async (adminId: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      lastLogin: true,
      createdAt: true,
    },
  });

  if (!admin) {
    throw new Error('Admin not found');
  }

  return admin;
};

/**
 * Refresh access token using refresh token
 * @param payload - JWT payload from verified refresh token
 * @returns New access token
 */
export const refreshAccessToken = (payload: JwtPayload) => {
  // Generate new access token with same payload
  return generateAccessToken(payload);
};

