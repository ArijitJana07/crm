import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default async function IntegrationsPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Google Workspace & APIs</h2>
                  <p className="text-gray-500 mt-1">Connect to Google Analytics and Search Console to view marketing data directly in the dashboard.</p>
                  
                  <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                    <strong>Note:</strong> Requires setting up OAuth credentials in the Google Cloud Console. Make sure you set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in the environment variables.
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border shadow-sm">
                    {/* Simple Google G icon placeholder */}
                    <span className="text-xl font-bold text-blue-600">G</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <form
                  action={async () => {
                    "use server"
                    await signIn("google")
                  }}
                >
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                    Connect Google Account
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}