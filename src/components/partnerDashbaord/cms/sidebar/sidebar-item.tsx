"use client";

import type React from "react";
import { ChevronRight } from "lucide-react";
import type { SidebarItem as SidebarItemType } from "@/lib/cms/cms-type";

interface SidebarItemProps {
  item: SidebarItemType;
  editMode: boolean;
  onClick: (item: SidebarItemType) => void;
  selected?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  editMode,
  onClick,
  selected = false,
}) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item)}
      className={`group w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors
        ${editMode ?
          `hover:bg-[hsl(186.98deg,71.27%,35.49%)] hover:text-white active:bg-[hsl(186.98deg,71.27%,30%)]` :
          "opacity-60 cursor-not-allowed"}
        ${selected ? 'bg-[hsl(186.98deg,71.27%,35.49%)] text-white' : ''}`}
      disabled={!editMode}
    >
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
          ${editMode ?
            `bg-[hsl(186.98deg,71.27%,35.49%)] text-white group-hover:bg-[hsl(186.98deg,71.27%,30%)]` :
            "bg-gray-100 text-gray-400"}
          ${selected ? 'bg-[hsl(186.98deg,71.27%,35.49%)] text-white' : ''}`}
      >
        <Icon
          className={`w-4 h-4 ${editMode ? "text-white" : "text-gray-400"}`}
        />
      </div>
      <span
        className={`text-sm font-medium truncate flex-1
          ${editMode ? "text-gray-700 group-hover:text-white" : "text-gray-400"}
          ${selected ? 'text-white' : ''}`}
      >
        {item.label}
      </span>
      {editMode && (
        <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
      )}
    </button>
  );
};
