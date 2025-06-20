"use client"

import type React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Section } from "@/types/cmstype"
import { ColumnContent } from "./column-content"
import { getColumnGridClass } from "@/lib/cms/cms-utils"

interface PreviewModeProps {
  sections: Section[]
  onExitPreview: () => void
}

export const PreviewMode: React.FC<PreviewModeProps> = ({ sections, onExitPreview }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12 relative">
        {/* Exit Preview Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button onClick={onExitPreview} variant="outline" className="shadow-lg">
            <X className="w-4 h-4 mr-2" />
            Exit Preview
          </Button>
        </div>

        {/* Content Sections */}
        {sections
          .filter((section) => section.isActive)
          .map((section) => (
            <div key={section.id} className="mb-16">
              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                <div className="w-16 h-1 bg-blue-600 rounded"></div>
              </div>

              {/* Section Content */}
              <div className={`grid gap-8 ${getColumnGridClass(section.layout)}`}>
                {section.columns
                  .filter((column) => column.isActive)
                  .sort((a, b) => a.columnOrder - b.columnOrder)
                  .map((column) => (
                    <div key={column.id}>
                      <ColumnContent column={column} />
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {sections.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
            <p className="text-gray-600">Add some sections to see your content here</p>
          </div>
        )}
      </div>
    </div>
  )
}
