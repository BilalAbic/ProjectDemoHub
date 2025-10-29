import { Router } from 'express';
import * as technologyController from '@/controllers/technologyController';

const router = Router();

/**
 * GET /api/technologies
 * Get all technologies
 */
router.get('/', technologyController.getTechnologies);

/**
 * GET /api/technologies/:slug
 * Get a single technology by slug
 */
router.get('/:slug', technologyController.getTechnologyBySlug);

export default router;

