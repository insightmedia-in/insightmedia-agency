/**
 * Prisma Seed Script
 * 
 * This script runs automatically when you run 'npm run db:seed'.
 * Use it to populate your database with initial data during development.
 * 
 * Run with: npm run db:seed
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Example: Create a test user
    const testUser = await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: {},
      create: {
        email: "test@example.com",
        name: "Test User",
        role: "USER",
        profile: {
          create: {
            bio: "This is a test user",
            location: "San Francisco, CA",
          },
        },
      },
    });

    console.log(`✓ Created test user: ${testUser.email}`);

    // Example: Create a recruiter user
    const recruiter = await prisma.user.upsert({
      where: { email: "recruiter@example.com" },
      update: {},
      create: {
        email: "recruiter@example.com",
        name: "Test Recruiter",
        role: "RECRUITER",
        profile: {
          create: {
            bio: "Recruiting talented developers",
            location: "New York, NY",
          },
        },
      },
    });

    console.log(`✓ Created recruiter user: ${recruiter.email}`);

    console.log("✓ Database seed completed successfully!");
  } catch (error) {
    console.error("✗ Seed failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
