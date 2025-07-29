"use client"

import React from "react"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Section, Column } from "@/lib/cms/cms-type"

import { ColumnEditorModal } from "./column-editor-modal"
import { SectionEditorModal } from "./section-editor-modal"

interface EditorModalProps {
  isOpen: boolean
  modalType: string
  editingSection: Section | null
  editingColumn: Column | null
  previewFile: string | null
  onClose: () => void
  onSaveSection: () => void
  onSaveColumn: () => void
  onSectionChange: (section: Section) => void
  onColumnChange: (column: Column) => void
  onEditColumn: (section: Section, columnId: string) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => void
}

export const isColumnFilled = (column: Column) => {
  if (!column.type) return false;
  
  if (column.type === "text") {
    return typeof column.content === "string" && column.content.trim().length > 0;
  }
  
  if (column.type === "image" || column.type === "video") {
    if (typeof column.content === "string") {
      try {
        const content = JSON.parse(column.content as string);
        return content && content.src;
      } catch (e) {
        return typeof column.content === "string" && 
               (column.content.startsWith("http") || column.content.startsWith("/"));
      }
    }
    // If content is a File (for deferred upload)
    if (typeof window !== 'undefined' && typeof File !== 'undefined' && column.content instanceof File) {
      return true;
    }
    return false;
  }
  
  if (column.type === "list") {
    let content;
    if (typeof column.content === "string") {
      try {
        content = JSON.parse(column.content);
      } catch (e) {
        return false;
      }
    } else if (typeof column.content === "object" && column.content !== null) {
      content = column.content;
    }
    return content && Array.isArray(content.items) && content.items.length > 0;
  }
  
  return false;
};

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  modalType,
  editingSection,
  editingColumn,
  previewFile,
  onClose,
  onSaveSection,
  onSaveColumn,
  onSectionChange,
  onColumnChange,
  onEditColumn,
  onFileUpload,
}) => {
  // Get a more descriptive title based on content type
  const getModalTitle = () => {
    if (modalType === "section") {
      return "Edit Section";
    }
    
    if (editingColumn) {
      const contentType = editingColumn.type.charAt(0).toUpperCase() + editingColumn.type.slice(1);
      return `Edit ${contentType} Content`;
    }
    
    return "Edit Content";
  };

  // Check if current column is filled
  const isCurrentColumnFilled = () => {
    if (modalType === "column" && editingColumn) {
      return isColumnFilled(editingColumn);
    }
    return true;
  };

  // Determine required columns for layout
  const requiredColumns = {
    two_column: 2,
    three_column: 4,
    four_column: 9,
  }[editingSection?.layout || ''] || 1;

  // Determine if this is a new section - check if section exists in the actual sections list
  const isNewSection = modalType === 'section' && (!editingSection?.id || editingSection?.id.startsWith('new') || editingSection?.id.includes('temp'));

  // Handle save button click
  const handleSave = () => {
    if (modalType === "section") {
      onSaveSection();
    } else {
      onSaveColumn();
    }
  };

  // Handle close button click
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {modalType === "section" && editingSection && (
            <SectionEditorModal
              section={editingSection}
              onSectionChange={onSectionChange}
              onEditColumn={onEditColumn}
            />
          )}

          {modalType === "column" && editingColumn && (
            <ColumnEditorModal
              column={editingColumn}
              previewFile={previewFile}
              onChange={onColumnChange}
              onFileUpload={onFileUpload}
            />
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={
              (modalType === "section" && editingSection && editingSection.columns.length < requiredColumns)
              || (modalType === "column" && !isCurrentColumnFilled())
            }
          >
            <Save className="w-4 h-4 mr-2" />
            {modalType === "column" && !isCurrentColumnFilled() 
              ? "Fill Column First" 
              : modalType === 'section' 
                ? (isNewSection ? 'Create' : 'Update')
                : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
