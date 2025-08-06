import { requireAuth } from "@/lib/auth/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Temporary layout - will be replaced with MUI */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold">
            Rag<span className="text-ragaiq-primary">AI-Q</span>
          </h1>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}