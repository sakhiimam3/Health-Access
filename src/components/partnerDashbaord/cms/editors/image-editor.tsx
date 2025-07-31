"use client"

import type React from "react"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Column } from "@/lib/cms/cms-type"
import { useEffect, useState } from "react"

interface ImageEditorProps {
  column: Column
  previewFile: string | null
  onChange: (updatedColumn: Column) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  isUploading?: boolean
  uploadProgress?: number
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ 
  column, 
  previewFile, 
  onChange, 
  onFileUpload,
  isUploading = false,
  uploadProgress = 0
}) => {
  const [imageError, setImageError] = useState(false);

  // Get image URL from column content
  const getImageSrc = () => {
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

  const imageSrc = previewFile || getImageSrc();
  const hasImage = !!imageSrc;
  const isBlobUrl = imageSrc && imageSrc.startsWith("blob:");

  // Reset image error when src changes
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Image Upload</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {hasImage && !imageError ? (
            <div className="space-y-4">
              <img
                src={imageSrc}
                alt="Preview"
                className="max-w-full h-48 object-cover mx-auto rounded-lg"
                onError={() => setImageError(true)}
              />
              <p className="text-sm text-gray-500">
                {isBlobUrl
                  ? "Image preview - will be uploaded when you click Create/Update."
                  : "Current image. Select a new file to replace."}
              </p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{imageError ? "Image failed to load. Please select a new one." : "Click to upload or drag and drop"}</p>
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
          
          {/* File input for selecting a new image */}
          <Input 
            type="file" 
            accept="image/*" 
            className="mt-4" 
            onChange={onFileUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  )
}
