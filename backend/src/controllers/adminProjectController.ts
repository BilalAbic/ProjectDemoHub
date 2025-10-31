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
    // Debug: Log incoming request
    console.log('📥 Create Project Request:');
    console.log('Body:', req.body);
    console.log('Files:', req.files);

    // Parse form data - handle both FormData and JSON
    let name, description, startDate, endDate, demoUrl, githubUrl, isPublished;
    let technologyIds: any[] = [];

    // Extract basic fields
    name = req.body.name;
    description = req.body.description;
    startDate = req.body.startDate || req.body.start_date;
    endDate = req.body.endDate || req.body.end_date;
    demoUrl = req.body.demoUrl || req.body.demo_url;
    githubUrl = req.body.githubUrl || req.body.github_url;
    isPublished = req.body.isPublished === 'true' || req.body.isPublished === true || req.body.is_published === true;

    // Handle technology IDs - FormData sends as 'technologyIds[]'
    if (req.body['technologyIds[]']) {
      // If it's an array, use it directly
      technologyIds = Array.isArray(req.body['technologyIds[]'])
        ? req.body['technologyIds[]']
        : [req.body['technologyIds[]']]; // Single value, wrap in array
    } else if (req.body.technologyIds) {
      // Fallback to 'technologyIds' (without [])
      technologyIds = Array.isArray(req.body.technologyIds)
        ? req.body.technologyIds
        : [req.body.technologyIds];
    } else if (req.body.technologies) {
      // Legacy support for 'technologies'
      technologyIds = Array.isArray(req.body.technologies)
        ? req.body.technologies
        : JSON.parse(req.body.technologies);
    } else {
      technologyIds = [];
    }

    // Debug: Log parsed technology IDs
    console.log('🔍 Parsed technologyIds:', technologyIds);
    console.log('🔍 Is array?', Array.isArray(technologyIds));
    console.log('🔍 First element:', technologyIds[0]);
    console.log('🔍 First element type:', typeof technologyIds[0]);

    // CRITICAL FIX: Flatten array if nested (Multer sometimes creates nested arrays)
    if (technologyIds.length > 0 && Array.isArray(technologyIds[0])) {
      console.log('⚠️ Nested array detected, flattening...');
      technologyIds = technologyIds.flat();
    }

    // Ensure all elements are strings
    technologyIds = technologyIds.filter((id: any) => id && typeof id === 'string');
    console.log('✅ Final technologyIds:', technologyIds);

    // Validation
    if (!name || !description || !startDate) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Name, description, and start_date are required',
        },
      });
    }

    // Parse dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = endDate ? new Date(endDate) : null;

    // Validate dates
    if (isNaN(parsedStartDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATE',
          message: 'Invalid start_date format',
        },
      });
    }

    if (parsedEndDate && isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATE',
          message: 'Invalid end_date format',
        },
      });
    }

    // Get uploaded files from Multer/Cloudinary (if any)
    // Files are already uploaded to Cloudinary by multer-storage-cloudinary
    const files = req.files as any[] | undefined;

    // Transform Cloudinary files to our image format
    const images = files
      ? files.map((file, index) => ({
        imageUrl: file.path, // Cloudinary URL
        publicId: file.filename, // Cloudinary public_id
        displayOrder: index,
      }))
      : [];

    // Create project with images
    const project = await adminProjectService.createProject({
      name,
      description,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      demoUrl: demoUrl || null,
      githubUrl: githubUrl || null,
      isPublished: isPublished || false,
      technologyIds: technologyIds || [],
      contributorIds: [],
      images: images,
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

    // Debug: Log incoming request
    console.log('📥 Update Project Request:');
    console.log('Body:', req.body);

    // Parse form data - handle both FormData (camelCase) and JSON (snake_case)
    let name, description, startDate, endDate, demoUrl, githubUrl, isPublished;
    let technologyIds: any[] = [];

    // Extract basic fields (support both camelCase from FormData and snake_case)
    name = req.body.name;
    description = req.body.description;
    startDate = req.body.startDate || req.body.start_date;
    endDate = req.body.endDate || req.body.end_date;
    demoUrl = req.body.demoUrl || req.body.demo_url;
    githubUrl = req.body.githubUrl || req.body.github_url;

    // Parse isPublished (handle string 'true'/'false' from FormData)
    if (req.body.isPublished !== undefined) {
      isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    } else if (req.body.is_published !== undefined) {
      isPublished = req.body.is_published === 'true' || req.body.is_published === true;
    }

    // Handle technology IDs - FormData sends as 'technologyIds[]'
    if (req.body['technologyIds[]']) {
      technologyIds = Array.isArray(req.body['technologyIds[]'])
        ? req.body['technologyIds[]']
        : [req.body['technologyIds[]']];
    } else if (req.body.technologyIds) {
      technologyIds = Array.isArray(req.body.technologyIds)
        ? req.body.technologyIds
        : [req.body.technologyIds];
    } else if (req.body.technologies) {
      technologyIds = Array.isArray(req.body.technologies)
        ? req.body.technologies
        : req.body.technologies;
    }

    // Flatten and filter technology IDs
    if (technologyIds.length > 0 && Array.isArray(technologyIds[0])) {
      technologyIds = technologyIds.flat();
    }
    technologyIds = technologyIds.filter((id: any) => id && typeof id === 'string');

    console.log('✅ Parsed update data:', { name, description, startDate, endDate, demoUrl, githubUrl, isPublished, technologyIds });
    console.log('📊 Data types:', {
      nameType: typeof name,
      descriptionType: typeof description,
      startDateType: typeof startDate,
      technologyIdsType: typeof technologyIds,
      technologyIdsLength: technologyIds?.length
    });

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

    // Build update data object
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    // Parse and validate dates
    if (startDate !== undefined) {
      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_DATE',
            message: 'Invalid startDate format',
          },
        });
      }
      updateData.startDate = parsedStartDate;
    }

    if (endDate !== undefined) {
      if (endDate === null || endDate === '' || endDate === 'null') {
        updateData.endDate = null;
      } else {
        const parsedEndDate = new Date(endDate);
        if (isNaN(parsedEndDate.getTime())) {
          return res.status(400).json({
            success: false,
            error: {
              code: 'INVALID_DATE',
              message: 'Invalid endDate format',
            },
          });
        }
        updateData.endDate = parsedEndDate;
      }
    }

    if (demoUrl !== undefined) updateData.demoUrl = demoUrl || null;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl || null;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (technologyIds.length > 0) updateData.technologies = technologyIds;

    console.log('⚠️⚠️⚠️ UPDATE DATA OBJECT:', JSON.stringify(updateData, null, 2));
    console.log('⚠️⚠️⚠️ UPDATE DATA KEYS:', Object.keys(updateData));
    console.log('⚠️⚠️⚠️ NAME VALUE:', name, 'TYPE:', typeof name);

    // Update project
    console.log('🔄 Calling adminProjectService.updateProject with:', { id, updateData });
    const project = await adminProjectService.updateProject(id, updateData);
    console.log('✅ Project updated successfully in database:', {
      id: project.id,
      name: project.name,
      technologiesCount: project.technologies?.length,
      updatedAt: project.updatedAt
    });

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

