'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { FormData } from './multi-step-form'
import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Check, X, Loader2 } from 'lucide-react'
import { useGetServices, useGetSeriveTypes } from '@/lib/hooks'

interface Step3Props {
  form: UseFormReturn<FormData>
}

interface ServiceType {
  id: string
  name: string
}

interface ServiceData {
  id: string
  name: string
  typeId?: string
  parentId?: string
}

interface Service {
  id: string
  name: string
  typeId?: string
  parentId?: string
  level: number
}

interface SelectedService {
  id: string
  name: string
}

export default function Step3ServicesOffered({ form }: Step3Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // State for tracking selections in each column
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null)
  const [selectedSubParentId, setSelectedSubParentId] = useState<string | null>(
    null,
  )
  const [selectedServiceNames, setSelectedServiceNames] = useState<
    SelectedService[]
  >([])
  // Add new state to cache services data
  const [cachedMainServices, setCachedMainServices] = useState<{
    [key: string]: ServiceData[]
  }>({})
  const [cachedChildServices, setCachedChildServices] = useState<{
    [key: string]: ServiceData[]
  }>({})
  const [cachedSubChildServices, setCachedSubChildServices] = useState<{
    [key: string]: ServiceData[]
  }>({})

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
  } = form

  const selectedServices = watch('selectedServices') || []

  // Fetch service types
  const {
    data: serviceTypesData,
    isLoading: typesLoading,
  } = useGetSeriveTypes()

  // Fetch main services based on selected type
  const {
    data: mainServicesData,
    isLoading: mainServicesLoading,
  } = useGetServices({
    typeId: selectedTypeId || undefined,
  })

  // Cache main services when they change
  useEffect(() => {
    if (mainServicesData && selectedTypeId) {
      setCachedMainServices((prev) => ({
        ...prev,
        [selectedTypeId]: mainServicesData,
      }))
    }
  }, [mainServicesData, selectedTypeId])

  // Fetch child services based on selected parent
  const {
    data: childServicesData,
    isLoading: childServicesLoading,
  } = useGetServices({
    parentId: selectedParentId || undefined,
  })

  // Cache child services when they change
  useEffect(() => {
    if (childServicesData && selectedParentId) {
      setCachedChildServices((prev) => ({
        ...prev,
        [selectedParentId]: childServicesData,
      }))
    }
  }, [childServicesData, selectedParentId])

  // Fetch sub-child services based on selected sub-parent
  const {
    data: subChildServicesData,
    isLoading: subChildServicesLoading,
  } = useGetServices({
    parentId: selectedSubParentId || undefined,
  })

  // Cache sub-child services when they change
  useEffect(() => {
    if (subChildServicesData && selectedSubParentId) {
      setCachedSubChildServices((prev) => ({
        ...prev,
        [selectedSubParentId]: subChildServicesData,
      }))
    }
  }, [subChildServicesData, selectedSubParentId])

  const toggleService = (service: Service) => {
    const isSelected = selectedServices.some((s) => s === service.id)

    if (isSelected) {
      const updatedServices = selectedServices.filter((s) => s !== service.id)
      setValue('selectedServices', updatedServices)
      setSelectedServiceNames((prev) => prev.filter((s) => s.id !== service.id))
    } else {
      setValue('selectedServices', [...selectedServices, service.id])
      setSelectedServiceNames((prev) => [
        ...prev,
        { id: service.id, name: service.name },
      ])

      // Scroll to end after a short delay to ensure the new item is rendered
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth
        }
      }, 100)
    }

    trigger('selectedServices')
  }

  const removeService = (serviceId: string) => {
    const updatedServices = selectedServices.filter((s) => s !== serviceId)
    setValue('selectedServices', updatedServices)
    setSelectedServiceNames((prev) => prev.filter((s) => s.id !== serviceId))
    trigger('selectedServices')
  }

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s === serviceId)
  }

  // Handle service type selection
  const handleServiceTypeClick = (typeId: string) => {
    setSelectedTypeId(selectedTypeId === typeId ? null : typeId)
    setSelectedParentId(null)
    setSelectedSubParentId(null)
  }

  // Handle main service selection
  const handleMainServiceClick = (service: ServiceData) => {
    setSelectedParentId(service.id)
    setSelectedSubParentId(null)
  }

  // Handle child service selection
  const handleChildServiceClick = (service: ServiceData) => {
    setSelectedSubParentId(service.id)
  }

  // Handle sub-child service selection
  const handleSubChildServiceClick = (service: ServiceData) => {
    toggleService({
      id: service.id,
      name: service.name,
      parentId: selectedSubParentId || undefined,
      level: 2,
    })
  }

  // Update the counting functions to use cached data
  const getSelectedServicesCountByType = (typeId: string) => {
    return selectedServiceNames.filter((service) => {
      // Look through all cached sub-child services
      let foundSubService = false
      let foundParentService = false
      let foundMainService = false

      // Check in all cached sub-child services
      Object.values(cachedSubChildServices).forEach((services) => {
        const subService = services?.find((s) => s.id === service.id)
        if (subService) {
          foundSubService = true
          // Check in all cached child services
          Object.values(cachedChildServices).forEach((childServices) => {
            const parentService = childServices?.find(
              (s) => s.id === subService.parentId,
            )
            if (parentService) {
              foundParentService = true
              // Check in cached main services
              const mainServices = cachedMainServices[typeId] || []
              const mainService = mainServices.find(
                (s) => s.id === parentService.parentId,
              )
              if (mainService?.typeId === typeId) {
                foundMainService = true
              }
            }
          })
        }
      })

      return foundSubService && foundParentService && foundMainService
    }).length
  }

  const getSelectedServicesCountByParent = (parentId: string) => {
    return selectedServiceNames.filter((service) => {
      let found = false
      // Check in all cached sub-child services
      Object.values(cachedSubChildServices).forEach((services) => {
        const subService = services?.find((s) => s.id === service.id)
        if (subService) {
          // Check in all cached child services
          Object.values(cachedChildServices).forEach((childServices) => {
            const parentService = childServices?.find(
              (s) => s.id === subService.parentId,
            )
            if (parentService?.parentId === parentId) {
              found = true
            }
          })
        }
      })
      return found
    }).length
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
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Services Offered
        </h1>
        <p className="text-gray-600 text-lg">
          Select the services your pharmacy provides
        </p>
      </div>

      {/* Multi-Select Display */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-900 mb-2 block">
          Selected Services
        </label>
        <div className="min-h-[60px] p-4 border border-[#E7E7E7] rounded-[20px] bg-white shadow-sm focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 overflow-hidden">
          {selectedServiceNames.length === 0 ? (
            <span className="text-gray-500">No services selected...</span>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap"
            >
              {selectedServiceNames.map((service) => (
                <div
                  key={service.id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-800 rounded-[20px] text-sm border border-teal-200 flex-shrink-0"
                >
                  <span className="truncate">{service.name}</span>
                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="hover:bg-teal-100 rounded-full p-0.5 transition-colors flex-shrink-0"
                    disabled={isSubmitting}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.selectedServices && (
          <p className="text-red-500 text-sm mt-2">
            {errors.selectedServices.message}
          </p>
        )}
      </div>

      {/* Service Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Column 1: Service Types & Main Services */}
        <div className="space-y-6">
          {typesLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
              <span className="ml-2 text-gray-600">
                Loading service types...
              </span>
            </div>
          ) : (
            serviceTypesData?.data?.map((type: ServiceType) => (
              <div key={type.id} className="space-y-3">
                {/* Service Type Header */}
                <div
                  className="flex items-center justify-between cursor-pointer transition-all duration-300"
                  onClick={() => handleServiceTypeClick(type.id)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg capitalize font-semibold text-teal-600">
                      {type.name}
                    </h3>
                    {getSelectedServicesCountByType(type.id) > 0 && (
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                        {getSelectedServicesCountByType(type.id)}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ml-1 ${
                      selectedTypeId === type.id ? 'rotate-90' : ''
                    }`}
                  />
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
                      mainServicesData?.map((service: ServiceData) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleMainServiceClick(service)}
                          disabled={isSubmitting}
                          className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                            selectedParentId === service.id
                              ? 'border-teal-500 bg-teal-50'
                              : 'hover:border-gray-300'
                          } ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm">
                                {service.name}
                              </span>
                              {getSelectedServicesCountByParent(service.id) >
                                0 && (
                                <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                                  {getSelectedServicesCountByParent(service.id)}
                                </span>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
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
        <div
          className="sticky top-10 max-h-screen overflow-y-auto bg-white/95 backdrop-blur-sm pt-4 -mt-4"
          style={{ height: 'fit-content' }}
        >
          {selectedParentId && (
            <>
              <h3 className="text-lg font-semibold capitalize text-teal-600 mb-4">
                Child Services
              </h3>
              <div className="space-y-2">
                {childServicesLoading ? (
                  <LoadingSkeleton count={3} />
                ) : childServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No sub-services available
                  </div>
                ) : (
                  childServicesData?.map((service: ServiceData) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleChildServiceClick(service)}
                      disabled={isSubmitting}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                        selectedSubParentId === service.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'hover:border-gray-300'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">
                            {service.name}
                          </span>
                          {getSelectedServicesCountByParent(service.id) > 0 && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                              {getSelectedServicesCountByParent(service.id)}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Column 3: Sub-Child Services */}
        <div
          className="sticky top-10 max-h-screen overflow-y-auto bg-white/95 backdrop-blur-sm pt-4 -mt-4"
          style={{ height: 'fit-content' }}
        >
          {selectedSubParentId && (
            <>
              <h3 className="text-lg font-semibold capitalize text-teal-600 mb-4">
                Sub-Child Services
              </h3>
              <div className="space-y-2 pb-1 pr-1 pl-1">
                {subChildServicesLoading ? (
                  <LoadingSkeleton count={2} />
                ) : subChildServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No additional options available
                  </div>
                ) : (
                  subChildServicesData?.map((service: ServiceData) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleSubChildServiceClick(service)}
                      disabled={isSubmitting}
                      className={`relative w-full h-12 p-3 text-left rounded-[20px] ${
                        isServiceSelected(service.id)
                          ? 'bg-teal-50 outline outline-2 outline-teal-500 border-transparent'
                          : 'border border-[#E7E7E7] hover:border-gray-300'
                      } shadow-sm transition-all ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">
                          {service.name}
                        </span>
                        {isServiceSelected(service.id) && (
                          <Check className="w-4 h-4 text-teal-500" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add some padding at the bottom to ensure the sticky navigation doesn't overlap with content */}
      <div className="h-24"></div>
    </div>
  )
}
