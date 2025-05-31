"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EditProfile } from "./settings/edit-profile"
import { LocationSettings } from "./settings/location-settings"
import { PharmacyTiming } from "./settings/pharmacy-timing"
import { ChangePassword } from "./settings/change-password"


const settingsItems = [
  { id: "profile", label: "Edit Profile" },
  { id: "location", label: "Location" },
  { id: "timing", label: "Pharmacy Timing" },
  { id: "change password", label: "change password" },
]

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("profile")

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />
      case "location":
        return <LocationSettings />
      case "timing":
        return <PharmacyTiming />
      case "change password":
        return <ChangePassword />
      default:
        return <EditProfile />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <div className="p-4 border-b">
                  <h3 className="font-ubuntu font-semibold text-teal-600">Settings</h3>
                </div>
                {settingsItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full capitalize text-left px-4 py-3 text-sm font-roboto transition-colors hover:bg-gray-50",
                      activeTab === item.id ? "bg-gray-100 text-gray-900 border-r-2 border-teal-500" : "text-gray-600",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
