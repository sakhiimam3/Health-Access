"use client"

import type React from "react"
import { GripVertical, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Section } from "@/lib/cms/cms-type"
import { ColumnContent } from "./column-content"
import { getColumnGridClass, getLayoutDisplayName } from "@/lib/cms/cms-utils"

interface SectionCardProps {
  section: Section
  editMode: boolean
  isDragged: boolean
  onDragStart: (e: React.DragEvent, sectionId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, targetSectionId: string) => void
  onEditSection: (section: Section) => void
  onEditColumn: (section: Section, columnId: string) => void
  onDeleteSection: (sectionId: string) => void
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  editMode,
  isDragged,
  onDragStart,
  onDragOver,
  onDrop,
  onEditSection,
  onEditColumn,
  onDeleteSection,
}) => {
  return (
    <Card
      className={`relative group ${isDragged ? "opacity-50" : ""}`}
      draggable={editMode}
      onDragStart={(e) => onDragStart(e, section.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, section.id)}
    >
      <CardContent className="p-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {editMode && <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />}
            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            <Badge variant="outline">{getLayoutDisplayName(section.layout)}</Badge>
          </div>

          {editMode && (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onEditSection(section)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDeleteSection(section.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Section Content */}
        <div className={`grid gap-8 ${getColumnGridClass(section.layout)}`}>
          {/* Handle content blocks (text, image, video) */}
          {section.content && (
            <div className="relative group/column">
              <ColumnContent column={{ id: "content", type: "text", content: section.content, columnOrder: 1, isActive: true, createdAt: "", updatedAt: "" }} />
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 flex space-x-1">
                  <Badge variant="secondary" className="text-xs">text</Badge>
                  <Button size="sm" className="bg-white shadow-lg" onClick={() => onEditSection(section)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Handle image content */}
          {section.image && (
            <div className="relative group/column">
              <ColumnContent column={{ id: "image", type: "image", content: { src: section.image }, columnOrder: 1, isActive: true, createdAt: "", updatedAt: "" }} />
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 flex space-x-1">
                  <Badge variant="secondary" className="text-xs">image</Badge>
                  <Button size="sm" className="bg-white shadow-lg" onClick={() => onEditSection(section)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Handle video content */}
          {section.video && (
            <div className="relative group/column">
              <ColumnContent column={{ id: "video", type: "video", content: { src: section.video }, columnOrder: 1, isActive: true, createdAt: "", updatedAt: "" }} />
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 flex space-x-1">
                  <Badge variant="secondary" className="text-xs">video</Badge>
                  <Button size="sm" className="bg-white shadow-lg" onClick={() => onEditSection(section)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Handle layout blocks with columns */}
          {section.columns?.filter((column) => column.isActive)
            .sort((a, b) => a.columnOrder - b.columnOrder)
            .map((column) => (
              <div key={column.id} className="relative group/column">
                <ColumnContent column={column} />
                {editMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 flex space-x-1">
                    <Badge variant="secondary" className="text-xs">
                      {column.type}
                    </Badge>
                    <Button size="sm" className="bg-white shadow-lg" onClick={() => onEditColumn(section, column.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
