import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@demohub.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@demohub.com',
      passwordHash: adminPassword,
      name: 'Bilal Abic',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create technologies
  const technologies = [
    { name: 'React', slug: 'react' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'Python', slug: 'python' },
    { name: 'Vue.js', slug: 'vuejs' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Express.js', slug: 'expressjs' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Prisma', slug: 'prisma' },
    { name: 'Docker', slug: 'docker' },
    { name: 'AWS', slug: 'aws' },
    { name: 'Firebase', slug: 'firebase' },
    { name: 'GraphQL', slug: 'graphql' },
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: {},
      create: tech,
    });
  }

  console.log('✅ Technologies created:', technologies.length);

  // Create sample contributor
  const contributor = await prisma.contributor.upsert({
    where: { id: 'default-contributor' },
    update: {},
    create: {
      id: 'default-contributor',
      name: 'Bilal Abic',
      email: 'bilal@demohub.com',
    },
  });

  console.log('✅ Default contributor created:', contributor.name);

  console.log('🌱 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

