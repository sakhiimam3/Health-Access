"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { useGetPartnerProfile, useUpdatePartnerLocation } from "@/lib/hooks"
import { toast } from "react-toastify"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGoogleMaps } from "@/lib/hooks/useGoogleMaps"

declare global {
  interface Window {
    google: any
  }
}

const locationSchema = z.object({
  location: z.object({
    name: z.string().min(1, "Location name is required"),
    latitude: z.number(),
    longitude: z.number(),
  }),
})

type LocationFormValues = z.infer<typeof locationSchema>

export function LocationSettings() {
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const isGoogleLoaded = useGoogleMaps()
  const mapRef = useRef(null)
  const addressInputRef = useRef(null)
  const { data: profile, isLoading: isLoadingProfile } = useGetPartnerProfile()
  const { mutate: updateLocation, isPending } = useUpdatePartnerLocation(profile?.data?.id || "")

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: {
        name: "",
        latitude: 0,
        longitude: 0,
      },
    },
  })

  const currentLocation = watch("location")

  // Load initial location from profile
  useEffect(() => {
    if (profile?.data?.location) {
      const { name, latitude, longitude } = profile.data.location
      setValue("location", {
        name,
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      })

      // Update address input
      if (addressInputRef.current) {
        addressInputRef.current.value = name
      }

      // Update map marker if map is loaded
      if (map) {
        updateMarker(Number.parseFloat(latitude), Number.parseFloat(longitude))
      }
    }
  }, [profile, map, setValue])

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

    // Update form values
    setValue("location.latitude", lat)
    setValue("location.longitude", lng)

    // Handle marker drag
    newMarker.addListener("dragend", () => {
      const pos = newMarker.getPosition()
      if (pos) {
        const newLat = pos.lat()
        const newLng = pos.lng()
        setValue("location.latitude", newLat)
        setValue("location.longitude", newLng)

        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: pos }, (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address
            if (addressInputRef.current) {
              addressInputRef.current.value = address
            }
            setValue("location.name", address)
          }
        })
      }
    })
  }

  // Initialize Map
  useEffect(() => {
    if (!isGoogleLoaded || !mapRef.current || map) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 53.4808, lng: -2.2426 }, // Manchester coordinates
      zoom: 15,
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
          setValue("location.name", address)
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

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const address = place.formatted_address || place.name || ""

        // Update marker and map
        updateMarker(lat, lng)

        // Update input and form
        if (addressInputRef.current) {
          addressInputRef.current.value = address
        }
        setValue("location.name", address)
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
        setValue("location.name", formattedAddress)
      }
    })
  }

  const onSubmit = (data: LocationFormValues) => {
    updateLocation(
      {
        location: {
          name: data.location.name,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        },
      },
      {
        onSuccess: () => {
          toast.success("Location updated successfully")
        },
        onError: (error) => {
          toast.error("Failed to update location")
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Location Settings</h2>

      {/* Address Input */}
      <div>
        <Label htmlFor="address" className="text-sm font-medium text-gray-900 mb-2 block">
          Your Address
        </Label>
        <div className="relative mb-6">
          <input
            id="address"
            ref={addressInputRef}
            placeholder="Start typing your address..."
            className="w-full h-12 px-4 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none transition-colors"
            autoComplete="off"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                searchAddress((e.target as HTMLInputElement).value)
              }
            }}
            onChange={(e) => {
              setValue("location.name", e.target.value)
            }}
          />
          {errors.location?.name && <p className="text-red-500 text-sm mt-1">{errors.location.name.message}</p>}
        </div>
      </div>

      {/* Map */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">Pin Location</Label>
        <div className="relative">
          <div ref={mapRef} className="w-full h-80 bg-gray-50 rounded-lg border border-gray-200">
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

      {/* Current Location Info */}
  

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isPending || !currentLocation.name}
          className="h-12 text-white rounded-full bg-teal-500 hover:bg-teal-600 shadow-sm"
        >
          {isPending ? "Saving..." : "Save Location"}
        </Button>
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
