// src/middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    // Zusätzliche Middleware-Logik hier
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Prüfe ob User eingeloggt ist
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return token !== null
        }
        // Prüfe Admin-Bereiche
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN" || token?.role === "SUPER_ADMIN"
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
}