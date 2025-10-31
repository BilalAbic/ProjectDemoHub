import express, { Application } from 'express';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Map Azure Container Apps env vars (kebab-case) to app format (UPPER_SNAKE_CASE)
// MUST be imported before any other modules that use env vars
import '@/config/env';

// Now import other modules (after env is configured)
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@/middlewares/errorHandler';
import { notFoundHandler } from '@/middlewares/notFoundHandler';
import projectRoutes from '@/routes/projectRoutes';
import technologyRoutes from '@/routes/technologyRoutes';
import authRoutes from '@/routes/authRoutes';
import adminProjectRoutes from '@/routes/adminProjectRoutes';

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 4000;

// ============================================
// MIDDLEWARES
// ============================================

// Security headers
app.use(helmet());

// CORS configuration - Allow both 3000 and 3001 ports for development
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing
app.use(cookieParser());

// HTTP request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'DemoHub API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Public API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/technologies', technologyRoutes);

// Admin API Routes
app.use('/api/admin', authRoutes);
app.use('/api/admin/projects', adminProjectRoutes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

const startServer = () => {
  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log('=================================');
  });
};

// Start server
startServer();

export default app;

