"use client"

import { signOut } from "next-auth/react"
import { Bell, LogOut, Menu } from "lucide-react"

export default function Header({ user }: { user?: { name?: string | null, image?: string | null, role?: string | null } | null }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center">
        <button className="md:hidden text-gray-500 mr-4">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          {user?.image ? (
            <img src={user.image} alt={user.name || "User"} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase().replace("_", " ")}</p>
          </div>
        </div>
        <button 
          onClick={() => signOut()}
          className="text-gray-500 hover:text-red-500 ml-4"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}