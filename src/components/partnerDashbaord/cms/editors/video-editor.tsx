"use client"

import type React from "react"
import { Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Column } from "@/lib/cms/cms-type"
import { useEffect, useState } from "react"

interface VideoEditorProps {
  column: Column
  previewFile: string | null
  onChange: (updatedColumn: Column) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  isUploading?: boolean
  uploadProgress?: number
}

export const VideoEditor: React.FC<VideoEditorProps> = ({ 
  column, 
  previewFile, 
  onChange, 
  onFileUpload,
  isUploading = false,
  uploadProgress = 0
}) => {
  const [videoError, setVideoError] = useState(false);

  // Get video URL from column content
  const getVideoSrc = () => {
    if (typeof column.content === "string") {
      // Check if it's a JSON string
      if (column.content.startsWith('{')) {
        try {
          const parsed = JSON.parse(column.content);
          return parsed.src || "";
        } catch (e) {
          // Not valid JSON, use as is
          return column.content;
        }
      } else {
        // Direct URL
        return column.content;
      }
    } else if (typeof column.content === "object" && column.content !== null) {
      return column.content.src || "";
    }
    return "";
  };

  const videoSrc = previewFile || getVideoSrc();
  const hasVideo = !!videoSrc;
  const isBlobUrl = videoSrc && videoSrc.startsWith("blob:");

  // Reset video error when src changes
  useEffect(() => {
    setVideoError(false);
  }, [videoSrc]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Video Upload</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {hasVideo && !videoError ? (
            <div className="space-y-4">
              <video controls className="max-w-full h-48 mx-auto rounded-lg" onError={() => setVideoError(true)}>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-500">
                {isBlobUrl
                  ? "Video preview - will be uploaded when you click Create/Update."
                  : "Current video. Select a new file to replace."}
              </p>
            </div>
          ) : (
            <>
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{videoError ? "Video failed to load. Please select a new one." : "Click to upload video file"}</p>
            </>
          )}
          
          {/* Upload Progress Indicator */}
          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">Uploading... {Math.round(uploadProgress)}%</p>
            </div>
          )}
          
          {/* File input for selecting a new video */}
          <Input 
            type="file" 
            accept="video/*" 
            className="mt-4" 
            onChange={onFileUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  )
}
