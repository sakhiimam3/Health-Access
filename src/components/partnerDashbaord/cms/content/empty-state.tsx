import type React from "react"
import { Plus } from "lucide-react"

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h3>
      <p className="text-gray-600">Enable edit mode and start building by selecting elements from the sidebar</p>
    </div>
  )
}
