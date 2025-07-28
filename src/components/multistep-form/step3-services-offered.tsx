"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "./multi-step-form";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Check, X, Loader2 } from "lucide-react";
import { useGetServices, useGetSeriveTypes } from "@/lib/hooks";

interface Step3Props {
  form: UseFormReturn<FormData>;
}

interface ServiceType {
  id: string;
  name: string;
}

interface ServiceData {
  id: string;
  name: string;
  typeId?: string;
  parentId?: string;
}

interface ServiceResponse {
  data: ServiceData[];
}

interface Service {
  id: string;
  name: string;
  typeId?: string;
  parentId?: string;
  level: number;
}

interface SelectedService {
  id: string;
  name: string;
}

export default function Step3ServicesOffered({ form }: Step3Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State for tracking selections in each column
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedSubParentId, setSelectedSubParentId] = useState<string | null>(
    null
  );
  const [selectedServiceNames, setSelectedServiceNames] = useState<
    SelectedService[]
  >([]);
  // Add new state to cache services data
  const [cachedMainServices, setCachedMainServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});
  const [cachedChildServices, setCachedChildServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});
  const [cachedSubChildServices, setCachedSubChildServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
    trigger,
  } = form;

  const selectedServices = watch("selectedServices") || [];

  // Fetch service types
  const { data: serviceTypesData, isLoading: typesLoading } =
    useGetSeriveTypes();

  // Fetch main services based on selected type
  const { data: mainServicesData, isLoading: mainServicesLoading } =
    useGetServices({
      typeId: selectedTypeId || undefined,
    });

  // Cache main services when they change
  useEffect(() => {
    if (mainServicesData && selectedTypeId) {
      setCachedMainServices((prev) => ({
        ...prev,
        [`type_${selectedTypeId}`]: mainServicesData,
      }));
    }
  }, [mainServicesData, selectedTypeId]);

  // Fetch child services based on selected parent
  const { data: childServicesData, isLoading: childServicesLoading } =
    useGetServices({
      parentId: selectedParentId || undefined,
    });

  // Cache child services when they change and check if parent should be selectable
  useEffect(() => {
    if (childServicesData && selectedParentId) {
      setCachedChildServices((prev) => ({
        ...prev,
        [`parent_${selectedParentId}`]: childServicesData,
      }));

      // If the fetched children data is empty, the parent service is a leaf node and should be selected
      if (childServicesData.data.length === 0) {
        // Find the parent service details
        const parentService = Object.values(cachedMainServices)
          .flatMap(services => services.data)
          .find(service => service.id === selectedParentId);
        
        const currentSelectedServices = watch("selectedServices") || [];
        if (parentService && !currentSelectedServices.includes(parentService.id)) {
          toggleService({
            id: parentService.id,
            name: parentService.name,
            typeId: parentService.typeId,
            level: 0,
          });
        }
      }
    }
  }, [childServicesData, selectedParentId, cachedMainServices, watch]);

  // Fetch sub-child services based on selected sub-parent
  const { data: subChildServicesData, isLoading: subChildServicesLoading } =
    useGetServices({
      parentId: selectedSubParentId || undefined,
    });

  // Cache sub-child services when they change and check if parent should be selectable
  useEffect(() => {
    if (subChildServicesData && selectedSubParentId) {
      setCachedSubChildServices((prev) => ({
        ...prev,
        [`subparent_${selectedSubParentId}`]: subChildServicesData,
      }));

      // If the fetched sub-children data is empty, the parent service is a leaf node and should be selected
      if (subChildServicesData.data.length === 0) {
        // Find the parent service details
        const parentService = Object.values(cachedChildServices)
          .flatMap(services => services.data)
          .find(service => service.id === selectedSubParentId);
        
        const currentSelectedServices = watch("selectedServices") || [];
        if (parentService && !currentSelectedServices.includes(parentService.id)) {
          toggleService({
            id: parentService.id,
            name: parentService.name,
            parentId: parentService.parentId,
            level: 1,
          });
        }
      }
    }
  }, [subChildServicesData, selectedSubParentId, cachedChildServices, watch]);

  const toggleService = (service: Service) => {
    const isSelected = selectedServices.some((s) => s === service.id);

    if (isSelected) {
      // Remove the service
      const updatedServices = selectedServices.filter((s) => s !== service.id);
      setValue("selectedServices", updatedServices);
      setSelectedServiceNames((prev) =>
        prev.filter((s) => s.id !== service.id)
      );
    } else {
      // Add only this service (not parents or children)
      const newServices = [...selectedServices, service.id];
      const newServiceNames = [
        ...selectedServiceNames,
        { id: service.id, name: service.name },
      ];

      setValue("selectedServices", newServices);
      setSelectedServiceNames(newServiceNames);

      // Scroll to end after a short delay to ensure the new items are rendered
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft =
            scrollContainerRef.current.scrollWidth;
        }
      }, 100);
    }

    trigger("selectedServices");
  };

  const removeService = (serviceId: string) => {
    // Simply remove the selected service
    const updatedServices = selectedServices.filter((s) => s !== serviceId);
    setValue("selectedServices", updatedServices);
    setSelectedServiceNames((prev) => prev.filter((s) => s.id !== serviceId));
    trigger("selectedServices");
  };

  const isServiceSelected = (serviceId: string, level: number = 2) => {
    return selectedServices.some((s) => s === serviceId);
  };

  // Handle service type selection
  const handleServiceTypeClick = (typeId: string) => {
    setSelectedTypeId(selectedTypeId === typeId ? null : typeId);
    setSelectedParentId(null);
    setSelectedSubParentId(null);
  };

  // Handle main service selection
  const handleMainServiceClick = (service: ServiceData) => {
    setSelectedParentId(service.id);
    setSelectedSubParentId(null);

    // Don't immediately add to selection - wait for child data to be fetched
    // The selection will happen in the useEffect for childServicesData if no children are found
  };

  // Handle child service selection
  const handleChildServiceClick = (service: ServiceData) => {
    setSelectedSubParentId(service.id);

    // Don't immediately add to selection - wait for sub-child data to be fetched
    // The selection will happen in the useEffect for subChildServicesData if no sub-children are found
  };

  // Handle sub-child service selection
  const handleSubChildServiceClick = (service: ServiceData) => {
    // Sub-child services are always leaf nodes, so toggle selection immediately
    toggleService({
      id: service.id,
      name: service.name,
      parentId: selectedSubParentId || undefined,
      level: 2,
    });
  };



  // Update the counting functions to use cached data with prefixed keys
  const getSelectedServicesCountByType = (typeId: string) => {
    // Count services directly selected under this type
    return selectedServiceNames.filter((service) => {
      // Check in cached main services
      const mainServices = cachedMainServices[`type_${typeId}`] || { data: [] };
      const isMainService = mainServices.data.some((s) => s.id === service.id);
      if (isMainService) return true;

      // Check in all cached child services for services under this type
      let foundInType = false;
      Object.values(cachedChildServices).forEach((childServices) => {
        const childService = childServices.data.find(
          (s) => s.id === service.id
        );
        if (childService) {
          const mainService = mainServices.data.find(
            (s) => s.id === childService.parentId
          );
          if (mainService) foundInType = true;
        }
      });
      if (foundInType) return true;

      // Check in all cached sub-child services for services under this type
      let foundInSubChild = false;
      Object.values(cachedSubChildServices).forEach((services) => {
        const subService = services.data.find((s) => s.id === service.id);
        if (subService) {
          Object.values(cachedChildServices).forEach((childServices) => {
            const childService = childServices.data.find(
              (s) => s.id === subService.parentId
            );
            if (childService) {
              const mainService = mainServices.data.find(
                (s) => s.id === childService.parentId
              );
              if (mainService) foundInSubChild = true;
            }
          });
        }
      });

      return foundInSubChild;
    }).length;
  };

  const getSelectedServicesCountByParent = (parentId: string) => {
    return selectedServiceNames.filter((service) => {
      // Check if this is a direct child
      const childServices = cachedChildServices[`parent_${parentId}`] || {
        data: [],
      };
      if (childServices.data.some((s) => s.id === service.id)) return true;

      // Check if this is a sub-child
      let foundInSubChild = false;
      Object.values(cachedSubChildServices).forEach((services) => {
        const subService = services.data.find((s) => s.id === service.id);
        if (subService) {
          const parentChildService = childServices.data.find(
            (s) => s.id === subService.parentId
          );
          if (parentChildService) foundInSubChild = true;
        }
      });

      return foundInSubChild;
    }).length;
  };

  // Loading skeleton component
  const LoadingSkeleton = ({ count = 3 }: { count?: number }) => (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

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
                      selectedTypeId === type.id ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {/* Main Services for this type */}
                {selectedTypeId === type.id && (
                  <div className="space-y-2">
                    {mainServicesLoading ? (
                      <LoadingSkeleton count={4} />
                    ) : mainServicesData?.data?.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                        No services available for {type.name}
                      </div>
                    ) : (
                      mainServicesData?.data?.map((service: ServiceData) => {
                        const childServices = cachedChildServices[`parent_${service.id}`]?.data || [];
                        const hasChildren = childServices.length > 0;
                        const isDataLoaded = cachedChildServices[`parent_${service.id}`] !== undefined;
                        const isLeafNode = isDataLoaded && childServices.length === 0;
                        const isFormSelected = isServiceSelected(service.id);
                        const isNavigationActive = selectedParentId === service.id;
                        
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleMainServiceClick(service)}
                            disabled={isSubmitting}
                            className={`w-full h-12 p-3 text-left rounded-[20px] border shadow-sm transition-all ${
                              isFormSelected
                                ? "border-teal-500 bg-teal-50"
                                : isNavigationActive
                                ? "border-teal-300 bg-teal-50/50"
                                : "border-[#E7E7E7] hover:border-gray-300"
                            } ${
                              isSubmitting
                                ? "opacity-50 cursor-not-allowed"
                                : ""
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
                                    {getSelectedServicesCountByParent(
                                      service.id
                                    )}
                                  </span>
                                )}
                                {isFormSelected && (
                                  <Check className="w-4 h-4 text-teal-500" />
                                )}
                              </div>
                              {hasChildren || !isDataLoaded ? (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              ) : (
                                <div className="w-4 h-4"></div>
                              )}
                            </div>
                          </button>
                        );
                      })
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
          style={{ height: "fit-content" }}
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
                  childServicesData?.data?.map((service: ServiceData) => {
                    const subChildServices = cachedSubChildServices[`subparent_${service.id}`]?.data || [];
                    const hasSubChildren = subChildServices.length > 0;
                    const isDataLoaded = cachedSubChildServices[`subparent_${service.id}`] !== undefined;
                    const isLeafNode = isDataLoaded && subChildServices.length === 0;
                    const isFormSelected = isServiceSelected(service.id);
                    const isNavigationActive = selectedSubParentId === service.id;
                    
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleChildServiceClick(service)}
                        disabled={isSubmitting}
                        className={`w-full h-12 p-3 text-left rounded-[20px] border shadow-sm transition-all ${
                          isFormSelected
                            ? "border-teal-500 bg-teal-50"
                            : isNavigationActive
                            ? "border-teal-300 bg-teal-50/50"
                            : "border-[#E7E7E7] hover:border-gray-300"
                        } ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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
                            {isFormSelected && (
                              <Check className="w-4 h-4 text-teal-500" />
                            )}
                          </div>
                          {hasSubChildren || !isDataLoaded ? (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          ) : (
                            <div className="w-4 h-4"></div>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* Column 3: Sub-Child Services */}
        <div
          className="sticky top-10 max-h-screen overflow-y-auto bg-white/95 backdrop-blur-sm pt-4 -mt-4"
          style={{ height: "fit-content" }}
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
                  subChildServicesData?.data?.map((service: ServiceData) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleSubChildServiceClick(service)}
                      disabled={isSubmitting}
                      className={`relative w-full h-12 p-3 text-left rounded-[20px] ${
                        isServiceSelected(service.id)
                          ? "bg-teal-50 outline outline-2 outline-teal-500 border-transparent"
                          : "border border-[#E7E7E7] hover:border-gray-300"
                      } shadow-sm transition-all ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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
  );
}
