"use client"

import type React from "react"
import { Heart, Eye, Edit, X, Download, LayoutGrid, Columns2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarSection } from "./sidebar-section"
import type { SidebarItem as SidebarItemType } from "@/lib/cms/cms-type"
import { useState } from "react"

interface SidebarProps {
  sidebarItems: SidebarItemType[]
  editMode: boolean
  onSidebarItemClick: (item: SidebarItemType) => void
  onPreviewClick: () => void
  onEditModeToggle: () => void
  onPublishClick: () => void
  isPublishing?: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarItems = [],
  editMode,
  onSidebarItemClick,
  onPreviewClick,
  onEditModeToggle,
  onPublishClick,
  isPublishing = false,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const contentItems = sidebarItems?.filter((item) => item.category === "content") || [];
  const layoutItems = sidebarItems?.filter((item) => item.category === "layout") || [];

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item.type);
    onSidebarItemClick(item);
  };

  return (
    <div className="w-72 bg-white h-screen sticky top-0 flex flex-col border-r border-gray-200 z-10 overflow-x-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100 w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[hsl(186.98deg,71.27%,35.49%)] rounded-lg flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Health Access</h2>
            <p className="text-xs text-gray-500">Content Management System</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
        <SidebarSection
          title="Content Blocks"
          icon={LayoutGrid}
          items={contentItems}
          editMode={editMode}
          onItemClick={handleSidebarItemClick}
          selectedType={selectedItem}
        />

        <Separator className="my-2 mx-4" />

        <SidebarSection
          title="Layout Blocks"
          icon={Columns2}
          items={layoutItems}
          editMode={editMode}
          onItemClick={handleSidebarItemClick}
          selectedType={selectedItem}
        />
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 w-full">
        <div className="space-y-2">
          <Button onClick={onPreviewClick} className="w-full bg-[hsl(186.98deg,71.27%,35.49%)] text-white hover:bg-[hsl(186.98deg,71.27%,30%)] border-none" variant="default">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={onEditModeToggle} className={`w-full ${editMode ? "bg-red-600 text-white hover:bg-red-700" : ""}`} variant={editMode ? "destructive" : "default"}>
            {editMode ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Exit Edit Mode
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Enable Edit Mode
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
