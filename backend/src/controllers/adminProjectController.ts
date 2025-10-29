import { Request, Response } from 'express';
import * as adminProjectService from '@/services/adminProjectService';

/**
 * GET /api/admin/projects
 * Get all projects (including unpublished)
 */
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await adminProjectService.getAllProjectsAdmin();

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch projects',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * POST /api/admin/projects
 * Create new project
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, start_date, end_date, demo_url, github_url, is_published, technologies, contributors } =
      req.body;

    // Validation
    if (!name || !description || !start_date) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Name, description, and start_date are required',
        },
      });
    }

    // Parse dates
    const startDate = new Date(start_date);
    const endDate = end_date ? new Date(end_date) : null;

    // Validate dates
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATE',
          message: 'Invalid start_date format',
        },
      });
    }

    if (endDate && isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATE',
          message: 'Invalid end_date format',
        },
      });
    }

    // Create project
    const project = await adminProjectService.createProject({
      name,
      description,
      startDate,
      endDate,
      demoUrl: demo_url || null,
      githubUrl: github_url || null,
      isPublished: is_published !== undefined ? is_published : false,
      technologies: technologies || [],
      contributors: contributors || [],
    });

    return res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to create project',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * PUT /api/admin/projects/:id
 * Update project
 */
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, demo_url, github_url, is_published, technologies, contributors } =
      req.body;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid project ID format',
        },
      });
    }

    // Parse dates if provided
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (start_date) {
      const startDate = new Date(start_date);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_DATE',
            message: 'Invalid start_date format',
          },
        });
      }
      updateData.startDate = startDate;
    }
    if (end_date !== undefined) {
      if (end_date === null) {
        updateData.endDate = null;
      } else {
        const endDate = new Date(end_date);
        if (isNaN(endDate.getTime())) {
          return res.status(400).json({
            success: false,
            error: {
              code: 'INVALID_DATE',
              message: 'Invalid end_date format',
            },
          });
        }
        updateData.endDate = endDate;
      }
    }
    if (demo_url !== undefined) updateData.demoUrl = demo_url || null;
    if (github_url !== undefined) updateData.githubUrl = github_url || null;
    if (is_published !== undefined) updateData.isPublished = is_published;
    if (technologies) updateData.technologies = technologies;
    if (contributors) updateData.contributors = contributors;

    // Update project
    const project = await adminProjectService.updateProject(id, updateData);

    return res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Project not found',
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to update project',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * DELETE /api/admin/projects/:id
 * Delete project
 */
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid project ID format',
        },
      });
    }

    await adminProjectService.deleteProject(id);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    if (error.message === 'Project not found') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Project not found',
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete project',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * POST /api/admin/projects/:id/images
 * Upload project image
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE',
          message: 'No image file provided',
        },
      });
    }

    // File is uploaded to Cloudinary via multer middleware
    // @ts-ignore - Cloudinary adds these properties
    const imageUrl = file.path;
    // @ts-ignore
    const publicId = file.filename;

    const image = await adminProjectService.addProjectImage(id, {
      imageUrl,
      publicId,
    });

    return res.status(201).json({
      success: true,
      data: image,
      message: 'Image uploaded successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to upload image',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * DELETE /api/admin/projects/:projectId/images/:imageId
 * Delete project image
 */
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params;

    await adminProjectService.deleteProjectImage(imageId);

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    if (error.message === 'Image not found') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Image not found',
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete image',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

/**
 * PUT /api/admin/projects/:id/images/reorder
 * Reorder project images
 */
export const reorderImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageOrders } = req.body;

    if (!imageOrders || !Array.isArray(imageOrders)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATA',
          message: 'imageOrders must be an array of {id, display_order}',
        },
      });
    }

    // Transform snake_case to camelCase for service
    const transformedOrders = imageOrders.map((item: any) => ({
      id: item.id,
      displayOrder: item.display_order,
    }));

    const images = await adminProjectService.reorderProjectImages(id, transformedOrders);

    return res.status(200).json({
      success: true,
      data: images,
      message: 'Images reordered successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to reorder images',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
    });
  }
};

