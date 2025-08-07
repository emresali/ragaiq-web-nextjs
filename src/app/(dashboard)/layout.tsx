// src/app/(dashboard)/layout.tsx
import { requireAuth } from "@/lib/auth/auth"
import DashboardLayoutClient from "./layout-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}