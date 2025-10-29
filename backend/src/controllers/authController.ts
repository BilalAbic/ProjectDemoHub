import { Request, Response } from 'express';
import * as authService from '@/services/authService';
import { verifyRefreshToken } from '@/utils/jwt';

/**
 * POST /api/admin/login
 * Admin login with email and password
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_CREDENTIALS',
          message: 'Email and password are required',
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_EMAIL',
          message: 'Invalid email format',
        },
      });
    }

    // Attempt login
    const result = await authService.login(email, password);

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return access token and admin data
    return res.status(200).json({
      success: true,
      data: {
        accessToken: result.accessToken,
        admin: result.admin,
      },
      message: 'Login successful',
    });
  } catch (error: any) {
    // Handle authentication errors
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred during login',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * POST /api/admin/logout
 * Admin logout (clear refresh token cookie)
 */
export const logout = async (_req: Request, res: Response) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred during logout',
      },
    });
  }
};

/**
 * POST /api/admin/refresh
 * Refresh access token using refresh token from cookie
 */
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_REFRESH_TOKEN',
          message: 'Refresh token not found',
        },
      });
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = authService.refreshAccessToken(payload);

    return res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
      message: 'Token refreshed successfully',
    });
  } catch (error: any) {
    // Handle token verification errors
    if (error.message.includes('Invalid or expired')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid or expired refresh token',
        },
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred during token refresh',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * GET /api/admin/me
 * Get current authenticated admin data
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    // User data is attached to request by auth middleware
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
    }

    // Get admin data
    const admin = await authService.getAdminById(userId);

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    if (error.message === 'Admin not found') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ADMIN_NOT_FOUND',
          message: 'Admin not found',
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred while fetching admin data',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

