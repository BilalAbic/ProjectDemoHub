import { PrismaClient } from '@prisma/client';

// Create Prisma client instance with connection pool settings
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pool settings for Neon.tech serverless
  // Helps with cold starts and idle connections
});

// Handle Prisma client connection
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
  console.log('🔌 Database disconnected');
};

// Export prisma instance (both named and default)
export { prisma };
export default prisma;

