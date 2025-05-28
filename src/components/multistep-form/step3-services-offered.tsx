"use client"

import type { UseFormReturn } from "react-hook-form"
import type { FormData } from "./multi-step-form"
import { useState } from "react"
import { ChevronRight, Check, X } from "lucide-react"
import { useGetServices } from "@/lib/hooks"

interface Step3Props {
  form: UseFormReturn<FormData>
}

interface Service {
  id: string
  name: string
  category: string
  parentId?: string
  level: number
  children?: Service[]
}

// Pharmacy Services (Multiple Categories)
const pharmacyServicesData: Service[] = [
  {
    id: "vaccination",
    name: "Vaccination Services",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "covid-vaccine", name: "COVID-19 Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "flu-vaccine", name: "Flu Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "travel-vaccine", name: "Travel Vaccines", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "hpv-vaccine", name: "HPV Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
    ],
  },
  {
    id: "mens-health",
    name: "Men's Health",
    category: "pharmacy",
    level: 0,
    children: [
      {
        id: "erectile-dysfunction",
        name: "Erectile Dysfunction",
        category: "pharmacy",
        parentId: "mens-health",
        level: 1,
      },
      { id: "hair-loss", name: "Hair Loss Treatment", category: "pharmacy", parentId: "mens-health", level: 1 },
      { id: "testosterone", name: "Testosterone Therapy", category: "pharmacy", parentId: "mens-health", level: 1 },
    ],
  },
  {
    id: "womens-health",
    name: "Women's Health",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "contraception", name: "Contraception", category: "pharmacy", parentId: "womens-health", level: 1 },
      { id: "uti-treatment", name: "UTI Treatment", category: "pharmacy", parentId: "womens-health", level: 1 },
      { id: "menopause", name: "Menopause Support", category: "pharmacy", parentId: "womens-health", level: 1 },
    ],
  },
  {
    id: "pharmacy-first",
    name: "Pharmacy 1st Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure Monitoring",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "wellness",
    name: "Wellness Services",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "weight-management", name: "Weight Management", category: "pharmacy", parentId: "wellness", level: 1 },
      { id: "nutrition-advice", name: "Nutrition Advice", category: "pharmacy", parentId: "wellness", level: 1 },
      { id: "health-screening", name: "Health Screening", category: "pharmacy", parentId: "wellness", level: 1 },
    ],
  },
  {
    id: "consultation",
    name: "Consultation Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "delivery",
    name: "Delivery Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "emergency",
    name: "Emergency Services",
    category: "pharmacy",
    level: 0,
  },
]

// Aesthetic Services (Separate Section)
const aestheticServicesData: Service[] = [
  {
    id: "skin-boosters",
    name: "Skin Boosters",
    category: "aesthetic",
    level: 0,
    children: [
      { id: "profhilo", name: "Profhilo", category: "aesthetic", parentId: "skin-boosters", level: 1 },
      { id: "seventy-hyal", name: "Seventy Hyal", category: "aesthetic", parentId: "skin-boosters", level: 1 },
      { id: "jalupro", name: "Jalupro", category: "aesthetic", parentId: "skin-boosters", level: 1 },
    ],
  },
  {
    id: "dermal-fillers",
    name: "Dermal Fillers",
    category: "aesthetic",
    level: 0,
    children: [
      { id: "lip-fillers", name: "Lip Fillers", category: "aesthetic", parentId: "dermal-fillers", level: 1 },
      { id: "cheek-fillers", name: "Cheek Fillers", category: "aesthetic", parentId: "dermal-fillers", level: 1 },
      { id: "nose-fillers", name: "Nose Fillers", category: "aesthetic", parentId: "dermal-fillers", level: 1 },
    ],
  },
  {
    id: "polynucleotides",
    name: "Polynucleotides",
    category: "aesthetic",
    level: 0,
  },
  {
    id: "anti-sweat",
    name: "Anti-Sweat Injections",
    category: "aesthetic",
    level: 0,
  },
  {
    id: "anti-wrinkle",
    name: "Anti-wrinkle Injections",
    category: "aesthetic",
    level: 0,
  },
]

