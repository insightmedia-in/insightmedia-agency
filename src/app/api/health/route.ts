/**
 * Health Check API Route
 * GET /api/health
 * 
 * Returns database connection status and application health
 */

import { NextResponse } from "next/server";
import { healthCheck } from "@/lib/db";

export async function GET() {
  try {
    const dbHealth = await healthCheck();

    return NextResponse.json(
      {
        status: "online",
        database: dbHealth,
        timestamp: new Date().toISOString(),
      },
      { status: dbHealth.status === "healthy" ? 200 : 503 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
