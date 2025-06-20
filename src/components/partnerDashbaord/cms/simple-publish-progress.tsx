"use client"

import type React from "react"

interface PublishProgressProps {
    isPublishing: boolean
    uploadProgress: {
      total: number
      completed: number
      current?: string
    }
  }
  
  export const PublishProgress = ({ isPublishing, uploadProgress }: PublishProgressProps) => {
    if (!isPublishing && uploadProgress.total === 0) return null
  
    return (
      <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] z-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-5 w-5 animate-spin border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="font-medium">Publishing Content...</span>
        </div>
        {uploadProgress.total > 0 && (
          <div className="text-sm text-gray-600">
            {uploadProgress.current || `${uploadProgress.completed}/${uploadProgress.total} processed`}
          </div>
        )}
      </div>
    )
  }
  