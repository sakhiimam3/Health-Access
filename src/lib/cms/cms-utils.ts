import type { Section } from "@/lib/cms/cms-type"

export const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const createNewSection = (layout: string): Section => {
  const columnCount = layout === "one_column" ? 1 : layout === "two_column" ? 2 : layout === "three_column" ? 4 : 9
  const newSection: Section = {
    id: generateId(),
    title: "New Section",
    layout: layout as any,
    isActive: true,
    columns: Array.from({ length: columnCount }, (_, index) => ({
      id: generateId(),
      type: "text",
      content: `Column ${index + 1} content`,
      columnOrder: index + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return newSection
}

export const getDefaultContentForType = (type: string) => {
  switch (type) {
    case "text":
      return "Enter your text here"
    case "image":
      return ""  // Empty string for image, will be replaced with URL
    case "video":
      return ""  // Empty string for video, will be replaced with URL
    case "list":
      return JSON.stringify({ items: ["Item 1", "Item 2", "Item 3"] })
    default:
      return ""
  }
}

export const getColumnGridClass = (layout: string) => {
  switch (layout) {
    case "one_column":
      return "grid-cols-1"
    case "two_column":
      return "grid-cols-1 md:grid-cols-2"
    case "three_column":
      return "grid-cols-1 md:grid-cols-2" // 2x2 grid
    case "four_column":
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // 3x3 grid
    default:
      return "grid-cols-1"
  }
}

export const getLayoutDisplayName = (layout: string) => {
  switch (layout) {
    case "one_column":
      return "Single Content"
    case "two_column":
      return "2 Column Block"
    case "three_column":
      return "2x2 Grid Block"
    case "four_column":
      return "3x3 Grid Block"
    default:
      return layout.replace("_", " ")
  }
}

export const getLayoutColumnCount = (layout: string) => {
  switch (layout) {
    case "one_column":
      return 1
    case "two_column":
      return 2
    case "three_column":
      return 4 // 2x2 grid
    case "four_column":
      return 9 // 3x3 grid
    default:
      return 1
  }
}
