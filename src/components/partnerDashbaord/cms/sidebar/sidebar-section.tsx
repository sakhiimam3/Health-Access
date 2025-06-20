"use client"

import type React from "react"
import type { SidebarItem as SidebarItemType } from "@/lib/cms/cms-type"
import { SidebarItem } from "./sidebar-item"

interface SidebarSectionProps {
  title: string
  icon: React.ElementType
  items: SidebarItemType[]
  editMode: boolean
  onItemClick: (item: SidebarItemType) => void
  selectedType?: string
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ title, icon: Icon, items, editMode, onItemClick, selectedType }) => {
  return (
    <div className="px-4 py-5 ">
      <div className="flex items-center px-2 mb-3 group">
        <Icon className="w-4 h-4 text-green-[rgb(13,148,136)] group-hover:text-green-[rgb(13,148,136)] mr-2 transition-colors" />
        <h3 className="text-xs font-semibold text-green-[rgb(13,148,136)] group-hover:text-green-[rgb(13,148,136)] uppercase tracking-wider transition-colors">{title}</h3>
      </div>
      <div className="space-y-1 ">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} editMode={editMode} onClick={onItemClick} selected={item.type === selectedType} />
        ))}
      </div>
    </div>
  )
}
