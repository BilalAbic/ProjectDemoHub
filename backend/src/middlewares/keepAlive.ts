import prisma from '@/config/database';

/**
 * Keep database connection alive
 * Prevents Neon.tech from closing idle connections
 */
export const keepDatabaseAlive = async () => {
  try {
    // Simple query to keep connection alive
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    console.error('Keep-alive query failed:', error);
  }
};

// Run keep-alive every 4 minutes (Neon closes after 5 min idle)
export const startKeepAlive = () => {
  setInterval(keepDatabaseAlive, 4 * 60 * 1000); // 4 minutes
  console.log('🔄 Database keep-alive started (every 4 minutes)');
};
