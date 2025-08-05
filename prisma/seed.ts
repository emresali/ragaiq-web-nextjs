// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Erstelle Test-Organisation
  const org = await prisma.organization.upsert({
    where: { slug: "demo-corp" },
    update: {},
    create: {
      name: "Demo Corporation",
      slug: "demo-corp",
      contractType: "ENTERPRISE",
      maxUsers: 100,
      maxRequestsPerMonth: 1000000,
      primaryColor: "#5ce1e6",
      supportEmail: "support@demo-corp.com",
    },
  })

  // Erstelle Organization Settings
  await prisma.organizationSettings.upsert({
    where: { orgId: org.id },
    update: {},
    create: {
      orgId: org.id,
      availableDocuments: ["crr", "kwg", "marisk"],
      availableLanguages: ["de", "en"],
      defaultDailyLimit: 500,
      defaultMonthlyLimit: 10000,
      limitBehavior: "WARN",
    },
  })

  // Erstelle Test-User
  const user = await prisma.user.upsert({
    where: { email: "demo@demo-corp.com" },
    update: {},
    create: {
      email: "demo@demo-corp.com",
      name: "Demo User",
      role: "ADMIN",
      orgId: org.id,
      isActive: true,
      emailVerified: new Date(),
    },
  })

  // Erstelle User Limits
  await prisma.userLimits.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      dailyLimit: 1000,
      monthlyLimit: 20000,
    },
  })

  console.log("✅ Seed data created successfully")
  console.log("📧 Test User: demo@demo-corp.com")
  console.log("🔑 Password: demo123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })