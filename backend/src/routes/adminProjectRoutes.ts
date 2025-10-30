import { Router } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  deleteImage,
  reorderImages,
} from '@/controllers/adminProjectController';
import { authenticate } from '@/middlewares/authMiddleware';
import { catchAsync } from '@/utils/catchAsync';
import { upload } from '@/utils/imageUpload';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/admin/projects
 * Get all projects (including unpublished)
 */
router.get('/', catchAsync(getProjects));

/**
 * POST /api/admin/projects
 * Create new project (with optional images)
 */
router.post('/', upload.array('images', 10), catchAsync(createProject));

/**
 * PUT /api/admin/projects/:id
 * Update project (without images - use separate image endpoint)
 */
router.put('/:id', catchAsync(updateProject));

/**
 * DELETE /api/admin/projects/:id
 * Delete project
 */
router.delete('/:id', catchAsync(deleteProject));

/**
 * POST /api/admin/projects/:id/images
 * Upload project image
 */
router.post('/:id/images', upload.single('image'), catchAsync(uploadImage));

/**
 * DELETE /api/admin/projects/:projectId/images/:imageId
 * Delete project image
 */
router.delete('/:projectId/images/:imageId', catchAsync(deleteImage));

/**
 * PUT /api/admin/projects/:id/images/reorder
 * Reorder project images
 */
router.put('/:id/images/reorder', catchAsync(reorderImages));

export default router;

