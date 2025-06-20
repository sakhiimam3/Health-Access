"use client"

import React from "react"
import { Type, ImageIcon, Video, List, Pencil, X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Section, Column } from "@/lib/cms/cms-type"
import { getLayoutDisplayName, generateId } from "@/lib/cms/cms-utils"
import { isColumnFilled } from "@/components/partnerDashbaord/cms/modals/editor-modal"

interface SectionEditorModalProps {
  section: Section
  onSectionChange: (section: Section) => void
  onEditColumn: (section: Section, columnId: string) => void
}

export const SectionEditorModal: React.FC<SectionEditorModalProps> = ({
  section,
  onSectionChange,
  onEditColumn,
}) => {
  // Helper function to get the icon for a content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "list":
        return <List className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  // Handle changing content type for a column
  const handleContentTypeChange = (columnId: string, newType: string) => {
    const updatedColumns = section.columns.map(column => {
      if (column.id === columnId) {
        // Set default content for the new type
        let defaultContent = "";
        if (newType === "list") {
          defaultContent = JSON.stringify({ items: ["Item 1", "Item 2", "Item 3"] });
        }
        
        return {
          ...column,
          type: newType as "text" | "image" | "video" | "list",
          content: defaultContent,
          updatedAt: new Date().toISOString()
        };
      }
      return column;
    });

    onSectionChange({
      ...section,
      columns: updatedColumns,
      updatedAt: new Date().toISOString()
    });
  };

  // Minimum columns for each layout
  const minColumns = {
    two_column: 2,
    three_column: 4,
    four_column: 9,
  }[section.layout] || 1;

  // Maximum columns for each layout
  const maxColumns = {
    two_column: 2,
    three_column: 4,
    four_column: 9,
  }[section.layout] || 1;

  // State for new column type selection
  const [newColumnType, setNewColumnType] = React.useState<"text"|"image"|"video"|"list">("text");

  // Add a new column
  const handleAddColumn = () => {
    const newColumn = {
      id: generateId(),
      type: newColumnType,
      content: newColumnType === "list" ? JSON.stringify({ items: ["Item 1"] }) : "",
      columnOrder: section.columns.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSectionChange({
      ...section,
      columns: [...section.columns, newColumn],
      updatedAt: new Date().toISOString(),
    });
  };

  // Remove a column
  const handleRemoveColumn = (columnId: string) => {
    const newColumns = section.columns.filter(col => col.id !== columnId)
      .map((col, idx) => ({ ...col, columnOrder: idx + 1 }));
    onSectionChange({
      ...section,
      columns: newColumns,
      updatedAt: new Date().toISOString(),
    });
  };

  // Determine if this is a layout block
  const isLayoutBlock = ["two_column", "three_column", "four_column"].includes(section.layout);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Section Title</label>
        <Input
          value={section.title}
          onChange={(e) => onSectionChange({ ...section, title: e.target.value })}
          placeholder="Enter section title"
        />
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="outline" className="text-sm">
            Layout: {getLayoutDisplayName(section.layout)}
          </Badge>
          <span className="text-sm text-gray-500">(Fixed - selected from sidebar)</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Column Content</label>
        {section.columns.length > 0 && (
          <div className="space-y-4">
            {section.columns
              .sort((a, b) => a.columnOrder - b.columnOrder)
              .map((column, index) => (
                <div key={column.id} className="border rounded-lg p-4 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getContentTypeIcon(column.type)}
                      <span className="font-medium">
                        {column.type.charAt(0).toUpperCase() + column.type.slice(1)} Content
                      </span>
                      {isColumnFilled(column) && (
                        <Badge variant="secondary" className="ml-2">Saved</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditColumn(section, column.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {isLayoutBlock && section.columns.length > minColumns && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveColumn(column.id)}
                          className="text-gray-500 hover:text-red-600"
                          title="Remove column"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* Add Column Controls - only for layout blocks */}
        {isLayoutBlock && (
          <div className="flex items-center gap-2 mt-4">
            <Select value={newColumnType} onValueChange={val => setNewColumnType(val as any)}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue>{newColumnType.charAt(0).toUpperCase() + newColumnType.slice(1)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white cursor-pointer">
  <SelectItem value="text">Text</SelectItem>
  <SelectItem value="image">Image</SelectItem>
  <SelectItem value="video">Video</SelectItem>
  <SelectItem value="list">List</SelectItem>
</SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddColumn}
              disabled={section.columns.length >= maxColumns}
            >
              <Plus className="w-4 h-4 mr-1" /> Add Column
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
