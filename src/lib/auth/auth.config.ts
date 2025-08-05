import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { UserRole } from "@/types"

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
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            organization: true,
          },
        })

        if (!user || !user.isActive) {
          throw new Error("User not found or inactive")
        }

        // For MVP, we'll store passwords (in production, use SSO)
        // const isPasswordValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // )

        // For now, simple password check (replace with real implementation)
        if (credentials.password !== "demo123") {
          throw new Error("Invalid password")
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
      },
    }),
    // SSO providers will be added here later
    // SAMLProvider({...}),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
        token.organizationName = user.organizationName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.orgId = token.orgId
        session.user.organizationName = token.organizationName
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
}