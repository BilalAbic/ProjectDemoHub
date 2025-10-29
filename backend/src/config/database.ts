import { PrismaClient } from '@prisma/client';

// Create Prisma client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
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

