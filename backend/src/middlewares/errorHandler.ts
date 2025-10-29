import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message,
      ...(process.env.NODE_ENV === 'development' && {
        details: err.details,
        stack: err.stack,
      }),
    },
  });
};

