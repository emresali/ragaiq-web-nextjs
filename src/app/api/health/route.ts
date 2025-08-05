import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check environment variables
    const requiredEnvVars = [
      "NEXTAUTH_SECRET",
      "DATABASE_URL",
      "NEXTAUTH_URL"
    ]
    
    const missingEnvVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    )
    
    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          status: "unhealthy",
          error: "Missing environment variables",
          details: { missing: missingEnvVars }
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "unknown",
      environment: process.env.NODE_ENV || "unknown"
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Database connection failed"
      },
      { status: 503 }
    )
  }
}