export default function Step3ServicesOffered({ form }: Step3Props) {
  const [selectedPharmacyService, setSelectedPharmacyService] = useState<string | null>(null)
  const [selectedAestheticService, setSelectedAestheticService] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const {data:serviesData,isLoading}=useGetServices()
   console.log(serviesData,"serviesData")

  const {
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = form

  const selectedServices = watch("selectedServices") || []

  const toggleService = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id)

    if (isSelected) {
      // Remove service and all its children
      const updatedServices = selectedServices.filter((s) => s.id !== service.id && !s.id.startsWith(service.id + "-"))
      setValue("selectedServices", updatedServices)
    } else {
      // Add service
      const newService = {
        id: service.id,
        name: service.name,
        category: service.category,
        parentId: service.parentId,
        level: service.level,
      }
      setValue("selectedServices", [...selectedServices, newService])
    }

    // Trigger validation after change
    trigger("selectedServices")
  }

  

  const removeService = (serviceId: string) => {
    const updatedServices = selectedServices.filter((s) => s.id !== serviceId)
    setValue("selectedServices", updatedServices)
    trigger("selectedServices")
  }

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId)
  }

  const getChildServices = (parentId: string, category: "pharmacy" | "aesthetic") => {
    const data = category === "pharmacy" ? pharmacyServicesData : aestheticServicesData
    const parent = data.find((s) => s.id === parentId)
    return parent?.children || []
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Services Offered</h1>
        <p className="text-gray-600 text-lg">Select the services your pharmacy provides</p>
      </div>

      {/* Multi-Select Display */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-900 mb-2 block">Selected Services</label>
        <div className="min-h-[60px] p-4 border border-gray-300 rounded-lg bg-white focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
          {selectedServices.length === 0 ? (
            <span className="text-gray-500">No services selected...</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                >
                  <span>{service.name}</span>
                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.selectedServices && <p className="text-red-500 text-sm mt-2">{errors.selectedServices.message}</p>}
      </div>

      {/* Service Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Service Categories */}
        <div className="space-y-8">
          {/* Pharmacy Services Section */}
          <div>
            <h3 className="text-lg font-semibold text-teal-600 mb-4">Pharmacy Services</h3>
            <div className="grid grid-cols-2 gap-2">
              {pharmacyServicesData.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setSelectedPharmacyService(service.id)
                    setSelectedAestheticService(null)
                    toggleService(service)
                  }}
                  className={`p-3 text-left rounded-lg border transition-all text-sm ${
                    selectedPharmacyService === service.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isServiceSelected(service.id) ? "ring-2 ring-teal-500" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-xs leading-tight">{service.name}</span>
                    <div className="flex items-center space-x-1">
                      {isServiceSelected(service.id) && <Check className="w-3 h-3 text-teal-500" />}
                      {service.children && <ChevronRight className="w-3 h-3 text-gray-400" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Services Section */}
          <div>
            <h3 className="text-lg font-semibold text-teal-600 mb-4">Aesthetic Services</h3>
            <div className="grid grid-cols-2 gap-2">
              {aestheticServicesData.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setSelectedAestheticService(service.id)
                    setSelectedPharmacyService(null)
                    toggleService(service)
                  }}
                  className={`p-3 text-left rounded-lg border transition-all text-sm ${
                    selectedAestheticService === service.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isServiceSelected(service.id) ? "ring-2 ring-teal-500" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-xs leading-tight">{service.name}</span>
                    <div className="flex items-center space-x-1">
                      {isServiceSelected(service.id) && <Check className="w-3 h-3 text-teal-500" />}
                      {service.children && <ChevronRight className="w-3 h-3 text-gray-400" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Sub-Services */}
        {(selectedPharmacyService || selectedAestheticService) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sub-Services</h3>
            <div className="space-y-2">
              {selectedPharmacyService &&
                getChildServices(selectedPharmacyService, "pharmacy").map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      isServiceSelected(service.id)
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                      {isServiceSelected(service.id) && <Check className="w-4 h-4 text-teal-500" />}
                    </div>
                  </button>
                ))}
              {selectedAestheticService &&
                getChildServices(selectedAestheticService, "aesthetic").map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      isServiceSelected(service.id)
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                      {isServiceSelected(service.id) && <Check className="w-4 h-4 text-teal-500" />}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Column 3: Placeholder for future expansion */}
        <div className="hidden lg:block">{/* This column can be used for additional sub-categories if needed */}</div>
      </div>
    </div>
  )
}
