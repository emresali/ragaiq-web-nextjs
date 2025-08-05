// src/lib/auth/auth.config.ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

// Type definitions
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string | null
      role: UserRole
      orgId: string
      organizationName: string
    }
  }

  interface User {
    id: string
    email: string
    name: string | null
    role: UserRole
    orgId: string
    organizationName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    orgId: string
    organizationName: string
  }
}

export const authOptions: NextAuthOptions = {
  // Wichtig: Cast zu Adapter für TypeScript
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email und Passwort sind erforderlich")
        }

        try {
          const user = await prisma.user.findUnique({
            where: { 
              email: credentials.email.toLowerCase() // Normalisiere Email
            },
            include: {
              organization: true,
            },
          })

          if (!user) {
            throw new Error("Ungültige Anmeldedaten")
          }

          if (!user.isActive) {
            throw new Error("Ihr Konto ist deaktiviert")
          }

          // Für MVP: Einfache Passwort-Überprüfung
          // TODO: Später mit bcrypt hashen
          const isValidPassword = credentials.password === "demo123"
          
          if (!isValidPassword) {
            throw new Error("Ungültige Anmeldedaten")
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole,
            orgId: user.orgId,
            organizationName: user.organization.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          // Wirf den Fehler weiter für besseres Error Handling
          if (error instanceof Error) {
            throw error
          }
          throw new Error("Authentifizierung fehlgeschlagen")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Bei initialer Anmeldung
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.orgId = user.orgId
        token.organizationName = user.organizationName
      }

      // Bei Session Update
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
        session.user.role = token.role as UserRole
        session.user.orgId = token.orgId as string
        session.user.organizationName = token.organizationName as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Verhindere Redirects zu externen URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect zu Login bei Fehler
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}