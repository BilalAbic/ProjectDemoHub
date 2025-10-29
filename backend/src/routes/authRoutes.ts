import { Router } from 'express';
import { login, logout, refresh, getMe } from '@/controllers/authController';
import { authenticate } from '@/middlewares/authMiddleware';
import { catchAsync } from '@/utils/catchAsync';

const router = Router();

/**
 * POST /api/admin/login
 * Admin login with email and password
 */
router.post('/login', catchAsync(login));

/**
 * POST /api/admin/logout
 * Admin logout (clear refresh token cookie)
 */
router.post('/logout', catchAsync(logout));

/**
 * POST /api/admin/refresh
 * Refresh access token using refresh token from cookie
 */
router.post('/refresh', catchAsync(refresh));

/**
 * GET /api/admin/me
 * Get current authenticated admin data
 * Protected route - requires authentication
 */
router.get('/me', authenticate, catchAsync(getMe));

export default router;

