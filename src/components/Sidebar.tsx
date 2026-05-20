import Link from "next/link"
import { 
  LayoutDashboard, 
  BarChart, 
  Settings, 
  Users,
  FolderKanban,
  CheckSquare
} from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 font-bold text-xl border-b border-slate-800">
        CRM Marketing
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/" className="flex items-center px-4 py-3 text-sm rounded-lg bg-slate-800 text-white hover:bg-slate-700">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link href="/projects" className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
          <FolderKanban className="w-5 h-5 mr-3" />
          Projects
        </Link>
        <Link href="/tasks" className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
          <CheckSquare className="w-5 h-5 mr-3" />
          Tasks
        </Link>
        <Link href="/reports" className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
          <BarChart className="w-5 h-5 mr-3" />
          Reports
        </Link>
        <Link href="/team" className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
          <Users className="w-5 h-5 mr-3" />
          Team
        </Link>
      </nav>
      <div className="px-4 py-4 border-t border-slate-800">
        <Link href="/settings" className="flex items-center px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </div>
    </div>
  )
}