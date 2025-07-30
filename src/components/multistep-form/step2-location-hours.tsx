"use client"

import type { UseFormReturn } from "react-hook-form"
import type { FormData } from "./multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, MapPin } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useGoogleMaps } from '@/lib/hooks/useGoogleMaps'

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
]

interface Step2Props {
  form: UseFormReturn<FormData>
}

export default function Step2LocationHours({ form }: Step2Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const isGoogleLoaded = useGoogleMaps()
  const [isDaysDropdownOpen, setIsDaysDropdownOpen] = useState(false)
   
  const mapRef = useRef<HTMLDivElement>(null)
  const daysDropdownRef = useRef<HTMLDivElement>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = form

  const timings = watch("timings") || []

  // Create/Update marker
  const updateMarker = (lat: number, lng: number) => {
    if (!map) return

    // Remove old marker
    if (marker) {
      marker.setMap(null)
    }

    // Create new marker
    const newMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
      draggable: true,
    })

    // Update map view
    map.setCenter({ lat, lng })
    map.setZoom(15)

    setMarker(newMarker)

    // Handle marker drag
    newMarker.addListener("dragend", () => {
      const pos = newMarker.getPosition()
      if (pos) {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: pos }, (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address
            if (addressInputRef.current) {
              addressInputRef.current.value = address
            }
            setValue("address", address)
            setValue("pinLocation", { lat: pos.lat(), lng: pos.lng() })
            clearErrors(["address", "pinLocation"])
          }
        })
      }
    })
  }

  // Initialize Map
  useEffect(() => {
    if (!isGoogleLoaded || !mapRef.current || map) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 10,
      disableDefaultUI: true,
      zoomControl: true,
    })

    // Map click handler
    mapInstance.addListener("click", (e: any) => {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()

      updateMarker(lat, lng)

      // Get address for clicked location
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address
          if (addressInputRef.current) {
            addressInputRef.current.value = address
          }
          setValue("address", address)
          setValue("pinLocation", { lat, lng })
          clearErrors(["address", "pinLocation"])
        }
      })
    })

    setMap(mapInstance)
  }, [isGoogleLoaded])

  // Setup Autocomplete
  useEffect(() => {
    if (!isGoogleLoaded || !addressInputRef.current || !map) return

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      types: ["address"],
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()

      console.log("Place selected:", place) // Debug log

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const address = place.formatted_address || place.name || ""

        console.log("Updating marker at:", lat, lng) // Debug log

        // Update marker and map
        updateMarker(lat, lng)

        // Update form
        setValue("address", address)
        setValue("pinLocation", { lat, lng })
        clearErrors(["address", "pinLocation"])

        console.log("Form updated") // Debug log
      }
    })

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [isGoogleLoaded, map])

  // Manual address search
  const searchAddress = (address: string) => {
    if (!address.trim() || !map) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location
        const lat = location.lat()
        const lng = location.lng()
        const formattedAddress = results[0].formatted_address

        updateMarker(lat, lng)

        if (addressInputRef.current) {
          addressInputRef.current.value = formattedAddress
        }
        setValue("address", formattedAddress)
        setValue("pinLocation", { lat, lng })
        clearErrors(["address", "pinLocation"])
      }
    })
  }

  const toggleDay = (day: string) => {
    const dayLabel = DAYS_OF_WEEK.find(d => d.id === day)?.label || day
    const existingTiming = timings.find(t => t.dayOfWeek === dayLabel)
    
    let updatedTimings
    if (existingTiming) {
      // Remove the day if it exists
      updatedTimings = timings.filter(t => t.dayOfWeek !== dayLabel)
    } else {
      // Add new day with default times
      const newTiming = {
        dayOfWeek: dayLabel,
        openTime: "09:00",
        closeTime: "18:00",
        isClosed: false
      }
      updatedTimings = [...timings, newTiming]
    }
    
    setValue("timings", updatedTimings, { shouldValidate: true })
    
    // Validate the updated timings
    const validationError = validateTimings(updatedTimings)
    if (validationError) {
      form.setError("timings", { message: validationError })
    } else {
      clearErrors("timings")
    }
  }

  const updateTiming = (dayOfWeek: string, field: "openTime" | "closeTime", value: string) => {
    const updatedTimings = timings.map(timing => 
      timing.dayOfWeek === dayOfWeek 
        ? { ...timing, [field]: value }
        : timing
    )
    setValue("timings", updatedTimings, { shouldValidate: true })
    validateTimings(updatedTimings)
  }

  // Validation function for working days and times
  const validateTimings = (currentTimings: typeof timings) => {
    // Check if at least one day is selected
    if (currentTimings.length === 0) {
      return "Please select at least one working day"
    }

    // Check for time conflicts (open time same as close time)
    for (const timing of currentTimings) {
      if (timing.openTime === timing.closeTime) {
        return `Open time and close time cannot be the same for ${timing.dayOfWeek}`
      }
      if (timing.openTime > timing.closeTime) {
        return `Open time cannot be later than close time for ${timing.dayOfWeek}`
      }
    }

    clearErrors("timings")
    return null
  }

  // Validate timings whenever they change
  useEffect(() => {
    const validationError = validateTimings(timings)
    if (validationError) {
      form.setError("timings", { message: validationError })
    }
  }, [timings])

  // Initial validation on component mount
  useEffect(() => {
    if (timings.length === 0) {
      form.setError("timings", { message: "Please select at least one working day" })
    }
  }, [])

  const getSelectedDaysLabel = () => {
    if (timings.length === 0) return "Click to select your working days"
    if (timings.length === 7) return "All days selected"
    if (timings.length === 1) return `${timings[0].dayOfWeek} selected`
    return `${timings.length} days selected: ${timings.map(t => t.dayOfWeek).join(", ")}`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (daysDropdownRef.current && !daysDropdownRef.current.contains(event.target as Node)) {
        setIsDaysDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Location & Hours</h1>
        <p className="text-gray-600 text-lg">Let patients know where and when to find you</p>
      </div>

      <div className="space-y-8">
        {/* Working Days Section */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-2 block">Working Days</Label>
          <p className="text-xs text-gray-500 mb-3">Select the days you'll be available and set your hours for each day</p>
          <div className="relative" ref={daysDropdownRef}>
            <button
              type="button"
              onClick={() => setIsDaysDropdownOpen(!isDaysDropdownOpen)}
              className={`w-full h-12 px-4 text-left text-base rounded-full border ${
                errors.timings ? "border-red-500" : "border-[#E7E7E7]"
              } shadow-sm focus:border-teal-500 focus:ring-teal-500 flex items-center justify-between bg-white hover:border-gray-400 transition-colors`}
            >
              <span className={`${errors.timings ? "text-red-500" : "text-gray-700"}`}>
                {getSelectedDaysLabel()}
              </span>
              <ChevronDown
                className={`h-5 w-5 ${errors.timings ? "text-red-500" : "text-gray-400"} transition-transform ${isDaysDropdownOpen ? "transform rotate-180" : ""}`}
              />
            </button>

            {isDaysDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg max-h-96 overflow-y-auto">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = timings.some(t => t.dayOfWeek === day.label)
                  return (
                    <div key={day.id}>
                      <div
                        onClick={() => toggleDay(day.id)}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center transition-colors ${
                          isSelected ? "bg-teal-50" : ""
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                            isSelected ? "bg-teal-500 border-teal-500" : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">{day.label}</span>
                      </div>
                      {isSelected && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-gray-500">Open Time</Label>
                              <Input
                                type="time"
                                value={timings.find(t => t.dayOfWeek === day.label)?.openTime || "09:00"}
                                onChange={(e) => updateTiming(day.label, "openTime", e.target.value)}
                                className={`h-8 text-sm ${
                                  (() => {
                                    const timing = timings.find(t => t.dayOfWeek === day.label)
                                    return timing && (timing.openTime === timing.closeTime || timing.openTime > timing.closeTime)
                                      ? "border-red-500 focus:border-red-500"
                                      : ""
                                  })()
                                }`}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">Close Time</Label>
                              <Input
                                type="time"
                                value={timings.find(t => t.dayOfWeek === day.label)?.closeTime || "18:00"}
                                onChange={(e) => updateTiming(day.label, "closeTime", e.target.value)}
                                className={`h-8 text-sm ${
                                  (() => {
                                    const timing = timings.find(t => t.dayOfWeek === day.label)
                                    return timing && (timing.openTime === timing.closeTime || timing.openTime > timing.closeTime)
                                      ? "border-red-500 focus:border-red-500"
                                      : ""
                                  })()
                                }`}
                              />
                            </div>
                          </div>
                          {(() => {
                            const timing = timings.find(t => t.dayOfWeek === day.label)
                            if (timing && timing.openTime === timing.closeTime) {
                              return <p className="text-red-500 text-xs mt-1">Open and close times cannot be the same</p>
                            }
                            if (timing && timing.openTime > timing.closeTime) {
                              return <p className="text-red-500 text-xs mt-1">Open time cannot be later than close time</p>
                            }
                            return null
                          })()}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          {errors.timings && <p className="text-red-500 text-sm mt-2">{errors.timings.message}</p>}
        </div>

        {/* Address Section */}
        <div>
          <Label htmlFor="address" className="text-sm font-medium text-gray-900 mb-2 block">
            Your Address
          </Label>
          <div className="relative mb-6">
            <input
              id="address"
              name="address"
              ref={addressInputRef}
              placeholder="Start typing your address..."
              className={`w-full h-12 px-4 text-base rounded-full border ${
                errors.address ? "border-red-500" : "border-[#E7E7E7]"
              } shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none transition-colors`}
              autoComplete="off"
              type="text"
              onChange={(e) => {
                if (e.target.value.trim()) {
                  clearErrors("address")
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  searchAddress((e.target as HTMLInputElement).value)
                }
              }}
            />
            {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>}
          </div>

          {/* Map Section */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Pin Location</Label>
            <div className="relative">
              <div
                ref={mapRef}
                className="w-full h-80 bg-gray-50 rounded-lg border border-gray-200"
                style={{ minHeight: "320px" }}
              >
                {!isGoogleLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                      <p className="text-gray-600 text-base font-medium">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Click on the map or search by address above
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pac-container {
          margin-top: 4px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #d1d5db !important;
          z-index: 9999 !important;
        }
        .pac-item {
          padding: 8px 12px !important;
          cursor: pointer !important;
        }
        .pac-item:hover {
          background-color: #f3f4f6 !important;
        }
      `}</style>
    </div>
  )
}
