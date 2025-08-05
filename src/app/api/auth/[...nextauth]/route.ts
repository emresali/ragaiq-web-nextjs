// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/lib/auth/auth.config"
import NextAuth from "next-auth"

// Wichtig: Erstelle den Handler einmal
const handler = NextAuth(authOptions)

// Exportiere die HTTP-Methoden korrekt für App Router
export { handler as GET, handler as POST }