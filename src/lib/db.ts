/**
 * Database Utility - Singleton Prisma Client
 * 
 * This module provides a reusable Prisma client instance with:
 * - Singleton pattern to avoid multiple client instances
 * - Error handling for database connection issues
 * - Logging for development environment
 * - Type-safe database operations
 */

import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Initialize Prisma Client
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient();
}

// Create or reuse existing Prisma Client instance
const prisma = global.prisma || createPrismaClient();

/**
 * Connection event handlers
 */
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

/**
 * Error handler for database connection issues
 */
export async function validateDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✓ Database connection successful");
    return true;
  } catch (error) {
    console.error("✗ Database connection failed:", error);
    return false;
  }
}

/**
 * Execute a database operation with error handling
 * @param operation Database operation to execute
 * @returns Result of the operation or null if error occurs
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  operationName: string = "Database operation"
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error(`${operationName} failed:`, error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        console.error("Cannot connect to database. Check DATABASE_URL.");
      } else if (error.message.includes("P1001")) {
        console.error("Cannot reach database server.");
      } else if (error.message.includes("P1002")) {
        console.error("The database server was reached but timed out.");
      } else if (error.message.includes("P1008")) {
        console.error("Operations timed out.");
      } else if (error.message.includes("P1014")) {
        console.error("The underlying table does not exist in the database.");
      } else if (error.message.includes("P2025")) {
        console.error("A related record could not be found.");
      }
    }
    
    return null;
  }
}

/**
 * Health check for database connectivity
 * Useful for monitoring and readiness checks
 */
export async function healthCheck(): Promise<{
  status: "healthy" | "unhealthy";
  timestamp: string;
  message: string;
}> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      message: "Database connection is healthy",
    };
  } catch (error) {
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default prisma;
