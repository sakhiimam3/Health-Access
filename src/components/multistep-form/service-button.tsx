import { Check, ChevronRight } from "lucide-react"
import { useGetServices } from "@/lib/hooks"

interface ServiceButtonProps {
  serviceId: string
  serviceName: string
  isSelected: boolean
  onSelect: (service: any) => void
  typeId?: string
  parentId?: string
  level: number
}

export function ServiceButton({ 
  serviceId, 
  serviceName, 
  isSelected, 
  onSelect,
  typeId,
  parentId,
  level 
}: ServiceButtonProps) {
  const { data: childServices } = useGetServices({
    typeId: typeId,
    parentId: parentId
  })

  const hasChildren = childServices?.data && childServices.data.length > 0

  return (
    <button
      type="button"
      onClick={() => onSelect({
        id: serviceId,
        name: serviceName,
        typeId,
        parentId,
        level
      })}
      className={`p-3 text-left rounded-lg border transition-all text-sm ${
        isSelected
          ? "border-teal-500 bg-teal-50"
          : "border-gray-200 hover:border-gray-300"
      } ${isSelected ? "ring-2 ring-teal-500" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 text-xs leading-tight">{serviceName}</span>
        <div className="flex items-center space-x-1">
          {isSelected && <Check className="w-3 h-3 text-teal-500" />}
          {hasChildren && <ChevronRight className="w-3 h-3 text-gray-400" />}
        </div>
      </div>
    </button>
  )
} 