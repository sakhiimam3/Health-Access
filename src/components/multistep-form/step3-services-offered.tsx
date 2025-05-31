"use client"

import type { UseFormReturn } from "react-hook-form"
import type { FormData } from "./multi-step-form"
import { useState } from "react"
import { ChevronRight, Check, X, Loader2 } from "lucide-react"
import { useGetServices, useGetSeriveTypes } from "@/lib/hooks"

interface Step3Props {
  form: UseFormReturn<FormData>
}

interface Service {
  id: string
  name: string
  typeId?: string
  parentId?: string
  level: number
}

export default function Step3ServicesOffered({ form }: Step3Props) {
  // State for tracking selections in each column
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null)
  const [selectedSubParentId, setSelectedSubParentId] = useState<string | null>(null)

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
  } = form

  const selectedServices = watch("selectedServices") || []

  // Fetch service types
  const { data: serviceTypesData, isLoading: typesLoading } = useGetSeriveTypes()

  // Fetch main services based on selected type
  const { data: mainServicesData, isLoading: mainServicesLoading } = useGetServices({
    typeId: selectedTypeId || undefined,
  })

  // Fetch child services based on selected parent
  const { data: childServicesData, isLoading: childServicesLoading } = useGetServices({
    parentId: selectedParentId || undefined,
  })

  // Fetch sub-child services based on selected sub-parent
  const { data: subChildServicesData, isLoading: subChildServicesLoading } = useGetServices({
    parentId: selectedSubParentId || undefined,
  })

  const toggleService = (service: Service) => {
    const isSelected = selectedServices.some((s) => s === service.id)

    if (isSelected) {
      const updatedServices = selectedServices.filter((s) => s !== service.id)
      setValue("selectedServices", updatedServices)
    } else {
      setValue("selectedServices", [...selectedServices, service.id])
    }

    trigger("selectedServices")
  }

  const removeService = (serviceId: string) => {
    const updatedServices = selectedServices.filter((s) => s !== serviceId)
    setValue("selectedServices", updatedServices)
    trigger("selectedServices")
  }

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s === serviceId)
  }

  // Handle service type selection
  const handleServiceTypeClick = (typeId: string) => {
    setSelectedTypeId(typeId)
    setSelectedParentId(null)
    setSelectedSubParentId(null)
  }

  // Handle main service selection
  const handleMainServiceClick = (service: any) => {
    setSelectedParentId(service.id)
    setSelectedSubParentId(null)

    toggleService({
      id: service.id,
      name: service.name,
      typeId: selectedTypeId || undefined,
      level: 0,
    })
  }

  // Handle child service selection
  const handleChildServiceClick = (service: any) => {
    setSelectedSubParentId(service.id)

    toggleService({
      id: service.id,
      name: service.name,
      parentId: selectedParentId || undefined,
      level: 1,
    })
  }

  // Handle sub-child service selection
  const handleSubChildServiceClick = (service: any) => {
    toggleService({
      id: service.id,
      name: service.name,
      parentId: selectedSubParentId || undefined,
      level: 2,
    })
  }

  // Loading skeleton component
  const LoadingSkeleton = ({ count = 3 }: { count?: number }) => (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  )

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
        <div className="min-h-[60px] p-4 border border-[#E7E7E7] rounded-[20px] bg-white shadow-sm focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
          {selectedServices.length === 0 ? (
            <span className="text-gray-500">No services selected...</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((serviceId) => (
                <div
                  key={serviceId}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-800 rounded-[20px] text-sm border border-teal-200"
                >
                  <span>{serviceId}</span>
                  <button
                    type="button"
                    onClick={() => removeService(serviceId)}
                    className="hover:bg-teal-100 rounded-full p-0.5 transition-colors"
                    disabled={isSubmitting}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Service Types & Main Services */}
        <div className="space-y-6">
          {typesLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
              <span className="ml-2 text-gray-600">Loading service types...</span>
            </div>
          ) : (
            serviceTypesData?.data?.map((type: any) => (
              <div key={type.id} className="space-y-3">
                {/* Service Type Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg capitalize font-semibold text-teal-600">{type.name}</h3>
                  {selectedTypeId !== type.id && (
                    <button
                      type="button"
                      onClick={() => handleServiceTypeClick(type.id)}
                      className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
                      disabled={isSubmitting}
                    >
                      View Services
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>

                {/* Main Services for this type */}
                {selectedTypeId === type.id && (
                  <div className="space-y-2">
                    {mainServicesLoading ? (
                      <LoadingSkeleton count={4} />
                    ) : mainServicesData?.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                        No services available for {type.name}
                      </div>
                    ) : (
                      mainServicesData?.map((service: any) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleMainServiceClick(service)}
                          disabled={isSubmitting}
                          className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                            selectedParentId === service.id ? "border-teal-500 bg-teal-50" : "hover:border-gray-300"
                          } ${isServiceSelected(service.id) ? "ring-2 ring-teal-500" : ""} ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                            <div className="flex items-center space-x-1">
                              {isServiceSelected(service.id) && <Check className="w-4 h-4 text-teal-500" />}
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Column 2: Child Services */}
        <div>
          {selectedParentId && (
            <>
              <h3 className="text-lg font-semibold capitalize text-teal-600 mb-4">Sub-Services</h3>
              <div className="space-y-2">
                {childServicesLoading ? (
                  <LoadingSkeleton count={3} />
                ) : childServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No sub-services available
                  </div>
                ) : (
                  childServicesData?.map((service: any) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleChildServiceClick(service)}
                      disabled={isSubmitting}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                        selectedSubParentId === service.id ? "border-teal-500 bg-teal-50" : "hover:border-gray-300"
                      } ${isServiceSelected(service.id) ? "ring-2 ring-teal-500" : ""} ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                        <div className="flex items-center space-x-1">
                          {isServiceSelected(service.id) && <Check className="w-4 h-4 text-teal-500" />}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Column 3: Sub-Child Services */}
        <div>
          {selectedSubParentId && (
            <>
              <h3 className="text-lg font-semibold capitalize text-teal-600 mb-4">Sub Sub Services</h3>
              <div className="space-y-2">
                {subChildServicesLoading ? (
                  <LoadingSkeleton count={2} />
                ) : subChildServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No additional options available
                  </div>
                ) : (
                  subChildServicesData?.map((service: any) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleSubChildServiceClick(service)}
                      disabled={isSubmitting}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                        isServiceSelected(service.id)
                          ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500"
                          : "hover:border-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">{service.name}</span>
                        {isServiceSelected(service.id) && <Check className="w-4 h-4 text-teal-500" />}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
