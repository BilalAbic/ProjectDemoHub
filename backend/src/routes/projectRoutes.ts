import { Router } from 'express';
import * as projectController from '@/controllers/projectController';

const router = Router();

/**
 * GET /api/projects
 * Get all published projects
 * Query params:
 *   - page: number (default: 1)
 *   - limit: number (default: 8, max: 100)
 *   - technology: string (optional technology slug filter)
 */
router.get('/', projectController.getProjects);

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
router.get('/:id', projectController.getProjectById);

export default router;

