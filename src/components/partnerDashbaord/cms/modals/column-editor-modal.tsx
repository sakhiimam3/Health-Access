"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { Column } from "@/lib/cms/cms-type"
import { TextEditor } from "../editors/text-editor"
import { ImageEditor } from "../editors/image-editor"
import { VideoEditor } from "../editors/video-editor"
import { ListEditor } from "../editors/list-editor"
import { useEffect } from "react"

interface ColumnEditorModalProps {
  column: Column
  previewFile: string | null
  onChange: (updatedColumn: Column) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => void
  isUploading?: boolean
  uploadProgress?: number
}

export const ColumnEditorModal: React.FC<ColumnEditorModalProps> = ({
  column,
  previewFile,
  onChange,
  onFileUpload,
  isUploading = false,
  uploadProgress = 0,
}) => {
  // Determine content type from column
  const contentType = column.type;

  // Log the column content for debugging
  useEffect(() => {
    console.log("Column editor opened with content:", {
      type: contentType,
      content: column.content,
      contentType: typeof column.content,
      previewFile
    });
  }, [column, contentType, previewFile]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Badge variant="outline" className="text-sm">
          Content Type: {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
        </Badge>
      </div>

      {contentType === "text" && <TextEditor column={column} onChange={onChange} />}

      {contentType === "image" && (
        <ImageEditor
          column={column}
          previewFile={previewFile}
          onChange={onChange}
          onFileUpload={(e) => onFileUpload(e, "image")}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      )}

      {contentType === "video" && (
        <VideoEditor
          column={column}
          previewFile={previewFile}
          onChange={onChange}
          onFileUpload={(e) => onFileUpload(e, "video")}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      )}

      {contentType === "list" && <ListEditor column={column} onChange={onChange} />}
    </div>
  )
}
