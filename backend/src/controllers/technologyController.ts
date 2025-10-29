import { Request, Response } from 'express';
import * as technologyService from '@/services/technologyService';

/**
 * GET /api/technologies
 * Get all technologies
 */
export const getTechnologies = async (_req: Request, res: Response) => {
  try {
    // Get technologies from service
    const technologies = await technologyService.getAllTechnologies();

    // Return success response
    return res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch technologies',
      },
    });
  }
};

/**
 * GET /api/technologies/:slug
 * Get a single technology by slug
 */
export const getTechnologyBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // Get technology from service
    const technology = await technologyService.getTechnologyBySlug(slug);

    // Check if technology exists
    if (!technology) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TECHNOLOGY_NOT_FOUND',
          message: 'Technology not found',
        },
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error) {
    console.error('Error fetching technology:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch technology',
      },
    });
  }
};

