// src/types/index.ts
import { JsonValue } from "@prisma/client/runtime/library"

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER"

export type ContractType = "PROFESSIONAL" | "ENTERPRISE" | "ENTERPRISE_PLUS"

export type LimitBehavior = "WARN" | "BLOCK"

export interface Organization {
  id: string
  name: string
  slug: string
  contractType: ContractType
  logoUrl?: string
  primaryColor: string
  supportEmail?: string
  ssoEnabled: boolean
  ssoProvider?: string
  ssoConfig?: JsonValue
  maxUsers: number
  maxRequestsPerMonth: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  orgId: string
  organization?: Organization
  emailVerified?: Date
  image?: string
  ssoId?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface AuthError {
  error: string
  message: string
}