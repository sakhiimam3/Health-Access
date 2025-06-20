"use client"

import type React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Column } from "@/types/cmstype"

interface ListEditorProps {
  column: Column
  onChange: (updatedColumn: Column) => void
}

export const ListEditor: React.FC<ListEditorProps> = ({ column, onChange }) => {
  const listContent = typeof column.content === "object" && column.content.items ? column.content.items : []

  const updateItem = (index: number, value: string) => {
    const newItems = [...listContent]
    newItems[index] = value
    onChange({
      ...column,
      content: { items: newItems },
    })
  }

  const removeItem = (index: number) => {
    const newItems = listContent.filter((_, i) => i !== index)
    onChange({
      ...column,
      content: { items: newItems },
    })
  }

  const addItem = () => {
    const newItems = [...listContent, `Item ${listContent.length + 1}`]
    onChange({
      ...column,
      content: { items: newItems },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">List Items</label>
        {listContent.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input value={item} onChange={(e) => updateItem(index, e.target.value)} placeholder={`Item ${index + 1}`} />
            <Button size="sm" variant="outline" onClick={() => removeItem(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button size="sm" variant="outline" onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  )
}
