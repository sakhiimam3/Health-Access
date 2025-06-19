"use client"

import type React from "react"
import { Textarea } from "@/components/ui/textarea"
import type { Column } from "@/types/cmstype"

interface TextEditorProps {
  column: Column
  onChange: (updatedColumn: Column) => void
}

export const TextEditor: React.FC<TextEditorProps> = ({ column, onChange }) => {
  // Extract text content from various formats
  const getTextContent = () => {
    if (typeof column.content === "string") {
      // Check if it's a JSON string
      if (column.content.startsWith('{')) {
        try {
          const parsed = JSON.parse(column.content);
          // Try to get description or title
          return parsed.description || parsed.title || "";
        } catch (e) {
          // Not valid JSON, use as is
          return column.content;
        }
      } else {
        // Plain text
        return column.content;
      }
    } else if (typeof column.content === "object" && column.content !== null) {
      // Object format - extract text content
      return column.content.description || column.content.title || "";
    }
    return "";
  };

  const textContent = getTextContent();
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Text Content</label>
        <Textarea
          value={textContent}
          onChange={(e) =>
            onChange({
              ...column,
              content: e.target.value,
            })
          }
          placeholder="Enter your text content"
          rows={8}
        />
      </div>
    </div>
  )
}
