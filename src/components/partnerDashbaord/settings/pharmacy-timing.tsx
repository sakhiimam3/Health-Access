"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Check, X } from "lucide-react"

interface DayTiming {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

export function PharmacyTiming() {
  const [timings, setTimings] = useState<DayTiming[]>([
    { day: "Monday", enabled: true, startTime: "10:00", endTime: "01:00" },
    { day: "Tuesday", enabled: true, startTime: "10:00", endTime: "01:00" },
    { day: "Wednesday", enabled: true, startTime: "10:00", endTime: "01:00" },
    { day: "Thursday", enabled: true, startTime: "10:00", endTime: "01:00" },
    { day: "Friday", enabled: true, startTime: "10:00", endTime: "01:00" },
    { day: "Saturday", enabled: true, startTime: "10:00", endTime: "01:00" },
  ])

  const updateTiming = (index: number, field: keyof DayTiming, value: string | boolean) => {
    const updatedTimings = [...timings]
    updatedTimings[index] = { ...updatedTimings[index], [field]: value }
    setTimings(updatedTimings)
  }

  const CustomToggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform flex items-center justify-center`}
      >
        {checked ? (
          <Check className="h-2.5 w-2.5 text-green-500" strokeWidth={3} />
        ) : (
          <X className="h-2.5 w-2.5 text-gray-400" strokeWidth={3} />
        )}
      </span>
    </button>
  )

  // Group days into pairs for 2-column layout
  const dayPairs = []
  for (let i = 0; i < timings.length; i += 2) {
    if (i + 1 < timings.length) {
      dayPairs.push([timings[i], timings[i + 1]])
    } else {
      dayPairs.push([timings[i]])
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-ubuntu font-bold text-gray-900">Pharmacy Timing</h2>

      <div className="space-y-8">
        {/* Paired days in 2-column grid */}
        {dayPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-2 gap-8">
            {pair.map((timing, dayIndex) => {
              const actualIndex = pairIndex * 2 + dayIndex
              return (
                <div key={timing.day} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-roboto font-semibold text-gray-900">{timing.day}</h3>
                    <CustomToggle
                      checked={timing.enabled}
                      onChange={(checked) => updateTiming(actualIndex, "enabled", checked)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-roboto mb-2">Start Time</p>
                      <div className="relative">
                        <input
                          type="text"
                          value={timing.startTime + " AM"}
                          onChange={(e) => {
                            const value = e.target.value.replace(" AM", "").replace(" PM", "")
                            updateTiming(actualIndex, "startTime", value)
                          }}
                          disabled={!timing.enabled}
                          className="w-full  py-3 px-4 pr-10 border border-gray-200 rounded-[20px] shadow-sm text-gray-900 font-roboto focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-roboto mb-2">End Time</p>
                      <div className="relative">
                        <input
                          type="text"
                          value={timing.endTime + " PM"}
                          onChange={(e) => {
                            const value = e.target.value.replace(" AM", "").replace(" PM", "")
                            updateTiming(actualIndex, "endTime", value)
                          }}
                          disabled={!timing.enabled}
                          className="w-full py-3 px-4 pr-10 border border-gray-200 rounded-[20px] shadow-sm text-gray-900 font-roboto focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <Button className="bg-teal-500 hover:bg-teal-600 font-roboto font-semibold px-8 py-2.5">Save Changes</Button>
      </div>
    </div>
  )
}
