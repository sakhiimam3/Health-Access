import type React from "react"
export interface Column {
  id: string
  type: "text" | "image" | "video" | "list"
  content:
    | string
    | {
        src?: string
        alt?: string
        caption?: string
        title?: string
        description?: string
        items?: string[]
      }
  columnOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Section {
  id: string
  title: string
  layout: "one_column" | "two_column" | "three_column" | "four_column"
  isActive: boolean
  content?: string
  image?: string
  video?: string
  columns?: Column[]
  createdAt: string
  updatedAt: string
}

export interface SidebarItem {
  icon: React.ElementType
  label: string
  type: string
  category?: string
}

export interface ContentType {
  value: string
  label: string
  icon: React.ElementType
}
