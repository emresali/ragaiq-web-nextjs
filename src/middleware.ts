// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth/auth.config"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const token = session?.user
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || (token.role !== "ADMIN" && token.role !== "SUPER_ADMIN")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Protect API routes
  if (pathname.startsWith("/api/protected")) {
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
}