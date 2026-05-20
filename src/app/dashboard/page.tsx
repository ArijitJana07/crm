import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { DepartmentWorkloadChart, ProjectStatusChart } from "@/components/charts/DashboardCharts"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  
  // Fetch real data from the database
  const projectCount = await prisma.project.count({ where: { status: "ACTIVE" }})
  const taskCount = await prisma.task.count({ where: { status: { in: ["TODO", "IN_PROGRESS"] }}})
  const hasGoogleAccount = await prisma.account.count({ where: { provider: "google" }})

  // We could fetch real aggregations here. For now, empty arrays trigger the empty states
  const workloadData: Array<{ name: string; tasks: number }> = [] // fetch from db when data exists
  const statusData: Array<{ name: string; value: number }> = []   // fetch from db when data exists

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {session?.user?.name || 'User'}</h1>
        <Link 
          href="/settings/integrations" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Connect Data Sources
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{projectCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pending Tasks</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{taskCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Connected Users</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{hasGoogleAccount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Department Workload</h2>
          <DepartmentWorkloadChart data={workloadData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects by Status</h2>
          <ProjectStatusChart data={statusData} />
        </div>
      </div>
      
      {/* Marketing API Data Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Marketing Performance (SEO/Analytics)</h2>
        </div>
        
        {hasGoogleAccount > 0 ? (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-500">Google APIs connected! Select a property to view data.</p>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-4">No marketing data connected yet.</p>
            <Link 
              href="/settings/integrations" 
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Connect Google Analytics / Search Console
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}