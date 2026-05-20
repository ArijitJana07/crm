"use client"

import { BarChart as BarChartIcon } from "lucide-react"

export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50/50">
      <BarChartIcon className="w-12 h-12 text-gray-300 mb-3" />
      <p className="text-gray-600 font-medium">{title}</p>
      <p className="text-sm mt-1 text-center max-w-sm">{message}</p>
    </div>
  )
}